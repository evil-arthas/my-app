import { useEffect, useState } from "react"
import "./header.scss"
import headerLogo from "./icon-header-logo.png"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../store/hooks"
import AccountContolePannel from "../../widgets/accountControlPannel/AccountControlPanel"
import LimitInformationPannel from "../../widgets/limitInformationPannel/LimitInformationPannel"
import headerLogoUnffiled from "./icon-header-logo-unfilled.png"
import {checkAccessToken} from "../../someAPIs"
import imageLyoxaA from './image-Lexa_A.png'


export default function () {
  const [userAccountData, setUserAccountData] = useState({img:"",name:""})
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false)

  const isUserAuth = useAppSelector(state => state.isUserAuthSlice.isUserAuth)
  const accessToken = useAppSelector(state => state.accessToken.value)
  const accessTokenExpire = useAppSelector(state => state.accessTokenExpire.value)

  useEffect(()=>{
    if(isUserAuth){
      //думал будет запрос на сервер
      const response = {
        img: imageLyoxaA,
        name: "Алексей А."
      }
      setUserAccountData(response)
    }
  },[isUserAuth])

  async function authUser() {
    try {
      let response = await fetch(`https://gateway.scan-interfax.ru/api/v1/account/info`, {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(
          {accessToken}
        )
      })
      if (response.ok) {

      }
      if (response.status === 401) {

      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container header-container">
      <header className="header">
        <div className="header__logo">
          <img src={headerLogo} alt="logo" className={`logo__image_filled ${!isHeaderMenuOpen ? "logo__image_active" : "logo__image_inactive"}`} />
          <img src={headerLogoUnffiled} alt="logo" className={`logo__image_unfilled ${isHeaderMenuOpen ? "logo__image_active" : "logo__image_inactive"}`} />
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
            setIsheaderMenuOpen={setIsHeaderMenuOpen}
          />

        </div>

        <div className={`header__mobile-menu ${isHeaderMenuOpen ? "header__mobile-menu__active" : ""}`}>
          <nav className="mobile-menu__nav">
            <ul className={`nav__list`}>
              <li><Link to={"/authorization"} onClick={()=>setIsHeaderMenuOpen(false)}>Главная</Link></li>
              <li><Link to={"/search"} onClick={()=>setIsHeaderMenuOpen(false)}>Тарифы</Link></li>
              <li><Link to={"/searchResults"}onClick={()=>setIsHeaderMenuOpen(false)}>FAQ</Link></li>
            </ul>
          </nav>
          < AccountContolePannel
            className="mobile-menu__account-controle-panel"
            userAccountData={userAccountData}
            setIsheaderMenuOpen={setIsHeaderMenuOpen}
          />
        </div>



      </header>
    </div >
  )
}