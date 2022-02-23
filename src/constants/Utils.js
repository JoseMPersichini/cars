import { MAPS_OPTIONS } from "./index";

export class Utils {
    /** 
     * Loads (if not loaded yet) the script specified by the URL and attach the callback function specified to the onload event
     **/
    static loadScript(url, callback) {
        let scripts = document.getElementsByTagName("script");
        let loaded = false;
        for(let element of scripts) {
            if(element.src === url) { 
                loaded = true;
                callback(); //llamo al callback para que vuelva a setear los refs a los elementos del DOM
                break;
            }
        }

        if(!loaded)
        {
            let script = document.createElement("script");
            script.type = "text/javascript";  
            script.onload = () => callback();  
        
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    };

    /** 
     * Returns the map initialized on the mapRef DOM element
    */
    static initGoogleMap(mapRef) {
        return new window.google.maps.Map(mapRef.current, MAPS_OPTIONS);
    }

    /**
     * Sets the marker on the specified map in the specified location. 
     * If it is set, show the InfoWindow
     * @param {*} map 
     * @param {*} location 
     * @param {*} infoWindowContent 
     */
    static setMarker(map, location, infoWindowContent = null) {        
        const marker = new window.google.maps.Marker({
            position: location,
            map: map
        });
        
        if(infoWindowContent != null) {
            const infowindow = new window.google.maps.InfoWindow({
                content: infoWindowContent,
            });
            
            marker.addListener("click", () => {
                infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                });
            });
        }
    }

    /**
     * Initializes google places autocomplete
     * @param {*} autocompleteRef 
     * @param {*} listenerPlaceChanged 
     */
    static initAutocomplete(autocompleteRef, listenerPlaceChanged) {
        let autoComplete = new window.google.maps.places.Autocomplete(
            autocompleteRef.current,
            { types: ["address"], componentRestrictions: { country: "ar" } }
        );
        autoComplete.setFields(["formatted_address", "geometry"]);
        autoComplete.addListener("place_changed", listenerPlaceChanged);
        return autoComplete;
    }
}