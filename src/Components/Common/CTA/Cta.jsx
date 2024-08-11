import React from 'react'
import './Cta.css'
import { IoBulbOutline } from "react-icons/io5";
import { AiOutlineCode } from "react-icons/ai";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { BsStars } from "react-icons/bs";

const Cta = () => {
  return (
    <div className='Cta'>
        <IoBulbOutline className="bulb" />
        <AiOutlineCode className='code' />
        <HiOutlineComputerDesktop className='computer' />
        <BsStars className='star'/>
        <h1>Get Started with Challenges</h1>
        <button className='cta-button'>Get Started</button>

    </div>
  )
}


export default Cta