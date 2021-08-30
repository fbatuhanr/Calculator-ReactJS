import React from 'react';

const InputScreen = ({col=12, result}) => {

    return (
        <div className={"p-0 m-0 col-"+col}>
            <input 
                readOnly
                className="form-control p-3 pe-5 text-end"
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