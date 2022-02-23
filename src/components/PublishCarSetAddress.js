import React, { useEffect, useRef, useCallback } from "react";
import { Utils } from '../constants/Utils';
import { URL_GOOGLE_API } from "../constants";

let autoComplete, map, marker;

export default function PublishCarSetAddress({locationText, setLocationText, setAddressSelected, addressSelected, setAddressConfirmed, setMessage}) {  
    const autoCompleteRef = useRef(null);
    const mapRef = useRef(null);
    
    const updateMarker = useCallback((address) => {
        setLocationText(address.formatted_address);
        marker.setPosition(address.geometry.location);
        marker.setMap(map); 
    }, [setLocationText]);
 
    /**
     * Sets the text place in the textbox and set the marker in the map
     */
    const handlePlaceSelect = useCallback(() => {
        const address = autoComplete.getPlace();

        if(address && address.geometry) {
            setAddressSelected(address);
            updateMarker(address);
        }
    }, [setAddressSelected, updateMarker]);

    /**
     * Sets the input which will be act as autocomplete, 
     * initializes Google API with specific options,
     * set the event listener for when an address is selected
     * and set the DOM div where the map will be displayed  
     */
    const onScriptLoad = useCallback(() => {
        autoComplete = Utils.initAutocomplete(autoCompleteRef, () => handlePlaceSelect());
        map = Utils.initGoogleMap(mapRef);
        if(addressSelected == null) marker = new window.google.maps.Marker();
        else updateMarker(addressSelected);
    }, [handlePlaceSelect, addressSelected, updateMarker]);

    useEffect(() => {
        Utils.loadScript(URL_GOOGLE_API, () => onScriptLoad());        
    }, [onScriptLoad]);

    /**
     * Clean message on unmount
     */
    useEffect(() => {
        return function cleanup() {
            setMessage("");
        }
    }, [setMessage]);

    return (
        <div className="row">
            <div className="col-12">
                <h4>¿Dónde se puede ver?</h4>

                <input
                    className="form-control form-control-lg mb-2"
                    ref={autoCompleteRef}
                    onChange={event => setLocationText(event.target.value)}
                    value={locationText}
                    placeholder="Escriba la dirección..."                
                />

                <div ref={mapRef} id="map"></div>

                <div className="d-grid col-12 mt-2">
                    <button 
                        className="btn btn-lg btn-primary"
                        type="button" 
                        onClick={() => setAddressConfirmed(true)}
                        disabled={addressSelected == null}>Continuar
                    </button>
                </div>
            
            </div>            
        </div>
    );
}