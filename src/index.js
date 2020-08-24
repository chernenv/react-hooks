import React from 'react';
import ReactDom from 'react-dom';
import UseStateHook from "./use-state";
import UseContextHook from "./use-context";
import UseEffectHook from "./use-effect";

const App = () => {
    return (
        <div className="hooks">
            <UseContextHook/>
            <UseStateHook/>
            <UseEffectHook/>
        </div>

    );
};


ReactDom.render(<App/>, document.getElementById('root'));
