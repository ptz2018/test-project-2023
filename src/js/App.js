import React, {useEffect, useRef, useState} from "react";
import './App.scss';
import './styles/map.scss';

import {RFeature, RLayerTile, RLayerVector, RMap, RPopup, RStyle} from "rlayers";
import {fromLonLat} from "ol/proj";
import {LineString, Point} from "ol/geom";
import PointService, {handleError} from "./service/PointService";
import CheckboxList from "./components/CheckboxList.jsx";
import CustomSelect from "./components/UI/CustomSelect.jsx";
import CustomModal from "./components/modal/CustomModal.jsx";

function App() {
    const basemapsDict = [
        {value: "https://tile.openstreetmap.org/{z}/{x}/{y}.png", name: "По умолчанию"},
        {value: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", name: "Теплая"},
        {value: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png", name: "Топографическая "},
        {value: "https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png", name: "Темная"},
        {value: "https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png", name: "Аэропорты"},
        {
            value: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            name: "Спутник"
        },
        {value: "http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png", name: "Подробная"},
    ]

    const [groups, setGroups] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [basemap, setBasemap] = useState(basemapsDict[0].value);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const popup = useRef();

    const center = {
        coords: [44.59223056940421, 33.7038952152284],
        zoom: 5
    }
    function onSelectGroups(ids) {
        fetchGroupsByIds(ids);
    }

    useEffect(() => {
        fetchGroups();
        handleError(setShowError, setErrorMessage)
    }, [])

    function fetchGroups() {
        PointService.getGroupsPoints()
            .then(groups => {
                setGroups(groups);
            })
            .catch(err => {
                console.log(err)
            })
    }

    function fetchGroupsByIds(ids) {
        PointService.getGroupsByIds(ids)
            .then(groups => {
                setSelectedGroups(groups)
            })
            .catch(err => {
                setErrorMessage(err)
            })
    }

    function getRoutePointsArray(route) {
        return route.routePoints.sort(sortRouteByOrder).map(point => fromLonLat([point.y, point.x]))
    }

    const handleMarkerClick = (e) => {
        e.map.getView().fit(e.target.getGeometry().getExtent(), {
            duration: 250,
            maxZoom: 15,
        })
    }

    const updatePointDescription = (point) =>{
        point.description = textArea;
        PointService.update(point)
            .then((newPoint)=>point = newPoint)
            .catch(err=>console.log(err))
    }

    function sortRouteByOrder(a, b) {
        if (a.order > b.order) return -1;
        if (a.order < b.order) return 1;
        return 0;
    }

    const locationIcon = './svg/location.svg';
    const pointIcon = './svg/point.svg';
    const flagIcon = './svg/flag.png';

    const [textArea,setTextArea] = useState();

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
            <CustomModal visible={showError} setVisible={setShowError}>
                {errorMessage}
            </CustomModal>
            {groups.length > 0 && <CheckboxList groups={groups} onChange={onSelectGroups}></CheckboxList>}
            <RLayerVector zIndex={10}>
                <>
                    {
                        selectedGroups && selectedGroups.length > 0 && selectedGroups.map(g =>
                            <>
                                {g.points.map(p =>
                                    <RFeature
                                        key={p.id}
                                        geometry={new Point(fromLonLat([p.y, p.x]))}
                                        onClick={(e) => handleMarkerClick(e)}
                                    >
                                        <RStyle.RStyle>
                                            <RStyle.RIcon color='blue' src={locationIcon} anchor={[0.5, 0.8]} className="map__icon"/>
                                        </RStyle.RStyle>
                                        <RPopup ref={popup} trigger={'click'} className="example-overlay">
                                            <div className="marker_popup">
                                                <p>{p.y} <br/>{p.x} <br/>{p.description}</p>
                                                <textarea
                                                placeholder = "Напишите пару слов о данном городе"
                                                value = {textArea}
                                                onChange = {e => setTextArea(e.target.value)}
                                                rows="5"
                                                cols="33">
                                                </textarea>
                                                <button className="btn btn-primary" onClick={() => updatePointDescription(p)}>Изменить</button>
                                            </div>

                                        </RPopup>
                                    </RFeature>)
                                }
                                {
                                    g.routes.map(route =>
                                        <>
                                            <RFeature
                                                key={route.id}
                                                geometry={
                                                    new LineString(getRoutePointsArray(route))
                                                }>
                                                <RStyle.RStyle>
                                                    <RStyle.RStroke color='red' width={4}/>
                                                </RStyle.RStyle>
                                            </RFeature>

                                            {route.routePoints.map(point =>
                                                <RFeature
                                                    key={point.id}
                                                    geometry={new Point(fromLonLat([point.y, point.x]))}>
                                                    <RStyle.RStyle>
                                                        {
                                                            point.order === 1 || point.order === route.routePoints.length
                                                                ? <RStyle.RIcon color={'red'} src={flagIcon} anchor={[0.2, 0.95]}/>
                                                                : <RStyle.RIcon color={'blue'} src={pointIcon}/>
                                                        }
                                                    </RStyle.RStyle>
                                                </RFeature>)
                                            }
                                        < />
                                    )
                                }
                            </>
                        )
                    }
                </>
            </RLayerVector>
        </RMap>
    </div>;
}

export default App;