import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div>{"Page not found :( - "} <Link to={"/react-vitalfresh/"}>Return home?</Link></div>
      </div>
  )
}
