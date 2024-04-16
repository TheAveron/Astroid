import { fetchWeatherApi } from 'openmeteo';
import { useEffect, useState } from "react";
import GetLocation from '../common/location';

interface Current {
	time: Date,
	temperature2m: number,
	relativeHumidity2m: number,
	precipitation: number,
	surfacePressure: number,
}

interface Hourly {
	time: Date[],
	temperature2m: Float32Array,
	relativeHumidity2m: Float32Array,
	precipitationProbability: Float32Array,
	surfacePressure: Float32Array,
	uvIndex: Float32Array,
}

interface WeatherData {
	current: Current
	hourly: Hourly
}


function Weather() {
	const location = GetLocation()

	const [content, setContent] = useState(<></>);
	useEffect(() => {
		const params = {
			"latitude": location.latitude,
			"longitude":location.longitude,
			"current": ["temperature_2m", "relative_humidity_2m", "precipitation", "surface_pressure"],
			"hourly": ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "surface_pressure", "uv_index"],
			"timezone": "Europe/Berlin",
			"forecast_days": 1,
			"models": "meteofrance_arome_france"
		};
		const url = "https://api.open-meteo.com/v1/forecast";
        fetchWeatherApi(url, params)
            .then((value) => {
				// Helper function to form time ranges
				const range = (start: number, stop: number, step: number) =>
					Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
				
				// Process first location. Add a for-loop for multiple locations or weather models
				const response = value[0];
				
				// Attributes for timezone and location
				const utcOffsetSeconds = response.utcOffsetSeconds();
				const timezone = response.timezone();
				const timezoneAbbreviation = response.timezoneAbbreviation();
				const latitude = response.latitude();
				const longitude = response.longitude();
				
				const current = response.current()!;
				const hourly = response.hourly()!;
				
				// Note: The order of weather variables in the URL query and the indices below need to match!
				const weatherData: WeatherData = {
					current: {
						time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
						temperature2m: current.variables(0)!.value(),
						relativeHumidity2m: current.variables(1)!.value(),
						precipitation: current.variables(2)!.value(),
						surfacePressure: current.variables(3)!.value(),
					},
					hourly: {
						time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
							(t) => new Date((t + utcOffsetSeconds) * 1000)
						),
						temperature2m: hourly.variables(0)!.valuesArray()!,
						relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
						precipitationProbability: hourly.variables(2)!.valuesArray()!,
						surfacePressure: hourly.variables(3)!.valuesArray()!,
						uvIndex: hourly.variables(4)!.valuesArray()!,
					},
				
				};			
				setContent(
					<div className='Weather-box'>
						<h3>Place: Paris | Curent Time: {weatherData.current.time.getHours()}</h3>
						<ul>
							<li>Temperature: {weatherData.current.temperature2m.toPrecision(3)} °C</li>
							<li>Humidity: {weatherData.current.relativeHumidity2m.toPrecision(3)} %</li>
							<li>Pression: {weatherData.current.surfacePressure.toPrecision(3)} hPa</li>
						</ul>
					</div>)
			})
			.catch(error => console.log(error))
	})
	return <>{content}</>
	
}
export default Weather