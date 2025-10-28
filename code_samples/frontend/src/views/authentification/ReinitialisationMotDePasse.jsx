import React , {useState} from 'react'
import { BarreNavigation } from '../../layouts/BarreNavigation'
import { ImageBackground } from '../../layouts/ImageBackground'
import { PiedPage } from '../../layouts/PiedPage'
import axios from 'axios'
import { useNavigate , NavLink } from 'react-router-dom';
// import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import { FaEye, FaEyeSlash } from 'react-icons/fa';


export const ReinitialisationMotDePasse = () => {


   const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [new_password , setNew_password ] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('');
      const [showPassword, setShowPassword] = useState(false);
      const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
      
    // const { token } = useParams()
    // console.log(token)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');  // récupérer le token de la query
    
   const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setMessage('');

    // Vérification des champs vides (côté frontend)
    if (!new_password .trim() || !passwordConfirmation.trim()) {
      setError("Mot de passe et sa confirmation sont requis")
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    if (!passwordRegex.test(new_password)) {
      setError("Le Mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial")
      return
    }
    if (new_password  !== passwordConfirmation) {
      setError("Mot de passe non identique ")
      return
    }
  
    try {
      const response = await axios.post('http://localhost:5000/reset-password', {
        token,
        new_password 
      })
      setSuccess(true)
      console.log(response.data)
      setMessage(response.data.message) 

       // Attendre 3 secondes avant la redirection
  setTimeout(() => {
    navigate('/login');
  }, 2000);


     
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
                  <h1 className="text-center">Réinitialisation du mot de passe</h1>
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
          <img className="d-block mx-auto" src="assets/img/gallery/reset.png" style={{ width: '70%' }}  alt="..." />
          </div> 
                <div className="col-lg-6 z-index-2">
                  <form className="row g-3" onSubmit={handleSubmit}>
               
                  <div className="col-md-12 position-relative">
              <label className="visually-hidden" htmlFor="inputPhone">Nouveau mot de passe</label>
             <input
                  className="form-control form-livedoc-control  pe-5 rounded-4"
                  id="inputPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={new_password }
                  onChange={(e) => setNew_password(e.target.value)}
                />
               {/* Icône cliquable */}
               <span
                 onClick={() => setShowPassword(!showPassword)}
                 className="position-absolute top-50 translate-middle-y"
                 style={{ right: "30px", cursor: "pointer", color: "#0d6efd" }}
               >
                 {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
               </span> 
               
            </div>
            <div className="col-md-12 position-relative">
              <label className="visually-hidden" htmlFor="inputPhone">Confirmer le nouveau mot de passe</label>
              <input
                  className="form-control form-livedoc-control  pe-5 rounded-4"
                  id="inputPassword"
                  type={showPasswordConfirmation ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
               {/* Icône cliquable */}
               <span
                 onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                 className="position-absolute top-50 translate-middle-y"
                 style={{ right: "30px", cursor: "pointer", color: "#0d6efd" }}
               >
                 {showPasswordConfirmation ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
               </span> 
            </div>
                   
                   
            {error && (
                  <div className="col-12">
                    <div className="alert alert-danger text-center">{error}</div>
                  </div>
                )}
                {message && (
                  <div className="col-12">
                    <div className="alert alert-success text-center">{message}</div>
                  </div>
                )}
                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn btn-primary rounded-pill" type="submit">Réinitialiser le mot de passe</button>
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
