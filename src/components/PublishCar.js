import React, { useState } from "react";
import PublishCarSetName from "./PublishCarSetName";
import PublishCarSetAddress from "./PublishCarSetAddress";
import { Alert } from "react-bootstrap";

export default function PublishCar({storageService}) {      
    const [locationText, setLocationText] = useState("");
    const [addressSelected, setAddressSelected] = useState(null);
    const [addressConfirmed, setAddressConfirmed] = useState(false);
    const [message, setMessage] = useState("");

    const afterSave = () => {
        setLocationText("");
        setAddressSelected(null);
        setAddressConfirmed(false);
        setMessage(<Alert variant="success">Vehículo guardado con éxito!</Alert>);
    }

    if(!addressConfirmed) {
        return (
            <React.Fragment>
                {message !== "" && message} 
                <PublishCarSetAddress 
                    locationText={locationText}
                    setLocationText={setLocationText}
                    setAddressSelected={setAddressSelected}
                    addressSelected={addressSelected}
                    setAddressConfirmed={setAddressConfirmed}
                    setMessage={setMessage}
                />
            </React.Fragment>
        );
    }
    else {
        return (
            <PublishCarSetName 
                addressSelected={addressSelected}
                setAddressConfirmed={setAddressConfirmed}
                storageService={storageService}
                afterSave={afterSave}
            />
        );
    }
}