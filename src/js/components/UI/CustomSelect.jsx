import React from 'react';

const CustomSelect = ({value, options, onChange, className}) => <select
        className={className}
        value={value}
        onChange={event => onChange(event.target.value)}
    >
        {
            options.map((b) =>
                <option value={b.url} key={b.id}>{b.name}</option>
            )
        }
    </select>;

export default CustomSelect;