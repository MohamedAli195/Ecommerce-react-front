import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
interface IProps {
    isAllowd :boolean,
    redierct:string,
    children:ReactNode
}
function ProtectedRoute({isAllowd,redierct,children}:IProps) {
  if(!isAllowd) return <Navigate to={redierct} />
    return (
        <>
        {children}
        </>
    
  )
}

export default ProtectedRoute