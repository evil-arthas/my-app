import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import './accountControlPannel.scss'
import { useEffect, useState } from "react"
import { logOut } from "../../store/isUserAuthSlice"

function AccountControlePannel({ className, userAccountData }) {

  const isAuth = useAppSelector((state) => state.isUserAuthSlice.isUserAuth)
  const logOutHandler = useAppDispatch()

  if (isAuth) {
    return (
      <div className="account-control-pannel header__account-control-pannel">

        <button
          className="account-control-pannel__log-out-btn"
          onClick={() => { logOutHandler(logOut()) }}
        >Выйти
        </button>


      </div>

    )
  } else {
    return (
      <div className="account-control-pannel header__account-control-pannel">
        <Link className="account-control-pannel__create-account-link">Зарегистрироваться</Link>
        <span className="account-control-pannel__line"></span>
        <Link className="account-control-pannel__sign-in-link">Войти</Link>
      </div>
    )
  }
}

export default AccountControlePannel