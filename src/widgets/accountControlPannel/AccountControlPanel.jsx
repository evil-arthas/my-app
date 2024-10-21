import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import './accountControlPannel.scss'
import { useEffect, useState } from "react"
import { logOut } from "../../store/isUserAuthSlice"
import Loader from "../../shared/loader/Loader"

function AccountControlePannel({ className, userAccountData, setIsheaderMenuOpen }) {

  const isAuth = useAppSelector((state) => state.isUserAuthSlice.isUserAuth)
  const logOutHandler = useAppDispatch()

  if (isAuth) {
    return (
      <div className={`account-control-pannel_authorized header__account-control-pannel ${className}`}>
        <span className="account-controle-pannel__username">
          {userAccountData.name}
        </span>
        <div className="account-control-pannel__avatar">
          <img src={userAccountData.img} alt="your avatar" />
        </div>
        <button
          className="account-control-pannel__log-out-btn"
          onClick={() => { logOutHandler(logOut()) }}
        >Выйти
        </button>

      </div>

    )
  } else {
    return (
      <div className={`account-control-pannel header__account-control-pannel ${className}`}>
        <Link className="account-control-pannel__create-account-link">Зарегистрироваться</Link>
        <span className="account-control-pannel__line"></span>
        <Link onClick={()=>{setIsheaderMenuOpen(false)}} to={"/authorization"}className="account-control-pannel__sign-in-link">Войти</Link>
      </div>
    )
  }
}

export default AccountControlePannel