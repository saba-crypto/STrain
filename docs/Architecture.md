# Project Architecture, Conventions and Patterns

## Project Structure

Project uses angular feature based system.
yep thats it for now :/

## Markup and Styles Structure

### Markup(HTML)

- try to always use semantic elements whenever it makes sense.
- avoid inline styles - use utility classes instead.

### classes

- for class names, always use kebab-case naming convention.
  for example: "this-is-class-name".
- avoid long class names like: "header-left-side-container-profile-picture".
- class names should be as descriptive as possible according to its context.

### variables

- when styling, always try to use pre-made scss variables and mixins.
  this speeds up development and makes styles maintainable.

### formatting

- avoid indentations beyond level 4,
  this makes code easier to read and debug

### attention to details

- attention to details, even small ones makes project more polished
  and improves user experience

### responsive design

- project uses **Desktop-First Approach**.
- make sure that every single component is fully response its essential piece when styling.
- website/component should not break until 340px of screen width.
- do not use overflow: hidden; just to make website/component not to break
  use it only when its required.

### Other

- don't use !important unless absolutely necessary.
