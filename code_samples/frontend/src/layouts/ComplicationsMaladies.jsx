import React  from 'react'
import { NavLink } from 'react-router-dom'

export const ComplicationsMaladies = () => {
  return (
    <>
    {/* <div className="row h-100 m-lg-7 mx-3 mt-6 mx-md-4 my-md-7">


     
    <div className="col-md-3 mb-8 mb-md-0 ">
    <div className="card card-span shadow rounded-3">
        <div className="card-body d-flex flex-column flex-center  py-3">

             <img src="assets/img/gallery/anita.png" width={100} alt="..." />
             <h5 className="mt-3">Anita Deshai</h5>
             <div className="text-center">
                 <button className="btn btn-outline-secondary rounded-pill" type="submit">View Profile</button>
             </div>

        </div>
    </div>
    </div>







</div> */}


<div className="container my-7" id="complications">
<h4 className="text-center  mb-4">Les Complications du SOPK</h4>
      <div className="row  d-flex justify-content-center align-items-center">

        <div className="col-sm-6 col-lg-3 mb-4 ">     {/* h-100 */}
            <div className="card shadow card-span rounded-3" style={{ height: '250px' }}>
              <img className="card-img-top rounded-top-3 " src="assets/img/gallery/endometre1.jpeg" alt="news" height={150}/>
            <div className="card-body">
             
              <h5 className="font-base fs-lg-0 fs-xl-1 ">Cancer de l'endomètre</h5>
              <NavLink className="stretched-link" to="/infos_endometrial-cancer">Plus d'infos et un Test</NavLink>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 mb-4 ">     {/* h-100 */}
            <div className="card shadow card-span rounded-3" style={{ height: '250px' }}>
              <img className="card-img-top rounded-top-3 " src="assets/img/gallery/obes.png" alt="news" height={150}/>
            <div className="card-body">
             
              <h5 className="font-base fs-lg-0 fs-xl-1 ">Obésité</h5>
              <NavLink className="stretched-link" to="/infos_obesity">Plus d'infos et un Test</NavLink>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 mb-4 ">     {/* h-100 */}
            <div className="card shadow card-span rounded-3" style={{ height: '250px' }}>
              <img className="card-img-top rounded-top-3 " src="assets/img/gallery/dep2.jpg" alt="news" height={150}/>
            <div className="card-body">
             
              <h5 className="font-base fs-lg-0 fs-xl-1 ">Dépression</h5> 
              <NavLink className="stretched-link" to="/infos_depression">Plus d'infos et un Test</NavLink>
            </div>
          </div>
        </div>

    </div>
</div>

{/* ----------------------------------------- */}



<div className="container my-7" id="maladies-similaires">
<h4 className="text-center  mb-4">Les Maladies Similaires au SOPK</h4>
      <div className="row  d-flex justify-content-center align-items-center">

        <div className="col-sm-6 col-lg-3 mb-4 ">     {/* h-100 */}
            <div className="card shadow card-span rounded-3" style={{ height: '250px' }}>
              <img className="card-img-top rounded-top-3 " src="assets/img/gallery/hypo1.jpg" alt="news" height={150}/>
            <div className="card-body">
             
              <h5 className="font-base fs-lg-0 fs-xl-1 ">Hypothyroïdie</h5>
              <NavLink className="stretched-link" to="/infos_hypothyroidism">Plus d'infos et un Test</NavLink>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 mb-4 ">     {/* h-100 */}
            <div className="card shadow card-span rounded-3" style={{ height: '250px' }}>
              <img className="card-img-top rounded-top-3 " src="assets/img/gallery/diab.jpg" alt="news" height={150}/>
            <div className="card-body">
             
              <h5 className="font-base fs-lg-0 fs-xl-1 ">Diabète de type 2</h5>
              <NavLink className="stretched-link" to="/infos_type-2-diabetes">Plus d'infos et un Test</NavLink>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 mb-4 ">     {/* h-100 */}
            <div className="card shadow card-span rounded-3" style={{ height: '250px' }}>
              <img className="card-img-top rounded-top-3 " src="assets/img/gallery/renale.jpg" alt="news" height={150}/>
            <div className="card-body">
             
              <h5 className="font-base fs-lg-0 fs-xl-1 ">Maladie rénale chronique</h5>
              <NavLink className="stretched-link" to="/infos_Chronic-kidney-disease">Plus d'infos et un Test</NavLink>
            </div>
          </div>
        </div>

    </div>
</div>
</>
  )
}
