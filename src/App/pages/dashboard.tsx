import Apod from "../components/dashboard/apod"
import Weather from "../components/dashboard/weather"

function Dashboard() {
    return (
        <section className="dashboard">
            <Weather />
            <Apod />
        </section>
    )
}

export default Dashboard