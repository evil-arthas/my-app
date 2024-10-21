import { useAppSelector } from "../store/hooks"
import { useLocation, Navigate } from "react-router-dom"


const RequireAuth = ({children}:any) => {
  const isAuth = useAppSelector((state)=>state.isUserAuthSlice.isUserAuth)
  if(true){
    return (children)
  }

  else {
    return <Navigate to="/authorization" />
  }

}

export default RequireAuth