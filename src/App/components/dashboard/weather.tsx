import { useState, useEffect } from "react";
import GetLocation from "../common/location";
import { fetchWeatherApi } from "openmeteo"; // Adjust import based on the actual module structure
import { WeatherApiResponse } from "@openmeteo/sdk/weather-api-response";
import "../../../assets/css/weather.css";

interface Current {
    time: Date;
    temperature2m: number;
    relativeHumidity2m: number;
    precipitation: number;
    surfacePressure: number;
}

interface Hourly {
    time: Date[];
    temperature2m: Float32Array;
    relativeHumidity2m: Float32Array;
    precipitationProbability: Float32Array;
    surfacePressure: Float32Array;
    uvIndex: Float32Array;
}

interface WeatherData {
    current: Current;
    hourly: Hourly;
}

function Weather() {
    const url = "https://api.open-meteo.com/v1/forecast";
    const location = GetLocation();
    const [content, setContent] = useState<JSX.Element>(<></>);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (location.latitude === 0 && location.longitude === 0) return; // Skip fetch if location is not set

        const params = {
            latitude: location.latitude,
            longitude: location.longitude,
            current: [
                "temperature_2m",
                "relative_humidity_2m",
                "precipitation",
                "surface_pressure",
            ],
            hourly: [
                "temperature_2m",
                "relative_humidity_2m",
                "precipitation_probability",
                "surface_pressure",
                "uv_index",
            ],
            timezone: "Europe/Berlin",
            forecast_days: 1,
            models: "meteofrance_arome_france",
        };

        const fetchData = async () => {
            try {
                const response = await fetchWeatherApi(url, params, 3);
                console.log(response);
                const weatherData = processWeatherResponse(response[0]); // Assuming this is part of the module
                setContent(
                    <div className="Weather-box">
                        <h3>
                            Place: Paris | Current Time: {weatherData.current.time.getHours()}
                        </h3>
                        <ul>
                            <li>
                                Temperature: {weatherData.current.temperature2m.toPrecision(3)}{" "}
                                °C
                            </li>
                            <li>
                                Humidity:{" "}
                                {weatherData.current.relativeHumidity2m.toPrecision(3)} %
                            </li>
                            <li>
                                Pressure: {weatherData.current.surfacePressure.toPrecision(3)}{" "}
                                hPa
                            </li>
                        </ul>
                    </div>
                );
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [url, location]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>{content}</>;
}

// Assuming processWeatherResponse is a helper function that processes the response from the weather API
function processWeatherResponse(response: WeatherApiResponse): WeatherData {
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    const hourly = response.hourly()!;

    const weatherData: WeatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0)!.value(),
            relativeHumidity2m: current.variables(1)!.value(),
            precipitation: current.variables(2)!.value(),
            surfacePressure: current.variables(3)!.value(),
        },
        hourly: {
            time: range(
                Number(hourly.time()),
                Number(hourly.timeEnd()),
                hourly.interval()
            ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
            temperature2m: hourly.variables(0)!.valuesArray()!,
            relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
            precipitationProbability: hourly.variables(2)!.valuesArray()!,
            surfacePressure: hourly.variables(3)!.valuesArray()!,
            uvIndex: hourly.variables(4)!.valuesArray()!,
        },
    };

    return weatherData;
}

export default Weather;
