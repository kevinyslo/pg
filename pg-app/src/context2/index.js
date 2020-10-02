import React from 'react';
import ReactDOM from 'react-dom';
// import {App, ThemedButton, Increment, Increment2} from './App';
import {App2} from './App2';
import {ThemedButton} from './ThemedButton'

ReactDOM.render(
        // [<App>
        //     <ThemedButton/>
        // </App>, <Increment initialCount={1} />, <Increment2 initialCount={1} />],
    <App2>
        <ThemedButton />
    </App2>,
    document.getElementById('root')
);

