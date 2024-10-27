import { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {
    const [showData,setData]=useState({});
    const [getInput,setInput]=useState();

    const fetchValues = async () => {
        const values = await axios.get('/api/values/current');
        setData(data=>({...data, values: values.data}));
    }

    const fetchIndexs = async () => {
        const seenIndexes = await axios.get('/api/values/all');
        setData(data=>({...data, seenIndexes: seenIndexes.data}))
    }

    useEffect(()=>{
        fetchValues();
        fetchIndexs();
    },[]);

    const renderSeenIndexes = () => {
        return showData.seenIndexes?.map(({number})=>number).join(',');
    }

    const calculatedValues = () => {
        const entries = [];
        for(let key in showData.values){
            entries.push(
                <div key={key}>
                    For Index {key} I Calculated {showData.values[key]}
                </div>
            )
        }
        return entries
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/values', {
            index: getInput
        });
        setInput('');
        fetchValues();
        fetchIndexs();
    }

    const changeHandler = (e) => {
        setInput(parseInt(e.target.value));
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index: </label>
                <input
                value = {getInput}
                onChange = {changeHandler}
                />
                <button>Submit</button>
            </form>
            <h3>Indexes I have seen: </h3>
            {renderSeenIndexes()}

            <h3>Calculated Values: </h3>
            {calculatedValues()}

        </div>
    )
}

export default Fib;
