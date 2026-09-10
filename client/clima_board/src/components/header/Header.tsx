import React from 'react'
import { Link, useNavigate } from 'react-router'
import "./Header.css"
export default function Header() {

  const explorer_name = localStorage.getItem('explorer_name')
  const navigate = useNavigate()
  const handleClick = ()=>{

    localStorage.setItem("explorer_name","")
    navigate('/',{replace:false})

  }

  return (
    <div className='headerClass'>
      <div className='leftNav'>
        <h3 className='name'>It's great to have you with us {explorer_name}</h3>
        <button className='exit' onClick={handleClick}>to exit→</button>
        </div>
      <div className='rigthNav'>
        <Link className='link' to={'/favorites'}>favorites</Link>
        <Link className='link' to={'/dashboard'}>home</Link>
        <Link className='link' to={'/compare'}>compare</Link>
        <Link className='link' to={'/search'}>search</Link>
        <Link className='link' to={'/'}></Link>
      </div>
    </div>
  )
}
