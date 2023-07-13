import React from 'react';
import './Modal.scss';
import _ from 'lodash';

const CustomModal = ({children, visible, setVisible}) => {
    const rootClasses = _.compact(
        ['create_object_modal',
        visible && 'modal__active']
    );
    console.log(children)
    return <div className={rootClasses.join(' ')} onMouseDown={() => setVisible(false)}>
            <div className={'my_modal alert alert-danger'} onMouseDown={(e)=>e.stopPropagation()} >
                <button
                    onClick={()=>setVisible(false)}
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    style={{marginLeft: '93%'}}
                ></button>
                {_.isString(children) ? children : 'Unknown error'}
            </div>
        </div>;
};

export default CustomModal;