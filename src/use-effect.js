import React, {Component, useState, useEffect, useCallback, useMemo} from 'react';

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

const getPlanet = (id) => {
    return fetch(`https://swapi.dev/api/planets/${id}/`)
        .then(res => res.json())
        .then(data => data);
}

const useRequest = (request) => {
    const initialState = useMemo(() => ({
        data: null,
        loading: true,
        error: null
    }), [])
    const [dataState, setDataState] = useState(initialState);

    useEffect(() => {
        setDataState({
            data: null,
            loading: true,
            error: null
        });
        let cancelled = false
        request()
            .then(data => !cancelled && setDataState({
                data,
                loading: false,
                error: null
            }))
            .catch(error => !cancelled && setDataState({
                data: null,
                loading: false,
                error: error
            }))
        return () => cancelled = true;
    }, [request, initialState]);
    return dataState;
};

const usePlanetInfo = (id) => {
    const request = useCallback(
        () => getPlanet(id), [id]);
    return useRequest(request);
}

const PlanetInfo = ({id}) => {
    const {data, loading, error} = usePlanetInfo(id);

    if (error) {
        return <div>Something is wrong</div>;
    }

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div>{id} - {data.name}</div>
    )
}

export default UseEffectHook;
