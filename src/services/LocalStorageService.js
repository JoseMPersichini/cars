export default class LocalStorageService {

    /**
     * Save a car in localStorage
     * @param {string} name 
     * @param {latLng object} position 
     */
    saveCar(name, position) {
        let cars = this.getJsonOrEmptyArray();

        let car = {name: name, position: position};
        cars.push(car);
        localStorage.setItem('carsapp_cars', JSON.stringify(cars));
    }

    /**
     * Get all cars saved in localStorage
     */
    getAllCars() {
        let cars = this.getJsonOrEmptyArray();

        return cars;
    }

    getJsonOrEmptyArray() {
        let cars =  localStorage.getItem('carsapp_cars');
        if(cars == null) cars = [];
        else cars = JSON.parse(cars);

        return cars;
    }
}