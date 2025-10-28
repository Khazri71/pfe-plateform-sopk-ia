import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import { MdAccessTimeFilled } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import { Link, NavLink, useLocation } from 'react-router-dom'

export const RegimePerso = () => {
  const [diet , setDiet] = useState()
  const [error , setError] = useState("")

const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resultatTest = queryParams.get('resultatTest');

  const [regname, setRegname] = useState("");

//  // ===========
  const getDiet = async (resultatTest) => {
   
  let typereg = ""
  switch (resultatTest) {
  case "SOPK":
     typereg = "Primal"
     setRegname("Primal")
     break;
  case "Hypothyroïdie":
     typereg = "Primal,balanced"
      setRegname("Primal,balanced")
     break;
  case "Diabète de type 2":
  case "Prédiabète" :
     typereg = "ketogenic,Primal,balanced"
     setRegname("ketogenic,Primal,balanced")
     break;

  case "Maladie rénale chronique":
     typereg = "low-protein,low-potassium,low-phosphorus"
     setRegname("low-protein,low-potassium,low-phosphorus")
     break;

  case "Cancer d'endométre":
     typereg = "Primal,balanced"
     setRegname("Primal,balanced")
     break;

  case "Overweight_Level_I" :
  case "Overweight_Level_II": 
  case "Obesity_Type_I" :  
  case "Obesity_Type_III" :
     typereg = "ketogenic,Primal"
     setRegname("ketogenic,Primal")
     break;
    
  default:
    typereg = ""

  // switch (resultatTest) {
  //   case "SOPK":
  //     setTypereg("Primal");
  //     break;

  //   case "Hypothyroïdie":
  //     setTypereg("Primal,balanced");
  //     break;

  //   default:
  //     setTypereg("");
  //     break;
  
}
    

    try {

      const response = await axios.get("http://localhost:5000/generate_meal_plan/"+typereg)
      setDiet(response.data.week)
      console.log("respose diet" , response.data.week);
    }
    catch (err) {
        // if (err.response && err.response.data && err.response.data.error) {
        //   setError(err.response.data.error); // Affiche "Email existe déjà" par exemple
        // } else {
          setError("Une erreur s'est produite");
          console.log("error diet" , err);
        }
  }

  


//  if(resultatTestSopk === "SOPK"){
//     getDiet()

//  }
// // =======
 useEffect(() => {
    getDiet(resultatTest)
    console.log(diet)
    console.log(resultatTest)
}, [])




const BASE_IMAGE_URL = "https://spoonacular.com/recipeImages/";
const FALLBACK_IMAGES = ['repas1.jpg', 'repas2.jpg', 'repas3.jpg', 'repas4.jpg', 'repas5.jpg', 'repas6.jpg'];

const dayNamesFr = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche"
};

  return (
        <>
        <h1 className="text-center  mt-5 mb-5">Le régime personnalisé proposé est le régime <p style={{color: "#1b71a1"}}> {regname} </p></h1>
        <section className="pb-5" style={{marginTop:"-130px"}}>
        <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/doctors-bg.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
        </div>
       
        <div className="container">
           
          <div className="row flex-center">
            {/* data-days */}
            {diet && Object.keys(diet).map((day)=> ( <>

                   {/* data-meals */}
                   <div className="row h-100 my-4">
                    <h5 className="my-3">Jour : {dayNamesFr[day]}</h5>
                    {diet[day]?.meals?.map(({ id, image, readyInMinutes, servings ,sourceUrl ,title}) => ( <>
                      <div className="col-md-4  mb-3 mb-md-0">
                        <div className="card card-span w-100 h-100 shadow py-3 px-3" >
                          <div className="d-flex flex-row flex-md-column flex-lg-row">
                           {image ? (

                            <img src={`${BASE_IMAGE_URL}${image}`} className="rounded-circle  mb-md-3 mx-md-4 mx-lg-2" width={100} height={100} alt="repas" />
                            ) : (
 
                              <img
                                src={`assets/img/gallery/repasale/${FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)]}`}
                                className="rounded-circle mr-5 mb-md-3 mx-md-auto"
                                width={100}
                                height={100}
                                alt="..."
                             />
                            )}
                            
                            
                            
                            <div className="text-md-center text-lg-start ms-lg-2 ms-2 ">
                                 <p className="mb-0 fs-xxl-1 mb-2  mx-md-auto"><strong>{title}</strong></p>
                                 <p className="text-600 fs-xxxl-1"><MdAccessTimeFilled size={18}  className="text-primary" /> {readyInMinutes} minutes <br /><GiMeal size={22} className="text-primary" /> {servings} personne(s) </p>
                                 {/* <a href={sourceUrl}  target="_blank" className="recette-link"><button className="btn btn-outline-primary rounded-pill py-2 px-2 ml-5" type="submit">  La recette</button></a> */}
                                 <button className="btn btn-outline-primary rounded-pill py-2 px-2 ml-5" type="submit">
  <a
    href={sourceUrl}
    target="_blank"
    className="text-link"
  >
    La recette
  </a>
</button>

                            </div>
                        </div>
                        </div>
                      </div>                            
                    </>))}
                  </div> 
        
          
           </>))}
          </div>
        </div>  
      </section>
       <div className="col-12 mb-5">
                <div className="d-flex justify-content-center">
                    <Link to="/" className="navlink-hover-white"> <button className="btn btn-lg btn-outline-primary rounded-pill me-2 mb-2 bt-white " type="submit" > <IoChevronBack size={20} /> </button></Link>
                </div>
                </div>   
    </>
  )
}
