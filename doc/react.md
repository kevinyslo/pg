# React
## Ref
- https://create-react-app.dev/docs/getting-started
- https://dev.to/scrimba/learn-react-hooks-by-building-a-paint-app-4p9c
- https://flaviocopes.com/javascript-automatic-semicolon-insertion/


## Setup
1. install node with npm in windows  
- ref:
    - https://nodejs.org/en/download/
- set the default npm and npm cache path (to avoid window 10 home path with space)
    - npm config set prefix d:\npm 
    - npm config set cache d:\npm-cache 
2. create react app 
- ref:
    - https://github.com/facebook/create-react-app
    - https://create-react-app.dev/docs/running-tests/
- command:
    - npm init react-app pg-app
    

## Development 
1. Add useful packages
- npm install --save react-router-dom

2. Found VSCode always go to *.d.ts from "Go to Definition" 
- https://stackoverflow.com/questions/49197923/vscode-always-shows-type-definition-and-not-the-actually-implementation


## Task - Build UI using react to input user and submit post request in site A  
1. Learn react hook 
- https://reactjs.org/docs/hooks-intro.html
- https://reactjs.org/docs/hooks-overview.html#building-your-own-hooks
- https://reactjs.org/docs/hooks-custom.html
- https://codesandbox.io/s/jvvkoo8pq3 (React hook sample)
- https://www.robinwieruch.de/react-hooks-fetch-data

2. Learn redux vs hooks
- https://zhuanlan.zhihu.com/p/66020264 
- https://github.com/reduxjs/redux-thunk
- https://www.robinwieruch.de/redux-vs-usereducer
- https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c

3. Add context/index.html and its index.js
- npm run eject
- https://www.npmjs.com/package/html-webpack-plugin 
- https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9
- https://www.jianshu.com/p/5e32f0315bb1
- https://sapandiwakar.in/multiple-html-pages-with-create-react-app-app/
- https://stackoverflow.com/questions/55308657/create-react-app-v2-multiple-entry-points

4.  'http://localhost:8083/api/data/users/1' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
- https://juejin.im/post/6844904005299077128
- https://stackoverflow.com/questions/31602697/webpack-dev-server-cors-issue

5. useReducer
- fetch data: https://stackoverflow.com/questions/53146795/react-usereducer-async-data-fetch/53146965
- form binding : https://medium.com/javascript-in-plain-english/react-controlled-forms-with-hooks-538762aab935

6. React router dom
- https://reactrouter.com/web/example/custom-link
