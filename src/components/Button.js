import React from 'react'

const Button = ({val, col = 3, type, btnOnClick}) => {

    var buttonColor;

    switch (type) {
        case "process": buttonColor = "btn-light"; break;
        case "operation": buttonColor = "btn-warning"; break;
        default: buttonColor = "btn-secondary"; break;
    }

    let valVisibility;
    switch (val) {
        case "-": valVisibility = <i className="bi bi-dash-lg"></i>; break;
        case "+": valVisibility = <i className="bi bi-plus-lg"></i>; break;
        case "*": valVisibility = <i className="bi bi-x-lg"></i>; break;
        case "/": valVisibility = <i className="bi bi-slash-lg"></i>; break;
        case "%": valVisibility = <i className="bi bi-percent"></i>; break;
        default: valVisibility = val; break;    
    }
    return (
        <div className={"p-0 d-grid col-" + col}>
            <button 
                type="button" 
                className={"btn "+buttonColor+" p-4 border border-white btn-lg"}
                style={{fontSize: '3vw'}}
                onClick={() => btnOnClick(val)}
            >
                {valVisibility} 
            </button>
        </div>
    )
}

export default Button;