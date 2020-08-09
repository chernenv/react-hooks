import React, {useState} from 'react';

const UseStateHook = () => {

    const [color, setColor] = useState('white');
    const [fontSize, setFontSize] = useState(16);

    return (
        <div style={{
            marginBottom: '16px',
            backgroundColor: color,
            fontSize: `${fontSize}px`
        }}>
            <span style={{
                marginRight: '10px'
            }}>useState() Hook</span>
            <button
                onClick={() => setColor('black')}>
                Dark
            </button>
            <button
                onClick={() => setColor('white')}>
                Light
            </button>
            <button
                onClick={() => setFontSize((s) => s + 2)}>
                +
            </button>
            <button
                onClick={() => setFontSize((s) => s - 2)}>
                -
            </button>
        </div>
    );
};

export default UseStateHook;
