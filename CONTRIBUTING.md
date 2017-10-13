Before contributing any code, please consider the following guide
-
Client Side
-
Nethloader's client side is formed by a bunch of as self-contained as possible preact(react) components which are organized by views.

These are the main directives to consider for the project:

JS and components
-

* Each component must have its own folder with its logic and styles inside the ``src/app/views`` folder and must be broken into subcomponents (subfolders) if necessary.
* A component that is used in more than one other component/view goes into the ``src/app/views/shared`` folder.
* Global or non-ui specific scripts and logic are placed in ``src/utils``, this folder is available as a module thanks to webpack.
* All JavaScript files have to follow the [Standard JS](https://standardjs.com/) standards as strictly as possible. (Exeptions: - Webpack dynamic imports and ``h`` import due to ``transform-react-jsx``)

SCSS and styles
-
* Avoid producing more than 3 nested selectors in the resulting css.
* Write ``:global`` styles only and only for non-component specific rules. 
* ``:local`` class names must be written in camelCase.
* Class naming follows a "child name concats to parent name &trade;" method (``.className`` > ``.classNameChildClassName``).
* Every class has to organize its style properties, within what's reasonable, in the following way and separating each section with a newline when necessary:
    * Size and position (``display``, ``position``, etc...)
    * Box appearance (``color``, ``background``, ``opacity``, ``border``, etc...)
    * Margins and paddings (self-explanatory)
    * Font appearance (``font-size``, ``text-align``, ``text-transform``, etc...)
    * Rest of declarations (``transition``, ``cursor``, ``animation``, and any others)
* If a class has only one declaration, it will stay as a single line (no newlines).
