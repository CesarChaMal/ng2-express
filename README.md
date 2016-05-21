### ng2-express
#### Description
This is a simple reference of how to set up [Angular 2 RC1](http://angular.io) to run on [Express](http://expressjs.com). Please get familiar with the [SystemJS](https://github.com/systemjs/systemjs) loader 
because at the moment set up is not as straightforward compared to NG1.  Unlike other examples, this only uses TypeScript on the client side.  Please note that this is likely not a recommended method for implementing in production.
Exposing node_modules is not a good idea.  In your build process, place dependencies in a library folder and adjust SystemJS config and script imports accordingly.  
   
##### TypeScript Config
Unlike the [configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) used by the [NG2 QuickStart](https://github.com/angular/quickstart), make sure that the configuration is using 'system' and not 'common'.
On the client side module code generation is using the SystemJS method.  On the server, CommonJS is being used. So if you plan to implement TypeScript on the server code, create another tsconfig.json for it.  You will need to
split out the client and server code into their own folders.

tsconfig.json used for this example:
````
{
  "compilerOptions": {
    "target": "es5",
    //"module": "commonjs",
    "module": "system",
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
Define the NG2 libraries.  Note that the format that specifies CommonJS were commented out. These are not needed.   In the packages list, make sure to include the path
(that you exposed in Express) to the dependency.

````
SystemJS.config({
            map: {
                "@angular": "node_modules/@angular",
                "rxjs": "node_modules/rxjs"
            },
            packages: {
                '/': {
                    format: 'register',
                    defaultExtension: 'js'
                },
                'node_modules/@angular/http': {
                    //format: 'cjs',
                    defaultExtension: 'js',
                    main: 'http.js'
                },
                'node_modules/@angular/core': {
                    //format: 'cjs',
                    defaultExtension: 'js',
                    main: 'index.js'
                },
                'node_modules/@angular/router': {
                    //format: 'cjs',
                    defaultExtension: 'js',
                    main: 'index.js'
                },
                'node_modules/@angular/router-deprecated': {
                    //format: 'cjs',
                    defaultExtension: 'js',
                    main: 'index.js'
                },
                'node_modules/@angular/platform-browser-dynamic': {
                    //format: 'cjs',
                    defaultExtension: 'js',
                    main: 'index.js'
                },
                'node_modules/@angular/platform-browser': {
                    //format: 'cjs',
                    defaultExtension: 'js',
                    main: 'index.js'
                },
                'node_modules/@angular/compiler': {
                    //format: 'cjs',
                    defaultExtension: 'js',
                    main: 'compiler.js'
                },
                'node_modules/@angular/common': {
                    //format: 'cjs',
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