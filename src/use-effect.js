import React, {Component, useState, useEffect} from 'react';

const UseEffectHook = () => {
    const [value, setValue] = useState(1);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <span style={{marginRight: '10px'}}>useEffect() Hook</span>
                <button onClick={() => setValue((v) => v + 1)}>
                    +
                </button>
                <button onClick={() => setVisible(false)}>
                    hide
                </button>
                <PlanetInfo id={value}/>

                <ClassCounter value={value}/>
                <HookCounter value={value}/>
            </div>
        )
    } else {
        return <button onClick={() => setVisible(true)}>show</button>
    }
};


const HookCounter = ({value}) => {
    // without array of arguments = ComponentDidMount + ComponentDidUpdate
    // with empty array = only 1 time call (ComponentDidMount)
    // with arguments in array = checking arguments for changes (ComponentDidUpdate)
    // with return statement ~ ComponentWillUnmount, but after every effect
    useEffect(() => {
        console.log('useEffect()');
        return () => console.log('clear');
    }, [value]);
    return <p>{value}</p>
};

// example to compare with class component lifecycle hooks
class ClassCounter extends Component {

    componentDidMount() {
        console.log('class: mount');
    }

    componentDidUpdate(props) {
        console.log('class: update');
    }

    componentWillUnmount() {
        console.log('class: unmount');
    }

    render() {
        return <p>{this.props.value}</p>
    }

}

const usePlanetInfo = (id) => {
    const [name, setName] = useState(null);

    useEffect(() => {
        let cancelled = false;
        fetch(`https://swapi.dev/api/planets/${id}/`)
            .then(res => res.json())
            .then(data => !cancelled && setName(data.name));
        return () => cancelled = true;
    }, [id]);
    return name;
}

const PlanetInfo = ({id}) => {
    const name = usePlanetInfo(id);
    return (
        <div>{id} - {name}</div>
    )
}

export default UseEffectHook;
