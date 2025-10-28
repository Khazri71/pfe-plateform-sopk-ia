import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
//rafc
export const BarreNavigation = () => {


  const navigate = useNavigate();
  
  // const token = localStorage.getItem('token');
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //***********Récupérer les données de localstorage */
  // const [userId, setUserId] = useState('');
  const [token, setToken] = useState(''); 
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  // const [testResult, setResult] = useState('');

useEffect(() => {
  const currentUserId = localStorage.getItem('currentUserId');
  if (currentUserId) {
    const userData = localStorage.getItem(`user_${currentUserId}`);
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.username);
      setUserEmail(user.email);
      setToken(user.token); // <- token va déclencher le 2e useEffect
    }
  }
}, []);
//***************************** */



useEffect(() => {
  setIsAuthenticated(!!token);
}, [token]);


const toggleDropdown = () => setOpen(!open);

const handleLogout = async () => {

  try {
    await fetch('http://localhost:5000/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Supprime le token localement
    // localStorage.removeItem('token');
    // Supprime les infos stockées localement
    localStorage.removeItem('token');
    localStorage.removeItem('currentUserId');

    // Réinitialise les états locaux si besoin
    setToken('');
    setUserName('');
    setUserEmail('');
    setIsAuthenticated(false);


    // Rediriger par exemple vers la page d'accueil
    // navigate('/');
    window.location.reload();  // force un rechargement complet de la page
  } catch (error) {
    console.error("Erreur de déconnexion :", error);
  }
};

 console.log(open)



  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3 d-block  " data-navbar-on-scroll="data-navbar-on-scroll">
  <div className="container"><NavLink className="navbar-brand" to="/"><img src="assets/img/gallery/log.png" width={150}  alt="logo"  /></NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"> </span></button>
    <div className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto pt-2 pt-lg-0 font-base">
        <li className="nav-item px-2"><a className="nav-link" aria-current="page" href="#apropos">À propos de nous</a></li>
        <li className="nav-item px-2"><a className="nav-link" href="#sopk">SOPK</a></li>
        <li className="nav-item px-2"><a className="nav-link" href="#complications">Complications </a></li>
        <li className="nav-item px-2"><a className="nav-link" href="#maladies-similaires">Maladies similaires </a></li>
        <li className="nav-item px-2"><a className="nav-link" href="#articles">Articles</a></li>
      </ul>


       {!isAuthenticated ? (

      <Link className="btn btn-sm btn-outline-primary rounded-pill order-1 order-lg-0 ms-lg-4" to="/login">Se connecter</Link>
 ) : (
      <div className="profile-container" onClick={toggleDropdown} >
        <img src="assets/img/gallery/phprof1.jpg" alt="Profile" className="profile-img"   width="90px" height="90px" />
        {open && (
          <div className="dropdown-menu">
            <div className="dropdown-header text-primary "> Salut, {userName}</div>
              <p className="text-dark ms-3 mt-3" style={{fontSize:"15px"}}>{userName}</p>
              <p className="text-dark ms-3" style={{fontSize:"15px"}} >{userEmail}</p>
              <Link to="/profil" style={{textDecorationLine: "none"}}><p className="text-primary ms-3 " style={{fontSize:"15px" , fontWeight:"bold" }} >Profil</p></Link>

            <hr />
            <div className="dropdown-item"  style={{fontSize:"15px" , fontWeight:"bold" }}  onClick={handleLogout} >Se déconnecter</div>
          </div>
        )}
      </div>

 )}


















    </div>
  </div>
</nav>
    </>
  )
}
