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
        {value: "https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png", name:"Темная"},
        {value: "https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png", name:"Аэропорты"},
        {value: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", name:"Спутник"},
        {value: "http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png", name:"Подробная"},
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

    function onSelectGroups (ids){
        fetchGroupsByIds(ids);
    }

    function fetchGroups() {
        PointService.getGroupsPoints()
          .then(groups=>setGroups(groups))
          .catch(err=>{
              console.log(err)
          })
    }

    function fetchGroupsByIds(ids) {
        PointService.getGroupsByIds(ids)
          .then(groups=>setSelectedGroups(groups))
          .catch(err=>{
              console.log(err)
          })
    }
    
    const handleMarkerClick = (e) => {
        e.map.getView().fit(e.target.getGeometry().getExtent(), {
            duration: 250,
            maxZoom: 15,
        })
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
                                onClick={(e) => handleMarkerClick(e)}
                            >
                                <RPopup trigger={"click"} className="example-overlay">
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
