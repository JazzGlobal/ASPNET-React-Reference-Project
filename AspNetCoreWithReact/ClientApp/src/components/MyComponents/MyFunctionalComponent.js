import React, { useEffect, useState, useRef } from 'react';

const MyFunctionalComponent = (props) => {

    function componentMount() {
    }

    function componentUnmount() {
    }

    useEffect(() => {
        componentMount();
        return () => {
            componentUnmount();
        }
    }, [])

    // STATE
    const [age, setAge] = useState(20)

    // EVENT HANDLING
    const onChangedAgeInput = (event) => {
        setAge(parseInt(event.target.value))
    }

    const showDetails = (prTelephone) => {
        alert(`Name: ${props.name ? props.name: 'John'} | Age: ${age} | Telephone: ${prTelephone}`)
    }

    // CONDITIONAL RENDERING

    let JoanAge = () => {
        if (age > 25)
            return (<p>John has more than 25 years</p>)
        else
            return (<p>John has 25 or less years</p>)
    }

    // ITERATION 
    let users = [
        { name: 'John', age: 20 },
        { name: 'Chris', age: 25 },
        { name: 'Mike', age: 28 },
        { name: 'Paul', age: 21 },
    ]

    let userList = users.map((user) => 
        <li key={user.name}>Name: {user.name} - Age: {user.age}</li>
        );

    // FORM
    const [userName, setUserName] = useState("David");
    const handleUserChange = (event) => {
        setUserName(event.target.value)
    }
    const handleSubmit = (event) => {
        alert("Form Submitted. Value: " + userName)
    }

    // REFS
    const inputRefName = useRef(null);
    const inputRefTelephone = useRef(null);
    const clearRefFields = () => {
        inputRefName.current.value = "";
        inputRefTelephone.current.value = "";
        inputRefName.current.focus();
    }

    return (
        <div>
            {/* PROPS */}
            <h2>My Functional Component
                <h4><b>{ props.name }</b></h4>
            </h2>
            {/* STATE */}
            <hr />
            <h4>State</h4>
            <span>
                <b>Age: </b> <input type="number" value={age} onChange={onChangedAgeInput} />
                <button onClick={() => setAge(age + 1)}> + </button>
                <button onClick={() => setAge(age - 1)}> - </button>
            </span>

            { /* EVENT HANDLING */}

            <hr />
            <h4>Event Handling</h4>
            <button onClick={showDetails.bind(this, 123456789)}>Show Details</button>

            { /* CONDITIONAL RENDERING */}
            <hr />
            <h4>Conditional Rendering</h4>

            { /* EXAMPLE 1 - IF / ELSE */}
            {JoanAge()}

            { /* EXAMPLE 2 - TERNARY OPERATOR */}
            <p>{age > 25 ? 'John has more than 25 years' : 'John has 25 or less years'}</p>

            { /* EXAMPLE 3 - SHORT-CIRCUIT OPERATOR */}
            {age > 25 && <p>John has more than 25 years</p>}
            {age <= 25 && <p>John has 25 or less years</p>}

            { /* EXAMPLE 4 - IMMEDIATELY INVOKED FUNCTION */}
            {
                (() => {
                    switch (age) {
                        case 25: return <p>John has 25 years</p>
                        default: return <p>John has not 25 years</p>
                    }
                })()
            }

            { /* ITERATION */}
            <hr />
            <h4> ITERATION</h4>
            <ul>
                { /* EXAMPLE 1 */}
                {userList}

                { /* EXAMPLE 2 */}
                <br />
                {users.map((user) =>
                    <li key={user.name}>Name: {user.name} - Age: {user.age}</li>
                )}

            </ul>

            {/* FORMS */}
            <hr />
            <h4>Form</h4>
            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input type="text" value={userName} onChange={handleUserChange} />
                </label>
                <input type="submit" value="Submit"/>

            </form>
            {/* REFS */}
            <hr />
            <h4>Refs</h4>
            <label>
                Name:
                <input type="text" ref={inputRefName} />
            </label>
            <label>
                Telephone:
                <input type="text" ref={inputRefTelephone} />
            </label>
            <button onClick={clearRefFields}> Clear Fields </button>
        </div>
        )
}

export default MyFunctionalComponent;