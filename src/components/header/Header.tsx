import { useState } from "react"
import "./header.scss"
import headerLogo from "./icon-header-logo.png"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../store/hooks"
import AccountContolePannel from "../../widgets/accountControlPannel/AccountControlPanel"
import LimitInformationPannel from "../../widgets/limitInformationPannel/LimitInformationPannel"


export default function () {
  console.log("Header rendered")

  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false)

  // const isUserAuth = useAppSelector(state => state.isUserAuthSlice.isUserAuth)
  const isUserAuth = true
  return (
    <div className="container header-container">
      <header className="header">
        <div className="header__logo">
          <img src={headerLogo} alt="logo" />
        </div>
        <div className="header__row">

          <nav className="header__nav">
            <ul className={`nav__list ${isHeaderMenuOpen ? "header__nav_active" : ""}`}>
              <li><Link to={"/authorization"}>Главная</Link></li>
              <li><Link to={"/search"}>Тарифы</Link></li>
              <li><Link to={"/searchResults"}>FAQ</Link></li>
            </ul>
          </nav>

          <button
            className={`header__burger-btn ${isHeaderMenuOpen?"":"header__burger-btn_active"}`}
            onClick={() => {
              setIsHeaderMenuOpen(!isHeaderMenuOpen)
            }}>
            <span></span><span></span><span></span>
          </button>

          {isUserAuth && <LimitInformationPannel isHeaderMenuOpen={isHeaderMenuOpen} />}
          < AccountContolePannel />

        </div>
      </header>
    </div >
  )
}