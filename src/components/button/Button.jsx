import './Button.css';

function Button({className, type, clickAction, disabled, name}) {
    return (
        <>
            <button
                className={className}
                type={type}
                onClick={clickAction}
                disabled={disabled}
            >
                {name}
            </button>
        </>
    );
}

export default Button;