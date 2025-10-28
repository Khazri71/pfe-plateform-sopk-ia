import React , { useState }from 'react'
import { BarreNavigation } from '../../layouts/BarreNavigation'
import { PiedPage } from '../../layouts/PiedPage'
import axios from 'axios'
import { useNavigate , NavLink } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ImageBackground } from '../../layouts/ImageBackground';





export const Inscription = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('');


   const [age, setAge] = useState('');
   const [height, setHeight] = useState('');
   const [weight, setWeight] = useState('');
   


  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setMessage('');

    
    // Vérification des champs vides (côté frontend)
    if (!username.trim() || !email.trim() || !password.trim() || !age|| !height || !weight) {
      setError("Nom d'utilisateur, Email, Mot de passe, Age, Taille et Poids sont requis");
      return;
    }

    // Validations
    const usernameRegex = /^[A-Z][a-zA-Z0-9_]*$/;
    if (!usernameRegex.test(username)) {
      setError("Le Nom d'utilisateur doit commencer par une majuscule");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer un email valide");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Le Mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email,
        password
      });

      // Si succès
      setSuccess(true);
      setMessage(response.data.message); 
      // setCurrentUserId(response.data.user_id)
       // Sauvegarde persistante dans localStorage
    // Sauvegarder les infos dans le localStorage sous la clé liée au userId
     localStorage.setItem(`userInfo_${response.data.user_id}`, JSON.stringify({
        age,
        height,
        weight
        }));

      navigate('/login')
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); // Affiche "Email existe déjà" par exemple
      } else {
        setError("Une erreur s'est produite");
      }
    }
  };




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
          <h1 className="text-center">S'inscrire</h1>
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
          <img className="d-block mx-auto" src="assets/img/gallery/register1.png" style={{ width: '80%' }}  alt="..." />
          </div> 
          
        <div className="col-lg-6 z-index-2">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="visually-hidden" htmlFor="inputName">Nom utilisateur</label>
              <input
                    className="form-control form-livedoc-control"
                    id="inputName"
                    type="text"
                    placeholder="Nom utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />            </div>
                <div className="col-md-6">
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




            <div className="col-md-12 position-relative">
              <label className="visually-hidden" htmlFor="inputPhone">Mot de passe</label>
              <input
                    className="form-control form-livedoc-control  pe-5 rounded-4"
                    id="inputPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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



 {/* ========= age - height - weight */}
                 <p className='mb-0 ms-2'> Informations supplémentaires obligatoires à renseigner *</p>
                 <div className="col-md-4">
                 <label className="form-label visually-hidden" htmlFor="inputEmail">Age</label>
                 <input
                    className="form-control form-livedoc-control"
                    id="inputAge"
                    type="number"
                    min={0}
                    placeholder="Age (années)"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />     
                </div>


                <div className="col-md-4">
                 <label className="form-label visually-hidden" htmlFor="inputEmail">Taile</label>
                 <input
                    className="form-control form-livedoc-control"
                    id="inputTaille"
                    type="number"
                    min={0}
                    step="any"
                    placeholder="Taille (m)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />     
                </div>


                <div className="col-md-4">
                 <label className="form-label visually-hidden" htmlFor="inputEmail">Poids</label>
                 <input
                    className="form-control form-livedoc-control"
                    id="inputPoids"
                    type="number"
                    min={0}
                    step="any"
                    placeholder="Poids (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />     
                </div>
                {/* ========= age - height - weight */}








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
                <button className="btn btn-primary rounded-pill" type="submit">S'inscrire</button>
              </div>
            </div>
          </form>
          <div className="mt-3 text-center">
             <p className=" mx-auto">Vous avez déjà un compte ? <NavLink to="/login" className="text-blue-500 hover:underline">
      Se connecter
    </NavLink></p>
         </div>
        </div>
      </div>
    </div>
  </section>
    {/* <PiedPage/> */}
    </>
  )
}






