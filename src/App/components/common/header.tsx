import { Link } from "react-router-dom"
import "../../../assets/css/header.css"
import ThemeChoice from "../../utils/theme"

function Header() {
    return (
        <header>
            <div className="title"><Link to={"/Astroid"}>Astroid</Link></div>
            <button className="button" onClick={panel_click}><p>Click me</p></button>
            <nav className="navbar"><Link to={"play"}>Play</Link><Link to={"credit"}>Credit</Link><ThemeChoice /></nav>
        </header>
    )
}

function panel_click() {
    const button = document.getElementById("left-tab");
    const content = document.getElementById("content");

    if ((button != null) && (content != null)) {
        if (button.style.display == "none") {
            button.style.display = "flex";
            content.style.display = "flex";
            content.style.paddingRight = content?.style.paddingTop
        }
        else {
            button.style.display = "none";
            content.style.display = "block";
            content.style.paddingRight = "0";
        }
    }


}

export default Header