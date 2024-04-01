import './index.css'

const Error = ({ errorMessage, id = "", style = {} }) => {
    return (
        <div className="w-100" aria-live="polite">
            <p className="badge text-wrap error-message" id={id} style={style}>{errorMessage}</p>
        </div>
    );
}

export default Error;
