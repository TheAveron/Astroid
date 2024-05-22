import { useState, useEffect } from "react";

function Apod() {
    const url = "https://api.nasa.gov/planetary/apod?api_key=SZ6fEwEbO8g3ScsNZAjVFM1djCQuVUSKelULdfAv"
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                (await fetch(url)).json().then((response => setContent(response["url"])));
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
    fetchData()
    }, [url])
    if (loading) {
        return <div className="weather-box">Loading...</div>;
    }

    console.log(content)

    return <div className="apod-box" style={{backgroundImage: `url(${content})`}}>
    </div>
}

export default Apod