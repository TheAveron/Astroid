import { useEffect, useState } from "react";

class LocationObject {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;

    constructor(latitude: number, longitude: number, altitude: number | null, accuracy: number) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.accuracy = accuracy;
    }
}

function GetLocation(): LocationObject {
    const [content, setContent] = useState<LocationObject>(new LocationObject(0, 0, 0, 0));

    const optionsObject: PositionOptions = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: Infinity,
    };

    function error(err: GeolocationPositionError) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const location = new LocationObject(
                    position.coords.latitude,
                    position.coords.longitude,
                    position.coords.altitude,
                    position.coords.accuracy
                );
                setContent(location);
            },
            error,
            optionsObject
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return content;
}

export default GetLocation;
