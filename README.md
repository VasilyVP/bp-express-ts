# ExpressJS TypeScript boilerplate
It's ExpressJS boilerplate with TypeScript

## Functions pre-installed
1) nodemon with nodemon.json, start with the .env file
2) tsconfig.json with transpiling configutation
3) App configurations:
    1. .env - basically for private data,
    2. app-config.json - basically for paths;
4) Express initialization (index.ts)
5) Logs:
    1. Debuggin with `Debug`
    2. Access log with `morgan`
6) Errors handling and logging
7) Cookie-parser
8) Authentication class with JWT
9) MognoDB connection
10) CORS
11) Nginx ready

## Packages used
 - bcrypt
 - cookie-parser
 - cors
 - debug
 - morgan
 - dotenv
 - express
 - express-validator
 - validator
 - http-errors
 - jsonwebtoken
 - fs-extra
 - tslib

 - @types/...

 ## Available scripts

 In the project directory, you can run:
 
 ### `npm start`

 Runs the app in the development mode.
 App restarts with the edits

 ### `npm build`

 Preparing `build` and running `tsc`

 ### `npm run startBuild`

 Runs the app from the `build`