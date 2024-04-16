import { useEffect, useState } from "react";

class Location_object {
    latitude!: number;
    longitude!: number;
    altitude: number | null;
    accuracy!: number;


    constructor (latitude: number, longitude: number , altitude: number | null, accuracy: number) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.accuracy = accuracy
      }
}

function GetLocation() {
    const [content, setContent] = useState(new Location_object(0,0,0,0))

    const options_object: PositionOptions = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: Infinity,
    };

    function error(err): PositionErrorCallback {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const location = new Location_object(position.coords.latitude,position.coords.longitude, position.coords.altitude, position.coords.accuracy);
            setContent(location)
        }, error, options_object)
    })
    return content
}

export default GetLocation