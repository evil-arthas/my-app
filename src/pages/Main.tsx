import { useState } from "react"
import { useAppDispatch } from "../store/hooks"
import { useAppSelector } from "../store/hooks"
import { logIn, logOut } from "../store/isUserAuthSlice"
import { baseURL } from "../URLS"
import { accessToken } from "../features/AuthorizationForm/accessTokenSlice"
import Loader from "../shared/loader/Loader"

export default function Main() {
  const [data, setData] = useState()
  const dispatch = useAppDispatch()



  return (


    <main style={{ height: "500px", width: "100%", backgroundColor: "" }}>
      <button onClick={
        () => { dispatch(logIn()) }
      }
      >TOGGLE</button>
      <button onClick={
        () => { dispatch(logOut()) }
      }
      >TOGGLE</button>


      <button
        onClick={() => { dispatch(accessToken("string228")) }}
      >
        slcak
      </button>
      <div>
        sf_student1	4i2385j
      </div>
    </main>
  )
}