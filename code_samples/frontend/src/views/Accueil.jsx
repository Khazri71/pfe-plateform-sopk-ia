import React, { useEffect } from 'react'
import { BarreNavigation } from '../layouts/BarreNavigation'
import { PiedPage } from '../layouts/PiedPage'
import { AProposDeNous } from '../layouts/AProposDeNous'
import { NavLink } from 'react-router-dom'
import { ComplicationsMaladies } from '../layouts/ComplicationsMaladies'
import { PiArticleLight } from "react-icons/pi";

import { FaFileMedicalAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { BsHeartPulseFill } from "react-icons/bs";
import { BsFillChatSquareHeartFill } from "react-icons/bs";

import axios from 'axios'


export const Accueil = () => {

  
  return (
    <>
    <BarreNavigation/>
    
<div>
  <section className="py-xxl-10 pb-0" id="home">
    <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/hero-bg.png)', backgroundPosition: 'top center', backgroundSize: 'cover'}}>
    </div>
    {/*/.bg-holder*/}
    <div className="container">
      <div className="row min-vh-xl-100 min-vh-xxl-25">
        <div className="col-md-5 col-xl-6 col-xxl-7 order-0 order-md-1 text-end">
          <img className="pt-7 pt-md-0 w-100 rounded-circle" src="assets/img/gallery/aboutus1.jpg"  alt="hero-header" /></div>
        <div className="col-md-75 col-xl-6 col-xxl-5 text-md-start text-center py-3">
          <h3 className="fw-light font-base fs-6 fs-xxl-7">Déterminés à améliorer  <strong> la santé féminine  </strong>face au <br />&nbsp;<strong>SOPK </strong> grâce à <strong>L'IA.</strong> </h3>
          <p className="fs-1 mb-5">SOPK IA Santé vous propose un diagnostic complet du SOPK et de ses complications et des maladies similaires,  basé sur l’intelligence artificielle, ainsi que des régimes personnalisés.  
            <br />Accompagnement disponible 24h/24, en ligne. </p><a className="btn btn-lg btn-primary rounded-pill" href="#apropos" role="button">À propos de nous</a>
        </div>
      </div>
    </div>
  </section>
  {/* à propos de nous ============================================*/}
  <AProposDeNous/>









 
  {/* <section> begin ============================*/}
  <section className="pb-0" id="sopk">
    <div className="container">
      <div className="row">
        <div className="col-12 py-1">
          <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/about-us.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
          </div>
          {/*/.bg-holder*/}
          <h1 className="text-center">Le SOPK</h1>
        </div>
      </div>
    </div>
    {/* end of .container*/}
  </section>
  {/* <section> close ============================*/}
  {/* ============================================*/}
  <section className="py-5">
    <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/about-bg.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
    </div>
    {/*/.bg-holder*/}
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6 order-lg-1 mb-5 mb-lg-0">
          {/* <img className="fit-cover rounded-circle w-100" src="assets/img/gallery/health-care.png" alt="..." /> */}
           <img className="fit-cover w-100 " src="assets/img/gallery/diagsopk.jpg" alt="..." />
          

          </div>
      <div className="col-md-6  text-md-start">  {/*  text-center */}
          {/* <h2 className="fw-bold mb-4">Comprendre le SOPK <br className="d-none d-sm-block" />system around you</h2> */}
          <h4 className="fw-bold mb-2">Comprendre le SOPK </h4>
          {/* <p>We think that everyone should have easy access to excellent <br className="d-none d-sm-block" />healthcare. Our aim is to make the procedure as simple as <br className="d-none d-sm-block" />possible for our patients and to offer treatment no matter<br className="d-none d-sm-block" />where they person or at their convenience. </p> */}
          <p>Le syndrome des ovaires polykystiques (SOPK) est une affection hormonale fréquente qui touche environ 1 femme sur 10 en âge de procréer. Il est causé par un déséquilibre hormonal qui perturbe le fonctionnement normal des ovaires. 
            Ce trouble peut entraîner une production excessive d’androgènes (hormones mâles), une ovulation irrégulière ou absente, et la formation de petits kystes sur les ovaires. 
            Bien que le SOPK soit souvent associé à des problèmes de fertilité, il peut également avoir un impact sur le métabolisme, la santé mentale et la qualité de vie en général. 
            Une prise en charge précoce permet de mieux contrôler ses effets et de prévenir les complications à long terme.</p>
        
L’échographie pelvienne, essentielle au diagnostic du SOPK, révèle des ovaires contenant plus de 12 petits follicules immatures (2 à 9 mm) répartis en périphérie, formant un aspect en « collier de perles ». Ce signe, associé aux analyses hormonales et symptômes cliniques, confirme souvent le SOPK.
          <h4 className="fw-bold mb-2 mt-4">Symptômes du SOPK </h4>
          <ul>
  <li>Règles irrégulières ou absentes</li>
  <li>Excès de poils (hirsutisme), notamment sur le visage, la poitrine ou le dos</li>
  <li>Acné persistante ou sévère</li>
  <li>Prise de poids ou difficulté à perdre du poids</li>
  <li>Perte de cheveux (alopécie androgénétique)</li>
  <li>Infertilité ou difficulté à tomber enceinte</li>
  <li>Peau grasse</li>
  <li>Présence de kystes sur les ovaires (visible à l’échographie)</li>
  <li>Taches sombres sur la peau (acanthosis nigricans), surtout au niveau du cou, des aisselles ou de l’aine</li>
  <li>Fatigue chronique</li>
  <li>Anxiété ou dépression</li>
  <li>Douleurs pelviennes occasionnelles</li>
</ul>

         
         
          <div className="py-3">
            <NavLink to="/test_pcos" className="navlink-hover-white"> <button className="btn btn-lg btn-outline-primary rounded-pill me-2 mb-2 bt-white " type="submit" > Test du SOPK  </button></NavLink>
          <NavLink to="/test_pcos_echo" className="navlink-hover-white">   <button className="btn btn-lg btn-outline-primary rounded-pill me-2 mb-2 bt-white" type="submit">Test Échographique</button> </NavLink> 
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ============================================*/}


    {/* <section> begin ============================*/}
    {/* <section className="py-5" id="departments">
    <div className="container">
      <div className="row">
        <div className="col-12 py-3">
          <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/bg-departments.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
          </div>
         
          <h1 className="text-center">OUR DEPARTMENTS</h1>
        </div>
      </div>
    </div>
  </section> */}
  {/* <section> close ============================*/}
  {/* ============================================*/}
  {/* ============================================*/}





<ComplicationsMaladies/>





  {/* <section> begin ============================*/}
   {/* <div className="col-auto col-md-4 col-lg-auto text-xl-start"> */}
        {/* col-auto col-md-4 col-lg-auto text-xl-start */}

  {/* <section className="py-2">
    <div className="container">
      <div className="row py-5 align-items-center justify-content-center justify-content-lg-evenly">



      <div className="col-auto col-md-6 col-lg-auto text-xl-start">

       
       
          <h3 className="text-center  mb-4">Les Complications du SOPK</h3>
       
      
<div className=" d-flex  flex-column   justify-content-between align-items-center gap-4">
        <div className="">
          <div className="d-flex flex-column align-items-center">
            <div className="icon-box text-center"><a className="text-decoration-none" href="#!"><img className="mb-3 deparment-icon" src="assets/img/icons/neurology.png" alt="..." /><img className="mb-3 deparment-icon-hover" src="assets/img/icons/neurology.svg" alt="..." />
                <p className="fs-1 fs-xxl-2 text-center">Cancer d'endométre</p>
              </a></div>
          </div>
        </div>

        <div className="">
          <div className="d-flex flex-column align-items-center">
            <div className="icon-box text-center"><a className="text-decoration-none" href="#!"><img className="mb-3 deparment-icon" src="assets/img/icons/eye-care.png" alt="..." /><img className="mb-3 deparment-icon-hover" src="assets/img/icons/eye-care.svg" alt="..." />
                <p className="fs-1 fs-xxl-2 text-center">Obésité</p>
              </a></div>
          </div>
        </div>

        <div className="">
          <div className="d-flex flex-column align-items-center">
            <div className="icon-box text-center"><a className="text-decoration-none" href="#!"><img className="mb-3 deparment-icon" src="assets/img/icons/cardiac.png" alt="..." /><img className="mb-3 deparment-icon-hover" src="assets/img/icons/cardiac.svg" alt="..." />
                <p className="fs-1 fs-xxl-2 text-center">Dépression</p>
              </a></div>
          </div>
        </div>


        </div>
      </div>
       ---------------------------- 

      <div className="col-auto col-md-6 col-lg-auto text-xl-start">

      <h3 className="text-center mb-4">Les Maladies Similaires au SOPK</h3>

      <div className=" d-flex  flex-column justify-content-between align-items-center  gap-4">
        <div className="">
          <div className="d-flex flex-column align-items-center">
            <div className="icon-box text-center"><a className="text-decoration-none" href="#!"><img className="mb-3 deparment-icon" src="assets/img/icons/heart.png" alt="..." /><img className="mb-3 deparment-icon-hover" src="assets/img/icons/heart.svg" alt="..." />
                <p className="fs-1 fs-xxl-2 text-center">Hypothyroïdie</p>
              </a></div>
          </div>
        </div>


        <div className="">
          <div className="d-flex flex-column align-items-center">
            <div className="icon-box text-center"><a className="text-decoration-none" href="#!"><img className="mb-3 deparment-icon" src="assets/img/icons/osteoporosis.png" alt="..." /><img className="mb-3 deparment-icon-hover" src="assets/img/icons/osteoporosis.svg" alt="..." />
                <p className="fs-1 fs-xxl-2 text-center">Diabète de type 2</p>
              </a></div>
          </div>
        </div>

        <div className="">
          <div className="d-flex flex-column align-items-center">
            <div className="icon-box text-center"><a className="text-decoration-none" href="#!"><img className="mb-3 deparment-icon" src="assets/img/icons/ent.png" alt="..." /><img className="mb-3 deparment-icon-hover" src="assets/img/icons/ent.svg" alt="..." />
                <p className="fs-1 fs-xxl-2 text-center">Maladie rénale chronique</p>
              </a></div>
          </div>
        </div>



        </div>
<div/>



</div>

      </div>
    </div>
 
  </section>
  

 */}













  {/* <section> begin ============================*/}
  <section className="py-5">
    <div className="container">
      <div className="row">
        <div className="col-12 py-3">
          <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/people.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
          </div>
          <h1 className="text-center">Ce que disent les docteurs</h1>
        </div>
      </div>
    </div>
  </section>
  {/* <section> close ============================*/}
  {/* ============================================*/}
  <section className="py-5">
    <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/people-bg-1.png)', backgroundPosition: 'center', backgroundSize: 'cover'}}>
    </div>
    {/*/.bg-holder*/}
    <div className="container">
      <div className="row align-items-center offset-sm-1">
        <div className="carousel slide" id="carouselPeople" data-bs-ride="carousel">
          <div className="carousel-inner">

            <div className="carousel-item active" data-bs-interval={10000}>
              <div className="row h-100">
                <div className="col-sm-3 text-center"><img src="assets/img/gallery/paula.jpg" width={100} alt className="rounded-circle" />
                  <h5 className="mt-3 fw-medium text-secondary">Dr. Paula Celada</h5>
                  <p className="fw-normal mb-0">gynécologue</p>
                </div>
                <div className="col-sm-9 text-center text-sm-start pt-3 pt-sm-0">
                  <h2><FaFileMedicalAlt size={25} /> {"  "} Diagnostic précoce du SOPK</h2>
                  <div className="my-2">
                    {/* <FaFileMedicalAlt size={20} /> {"  "} */}
                   {/* <FaUserDoctor  size={20}/> {"  "}
                   <BsHeartPulseFill  size={20} /> {"  "}
                   <BsFillChatSquareHeartFill  size={20}/> {"  "} */}
                  </div>
                  <p className="mt-4">
                   “Le diagnostic précoce du SOPK est essentiel pour pouvoir traiter les symptômes, améliorer la qualité de vie de la femme et identifier les problèmes de fertilité ainsi que, à plus long terme, prendre en compte les aspects métaboliques, cardiovasculaires et psychologiques de la maladie.”
                    </p>
                </div>
              </div>
            </div>

            <div className="carousel-item" data-bs-interval={1000}>
              <div className="row h-100">
                <div className="col-sm-3 text-center">
                  <img src="assets/img/gallery/marion.png" width={100} alt  className="rounded-circle"/>
                  <h5 className="mt-3 fw-medium text-secondary">Dr. Marion Merello</h5>
                  <p className="fw-normal mb-0">gynécologue obstétricien</p>
                </div>
                <div className="col-sm-9 text-center text-sm-start pt-3 pt-sm-0">
                  <h2><FaUserDoctor  size={25}/> {"  "} Symptômes du SOPK</h2>
                  <div className="my-2">
                   {/* <FaFileMedicalAlt size={20} /> {"  "} */}
                   {/* <FaUserDoctor  size={20}/> {"  "} */}
                   {/* <BsHeartPulseFill  size={20} /> {"  "}
                   <BsFillChatSquareHeartFill  size={20}/> {"  "} */}

                    </div>
                  <p className="mt-4">
                     “Les principaux symptômes du SOPK sont des anomalies du cycle menstruel, une hyperpilosité et de l'acné. Le diagnostic repose sur un bilan hormonal et, si nécessaire, une échographie abdominopelvienne.”
                  </p>
                </div>
              </div>
            </div>

            <div className="carousel-item" data-bs-interval={2000}>
              <div className="row h-100">
                <div className="col-sm-3 text-center"><img src="assets/img/gallery/alpar.png" width={100} alt  className="rounded-circle"/>
                  <h5 className="mt-3 fw-medium text-secondary">Dr. Alparslan Baksu</h5>
                  <p className="fw-normal mb-0">gynécologue obstétricien</p>
                </div>
                <div className="col-sm-9 text-center text-sm-start pt-3 pt-sm-0">
                  <h2><BsHeartPulseFill  size={25} /> {"  "}Mode de vie et gestion du SOPK</h2>
                  <div className="my-2">
                      {/* <FaFileMedicalAlt size={20} /> {"  "}
                   <FaUserDoctor  size={20}/> {"  "} */}
                   {/* <BsHeartPulseFill  size={20} /> {"  "} */}
                   {/* <BsFillChatSquareHeartFill  size={20}/> {"  "} */}
                    </div>
                  <p className="mt-4">
                     “Une alimentation équilibrée, une activité physique régulière et un contrôle du poids peuvent jouer un rôle important dans la gestion du SOPK. Des changements de mode de vie sains peuvent aider à corriger les déséquilibres hormonaux et à soulager les symptômes.”
                  </p>
                </div>
              </div>
            </div>


             <div className="carousel-item" data-bs-interval={2000}>
              <div className="row h-100">
                <div className="col-sm-3 text-center"><img src="assets/img/gallery/carmin.jpeg" width={100} alt className="rounded-circle"/>
                  <h5 className="mt-3 fw-medium text-secondary">Dr. Carmin Rodriguez</h5>
                  <p className="fw-normal mb-0">gynécologue - SOPK</p>
                </div>
                <div className="col-sm-9 text-center text-sm-start pt-3 pt-sm-0">
                  <h2><BsFillChatSquareHeartFill  size={25}/> {"  "}Régime alimentaire adapté au SOPK</h2>
                  <div className="my-2">
                     {/* <FaFileMedicalAlt size={20} /> {"  "}
                   <FaUserDoctor  size={20}/> {"  "}
                   <BsHeartPulseFill  size={20} /> {"  "} */}
                   {/* <BsFillChatSquareHeartFill  size={20}/> {"  "} */}
                  </div>
                  <p className="mt-3">
                    “Adopter un régime alimentaire équilibré, riche en protéines maigres, en fibres et en graisses saines, peut favoriser la perte de poids si nécessaire, mais peut également aider à stabiliser la glycémie et à réduire la résistance à l’insuline.”
                  </p>
                </div>
              </div>
            </div>


          </div>


          

          <div className="row">
            <div className="position-relative z-index-2 mt-5">
              <ol className="carousel-indicators">
                <li className="active" data-bs-target="#carouselPeople" data-bs-slide-to={0} />
                <li data-bs-target="#carouselPeople" data-bs-slide-to={1} />
                <li data-bs-target="#carouselPeople" data-bs-slide-to={2}> </li>
                 <li data-bs-target="#carouselPeople" data-bs-slide-to={3}> </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ============================================*/}
  {/* <section> begin ============================*/}
  {/* <section className="py-5">
    <div className="container">
      <div className="row">
        <div className="col-12 py-3">
          <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/people.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
          </div>
      
          <h1 className="text-center">APPOINTMENT</h1>
        </div>
      </div>
    </div> 
   
  </section> */}
  {/* <section> close ============================*/}
  {/* ============================================*/}
  {/* <section className="py-8">
    <div className="container">
      <div className="row">
        <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/dot-bg.png)', backgroundPosition: 'bottom right', backgroundSize: 'auto'}}>
        </div>
        
        <div className="col-lg-6 z-index-2 mb-5"><img className="w-100" src="assets/img/gallery/appointment.png" alt="..." /></div>
        <div className="col-lg-6 z-index-2">
          <form className="row g-3">
            <div className="col-md-6">
              <label className="visually-hidden" htmlFor="inputName">Name</label>
              <input className="form-control form-livedoc-control" id="inputName" type="text" placeholder="Name" />
            </div>
            <div className="col-md-6">
              <label className="visually-hidden" htmlFor="inputPhone">Phone</label>
              <input className="form-control form-livedoc-control" id="inputPhone" type="text" placeholder="Phone" />
            </div>
            <div className="col-md-6">
              <label className="form-label visually-hidden" htmlFor="inputCategory">Category</label>
              <select className="form-select" id="inputCategory">
                <option selected="selected">Category</option>
                <option> Category One</option>
                <option> Category Two</option>
                <option> Category Three</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label visually-hidden" htmlFor="inputEmail">Email</label>
              <input className="form-control form-livedoc-control" id="inputEmail" type="email" placeholder="Email" />
            </div>
            <div className="col-md-12">
              <label className="form-label visually-hidden" htmlFor="validationTextarea">Message</label>
              <textarea className="form-control form-livedoc-control" id="validationTextarea" placeholder="Message" style={{height: 250}} required="required" defaultValue={""} />
            </div>
            <div className="col-12">
              <div className="d-grid">
                <button className="btn btn-primary rounded-pill" type="submit">Sign in</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section> */}
  {/* ============================================*/}
  {/* <section> begin ============================*/}
  <section className="" id="articles">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/blog-post.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
          </div>
       
          <h1 className="text-center mt-md-3 " style={{marginTop:"-100px"}} >Les Articles</h1>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/dot-bg.png)', backgroundPosition: 'top left', backgroundSize: 'auto'}}>
    </div>
    <div className="container" style={{marginTop :"-150px"}}>
      <div className="row">
    
        <div className="col-sm-6 col-lg-3 mb-4">
          <div className="card h-100 shadow card-span rounded-3"><img className="card-img-top rounded-top-3 h-100" src="assets/img/gallery/so1.jpg" alt="news" />
            <div className="card-body"><span className="fs--1 text-primary me-3 "> <PiArticleLight size={18}/> Santé</span>
              
              <h5 className="font-base fs-lg-0 fs-xl-1 mt-3 ">SOPK (Causes, Symptômes, Diagnostic, Régime alimentaire et Traitement) </h5>
              <a className="stretched-link mb-2" href="https://www.apollohospitals.com/fr/diseases-and-conditions/what-is-pcod-causes-symptoms-treatment" target="_blank">Lire l'article complet</a>
            </div>
          </div>
        </div>

           <div className="col-sm-6 col-lg-3 mb-4">
          <div className="card h-100 shadow card-span rounded-3"><img className="card-img-top rounded-top-3 h-100" src="assets/img/gallery/gere.jpg" alt="news" />
            <div className="card-body"><span className="fs--1 text-primary me-3"><PiArticleLight size={18}/> Mode de vie</span>
             
              <h5 className="font-base fs-lg-0 fs-xl-1 mb-4  mt-3">Comprendre et gérer le syndrome des ovaires polykystiques (SOPK)</h5>
              <a className="stretched-link  mb-2" href="https://www.holite.fr/blogs/news/comprendre-et-gerer-le-syndrome-des-ovaires-polykystiques-sopk" target="_blank">Lire l'article complet</a>
            </div>
          </div>
        </div>

        
        <div className="col-sm-6 col-lg-3 mb-4">
          <div className="card h-100 shadow card-span rounded-3"><img className="card-img-top rounded-top-3 h-100" src="assets/img/gallery/regime.jpg" alt="news" />
            <div className="card-body"><span className="fs--1 text-primary me-3"><PiArticleLight size={18}/> Régimes</span>
              
              <h5 className="font-base fs-lg-0 fs-xl-1  mt-3">Alimentation et SOPK : Les 8 grands principes d’une alimentation adaptée à ton SOPK</h5>
              <a className="stretched-link mb-2" href="https://sova-care.com/blogs/sopk/les-bases-alimentation-sopk" target="_blank">Lire l'article complet</a>
            </div>
          </div>
        </div>
     



            <div className="col-sm-6 col-lg-3 mb-4">
          <div className="card h-100 shadow card-span rounded-3"><img className="card-img-top rounded-top-3 h-100" src="assets/img/gallery/depression.jpeg" alt="news" />
            <div className="card-body"><span className="fs--1 text-primary me-3"><PiArticleLight size={18}/> Santé mentale</span>
           
              <h5 className="font-base fs-lg-0 fs-xl-1 mb-4  mt-3">Dépression, anxiété et le syndrome des ovaires polykystiques (SOPK)</h5>
              <a className="stretched-link mb-2" href="https://helloclue.com/fr/articles/sopk/depression-anxiete-et-le-syndrome-des-ovaires-polykystiques-sopk" target="_blank">Lire l'article complet</a>
            </div>
          </div>
        </div>


      </div>
    </div>
  </section>
</div>




<PiedPage/>
    </>
  )
}
