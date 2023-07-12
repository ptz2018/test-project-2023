import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import './App.scss';
import './styles/map.scss';
import _ from 'lodash';

import {RFeature, RInteraction, RLayerTile, RLayerVector, RMap, RPopup, RStyle} from "rlayers";
import {fromLonLat, toLonLat} from "ol/proj";
import {LineString, Point} from "ol/geom";
import PointService, {handleError} from "./service/PointService";
import MapService, {handleMapError} from "./service/MapService";
import CheckboxList from "./components/CheckboxList.jsx";
import CustomSelect from "./components/UI/CustomSelect.jsx";
import CustomModal from "./components/modal/CustomModal.jsx";
import {Feature} from "ol";
import {log} from "ol/console";

function App() {
    const [groups, setGroups] = useState([]);
    const [maps, setMaps] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [basemap, setBasemap] = useState();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [changedPoints, setChangedPoints] = useState([])
    const [changedRoutePoints, setChangedRoutePoints] = useState([])
    const [pointFeatures, setPointFeatures] = useState([])
    const [routePointFeatures, setRoutePointFeatures] = useState([])

    const [canUpdate, setCanUpdate] = useState(false);

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
        fetchMaps();
        handleMapError(setShowError, setErrorMessage);
    }, [])

    useEffect(() => {
        groups.length && setPointFeatures(groups.map(group => group.points.map((point) =>
            new Feature({
                geometry: new Point(fromLonLat([point.y, point.x])),
                name: "point",
                id: point.id,
                point: point,
            })
        )).flat());
        groups.length && setRoutePointFeatures(groups.map(group =>
            group.routes.map((route) =>
                route.routePoints.map((point) =>
                    new Feature({
                        geometry: new Point(fromLonLat([point.y, point.x])),
                        name: "route_point",
                        point: point,
                        id: point.id,
                    })
                )
            )
        ).flat(3));

    }, [groups]);

    const getFeatureByPointId = (id) => {
        return _.find(pointFeatures, (p) => p.get("id") === id)
    }
    const getFeatureByRoutePointId = (id) => {
        return _.find(routePointFeatures, (p) => p.get("id") === id)
    }

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
        const point = e.features.item(0).get("point");
        const coords = toLonLat(e.features.item(0).getGeometry().getFirstCoordinate())

        point.x = coords[1];
        point.y = coords[0];

        if (point_name === "point") {
            setChangedPoints([...changedPoints, point])
        } else if (point_name === "route_point") {
            setChangedRoutePoints([...changedRoutePoints, point])
        }
    }, [groups, changedPoints, changedRoutePoints])

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

    function updatePoint() {
        let error = false;
        if (changedPoints.length) changedPoints.forEach((point) => {
            PointService.updatePoint(point.id, point)
                .catch(err => {
                    setErrorMessage(err);
                    error = true;
                })

        })
        if (changedRoutePoints.length) changedRoutePoints.forEach((point) => {
            PointService.updateRoutePoint(point.id, point)
                .catch(err => {
                    setErrorMessage(err);
                    error = true;
                })
        })
        if (!error) {
            alert("Данные обновлены")
            setCanUpdate(false)
        }

    }

    const getRoutePointsArray = (route) => {
        return _.sortBy(route.routePoints, ['order'])
            .map(point => getFeatureByRoutePointId(point.id).getGeometry().getFirstCoordinate())
    }

    const handleMarkerClick = (e) => {
        e.map.getView().fit(e.target.getGeometry().getExtent(), {
            duration: 250,
            maxZoom: 15,
        })
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
            {!canUpdate && <button className="btn btn-primary map__update-button"
                                   onClick={() => setCanUpdate(true)}
            >Начать редактирование
            </button>}
            {canUpdate && <><button className="btn btn-warning map__update-button"
                                  onClick={() => updatePoint()}>Обновить
                          </button>
                          <button className="btn btn-primary map__edit-button"
                                  onClick={() => setCanUpdate(false)}>Закончить редактирование
                         </button></>}
            {selectedGroups.length > 0 && <RLayerVector zIndex={10}>
                <>
                    {
                        selectedGroups && selectedGroups.length > 0 && selectedGroups.map(g =>
                            [

                                ...g.routes.map((route, index) =>
                                    [
                                        <RFeature
                                            key={`route${route.id}`}
                                            geometry={
                                                new LineString(getRoutePointsArray(route))
                                            }
                                        >
                                            <RStyle.RStyle>
                                                <RStyle.RStroke color={colors[index % (colors.length - 1)]}
                                                                width={4}/>
                                            </RStyle.RStyle>
                                        </RFeature>,

                                        ...route.routePoints.map(point =>
                                            <RFeature
                                                key={point.id}
                                                feature={getFeatureByRoutePointId(point.id)}
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

                                    ]
                                )
                                ,
                                ...g.points.map(p =>
                                    <RFeature
                                        key={p.id}
                                        feature={getFeatureByPointId(p.id)}
                                        onClick={(e) => handleMarkerClick(e)}
                                    >
                                        <RStyle.RStyle>
                                            <RStyle.RIcon src={locationByType(p.pointType)} anchor={[0.5, 0.8]}
                                                          className="map__icon"/>
                                        </RStyle.RStyle>
                                        <RPopup ref={popup} trigger={'click'} className="example-overlay">
                                            <div className="marker_popup">
                                                <p>{p.y} <br/>{p.x},{p.description}</p>
                                            </div>
                                        </RPopup>
                                    </RFeature>
                                )
                            ]
                        )
                    }
                </>
            </RLayerVector>}
            <RInteraction.RTranslate
                onTranslateEnd={handleMovePoint}
                filter={(f) => canUpdate && f.get("id")}
            />
        </RMap>}
    </div>;
}

export default App;