import React from 'react'

import {ThemeContext, themes} from './theme-context';

class ThemedButton extends React.Component {

    render() {
        let props = this.props;
        let theme = this.context;
        return (
            <button
                {...props}
                // onClick={() => {
                //     if (theme === themes.dark) {
                //         theme = themes.light
                //     } else {
                //         theme = themes.dark
                //     }
                // }}
                style={{backgroundColor: theme.background}}
            />
        );
    }
}
ThemedButton.contextType = ThemeContext;
export default ThemedButton;

