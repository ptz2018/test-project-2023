import React, {useEffect, useState} from "react";
import './App.scss';
import './styles/map.scss';

import {RFeature, RLayerTile, RLayerVector, RMap, RPopup, RStyle} from "rlayers";
import {fromLonLat} from "ol/proj";
import {Point} from "ol/geom";
import PointService from "./service/PointService";
import CheckboxList from "./components/CheckboxList.jsx";
import CustomSelect from "./components/UI/CustomSelect.jsx";

function App() {
    const basemapsDict = [
        {value: "https://tile.openstreetmap.org/{z}/{x}/{y}.png", name:"По умолчанию"},
        {value: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", name:"Теплая"},
        {value: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png", name:"Топографическая "},
        {value: "https://{a-c}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", name:"Яркая"},
        {value: "https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png", name:"Темная"}
    ]

    const [groups, setGroups] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [basemap, setBasemap] = useState(basemapsDict[0].value);
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
            <RLayerTile url={basemap}/>
            <CustomSelect
                className="map__select"
                value={basemap}
                options={basemapsDict}
                onChange={basemap => setBasemap(basemap)}
            />
            { groups && groups.length > 0 && <CheckboxList groups={groups} onChange={onSelectGroups}></CheckboxList>}

            { selectedGroups && selectedGroups.length > 0 &&
                <RLayerVector zIndex={10}>
                    <RStyle.RStyle>
                        <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} className="map__icon"/>
                    </RStyle.RStyle>
                    {
                        selectedGroups.map(g => g.points.map(p =>
                            <RFeature
                                key={p.id}
                                geometry={new Point(fromLonLat([p.y, p.x]))}
                                onClick={(e) =>
                                    e.map.getView().fit(e.target.getGeometry().getExtent(), {
                                        duration: 250,
                                        maxZoom: 15,
                                    })
                                }
                            >
                                <RPopup trigger={"hover"} className="example-overlay">
                                    <div className="marker_popup">
                                        <p>{p.y} <br/>{p.x}</p>
                                    </div>
                                </RPopup>
                            </RFeature>))
                    }
                </RLayerVector> }
        </RMap>
    </div>;
}

export default App;
