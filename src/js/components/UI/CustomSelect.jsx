import React from 'react';

const CustomSelect = ({value, options, onChange, className}) => {

    return (
        <select
            className={className}
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            {
                options.map((b) =>
                    <option value={b.value} key={b.value}>{b.name}</option>
                )
            }

        </select>
    );
};

export default CustomSelect;