import React from 'react';
import './Flat.scss'

const Flat = ({id, price, name, imageUrl, onSelect, selected}) => {
  const classNames = selected ? 'flat selected' : 'flat'
  return (
    <div className={classNames} onClick={() => onSelect(id)}>
      <img src={imageUrl} className="flat-picture" alt="flatimage"/>
      <div className="flat-title">
        €<strong>{price}</strong> - {name}
      </div>
    </div>
  )
}

export default Flat;