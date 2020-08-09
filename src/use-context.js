import React, {useContext} from 'react';

const MyContext = React.createContext();

const Context = () => {
    return (
        <MyContext.Provider value="useContext() Hook">
            <Child/>
        </MyContext.Provider>
    );
};

const Child = () => {
    const value = useContext(MyContext);
    // WITH useContext()
    return <p>{value}</p>;
    // WITHOUT useContext()
    // return (
    //     <MyContext.Consumer>
    //         {(value) => {
    //             return (
    //                 <p>{value}</p>
    //             )
    //         }}
    //     </MyContext.Consumer>
    // )
};

export default Context;
