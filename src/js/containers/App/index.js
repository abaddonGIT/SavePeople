/**
 * Created by abaddon on 29.08.2017.
 */

import React, {Children} from 'react';

export function App(props) {
    return (
        <div className="app">
            <header>

            </header>
            {Children.toArray(props.children)}
            <div className="footer">

            </div>
        </div>
    );
}

App.propTypes = {
    children: React.PropTypes.node
};

export default App;