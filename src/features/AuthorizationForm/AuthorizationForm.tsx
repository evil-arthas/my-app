import './AuthorizationForm.scss'
import BlueButton from '../../shared/BlueButton/BlueButton'
import { MouseEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import iconFacebook from './icon-facebook.png';
import iconGoogle from './icon-google.png'
import iconYandex from './icon-yandex.png'
import { useAppDispatch } from '../../store/hooks';
import { accessToken } from './accessTokenSlice';
import { logIn } from '../../store/isUserAuthSlice';
import { useNavigate } from 'react-router-dom';
import { accessTokenExpire } from './accessTokenExpireSlice';
import iconLock from './icon-lock.svg'

function formatPhoneNumber(value: string) {
  if (value.length === 1 && (value[0] === "7" || value[0] === "8")) {
    return "+7"
  }
  if (value.length < 3) {
    return value
  }
  if (value[0] === "+") {
    const phoneNumber = value.replace(/[^\d]/g, '').replace(/^[7]/g, "")
    console.log(`in func ${phoneNumber}`)
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 3) return "+7" + " " + phoneNumber;
    if (phoneNumberLength < 4) return `+7 ${phoneNumber}`;
    if (phoneNumberLength < 7) {
      return `+7 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
    }
    
    return `+7 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 10)}`;
  }
}


function AuthorizationForm() {
  const [selectedButton, toggleSelectedButton] = useState(false)
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState<string | undefined>("")
  const [isAuthUnsuccess, setIsAuthUnsuccess] = useState(false)
  const [isLoginCorrect, setIsLoginCorrect] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // unused
  // const minLoginLength = 6
  // const minPasswordLength = 6

  let isBlueButtonDisabled = !(!!login && !!password)




  async function authUser(login: string | undefined, password: string) {
    try {
      let response = await fetch(`https://gateway.scan-interfax.ru/api/v1/account/login`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(
          {
            login: login,
            password: password
          }
        )
      })
      if (response.ok) {
        const data = await response.json()
        const accessTokenValue = data.accessToken
        const accessTokenExpireValue = data.expire
        dispatch(accessToken(accessTokenValue))
        dispatch(accessTokenExpire(accessTokenExpireValue))
        dispatch(logIn())
        setIsAuthUnsuccess(false)
        navigate('/', { replace: true })
        localStorage.setItem(
          "access-token",
          JSON.stringify(data)
        )
      }
      if (response.status === 401) {
        setIsAuthUnsuccess(true)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="authorization-form authorization__authorization-form">
      <div className='authorization-form__lock-icon'>
        <img src={iconLock} alt="zamochek" />
      </div>
      <div className='authorization-form__navigition-button-wrapper'>
        <button
          className={`${!selectedButton ? "button-active" : ""}`}
          onClick={(event) => {
            event.preventDefault()
            toggleSelectedButton(false)
          }}>
          Войти
        </button>
        <button
          className={`${selectedButton ? "button-active" : ""}`}
          onClick={(event) => {
            event.preventDefault()
            toggleSelectedButton(true)
          }}>
          Зарегистрироваться
        </button>
      </div>

      <label
        className='authorization-form__input-label'>
        Логин или номер телефона:
        <input
          className={isLoginCorrect ? "authorization-form__input_red" : ""}
          value={login}
          onChange={(event) => {
            const login = event.target.value
            if (login[0] === "7" || login[0] === "8" || login[0] === "+") {
              if (login.match(/[a-z]/i)) {
                setIsLoginCorrect(true)
              } else setIsLoginCorrect(false)
              const formatedPhoneNumber = formatPhoneNumber(event.target.value)
              console.log(`formated ${formatedPhoneNumber}`)
              setLogin(formatedPhoneNumber)
            }
            else {
              setLogin(login)
            }
          }}
        />
        {isLoginCorrect &&
          <span className='authorization-form-input__error-label'>
            Введите корректные данные
            {/* (использование буквенных значений при вводе номера телефона запрещено) */}
          </span>
        }
      </label>

      <label className='authorization-form__input-label'>
        Пароль:
        <input
          className={isAuthUnsuccess ? "authorization-form__input_red" : ""}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
          type='password' />
        {isAuthUnsuccess &&
          <span className='authorization-form-input__error-label'>
            Неправильный пароль
          </span>
        }
      </label>

      <BlueButton
        disabled={isBlueButtonDisabled}
        className={isBlueButtonDisabled ? "blue-button authorization-form__blue-button_disabled" : "blue-button"}
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          console.log(isBlueButtonDisabled)
          event.preventDefault()
          console.log(`login ${!!login}`)
          console.log(`password ${!!password}`)
          authUser(login, password)
        }}
      >Войти
      </BlueButton>

      <Link to={"/"}>
        Восстановить пароль
      </Link>

      <label className='authorization-form__links-label'>
        <span>Войти через:</span>
        <Link to={"/"}>
          <img src={iconYandex} alt="yandex" />

        </Link>
        <Link to={"/"}>
          <img src={iconFacebook} alt="facebook" />
        </Link>
        <Link to={"/"}>
          <img src={iconGoogle} alt="google" />
        </Link>
      </label>


    </form>
  )
}


export default AuthorizationForm