import { Link } from "react-router-dom"
import "../../../assets/css/header.css"
import ThemeChoice from "../../utils/theme"

function Header() {
    return (
        <header>
            <div className="title"><Link to={"/"}>Astroid</Link></div>
            <nav className="navbar"><Link to={"/play"}>Play</Link><ThemeChoice /></nav>
        </header>
    )
}

export default Header