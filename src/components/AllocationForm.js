import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = (props) => {
    const { dispatch,remaining, currency  } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');
    

    const currencySymbols = {
        Dollar: '$',
        Pound: '£',
        Euro: '€',
        Rupee: '₹',
    };

    const handleCurrencyChange = (event) => {
        const newCurrency = currencySymbols[event.target.value];
        dispatch({
            type: "CHG_CURRENCY",
            payload: newCurrency
        });
    };

    const submitEvent = () => {

            if(cost > remaining) {
                alert(`The value cannot exceed remaining funds ${currency}${remaining}`);
                setCost("");
                return;
            }

        const expense = {
            name: name,
            cost: parseInt(cost),
        };
        if(action === "Reduce") {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
                dispatch({
                    type: 'ADD_EXPENSE',
                    payload: expense,
                });
            }
    };

    return (
        <div>
            <div className='row'>

                <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="Marketing" name="marketing"> Marketing</option>
                        <option value="Sales" name="sales">Sales</option>
                        <option value="Finance" name="finance">Finance</option>
                        <option value="HR" name="hr">HR</option>
                        <option value="IT" name="it">IT</option>
                        <option value="Admin" name="admin">Admin</option>
                    </select>

                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add" name="Add">Add</option>
                        <option value="Reduce" name="Reduce">Reduce</option>
                    </select>

                    <select className="custom-select" id="currencySelect" onChange={(event) => handleCurrencyChange(event)}>
                        <option defaultValue>Pound</option>
                        <option value="Dollar">Dollar</option>
                        <option value="Euro">Euro</option>
                        <option value="Rupee">Rupee</option>
                    </select>

                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '2rem' }}>
                        <span>{currency}</span>
                        <input
                            required="required"
                            type="number"
                            id="cost"
                            name="cost"
                            value={cost}
                            style={{ marginLeft: '0.5rem', size: 10 }}
                            onChange={(event) => setCost(event.target.value)}
                        />
                    </div>
                    
                    <button className="btn btn-primary" onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                    
                </div>
            </div>

        </div>
    );
};

export default AllocationForm;
