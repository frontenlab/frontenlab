import React from 'react'
import './HIW.css'
import HiwBox from '../HiwBox/HiwBox'
import HiwContent from '../../../Helpers/HiwContent'

const HIW = () => {
  return (
    <div className="HIW">
      <h1 className="title">How It Works ?</h1>

      <div className="HIW-content">
        {HiwContent.map((value, index)=> {
          return <HiwBox key={value.id} img={value.img} no={value.no} description={value.description} />
        })}
      </div>

      <hr />

    </div>
  )
}

export default HIW