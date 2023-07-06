import React, {useEffect, useState} from "react";
import './App.css';

import {RFeature, RLayerTile, RLayerVector, RMap, ROSM, RStyle} from "rlayers";
import {fromLonLat} from "ol/proj";
import {Point} from "ol/geom";
import PointService from "./service/PointService";
import CheckboxList from "./components/CheckboxList.jsx";

function App() {

    const [groups, setGroups] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);

    const center = {
        coords: [44.59223056940421, 33.7038952152284],
        zoom: 5
    }

    useEffect(() => {
        fetchGroups();
    }, [])

    const onSelectGroups = (ids) => {
        fetchGroupsByIds(ids);
    }

    async function fetchGroups() {
        try {
            const data = await PointService.getGroupsPoints();
            setGroups(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchGroupsByIds(ids) {
        try {
            const data = await PointService.getGroupsByIds(ids);
            setSelectedGroups(data);
        } catch (error) {
            console.error(error);
        }
    }

    const locationIcon = './svg/location.svg';

    return <div className="App">
        <RMap
            className="example-map"
            initial={{center: fromLonLat(center.coords), zoom: center.zoom}}
        >
            <RLayerTile url="https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png"/>
            {groups.length && <>
                <RLayerVector zIndex={10}>
                    <RStyle.RStyle>
                        <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} className="map__icon"/>
                    </RStyle.RStyle>
                    <CheckboxList groups={groups} onChange={onSelectGroups}/>
                    {
                        selectedGroups.length && selectedGroups.map(g => g.points.map(p =>
                            <RFeature
                                key={p.id}
                                geometry={new Point(fromLonLat([p.x, p.y]))}
                                onClick={(e) =>
                                    e.map.getView().fit(e.target.getGeometry().getExtent(), {
                                        duration: 250,
                                        maxZoom: 15,
                                    })
                                }
                            >
                            </RFeature>))
                    }
                </RLayerVector>
            </>}
        </RMap>
    </div>;
}

export default App;
