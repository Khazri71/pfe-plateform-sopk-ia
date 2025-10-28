import React , {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { BarreNavigation } from './BarreNavigation'
import { PiedPage } from './PiedPage'
import { IoChevronBack } from "react-icons/io5";

export const InfosPage = ({title , subtitleone  , subtitletwo , paragraphone , paragraphtwo , btnText , btnLink , backLink , srcImg}) => {


  return (
    <>
    
         
  {/* <BarreNavigation/> */}
  {/* <section> begin ============================*/}
  <section className="pb-0" id="about">
    <div className="container">
      <div className="row">
        <div className="col-12 py-1">
          <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/about-us.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
          </div>
          {/*/.bg-holder*/}
          <h1 className="text-center">{title}</h1>
        </div>
      </div>
    </div>
    {/* end of .container*/}
  </section>
  {/* <section> close ============================*/}
  {/* ============================================*/}
  <section className="py-5">
    <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/about-bg.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
    </div>
    {/*/.bg-holder*/}
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-5 order-lg-1 mb-5 mb-lg-0"><img className="fit-cover  w-100" src={srcImg} alt="..." /></div>
        {/* <div className="col-lg-6 z-index-2 mb-5" style={{ marginTop: '-50px' }}><img style={{ width: '95%' }}  src="assets/img/gallery/sopk1.png" alt="..." /></div> */}
       
  
      <div className="col-md-7  text-md-start">  {/*  text-center */}
          {/* <h2 className="fw-bold mb-4">Comprendre le SOPK <br className="d-none d-sm-block" />system around you</h2> */}
          <h4 className="fw-bold mb-2"> {subtitleone} </h4>
          {/* <p>We think that everyone should have easy access to excellent <br className="d-none d-sm-block" />healthcare. Our aim is to make the procedure as simple as <br className="d-none d-sm-block" />possible for our patients and to offer treatment no matter<br className="d-none d-sm-block" />where they person or at their convenience. </p> */}
          <p>{paragraphone}</p>
          
          <h4 className="fw-bold mb-2"> {subtitletwo} </h4>
          <p>{paragraphtwo}</p>
         
          <div className="my-4">
            {/* <NavLink to={btnLink} >  <IoChevronBackCircleOutline size={50} /></NavLink> */}
            <NavLink to="/" className="navlink-hover-white"> <button className="btn btn-lg btn-outline-primary rounded-pill me-2 mb-2 bt-white " type="submit" > <IoChevronBack size={20} /> </button></NavLink>
            <NavLink to={btnLink} className="navlink-hover-white"> <button className="btn btn-lg btn-outline-primary rounded-pill me-2 mb-2 bt-white " type="submit" > {btnText}  </button></NavLink>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* <PiedPage/> */}
    
    
    </>
  )
}
