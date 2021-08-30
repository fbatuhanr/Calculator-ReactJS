import React from 'react';

const InputScreen = ({result}) => {

    return (
        <div className="p-0 m-0">
            <input 
                readOnly
                className="form-control p-3 text-end"
                style={{fontSize: '4vw'}}
                type="text" 
                name="" 
                id=""
                value={result}
                />
        </div>
    )
}


export default InputScreen;