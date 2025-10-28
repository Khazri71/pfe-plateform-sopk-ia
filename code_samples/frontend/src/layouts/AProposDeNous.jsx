import React from 'react'

export const AProposDeNous = () => {
  return (
    <>

     {/* ============================================*/}
   <section className="bg-secondary" id="apropos">
    <div className="bg-holder" style={{backgroundImage: 'url(assets/img/gallery/bg-eye-care.png)', backgroundPosition: 'center', backgroundSize: 'contain'}}>
    </div>
    {/*/.bg-holder*/}
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-5 col-xxl-6"><img className="img-fluid rounded-3" src="assets/img/gallery/head1.jpg" alt="..." /></div>
        <div className="col-md-7 col-xxl-6 text-center text-md-start">
          {/* <h2 className="fw-bold text-light mb-4 mt-4 mt-lg-0">À propos de nous<br className="d-none d-sm-block" />and In Budget.</h2> */}
          <h2 className="fw-bold text-light mb-4 mt-4 mt-lg-0">À propos de nous</h2>
          <p className="text-light">
           Chez SOPK IA, nous combinons l’intelligence artificielle et l’expertise médicale pour vous offrir un diagnostic complet du SOPK et de ses complications. Grâce à des tests spécialisés, incluant l’analyse échographique et le dépistage des maladies similaires, notre plateforme vous propose un suivi personnalisé basé sur des technologies avancées comme le machine learning, le deep learning et le traitement du langage naturel. En plus du diagnostic, vous bénéficiez de recommandations alimentaires adaptées à votre profil, ainsi que d’articles utiles et informatifs pour mieux comprendre le SOPK et prendre soin de votre santé féminine.
            {/* <br className="d-none d-sm-block" />
            For us, there is nothing more important than the health of
             <br className="d-none d-sm-block" />you and your loved ones.  */}
             </p>
          <div className="py-3"><a className="btn btn-lg btn-light rounded-pill" href="#sopk" role="button">En savoir plus</a></div>
        </div>
      </div>
    </div>
  </section>
  {/* ============================================*/}
    
    
    
    
    
    </>
  )
}
