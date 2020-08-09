import React from 'react';
import ReactDom from 'react-dom';
import HookSwitcher from "./use-state";
import Context from "./use-context";
import UseEffect from "./use-effect";

const App = () => {
    return (
        <div className="hooks">
            <Context/>
            <HookSwitcher/>
            <UseEffect/>
        </div>

    );
};
ReactDom.render(<App/>, document.getElementById('root'));
