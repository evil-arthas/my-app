import { useState } from "react"
import "./header.scss"
import headerLogo from "./icon-header-logo.png"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../store/hooks"
import AccountContolePannel from "../../widgets/accountControlPannel/AccountControlPanel"
import LimitInformationPannel from "../../widgets/limitInformationPannel/LimitInformationPannel"
import headerLogoUnffiled from "./icon-header-logo-unfilled.png"


export default function () {
  console.log("Header rendered")
  const [userAccountData, setUserAccountData] = useState("")
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false)

  const isUserAuth = useAppSelector(state => state.isUserAuthSlice.isUserAuth)

  async function fetchUserData(params:any) {
    
  }

  return (
    <div className="container header-container">
      <header className="header">
        <div className="header__logo">
          <img src={headerLogo} alt="logo" className={`logo__image_filled ${!isHeaderMenuOpen?"logo__image_active":"logo__image_inactive"}`}/>
          <img src={headerLogoUnffiled} alt="logo" className={`logo__image_unfilled ${isHeaderMenuOpen?"logo__image_active":"logo__image_inactive"}`}/>
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
            className={`header__burger-btn ${isHeaderMenuOpen ? "header__burger-btn_active" : ""}`}
            onClick={() => {
              setIsHeaderMenuOpen(!isHeaderMenuOpen)
            }}>
            <span></span><span></span><span></span>
          </button>

          {isUserAuth && <LimitInformationPannel isHeaderMenuOpen={isHeaderMenuOpen} />}

          < AccountContolePannel
            className="header__acount-controle-panel"
            userAccountData={userAccountData}
          />

        </div>

        <div className={`header__mobile-menu ${isHeaderMenuOpen ? "header__mobile-menu__active" : ""}`}>
          <nav className="mobile-menu__nav">
            <ul className={`nav__list`}>
              <li><Link to={"/authorization"}>Главная</Link></li>
              <li><Link to={"/search"}>Тарифы</Link></li>
              <li><Link to={"/searchResults"}>FAQ</Link></li>
            </ul>
          </nav>
          < AccountContolePannel
            className="mobile-menu__account-controle-panel"
            userAccountData={userAccountData}
          />
        </div>



      </header>
    </div >
  )
}