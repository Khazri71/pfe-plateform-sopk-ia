import React from 'react'

export const Regime = () => {
  return (
    <>
{/* 
 <section className="">
   <div className="container">
      <div className="row">
        <div className="col-12 pt-3">
          <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/doctors-us.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
          </div>
          <h1 className="text-center">OUR DOCTORS</h1>
        </div>
      </div>
    </div> 
  </section> */}
    <h1 className="text-center  my-5">Le régime personnalisé proposé est le régime <p style={{color: "#1b71a1"}}> Primal </p></h1>
    <section className="pb-5" style={{marginTop:"-130px"}}>
    <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/doctors-bg.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
    </div>
    <div className="container">
      <div className="row flex-center">
        <div className="col-xl-10 px-0">
          <div className="carousel slide" id="carouselExampleDark" data-bs-ride="carousel"><a className="carousel-control-prev carousel-icon z-index-2" href="#carouselExampleDark" role="button" data-bs-slide="prev"><span className="carousel-control-prev-icon" aria-hidden="true" /><span className="visually-hidden">Previous</span></a><a className="carousel-control-next carousel-icon z-index-2" href="#carouselExampleDark" role="button" data-bs-slide="next"><span className="carousel-control-next-icon" aria-hidden="true" /><span className="visually-hidden">Next</span></a>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval={10000}>


                <div className="row h-100 m-lg-7 mx-3 mt-6 mx-md-4 my-md-7">


                  <div className="col-md-4 mb-8 mb-md-0">
                    <div className="card card-span h-100 shadow">
                      <div className="card-body d-flex flex-column flex-center py-5 rounded-circle">
                        <img src="assets/img/gallery/reg1.jpg" className="rounded-circle" width={120} height={120} alt="..." />
                        <h5 className="mt-3">Le jour 1 Lundi</h5>
                        {/* <p className="mb-0 fs-xxl-1"><strong>Régime Primal</strong></p> */}
                        <p className="mb-0 fs-xxl-1 mb-2"><strong>Les 3 repas</strong></p>
                        <a className="text-600 mb-0 text-center mb-3"  href="#">Peanut Butter And Chocolate Oatmeal</a>
                        <a className="text-600 mb-0 text-center mb-3" href="#">Lentil Salad With Vegetables</a>
                        <a className="text-600 mb-0 text-center" href="#">Asian Noodles</a>
                        <div className="text-center">
                          {/* <button className="btn btn-outline-secondary rounded-pill" type="submit">View Profile</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-8 mb-md-0">
                    <div className="card card-span h-100 shadow">
                      <div className="card-body d-flex flex-column flex-center py-5"><img src="assets/img/gallery/jane.png" width={128} alt="..." />
                        <h5 className="mt-3">Jane Flakis</h5>
                        <p className="mb-0 fs-xxl-1">Gynaecology, Abenka Care</p>
                        <p className="text-600 mb-0">Melbourne, Australia</p>
                        <p className="text-600 mb-4">12 years experience</p>
                        <div className="text-center">
                          <button className="btn btn-outline-secondary rounded-pill" type="submit">View Profile</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-8 mb-md-0">
                    <div className="card card-span h-100 shadow">
                      <div className="card-body d-flex flex-column flex-center py-5"><img src="assets/img/gallery/leo-mario.png" width={128} alt="..." />
                        <h5 className="mt-3">Leo Mario</h5>
                        <p className="mb-0 fs-xxl-1">Physiotherapy, FitCare</p>
                        <p className="text-600 mb-0">London, England</p>
                        <p className="text-600 mb-4">25 years experience</p>
                        <div className="text-center">
                          <button className="btn btn-secondary hover-top rounded-pill border-0" type="submit">View Profile</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              
              <div className="carousel-item" data-bs-interval={2000}>
                <div className="row h-100 m-lg-7 mx-3 mt-6 mx-md-4 my-md-7">
                  <div className="col-md-4 mb-8 mb-md-0">
                    <div className="card card-span h-100 shadow">
                      <div className="card-body d-flex flex-column flex-center py-5"><img src="assets/img/gallery/anita.png" width={128} alt="..." />
                        <h5 className="mt-3">Anita Deshai</h5>
                        <p className="mb-0 fs-xxl-1">Pediatrics, Gochi Medicine</p>
                        <p className="text-600 mb-0">Florida, United States</p>
                        <p className="text-600 mb-4">10 years experience</p>
                        <div className="text-center">
                          <button className="btn btn-outline-secondary rounded-pill" type="submit">View Profile</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-8 mb-md-0">
                    <div className="card card-span h-100 shadow">
                      <div className="card-body d-flex flex-column flex-center py-5"><img src="assets/img/gallery/jane.png" width={128} alt="..." />
                        <h5 className="mt-3">Jane Flakis</h5>
                        <p className="mb-0 fs-xxl-1">Gynaecology, Abenka Care</p>
                        <p className="text-600 mb-0">Melbourne, Australia</p>
                        <p className="text-600 mb-4">12 years experience</p>
                        <div className="text-center">
                          <button className="btn btn-outline-secondary rounded-pill" type="submit">View Profile</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-8 mb-md-0">
                    <div className="card card-span h-100 shadow">
                      <div className="card-body d-flex flex-column flex-center py-5"><img src="assets/img/gallery/leo-mario.png" width={128} alt="..." />
                        <h5 className="mt-3">Leo Mario</h5>
                        <p className="mb-0 fs-xxl-1">Physiotherapy, FitCare</p>
                        <p className="text-600 mb-0">London, England</p>
                        <p className="text-600 mb-4">25 years experience</p>
                        <div className="text-center">
                          <button className="btn btn-secondary hover-top rounded-pill border-0" type="submit">View Profile</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="carousel-item">
                <div className="row h-100 m-lg-7 mx-3 mt-6 mx-md-4 my-md-7">
                  <div className="col-md-4 mb-8 mb-md-0">
                    <div className="card card-span h-100 shadow">
                      <div className="card-body d-flex flex-column flex-center py-5"><img src="assets/img/gallery/anita.png" width={128} alt="..." />
                        <h5 className="mt-3">Anita Deshai</h5>
                        <p className="mb-0 fs-xxl-1">Pediatrics, Gochi Medicine</p>
                        <p className="text-600 mb-0">Florida, United States</p>
                        <p className="text-600 mb-4">10 years experience</p>
                        <div className="text-center">
                          <button className="btn btn-outline-secondary rounded-pill" type="submit">View Profile</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    
    </>
  )
}
