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
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names

6. React router dom
- https://reactrouter.com/web/example/custom-link
- https://www.jianshu.com/p/bdab3f6a226d

7. Responsive development framework for reach  
- https://v5.getbootstrap.com/docs/5.0/getting-started/webpack/
- https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background
- https://react-bootstrap.github.io/
- https://semantic-ui.com/ 
- https://react.semantic-ui.com/ 
- https://ant.design/components/transfer/  
    - https://www.reddit.com/r/reactjs/comments/93j4iv/thoughts_on_blueprint_vs_ant_design_vs_semantic/
    - ant design is made in China 
- https://github.com/mui-org/material-ui 
    - > npm list @material-ui/core
    - > npm install @material-ui/icons
    - https://developer.mozilla.org/en-US/docs/Web/CSS/@media
    - https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
    - https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/css-%E5%B0%8F%E6%8A%80%E5%B7%A7%E5%88%86%E4%BA%
    AB-em-%E5%96%AE%E4%BD%8D%E7%9A%84%E5%BC%B7%E5%A4%A7%E7%94%A8%E9%80%94-457dc30a83b4
    - Learn steps 
        - Use viewport meta : <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
                />
        - Use its template: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/checkout
        - But its grid sorting required commcerial version, it ng 
    - https://www.digitalocean.com/community/tutorials/react-material-ui
    - Design :
        - https://material.io/design/layout/responsive-layout-grid.html
        - https://ithelp.ithome.com.tw/articles/10192806
    - CSS:  
        - https://developer.mozilla.org/en-US/docs/Web/CSS/bottom
    - Design drawer:
        1. Design layout (appbar, drawer, ...)
        2. Design functionalities (drawer menu button, ...)
        3. Design responsive 
            - https://www.mydevice.io/
            - https://wcc723.github.io/css/2017/07/21/css-flex/
            - https://css-tricks.com/couple-takes-sticky-footer/
            - https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance
            - https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance
            - https://stackoverflow.com/questions/57474707/full-height-width-without-scrollbar-in-material-ui-react-app


            
- TODO: webpack prod -> testing (java , js)  -> docker (spring app server + mq) + kubernate 

- React hooks project 
    - https://www.youtube.com/watch?v=fxY1q4SCB64&t=145s
    - https://github.com/WebDevSimplified/GitHub-Jobs-API-React-App
    - React developer tools 
        - https://addons.mozilla.org/en-US/firefox/addon/react-devtools/
    - Issue: Using request cancellation 
        - If request not cancelled, the slow request still wait to render 
- Ant design 
    - 



8. Submit block screen and show success msg in a box 
- https://github.com/derrickpelletier/react-loading-overlay

9. Auth 
- https://auth0.com/developers/?utm_source=carbon&utm_medium=cpc&utm_campaign=carbon&utm_content=five-fingerprint-orange-devhome


# My WebStorm Setting
- Use Prettier (as save)