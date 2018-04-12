# MessengerPrototype

WIP - Development branch contains active work

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/`.

### Production Optimisation
Run `npm run build` to build this project with production-ready optimisations. It will also generate the source maps to allow debugging on the browser level and allow for bundle inspections.

[Read More](https://angular.io/guide/deployment#optimize-for-production)

### Bundle Inspection
To view a visual representation of how large various modules and components are within the MessengerPrototype you can optionally install the `source-map-explorer` and run an analysis on a bundled JavaScript asset.

```
# List generated production build bundles
ls dist/*.bundle.js

# Run explorer to general graphical representation of data
node_modules/.bin/source-map-explorer dist/main.*.bundle.js
```

[Read More](https://angular.io/guide/deployment#inspect-the-bundles)

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### TODO
- Cleanup logging, potentially add support for [Angular2Logger](https://www.npmjs.com/package/angular2-logger)
- Code cleanup
- Code test coverage
- Code documentation
- Add 'App Store' teaser page
- Add 'About' general informative page
