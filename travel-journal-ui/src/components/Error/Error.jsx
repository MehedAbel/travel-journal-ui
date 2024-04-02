import './index.css'

const Error = ({ errorMessage, id = "", style = {}, ariaLive = "polite"}) => {
    return (
        <div className="w-100" aria-live={ariaLive}>
            <p className="badge text-wrap error-message" id={id} style={style}>{errorMessage}</p>
        </div>
    );
}

export default Error;
