import React, { useState, useEffect, useRef, useCallback } from "react";
import { Utils } from "../constants/Utils";
import { URL_GOOGLE_API } from "../constants";

let map;

export default function ShowAllCars({storageService}) {      
    const mapRef = useRef(null);
    const [cars, setCars] = useState(null);

    /**
     * Set the DOM div where the map will be displayed  
     */
    const onScriptLoad = useCallback(() => {
        map = Utils.initGoogleMap(mapRef);
    }, []);

    useEffect(() => {
        Utils.loadScript(URL_GOOGLE_API, () => onScriptLoad());    
        setCars(storageService.getAllCars());    
    }, [onScriptLoad, storageService]);

    useEffect(() => {
        if(cars) {
            for(let car of cars) {
                Utils.setMarker(map, car.position, "<b>Titular agencia: </b><p>" + car.name + "</p>");
            }
        }
    }, [cars])

    return(
        <React.Fragment>
            <h4>Autos cargados</h4>
            <p>Clickee sobre el icono para ver el titular de la agencia que lo posee</p>
            <div id="map" ref={mapRef}></div>
        </React.Fragment>
    );
}