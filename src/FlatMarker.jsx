import React from 'react';
import './FlatMarker.scss';

const FlatMarker =({ selected, price}) => {
  const classNames = selected ? 'marker selected' : 'marker'

  return(
    <div className={classNames}>{price}</div>
  )
}

export default FlatMarker;