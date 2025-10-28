import React , { useState }from 'react'
import { BarreNavigation } from '../../layouts/BarreNavigation'
import { PiedPage } from '../../layouts/PiedPage'
import { ImageBackground } from '../../layouts/ImageBackground'
import axios from 'axios'
import { useNavigate , NavLink } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export const Connexion = () => {

  const navigate = useNavigate();

  // const [currentUser, setCurrentUser] = useState(null);

// const [age, setAge] = useState('')
// const [height, setHeight] = useState('')
// const [weight, setWeight] = useState('')
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
   const [error, setError] = useState(null)
   const [success, setSuccess] = useState(false)
   const [message, setMessage] = useState('');
   const [showPassword, setShowPassword] = useState(false);

    // const [age, setAge] = useState('');
    // const [height, setHeight] = useState('');
    // const [weight, setWeight] = useState('');

   const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

     // Vérification des champs vides (côté frontend)
     if (!email.trim() || !password.trim()) {
      setError("Email et Mot de passe sont requis");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer un email valide.")
      return
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    if (!passwordRegex.test(password)) {
      setError("Le Mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.")
      return
    }
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      })
       // Si succès
       setSuccess(true);
       setMessage(response.data.message); // "Utilisateur ajouté avec succès"


    

      const currentUserId = response.data.user_id;
      // Étape 1 : Vérifie s’il y a déjà un user enregistré
      const oldUserData = localStorage.getItem(`user_${currentUserId}`);
      let savedResultSopk = ''; // Valeur par défaut
      let savedResultHypothyroidie = '';
      let savedResultDiabeteType2 = '';
      let savedResultMaladieRenaleChronique = '';
      let savedResultObesite  = '';
      let savedResultCancerEndometre  = '';
      let savedResultSopkEcho = '';
      let savedResultDepression = '';


      // let savedAge = age ;
      // let savedHeight = height;
      // let savedWeight = weight;

      


      // Étape 2 : Si user trouvé, essaye de lire son resultat_test_sopk
      if (oldUserData) {
        try {
             const parsedOldUser = JSON.parse(oldUserData);
             savedResultSopk = parsedOldUser.resultat_test_sopk || ''; //récupère l’ancien résultat
             savedResultHypothyroidie = parsedOldUser.resultat_test_hypothyroidie || '';
             savedResultDiabeteType2  = parsedOldUser.resultat_test_diabete_de_type2 || '';
             savedResultMaladieRenaleChronique = parsedOldUser.resultat_test_maladie_renale_chronique|| '';
             savedResultObesite = parsedOldUser.resultat_test_obesite|| '';
             savedResultCancerEndometre = parsedOldUser.resultat_test_cancer_endometre || '';
             savedResultSopkEcho = parsedOldUser.resultat_test_sopk_echo || ''; 
             savedResultDepression = parsedOldUser.resultat_test_depression || ''; 
             
             

            //  savedAge = parsedOldUser.age || '';
            //  savedHeight = parsedOldUser.height || '';
            //  savedWeight = parsedOldUser.weight || '';

            

        } catch (e) {
        console.error("Erreur lors de la lecture de l’ancien user", e);
      }
      }






      const user = {
      id: response.data.user_id,
      username: response.data.user_name,
      email: response.data.user_email,
      token: response.data.token,
      resultat_test_sopk: savedResultSopk , // ici on met l’ancien résultat s’il existe
      resultat_test_hypothyroidie :  savedResultHypothyroidie ,
      resultat_test_diabete_de_type2 : savedResultDiabeteType2,
      resultat_test_maladie_renale_chronique : savedResultMaladieRenaleChronique,
      resultat_test_obesite : savedResultObesite,
      resultat_test_cancer_endometre : savedResultCancerEndometre,
      resultat_test_sopk_echo: savedResultSopkEcho ,
      resultat_test_depression: savedResultDepression
  
      // age: savedAge,
      // height: savedHeight,
      // weight: savedWeight,


    };
     // Sauvegarde persistante dans localStorage
    localStorage.setItem(`user_${user.id}`, JSON.stringify(user));
    localStorage.setItem('currentUserId', user.id);
    localStorage.setItem('token', user.token);



      // Rediriger par exemple vers la page d'accueil
      navigate('/');
      
      } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error); // Affiche "Email existe déjà" par exemple
        } else {
          setError("Une erreur s'est produite");
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
          <h1 className="text-center">Se connecter</h1>
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
          <img className="d-block mx-auto" src="assets/img/gallery/login3.png" style={{ width: '80%' }}  alt="..." />
          </div> 
        <div className="col-lg-6 z-index-2">
          <form className="row g-3" onSubmit={handleSubmit}>
       
            <div className="col-md-12">
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
           
                

            <div className="mt-3 text-end">
             <p>
             <NavLink to="/reset-link"> Mot de passe oublié ? </NavLink>
             </p>
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
                <button className="btn btn-primary rounded-pill" type="submit">Se connecter</button>
              </div>
            </div>
          </form>
         
          <div className="mt-3 text-center">
             <p className=" mx-auto">Vous n'avez pas de compte ?  <NavLink to="/register"> S'inscrire </NavLink></p>
         </div>
        </div>
      </div>
    </div>
  </section>
    
    
    
    {/* <PiedPage/> */}
    
    
    
    
    </>
  )
}
