import React from "react";
import ReactDOM from "react-dom";

const Modal = ({children, isOpen, closeModal}) => {
    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '999'}}>
            <div style={{width: '700px'}}>
                <div style={{textAlign: 'end'}}>
                    <button onClick={closeModal}>Close</button>
                </div>
                <hr />
                <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '12px', display: 'grid', placeItems: 'center'}}>
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    )
}

export default Modal;