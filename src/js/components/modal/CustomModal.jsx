import React from 'react';
import './Modal.modul.scss';
const CustomModal = ({children, visible, setVisible}) => {

    const rootClasses = ['create_object_modal']
    if(visible) {
        rootClasses.push('modal__active')
    }
    return (
        <div className={rootClasses.join(' ')} onMouseDown={() => setVisible(false)}>
            <div className={'my_modal'} onMouseDown={(e)=>e.stopPropagation()} >
                <button
                    onClick={()=>setVisible(false)}
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    style={{marginLeft: '93%'}}
                ></button>
                {children}
            </div>
        </div>
    );
};

export default CustomModal;