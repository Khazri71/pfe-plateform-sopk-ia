import React, { useEffect, useState } from 'react'
import { ImSad2 } from "react-icons/im";
import { IoIosHappy } from "react-icons/io";
import { IoChevronBack } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
export const ProfilTests = () => {




 //***********Récupérer les données de localstorage */
    const [userName, setUserName] = useState('');
     const [userEmail, setUserEmail] = useState('');
    const [listResults , setListResults] = useState([]);





    useEffect(() => {
       const currentUserId = localStorage.getItem('currentUserId');
       if (currentUserId) {
       const userData = localStorage.getItem(`user_${currentUserId}`);
       if (userData) {
       const user = JSON.parse(userData);
        setUserName(user.username);
      setUserEmail(user.email);
        const results = [
          {name: "Test SOPK", result:  user.resultat_test_sopk},
          {name: "Test Écho  " , result: user.resultat_test_sopk_echo},
          {name: "Test Hypothyroïdie" , result: user.resultat_test_hypothyroidie},
          {name: "Test Diabète de type 2" , result:  user.resultat_test_diabete_de_type2},
          {name: "Test Maladie rénale chronique" , result: user.resultat_test_maladie_renale_chronique},
          {name: "Test Cancer de l'endomètre" , result: user.resultat_test_cancer_endometre},
          {name: "Test Obésité" , result: user.resultat_test_obesite},
          {name: "Test Maladie rénale chronique" , result: user.resultat_test_maladie_renale_chronique},
          {name: "Test Dépression" , result: user.resultat_test_depression}
          

        ];
        setListResults(results);
       
       }
      
     }
    }, []);











  return (
    <>
     <section className="pb-0">
    <div className="container">
      <div className="row">
        <div className="col-12">
          
          <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/doctors-us.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
          </div>
         
          <div className="text-center pb-4">
         <h1 className="text-center">Profil</h1>
           <img src="assets/img/gallery/phprof1.jpg" className="rounded-circle  mb-md-3 mx-md-4 mx-lg-2" width={70} height={70} alt="repas" />
                          
          <p>Madame , {userName}</p>
          <p>Email, {userEmail}</p>
          </div>

          <h1 className="text-center">Bilan Médical Global de votre Santé</h1>
        </div>
      </div>
    </div>
    {/* end of .container*/}
  </section>
  {/* <section> close ============================*/}
  {/* ============================================*/}
  <section className="py-2">
    <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/doctors-bg.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
    </div>
    {/*/.bg-holder*/}
    <div className="container">
      <div className="row flex-center">
        <div className="col-xl-10 px-0">
        

                <div className="row h-100 m-lg-1 mx-3 mt-6 mx-md-4 my-md-2">
                 




{
  listResults.filter(item => item.result && item.result !== "").length === 0 ? (
    <div className="text-center my-4">
      <p className=" text-danger">
        Vous n'avez encore effectué aucun test médical.
      </p>
    </div>
  ) : (

              // {
                listResults.map((item, index) => {
                if(item.result !==""){
                   const isPositive = item.result.startsWith("Non");
                   const cleanResult = item.result.includes('_')
                                       ? item.result.replaceAll('_', ' ')
                                       : item.result;

                  return (
               <div className="col-md-12 mb-4 mb-md-4"  key={index}>
                    <div className="card card-span h-70  shadow mt-md-0 border" >
                        {/* shadow */}
                      <div className="card-body d-flex flex-column flex-md-row  text-center text-start  gap-3 align-items-center  ">
                        {/* <img src="assets/img/gallery/leo-mario.png" width={128} alt="..." /> */}

                        <h5 className='mt-0 mt-md-2' style={{fontWeight: "bold" , fontSize:"18px" }}> {item.name}</h5>
                        
                        
              {isPositive ? (
                <>
                           <p className=" fs-xxl-1  text-success  mb-0" style={{fontWeight: "bold" , fontSize:"17px"}}> 
                            <IoIosHappy color="success" size={29} className="me-2"/> 
                           {cleanResult}
                           </p>
                           <p className="text-600 mb-0"   style={{fontWeight: "bold" }}>Vous êtes saine , Le test montre {cleanResult}</p>
                       </>
                    ) : (  
                      <>      
                         <p className=" fs-xxl-1  text-danger  mb-0" style={{fontWeight: "bold" , fontSize:"17px"}}> 
                            <ImSad2 color="success" size={23} className="me-2"/> 
                           {cleanResult}
                           </p>
                            <p className="text-600 mb-0"   style={{fontWeight: "bold" }}>Le test confirme {cleanResult}</p>
                       
                       </>  
                       
                       )}
                         
                      </div>
                    </div>
                  </div>
                  // )
//                   }
// }  )


// }


 );
    }

    return null; // à ajouter pour éviter undefined
  })
)}















             {/* <div className="col-md-12 mb-4 mb-md-4">
                    <div className="card card-span h-70  shadow mt-md-0 border" >
                     
                      <div className="card-body d-flex flex-column flex-md-row  text-center text-start  gap-3 align-items-center  ">
                       

                        <h4 className='mt-0 mt-md-2' style={{fontWeight: "bold" }}> Test Sopk  </h4>
                        
                          <p className=" fs-xxl-1  text-danger  mb-0" style={{fontWeight: "bold" , fontSize:"19px"}}> <IoIosHappy color="danger" size={29} className="me-2 "/>SOPK</p>
                          <p className="text-600 mb-0"   style={{fontWeight: "bold" }}>Le test confirme la présence de SOPK</p>
                       
                      </div>
                    </div>
                  </div>

                 */}
 

                </div>
              </div>

      </div>
    </div>
     
  </section>

   <div className="d-flex justify-content-center pb-5">
            <NavLink to="/" className="navlink-hover-white">
              <button className="btn btn-lg btn-outline-primary rounded-pill me-2 mb-2 bt-white" type="submit">
                <IoChevronBack size={20} />
              </button>
            </NavLink>
          </div>
  {/* ============================================*/}
    
    
    </>
  )
}
