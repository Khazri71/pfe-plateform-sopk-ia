import React, { useEffect, useState } from 'react'
import { BarreNavigation } from '../../layouts/BarreNavigation'
import { PiedPage } from '../../layouts/PiedPage'
import { ImageBackground } from '../../layouts/ImageBackground'
import { IoChevronBack } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import axios from 'axios';


export const TestSopkEcho = () => {


  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('currentUserId');


  //***********Récupérer les données de localstorage */
      const [resultatTestSopkEcho, setResultatTestSopkEcho] = useState('');
      useEffect(() => {
         const currentUserId = localStorage.getItem('currentUserId');
         if (currentUserId) {
         const userData = localStorage.getItem(`user_${currentUserId}`);
         if (userData) {
         const user = JSON.parse(userData);
         setResultatTestSopkEcho(user.resultat_test_sopk_echo || '');
         }
       }
      }, []);

      const [selectedImage, setSelectedImage] = useState(null);
        const [success ,setSuccess]  = useState('')
        // const [prediction , setPrediction] = useState('')
        const[error , setError] = useState('')




      const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedImage) {
    // alert("Veuillez sélectionner une image.");
    setError("Veuillez sélectionner une image")
    return;
  }

  const formData = new FormData();
  formData.append("image", selectedImage);

  try {
    const response = await axios.post(
      `http://127.0.0.1:5000/test_pcos_echo/${userId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // si ton API le nécessite
        }
      }
    );

    // Si succès
       setSuccess(true);
    //    setPrediction(response.data.prediction);
       // Met à jour l'objet user dans localStorage
       const currentUserId = localStorage.getItem('currentUserId');
       if (currentUserId) {
       const userData = localStorage.getItem(`user_${currentUserId}`);
       if (userData) {
        const user = JSON.parse(userData);
        user.resultat_test_sopk_echo = response.data.prediction;
        localStorage.setItem(`user_${currentUserId}`, JSON.stringify(user));
        // Met à jour le state aussi
        setResultatTestSopkEcho(response.data.prediction);
      }
    }


  } catch (err) {
     if (err.response && err.response.data && err.response.data.error) {
          // setError(err.response.data.error); 
          setError("Veuillez sélectionner une image valide")
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
              <h1 className="text-center">Échographie du SOPK</h1>
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
            {/* <div className="col-lg-6 z-index-2 mb-5"><img className="w-100" src="assets/img/gallery/appointment.png" alt="..." /></div> */}
            {/* <ImageBackground imgurl = {'assets/img/gallery/appointment.png'}/> */}
            <div className="col-lg-6 z-index-2 mb-5" style={{ marginTop: '-50px' }}><img style={{ width: '95%' }}  src="assets/img/gallery/echo.png" alt="..." /></div>
       
            <div className="col-lg-6 z-index-2">
      <form className="row g-3" onSubmit={handleSubmit} encType="multipart/form-data">
  <div className="col-md-12 my-3">
    <label className="form-label visually-hidden" htmlFor="image">Choisir une image :</label>
    <input
      className="form-control form-livedoc-control btn-primary"
      type="file"
      id="image"
      name="image"
      accept="image/*"
      // onChange={(e) => setSelectedImage(e.target.files[0])}
      onChange={(e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedImage(file);
  }
}}
    />
  </div>




{selectedImage && (
  <div className="col-12 d-flex justify-content-center my-3">
    <img
      src={URL.createObjectURL(selectedImage)}
      alt="Aperçu de l'image"
      style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '10px' }}
    />
  </div>
)}





  <div className="col-12 d-flex justify-content-center">
    <NavLink to="/" className="navlink-hover-white">
      <button className="btn btn-lg btn-outline-primary rounded-pill me-2 mb-2 bt-white" type="button">
        <IoChevronBack size={20} />
      </button>
    </NavLink>
    <button className="btn btn-lg btn-primary rounded-pill me-2 mb-2 px-5 mb-4" type="submit">
      Prédire
    </button>
  </div>
</form>

                {error && (
                  <div className="col-12">
                    <div className="alert alert-danger text-center">{error}</div>
                  </div>
                )}
                {resultatTestSopkEcho && (
                  <div className="col-12">
                    <div className="alert alert-success text-center">
                      <p className="mb-0" >{resultatTestSopkEcho}</p>
                       
                      </div>
                  </div> 
                 )}

            </div>
          </div>
        </div>
      </section>
        
        
        
        {/* <PiedPage/> */}
        
    
    </>
  )
}
