import React, { useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { FiInfo } from 'react-icons/fi';
import { BsBookmarkCheckFill } from "react-icons/bs";
import axios from 'axios';


export const FormTest = (
  {titlepred , imgUrl , formData , setFormData , handleChange , handleSubmit , capitalizeFirstLetter ,
      fields , description, id, type, placeholder, options , resultatTest ,error ,
      handleAutoFillSopkNon ,handleAutoFillSopkOui,
      handleAutoFillHypothyroïdieNon , handleAutoFillHypothyroïdieOui,
       handleAutoFillDiabetetype2Non, handleAutoFillDiabetetype2Oui, handleAutoFillPrediabete,
       handleAutoFillMaladierenalechroniqueNon , handleAutoFillMaladierenalechroniqueOui,
       handleAutoFillCancerendometreNon, handleAutoFillCancerendometreOui,
    handleAutoFillPoidsInsuffisant , handleAutoFillPoidsNormal,
    handleAutoFillObesiteTypeI , handleAutoFillObesiteTypeIII,
handleAutoFillSurpoidsNiveauI , handleAutoFillSurpoidsNiveauII
    
    
    }) => {


const [focused, setFocused] = useState(null); // état par input


 const token = localStorage.getItem('token');
 const userId = localStorage.getItem('currentUserId');


 const [age, setAge] = useState();
 const [height, setHeight] = useState();
 const [weight, setWeight] = useState();
    
  // const getMetrics = async () => {
  //     try {
  //     const metricsResponse = await axios.get(`http://localhost:5000/api/first_valid_test_metrics/${userId}` , {
  //     headers: {
  //         Authorization: `Bearer ${token}`
  //     }
  //    })
  //     const metrics = metricsResponse.data.data;
  //     console.log(metrics)
  //     console.log( metrics.age ,  metrics.height  , metrics.weight )
  //     setAge(metrics.age)
  //     setHeight(metrics.height)
  //     setWeight(metrics.weight )

  //     // Sauvegarde dans le localStorage
  //     const currentUserId = localStorage.getItem('currentUserId');
  //     if (currentUserId) {
  //          localStorage.setItem(`user_metrics_${userId}`, JSON.stringify(metrics));
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des metrics :", error);
  //   }
  // }
  //  useEffect(() => {
  //      getMetrics()
  //   }, [handleSubmit])


  useEffect(() => {

     // Met à jour l'objet user dans localStorage
       const currentUserId = localStorage.getItem('currentUserId');
       if (currentUserId) {
       const infoData = localStorage.getItem(`userInfo_${currentUserId}`);
       if (infoData) {
        const info = JSON.parse(infoData);
        setAge(info.age);
        setHeight(info.height);
        setWeight(info.weight);
      
       }}
                     
  }, []);
// console.log(age , height , weight)
  
//   const getInfos = () => {
//      // Met à jour l'objet user dans localStorage
//        const currentUserId = localStorage.getItem('currentUserId');
//        if (currentUserId) {
//        const infoData = localStorage.getItem(`userInfo_${currentUserId}`);
//        if (infoData) {
//         const infoData = JSON.parse(infoData);
//         setAge(infoData.age);
//         setHeight(infoData.height);
//         setWeight(infoData.weight);
        


        
//   }}
// }

//  useEffect(() => {
//     getInfos()
// }, [])

 






    return (
    <>

       <section className="py-5 mt-5 ">
        <div className="container">
          <div className="row">
            <div className="col-12 py-3">
              <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/people.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
              </div>
              <h1 className="text-center">Prédiction {titlepred}</h1>
            </div>
          </div>
        </div>
      </section>


       <section className="py-3">
        <div className="container">
          <div className="row">
          

            <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/dot-bg.png)', backgroundPosition: 'bottom right', backgroundSize: 'auto'}}>
            </div>
            <div className="col-lg-6 z-index-2 mb-5" style={{ marginTop: '-50px' }}><img style={{ width: '87%' }}  src={imgUrl} alt="..." /></div>
            <div className="col-lg-6 z-index-2">



        <form className="row g-3" onSubmit={handleSubmit}>
          {fields && fields.map(({ id, type, placeholder, options , description }) => (
            <>
                {type === 'select' ? (
                <div key={id}  class="col-md-6">
                  <label class="form-label visually-hidden" for={id}
                   >{id} </label>
                  <select class="form-select"  id={id}  value={formData[id]} onChange={handleChange} 
                    data-tooltip-id={`tooltip-${id}`}
                    data-tooltip-content={description}  
                   onFocus={() => setFocused(id)}
                    onBlur={() => setFocused(null)}
                    required
                  
                  >
                    <option selected="selected" value="">{capitalizeFirstLetter(id)}</option>
                     {options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                    <Tooltip id={`tooltip-${id}`} place="top"  className="tooltip-white" />
                </div> 
                
                ) : (

                
                  <div className="col-md-6" >
                 
                  <label  className="visually-hidden"  htmlFor={id}   >
                    {capitalizeFirstLetter(id)} 
                  </label>
                  {/* <input className="form-control form-livedoc-control" id={id}  type="text"  
                   placeholder={placeholder }   value={formData[id]}  onChange={handleChange}  
                    data-tooltip-id={`tooltip-${id}`}
                    data-tooltip-content={description} 
                    onFocus={() => setFocused(id)}
                    onBlur={() => setFocused(null)}
                   
                   /> */}



                   {/* === */}


                             
                             
                  <input className="form-control form-livedoc-control" 
                  id={id}  
                  type="number"  
                  min={0}
                  step="any"
                  required
                 
                   placeholder={placeholder }   
                  value={
                     ["Age", "age", "Age (yrs)"].includes(id)
                       ? age
                       : ["Height", "height"].includes(id)
                       ? height
                       : ["Weight", "weight", "Weight (Kg)"].includes(id)
                       ? weight
                       : formData[id] 
                   }
          
                   onChange={handleChange}  
                    data-tooltip-id={`tooltip-${id}`}
                    data-tooltip-content={description} 
                    onFocus={() => setFocused(id)}
                    onBlur={() => setFocused(null)}
                   
                   />
                 
                  
                    {/* <input className="form-control form-livedoc-control" id={id}  type="text"  
                   placeholder={placeholder }   
                   value={
                     ["Age", "age", "Age (yrs)"].includes(id)
                       ? (age && age !== ""
                           ? age
                           : formData[id] || "")
                       : ["Height", "height"].includes(id)
                       ? (height && height !== ""
                           ? height
                           : formData[id] || "")
                       : ["Weight", "weight", "Weight (Kg)"].includes(id)
                       ? (weight && weight !== ""
                           ? weight
                           : formData[id] || "")
                       : formData[id] || ""
                   }
                   onChange={handleChange}  
                    data-tooltip-id={`tooltip-${id}`}
                    data-tooltip-content={description} 
                    onFocus={() => setFocused(id)}
                    onBlur={() => setFocused(null)}
                   
                   />
                  */}


                   {/* === */}
              


               


                <Tooltip id={`tooltip-${id}`} place="top"  className="tooltip-white"  
                 isOpen={focused === id}
                />
                </div>
             
                
                
                )}
           
              </>

            ))}

            <div className="col-12 d-flex justify-content-center mb-4">
              <NavLink to="/" className="navlink-hover-white">
                <button className="btn btn-lg btn-outline-primary rounded-pill me-2" type="button">
                  <IoChevronBack size={20} />
                </button>
              </NavLink>
              <button className="btn btn-lg btn-primary rounded-pill px-5" type="submit">
                Prédire
              </button>

            </div>
          



              {/* <div className="col-12 mb-5">
                        <div className="card card-span w-100 h-100 shadow py-3 px-2 "  style={{ backgroundColor: '#d4edda' }}>
                            <div className="mx-auto">
                                 <p className="text-center mb-0" style={{fontSize:"25px" , color:"#65a374"}}>Non SOPK</p>
                            </div>
                        </div>
                  </div> 
         
              <div className="col-12 mb-5">
                        <div className="card card-span w-100 h-100 shadow py-3 px-2 "  style={{ backgroundColor: '#ffb5c0' }}>
                            <div className="mx-auto">
                                 <p className="text-center mb-0" style={{fontSize:"25px" , color:"#cf0826"}}>SOPK</p>
                                 <NavLink to="/regime" className="mt-2" style={{fontSize:"20px" , color:"#cf0826"}}>Consulter le régime</NavLink>
                                 <button className="btn btn-outline-primary rounded-pill" type="submit">Consulter le régime</button>
                            </div>
                        </div>
                  </div> 
         */}




                {error && (
                  <div className="col-12">
                    <div className="alert alert-danger text-center">{error}</div>
                  </div>
                )}
                {resultatTest && (
                  <div className="col-12">
                    <div className="alert alert-success text-center">
                      <p className="mb-0">{resultatTest}</p>
                      {["SOPK", "Hypothyroïdie" , "Diabète de type 2", "Prédiabète" , "Maladie rénale chronique","Cancer d'endométre" , "Overweight_Level_I", "Overweight_Level_II", "Obesity_Type_I", "Obesity_Type_III" ].includes(resultatTest) ? ( <NavLink to={`/regime?resultatTest=${resultatTest}`}  style={{fontSize:"16px" , color:"#65a374" , marginTop:"30px"}}>Consulter le régime</NavLink>) : null}
                       
                      </div>
                   

                  </div> 
                 )}


                {/* {error && (
                  <div className="col-12">
                    <div className="alert alert-danger text-center">{error}</div>
                  </div>
                )}
                {resultatTest && ( <>
                <div className="col-12 mb-5">
                        <div className="card card-span w-100 h-100 shadow py-3 px-2 "  style={{ backgroundColor: '#d4edda' }}>
                            <div className="mx-auto">
                                 <p className="text-center mb-0" style={{fontSize:"25px" , color:"#65a374"}}>SOPK</p>
                                 <NavLink to="/regime" className="mt-2" style={{fontSize:"20px" , color:"#65a374"}}>Consulter le régime</NavLink>
                                 <button className="btn btn-outline-primary rounded-pill" type="submit">Consulter le régime</button>
                            </div>
                        </div>
                  </div> 
          
                  </>
                 )} */}


          </form>
 
           </div>
           </div>
          </div>
      </section>


      {/* Non SOPK  */}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillSopkNon} ><BsBookmarkCheckFill size={16} /></button> */}
      {/* Oui SOPK  */}
      <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillSopkOui} ><BsBookmarkCheckFill size={16} /></button>
      

      {/* Non Hypothyroïdie  */}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillHypothyroïdieNon} ><BsBookmarkCheckFill size={16} /></button> */}
      {/* Oui Hypothyroïdie  */}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillHypothyroïdieOui} ><BsBookmarkCheckFill size={16} /></button> */}
      




      {/* Non Diabéte type 2  */}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillDiabetetype2Non} ><BsBookmarkCheckFill size={16} /></button> */}
      {/* Oui Diabéte type 2  */}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillDiabetetype2Oui} ><BsBookmarkCheckFill size={16} /></button> */}
      {/* Prédiabète  */}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillPrediabete} ><BsBookmarkCheckFill size={16} /></button> */}

   

      {/* Non Maladie rénale chronique  */}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillMaladierenalechroniqueNon} ><BsBookmarkCheckFill size={16} /></button> */}
      {/* Oui Maladie rénale chronique  */}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillMaladierenalechroniqueOui} ><BsBookmarkCheckFill size={16} /></button> */}
      

      {/* ========= */}

      {/* Non Cancer d'endométre   */}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillCancerendometreNon} ><BsBookmarkCheckFill size={16} /></button> */}
      {/* Oui cancer d'endométre */}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillCancerendometreOui} ><BsBookmarkCheckFill size={16} /></button> */}
      



       {/* PoidsInsuffisant */}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillPoidsInsuffisant} ><BsBookmarkCheckFill size={16} /></button> */}
     
      {/* PoidsNormal */}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillPoidsNormal} ><BsBookmarkCheckFill size={16} /></button> */}
     
       {/* ObesiteTypeI */}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillObesiteTypeI} ><BsBookmarkCheckFill size={16} /></button> */}
     
       {/* ObesiteTypeIII */}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillObesiteTypeIII} ><BsBookmarkCheckFill size={16} /></button> */}
     
       {/* SurpoidsNiveauI*/}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillSurpoidsNiveauI} ><BsBookmarkCheckFill size={16} /></button> */}
      
       {/* SurpoidsNiveauII *******/}
      {/* <button className="rounded-circle bg-primary text-white border-0 mb-3 ms-3" onClick={handleAutoFillSurpoidsNiveauII} ><BsBookmarkCheckFill size={16} /></button> */}
      


      
    </>
  )
}
