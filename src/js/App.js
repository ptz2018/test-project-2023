import React, {useEffect, useState} from "react";
import './App.css';

import {RFeature, RLayerVector, RMap, ROSM, RStyle} from "rlayers";
import {fromLonLat} from "ol/proj";
import {Point} from "ol/geom";
import PointService from "./service/PointService";

function App() {

  const [groups, setGroups] = useState([]);

  const coords = {
    origin: [44.59223056940421, 33.7038952152284],
  }
  useEffect(() => {
    fetchGroups();
  },[])

  async function fetchGroups() {
    try {
      const data = await PointService.getGroupsPoints();
      setGroups(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  }
  const locationIcon = './svg/location.svg';

  return <div className="App">
      <RMap
          className="example-map"
          initial={{ center: fromLonLat(coords.origin), zoom: 5 }}
      >
        <ROSM />
        <RLayerVector zIndex={10}>
          <RStyle.RStyle>
            <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} className="map__icon"/>
          </RStyle.RStyle>
          {
            groups.length && groups.map(g=>g.points.map(p=>
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
      </RMap>
  </div>;
}

export default App;
