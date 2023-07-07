import React, {useState} from 'react';
import classes from './checkboxlist.module.scss'

const CheckboxList = ({groups, onChange}) => {
    const [selectedGroups, setSelectedGroups] = useState([]);

    const handleGroupChange = (groupId) => {
        const updatedSelectedGroups = [...selectedGroups];
        if (updatedSelectedGroups.includes(groupId)) {
            const index = updatedSelectedGroups.indexOf(groupId);
            updatedSelectedGroups.splice(index, 1);
        } else {
            updatedSelectedGroups.push(groupId);
        }
        setSelectedGroups(updatedSelectedGroups);
        onChange(updatedSelectedGroups);
    };
    return (
        <div className={classes.chackbox_list}>
            { groups.length && <ul>
                {groups.map(g=>
                    <li key={g.id}>
                        <input
                            key={g.id}
                            checked={selectedGroups.includes(g.id)}
                            onChange={() => handleGroupChange(g.id)}
                            type="checkbox"
                            name="" id={g.id}/>
                        <label htmlFor={g.id}>{g.name}</label>
                    </li>
                    )
                }
            </ul>
            }
        </div>
    );
};

export default CheckboxList;