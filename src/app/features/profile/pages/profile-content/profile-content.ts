import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { disabled, email, form, FormField, maxLength, minLength } from '@angular/forms/signals';
import { UserUpdateInfo } from '../../models/user.model';
import { ProfileService } from '../../services/profile.service';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../../../core/services/toast.service';
import { finalize } from 'rxjs';

export interface UserUpdateForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  pictureUrl: string;
  dateOfBirth: string;
}

@Component({
  imports: [FormField],
  selector: 'app-profile-content',
  styleUrl: './profile-content.scss',
  templateUrl: './profile-content.html',
})
export class ProfileContent {
  private readonly profileService = inject(ProfileService);
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef);
  protected userResource = rxResource({
    stream: () => this.profileService.getUser(),
  });

  private profileModel = signal<UserUpdateForm>({
    pictureUrl: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
  });

  constructor() {
    effect(() => {
      const userResponse = this.userResource.value();
      const user = userResponse?.data;
      if (!user) {
        return;
      }
      this.profileForm().reset({
        pictureUrl: user.details.pictureUrl ?? '',
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        email: user.email ?? '',
        phoneNumber: user.details.phoneNumber ?? '',
        address: user.details.address ?? '',
        dateOfBirth: user.details.dob ? String(user.details.dob).split('T')[0] : '',
      });
    });
  }
  private isLoading = signal<boolean>(false);

  public profileForm = form(this.profileModel, (path) => {
    email(path.email, { message: 'Please enter a valid Email address' });
    minLength(path.phoneNumber, 9, { message: 'Phone number cannot have less than 9 digits' });
    maxLength(path.phoneNumber, 9, { message: 'Phone number cannot have more than 9 digits' });
    minLength(path.address, 5, { message: 'Address must contain at least 5 characters' });
    maxLength(path.address, 200);
    disabled(path.email);
  });

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.isLoading()) {
      return;
    }
    if (this.profileForm().invalid()) {
      this.toastService.show('FORM IS INVALIDDD!!', 'error');
      return;
    }
    this.isLoading.set(true);
    const processedModel = this.processProfileModel(this.profileModel());
    this.profileService
      .updateUser(processedModel)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.toastService.show('Account info was updated successfully!', 'success');
          this.userResource.reload();
        },
        error: (errorResponse) => {
          console.log(errorResponse);
          this.toastService.show(
            `${errorResponse.error.title}: ${errorResponse.error.detail}`,
            'error',
          );
        },
      });
  }
  processProfileModel(model: UserUpdateForm): UserUpdateInfo {
    const sanitized = Object.fromEntries(
      Object.entries(model).map(([key, value]) => [key, value === '' ? null : value]),
    ) as unknown as UserUpdateInfo;

    return sanitized;
  }
}
