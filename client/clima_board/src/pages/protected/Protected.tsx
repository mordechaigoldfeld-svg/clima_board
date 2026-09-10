import { Navigate, Outlet, replace, useNavigate } from "react-router"


export default function Protected() {

    const explorer_name = localStorage.getItem('explorer_name')

    if(!explorer_name || explorer_name.trim()===""){

        return <Navigate to ='/' replace />
    }


  return (

        <Outlet/>
  )
}
