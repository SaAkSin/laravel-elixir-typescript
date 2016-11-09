saaksin-elixir-typescript
========================
**(forked from laravel-elixir-typescript by [okaufmann](https://github.com/okaufmann/laravel-elixir-typescript))**

[![npm version](https://badge.fury.io/js/sasksin-elixir-typescript.svg)](https://badge.fury.io/js/saaksin-elixir-typescript)

## Prerequirement
You have to install [Laravel's Elixir](http://laravel.com/docs/master/elixir)(Version 3.0 or higher) and its dependencies first.


## Upgrade
The signature was changed to the following:

```js
mix.typescript(src, output);
```

## Installation
Install with Node.js

```js
npm install saaksin-elixir-typescript --save
```

## Usage
A simple [gulp-typescript](https://github.com/ivogabe/gulp-typescript) wrapper ingredient for Laravel Elixir.

Add it to your Elixir-enhanced Gulpfile, like so:

```js
var elixir = require('laravel-elixir');

// import the dependency
var elixirTypscript = require('elixir-typescript');

elixir(function(mix) {
  mix.typescript('app.ts');
});
```

This will compile the `app.ts` file in `resources/assets/typescript/` and concat the compiled content into `public/js/app.js`.

If you'd like to output to a different directory than the default `public/js`, then you may override this by provide a path for `output` as well.

```js
mix.typescript('app.js', 'public/js/foo/bar.js');
```

Further you could insert multiple files like

```js
elixir(function(mix) {
  mix.typescript(['module1.ts', 'module2.ts']);
});
```

### package.json

```
{
  "private": true,
  "scripts": {
    "prod": "gulp --production",
    "dev": "gulp watch"
  },
  "devDependencies": {
    "gulp": "^3.9.1",
    "laravel-elixir": "^5.0.0",
    "saaksin-elixir-typescript": "~2.0.1",
    "@types/core-js": "^0.9.34",
    "@types/node": "^6.0.45",
    "concurrently": "^3.0.0",
    "lite-server": "^2.2.2",
    "typescript": "^2.0.3"
  },
  "dependencies": {
    "@angular/common": "~2.1.1",
    "@angular/compiler": "~2.1.1",
    "@angular/core": "~2.1.1",
    "@angular/forms": "~2.1.1",
    "@angular/http": "~2.1.1",
    "@angular/platform-browser": "~2.1.1",
    "@angular/platform-browser-dynamic": "~2.1.1",
    "@angular/router": "~3.1.1",
    "@angular/upgrade": "~2.1.1",
    "angular-in-memory-web-api": "~0.1.13",
    "core-js": "^2.4.1",
    "reflect-metadata": "^0.1.8",
    "rxjs": "5.0.0-beta.12",
    "systemjs": "0.19.39",
    "zone.js": "^0.6.25"
  }
}
```

### gulpfile.js
```
var elixir = require('laravel-elixir');
var elixirTypescript = require('saaksin-elixir-typescript');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
var bowerDir = './resources/assets/vendor/';
var lessPaths = [
    bowerDir + 'bootstrap/less',
    bowerDir + 'font-awesome/less'
];

elixir(function(mix) {
    
    .....
    

    mix.typescript(
        [
            'app.component.ts',
            'app.module.ts',
            'main.ts'
        ],
        'public/js/app/'
    );
});

```

### tsconfig.json
The project file is supported. Just put your file into the typescript asset folder.
```
{
  "compilerOptions":
  {
    "target": "es5",
    "module": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false,
    "typeRoots": [
      "../../../node_modules/@types"
    ],
    "types": [
      "core-js"
    ]
  },
  "exclude":
  [
    "../../../node_modules"
  ]
}
```

## Parameters

Bellow is the list of the available parameters:

- **src**: Filename for output
- **output**(optional): Where to place the output file. Default: `public/js/app/`
