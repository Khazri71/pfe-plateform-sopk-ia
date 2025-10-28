import React from 'react'

export const ImageBackground = ({imageUrl}) => {

  return (
    <>

      <div className="col-lg-5 z-index-2 mb-5"><img className="w-100" src={imageUrl} alt="..." /></div>
    </>
  )
}
