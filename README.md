### ng2-express
#### Description
This is a simple reference of how to set up [Angular 2 RC1](http://angular.io) to run on [Express](http://expressjs.com). Please get familiar with the [SystemJS](https://github.com/systemjs/systemjs) loader 
because at the moment set up is not as straightforward compared to NG1.  Unlike other examples, this only uses TypeScript on the client side.  Please note that this is likely not a recommended method for implementing in production.
Exposing node_modules is not a good idea.  In your build process, place dependencies in a library folder and adjust SystemJS config and script imports accordingly.  
   
#### To install and run:
````
   npm install
   typings install
   node index.js
````

##### TypeScript Config
Use either commonjs or system for the module option.

tsconfig.json used for this example:
````
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",    
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false
  },
  "exclude": [
    "node_modules",
    "typings/main",
    "typings/main.d.ts"
  ]
}
````

##### SystemJS Configuration
Define the NG2 libraries.  map specifies the location of the modules.  packages specify how to load each package in the modules.

````
SystemJS.config({
            map: {
                "@angular": "node_modules/@angular",
                "rxjs": "node_modules/rxjs"
            },
            packages: {
                '/': {                    
                    defaultExtension: 'js'
                },
                '@angular/http': {                    
                    defaultExtension: 'js',
                    main: 'http.js'
                },
                '@angular/core': {                    
                    defaultExtension: 'js',
                    main: 'index.js'
                },
                '@angular/router': {                 
                    defaultExtension: 'js',
                    main: 'index.js'
                },
                '@angular/router-deprecated': {                    
                    defaultExtension: 'js',
                    main: 'index.js'
                },
                '@angular/platform-browser-dynamic': {                 
                    defaultExtension: 'js',
                    main: 'index.js'
                },
                '@angular/platform-browser': {                    
                    defaultExtension: 'js',
                    main: 'index.js'
                },
                '@angular/compiler': {                    
                    defaultExtension: 'js',
                    main: 'compiler.js'
                },
                '@angular/common': {                    
                    defaultExtension: 'js',
                    main: 'index.js'
                },
                'rxjs' : {
                    defaultExtension: 'js'
                }
            }
        });
        SystemJS.import('./main').then(null, console.error.bind(console));
````        

#####  Node entry point
In your main Node script make sure that you:

1.  Set the path to where your NG2 code is residing. In this example, it is simply located at the root
````
app.use(express.static(rootPath));
````
2.  Expose the path to the dependencies.  This is not recommended for production.
````
app.use('/node_modules', express.static(rootPath + '/node_modules'))
````
3.  Send the HTML that acts as the entry point for NG2. In this example it is redundant because it resides in the same folder as root
and it is already being handled in #1
````
app.get('/', function(req, res){
    res.sendFile(rootPath + '/index.html');
});
````