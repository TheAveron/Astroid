import "../../assets/css/App.css"
import Hero from "../components/home/hero"
import Left_bar from "../components/common/left_bar"

function Home() {
    return (
        <div id="content">
            <Left_bar />
            <main>
                <Hero />
            </main>
        </div>
    )
}

export default Home