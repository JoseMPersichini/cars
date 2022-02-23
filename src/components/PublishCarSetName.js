import React, { useState } from "react";

export default function PublishCarSetName({addressSelected, setAddressConfirmed, storageService, afterSave }) {  
    const [name, setName] = useState("");

    const saveCar = () => {
        storageService.saveCar(name, addressSelected.geometry.location);
        afterSave();
    }        

    return (
    <React.Fragment>
        <h4>Ingresá el nombre del titular de la agencia</h4>

        <input
            className="form-control form-control-lg mb-2"
            onChange={(value) => setName(value.target.value)}
            value={name}
            name="nombre"
            placeholder="Apellido y nombre..."
        />

        <div className="d-grid col-12 mt-2">
            <button className="btn btn-primary btn-lg" type="submit" disabled={name == null || name === ""} onClick={saveCar}>Confirmar y guardar</button>
            <button className="btn btn-danger btn-lg mt-2" type="button" onClick={() => setAddressConfirmed(false)}>Volver</button>
        </div>
        
    </React.Fragment>
    );
}