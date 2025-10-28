import React  , {useState} from 'react'
import { BarreNavigation } from '../../layouts/BarreNavigation'
import { PiedPage } from '../../layouts/PiedPage'
import { ImageBackground } from '../../layouts/ImageBackground'
import axios from 'axios'
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom'

export const ReinitialisationLien = () => {

   const [email, setEmail] = useState('')
   const [error, setError] = useState(null)
   const [success, setSuccess] = useState(false)

   const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer un email valide.")
      return
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/reset-link', {
        email,
      })
      setSuccess(true)
      console.log(response.data)
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error)
      } else {
        setError("Une erreur est survenue.")
      }
    }
  }

  return (
    <>
    {/* <BarreNavigation/> */}
        <section className="py-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-12 py-3">
              <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/people.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
              </div>
              {/*/.bg-holder*/}
              <h1 className="text-center">Mot de passe oublié ?</h1>
            </div>
          </div>
        </div>
        {/* end of .container*/}
      </section>
      {/* <section> close ============================*/}
      {/* ============================================*/}
      <section className="py-3">
        <div className="container">
          <div className="row">
            <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/dot-bg.png)', backgroundPosition: 'bottom right', backgroundSize: 'auto'}}>
            </div>
            {/*/.bg-holder*/}
            <div className="col-lg-6 z-index-2 mb-5" style={{ marginTop: '-100px' }}>
          <img className="d-block mx-auto" src="assets/img/gallery/forgot.png" style={{ width: '80%' }}  alt="..." />
          </div> 
            <div className="col-lg-6 z-index-2">
              <form className="row g-3" onSubmit={handleSubmit}>
           
                <div className="col-md-12">

                    <p>Saisissez l'adresse e-mail associée à votre compte pour récupérer votre mot de passe.</p>
                  <label className="form-label visually-hidden" htmlFor="inputEmail">Email</label>
                  <input
                    className="form-control form-livedoc-control"
                    id="inputEmail"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />    
                </div>
                

                <span className='ms-3'  
               
               >
                <NavLink to="/login">
                <IoChevronBackCircleOutline size={25} />
                </NavLink>
              
               </span>
               
               
                {error && (
                  <div className="col-12">
                    <div className="alert alert-danger text-center">{error}</div>
                  </div>
                )}
                {success && (
                  <div className="col-12">
                    <div className="alert alert-success text-center"> Consulter votre boite email</div>
                  </div>
                )}
              
             
             
             
                <div className="col-12">
                  <div className="d-grid">
                    <button className="btn btn-primary rounded-pill" type="submit">Envoyer</button>
                  </div>
                </div>
              </form>
            
            </div>
          </div>
        </div>
      </section>
        
        
        
        {/* <PiedPage/> */}
        
        
        
    </>
  )
}
