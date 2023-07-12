import React, {useEffect, useRef, useState} from "react";
import './App.scss';
import './styles/map.scss';

import {RFeature, RLayerTile, RLayerVector, RMap, RPopup, RStyle} from "rlayers";
import {fromLonLat} from "ol/proj";
import {LineString, Point} from "ol/geom";
import PointService, {handleError} from "./service/PointService";
import MapService, {handleMapError} from "./service/MapService";
import CheckboxList from "./components/CheckboxList.jsx";
import CustomSelect from "./components/UI/CustomSelect.jsx";
import CustomModal from "./components/modal/CustomModal.jsx";

function App() {
    const [groups, setGroups] = useState([]);
    const [maps, setMaps] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [basemap, setBasemap] = useState();
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
        fetchMaps();
        handleMapError(setShowError, setErrorMessage);
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

    function fetchMaps() {
        MapService.getMaps()
            .then(maps => {
                setMaps(maps);
                if (!_.isEmpty(maps)) {
                    setBasemap(maps[0].url);
                } else {
                    setError('Map is not defined');
                }
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

    function sortRouteByOrder(a, b) {
        if (a.order > b.order) return -1;
        if (a.order < b.order) return 1;
        return 0;
    }

    const locationByType = (type) => ({
        'Red': './png/location_red.png',
        'Blue': './png/location_blue.png',
        'Green': './png/location_green.png',
    })[type] || './png/location_none.png';
    const pointIcon = './png/point.png';
    const flagIcon = './png/flag.png';

    return <div className="App">
        {basemap && <RMap
            className="example-map"
            initial={{center: fromLonLat(center.coords), zoom: center.zoom}}
        >
            <RLayerTile url={basemap}/>
            <CustomSelect
                className="map__select"
                value={basemap}
                options={maps}
                onChange={basemap => setBasemap(basemap)}
            />

            <CustomModal visible={showError} setVisible={setShowError}>
                {errorMessage}
            </CustomModal>
            {groups.length > 0 && <CheckboxList groups={groups} onChange={onSelectGroups}></CheckboxList>}
            {selectedGroups.length > 0 && <RLayerVector zIndex={10}>
                <>
                    {
                        selectedGroups && selectedGroups.length > 0 && selectedGroups.map(g =>
                            [
                                    ...g.routes.map(route =>
                                        [
                                            <RFeature
                                                key={`route${route.id}`}
                                                geometry={
                                                    new LineString(getRoutePointsArray(route))
                                                }>
                                                <RStyle.RStyle>
                                                    <RStyle.RStroke color='red' width={4}/>
                                                </RStyle.RStyle>
                                            </RFeature>,

                                            ...route.routePoints.map(point =>
                                                <RFeature
                                                    key={`routepoint${point.id}`}
                                                    geometry={new Point(fromLonLat([point.y, point.x]))}>
                                                    <RStyle.RStyle>
                                                        {
                                                            point.order === 1 || point.order === route.routePoints.length
                                                                ? <RStyle.RIcon color={'red'} src={flagIcon} anchor={[0.2, 0.95]}/>
                                                                : <RStyle.RIcon color={'blue'} src={pointIcon}/>
                                                        }
                                                    </RStyle.RStyle>
                                                </RFeature>)

                                        ]
                                    )
                                ,
                                ...g.points.map(p =>
                                     <RFeature
                                         key={`point${p.id}`}
                                         geometry={new Point(fromLonLat([p.y, p.x]))}
                                         onClick={(e) =>
                                             e.map.getView().fit(e.target.getGeometry().getExtent(), {
                                                 duration: 250,
                                                 maxZoom: 15,
                                             })
                                         }
                                     >
                                        <>
                                            <RStyle.RStyle>
                                               <RStyle.RIcon src={locationByType(p.pointType)} anchor={[0.5, 0.8]} className="map__icon"/>
                                            </RStyle.RStyle>
                                            <RPopup trigger={"click"} className="example-overlay">
                                                <div className="marker_popup">
                                                    <p>{p.y} <br/>{p.x},{p.description}</p>
                                                </div>
                                            </RPopup>
                                        </>
                                    </RFeature>
                                )
                            ]
                        )
                    }
                </>
            </RLayerVector>}
        </RMap>}
    </div>;
}

export default App;