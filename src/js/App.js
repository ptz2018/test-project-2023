import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import './App.scss';
import './styles/map.scss';
import _ from 'lodash';

import {RFeature, RInteraction, RLayerTile, RLayerVector, RMap, RPopup, RStyle} from "rlayers";
import {fromLonLat, toLonLat} from "ol/proj";
import {LineString, Point} from "ol/geom";
import PointService, {handleError} from "./service/PointService";
import CheckboxList from "./components/CheckboxList.jsx";
import CustomSelect from "./components/UI/CustomSelect.jsx";
import CustomModal from "./components/modal/CustomModal.jsx";
import {Feature} from "ol";

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
    const [changedPoints, setChangedPoints] = useState([])
    const [changedRoutePoints, setChangedRoutePoints] = useState([])

    const popup = useRef();

    const colors = ['red', 'blue', 'green', 'yellow', 'teal', 'black']

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

    const handleMovePoint = useCallback(e => {
        const point_name = e.features.item(0).get("name");
        const point_id = e.features.item(0).get("id");
        const route_id = e.features.item(0).get("route_id");
        const group_id = e.features.item(0).get("group_id");
        const coords = toLonLat(e.features.item(0).getGeometry().getFirstCoordinate())
        const group = _.find(groups, (obj) => obj.id === group_id);
        if (group) {
            if (point_name === "route_point") {
                const route = _.find(group.routes, (obj) => obj.id === route_id);
                if (route) {
                    const point = _.find(route.routePoints, (obj) => obj.id === point_id);
                    if (point) {
                        point.x = coords[1];
                        point.y = coords[0];
                        setChangedRoutePoints([...changedRoutePoints, point])
                    }
                }
            } else if (point_name === "point") {
                const point = _.find(group.points, (obj) => obj.id === point_id);
                if (point) {
                    point.x = coords[1];
                    point.y = coords[0];
                    setChangedPoints([...changedPoints, point])
                }
            }
        }
    }, [groups, setChangedPoints, setChangedRoutePoints])

    function fetchGroupsByIds(ids) {
        PointService.getGroupsByIds(ids)
            .then(groups => {
                setSelectedGroups(groups)
            })
            .catch(err => {
                setErrorMessage(err)
            })
    }

    function updatePoint() {
        if(changedPoints.length) changedPoints.forEach((point)=>PointService.updatePoint(point.id, point))
        else if (changedRoutePoints.length) changedRoutePoints.forEach((point)=>PointService.updateRoutePoint(point.id, point))
    }

    const getRoutePointsArray = (route) => {
        return route.routePoints.sort((a, b) => a.order - b.order)
            .map(point => fromLonLat([point.y, point.x]))
    }

    const handleMarkerClick = (e) => {
        e.map.getView().fit(e.target.getGeometry().getExtent(), {
            duration: 250,
            maxZoom: 15,
        })
    }

    const locationIcon = './svg/location.svg';
    const pointIcon = './svg/point.svg';
    const flagIcon = './svg/flag.png';

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
            <button className="btn btn-danger map__update-button" onClick={()=>updatePoint()}>Обновить</button>
            <RLayerVector zIndex={10}>
                <>
                    {
                        selectedGroups && selectedGroups.length > 0 && selectedGroups.map(g =>
                            <>
                                {g.points.map((p) =>
                                    <RFeature
                                        key={p.id}
                                        feature={new Feature({
                                            geometry: new Point(fromLonLat([p.y, p.x])),
                                            id: p.id,
                                            group_id: g.id,
                                            name: "point"
                                        })}
                                        onClick={(e) => handleMarkerClick(e)}
                                    >
                                        <RStyle.RStyle>
                                            <RStyle.RIcon color={'red'} src={locationIcon} anchor={[0.5, 0.8]}
                                                          className="map__icon"/>
                                        </RStyle.RStyle>
                                        <RPopup ref={popup} trigger={'click'} className="example-overlay">
                                            <div className="marker_popup">
                                                <p>{p.y} <br/>{p.x},{p.description}</p>
                                            </div>
                                        </RPopup>
                                    </RFeature>)
                                }
                                {
                                    g.routes.map((route, index) =>
                                        <>
                                            <RFeature
                                                key={route.id}
                                                geometry={
                                                    new LineString(getRoutePointsArray(route))
                                                }
                                                onPointerDrag={(e)=>e.preventDefault()}
                                            >
                                                <RStyle.RStyle>
                                                    <RStyle.RStroke color={colors[index] ? colors[index] : 'red'}
                                                                    width={4}/>
                                                </RStyle.RStyle>
                                            </RFeature>

                                            {route.routePoints.map(point =>
                                                <RFeature
                                                    key={point.id}
                                                    feature={new Feature({
                                                        geometry: new Point(fromLonLat([point.y, point.x])),
                                                        id: point.id,
                                                        route_id: route.id,
                                                        group_id: g.id,
                                                        name: "route_point"
                                                    })}
                                                >
                                                    <RStyle.RStyle>
                                                        {
                                                            point.order === 1 || point.order === route.routePoints.length
                                                                ? <RStyle.RIcon color={'red'} src={flagIcon}
                                                                                anchor={[0.2, 0.95]}/>
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
            <RInteraction.RTranslate
                onTranslateEnd={handleMovePoint}
            />
        </RMap>
    </div>;
}

export default App;