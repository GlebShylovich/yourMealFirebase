import React from 'react'
import './popup.scss'

export default function popup({closeModal}) {
  return (
    <div className='popup'>
      <div className="popup-content">
        Basket is empty!
      </div>
    </div>
  )
}
