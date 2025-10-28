import React, { useEffect, useState } from 'react'
import { BarreNavigation} from '../../layouts/BarreNavigation'
import { PiedPage } from '../../layouts/PiedPage'
import { ImageBackground } from '../../layouts/ImageBackground'
import { IoChevronBack } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Regime } from '../../layouts/Regime';
import { FormTest } from '../../layouts/FormTest';

export const TestSopk = () => {



  const titlepred = "du SOPK"
  const imgUrl = "assets/img/gallery/sopk1.png"
    
  const [formData , setFormData] = useState({})
  const [success ,setSuccess]  = useState('')
  const [prediction , setPrediction] = useState('')
  const [diet , setDiet] = useState('')
  const[error , setError] = useState(null)


  
 
  


  const [age, setAge] = useState(0);
  //  const [height, setHeight] = useState();
   const [weight, setWeight] = useState(0);
      


  
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('currentUserId');
  

   //***********Récupérer les données de localstorage */
    const [resultatTestSopk, setResultatTestSopk] = useState('');
    useEffect(() => {
       const currentUserId = localStorage.getItem('currentUserId');
       if (currentUserId) {
       const userData = localStorage.getItem(`user_${currentUserId}`);
       if (userData) {
       const user = JSON.parse(userData);
       setResultatTestSopk(user.resultat_test_sopk || '');
       }
      //  ===
       const infoData = localStorage.getItem(`userInfo_${currentUserId}`);
           if (infoData) {
            const info = JSON.parse(infoData);
            setAge(info.age);
            // setHeight(info.height);
            setWeight(info.weight);

           }
      //  ====
     }
    }, []);



    

  // console.log("Test SOPK" + age , height , weight)
  // console.log('Type de age:', typeof age); 
  // console.log('Type de age:', typeof height); 
  // console.log('Type de age:', typeof weight); 





  const fields = [
    { id: "Follicle No. (R)", placeholder: "Follicle No. (R) | ex : 14", description: "Follicules dans l'ovaire droit"  },
    { id: "hair growth(Y/N)", type: "select", options: ['Y', 'N'] , description: "Pilosité excessive ? (Y = oui, N = non)"},
    { id: "Cycle(R/I)", type: "select", options: ['Régulier', 'Irrégulier'] , description: "Type de cycle menstruel"  },
    { id: "Weight gain(Y/N)", type: "select", options: ['Y', 'N']  , description: "Gain de poids ? (Y = oui, N = non)"},
    { id: "Skin darkening (Y/N)", type: "select", options: ['Y', 'N'] , description: "Assombrissement de la peau ? (Y = oui, N = non)"},
    { id: "Fast food (Y/N)", type: "select", options: ['Y', 'N'] , description: "Consommation de fast food ? (Y = oui, N = non)"},
    { id: "Follicle No. (L)", placeholder: "Follicle No. (L) | ex : 14" , description: "Follicules dans l'ovaire gauche" },
    { id: "Pimples(Y/N)", type: "select", options: ['Y', 'N'], description: "Présence de boutons ? (Y = oui, N = non)"  },
    { id: "Cycle length(days)", placeholder: "Cycle length(days) | ex : 30" , description: "Durée du cycle (jours)" },
    { id: "Reg.Exercise(Y/N)", type: "select", options: ['Y', 'N'] , description: "Exercice régulier ? (Y = oui, N = non)"},
    { id: "Hair loss(Y/N)", type: "select", options: ['Y', 'N'] , description: "Chute de cheveux ? (Y = oui, N = non)"  },
    { id: "Marraige Status (Yrs)", placeholder: "Marriage Status (Yrs) | ex : 3" , description: "Années de mariage"},
    { id: "AMH(ng/mL)", placeholder: "AMH(ng/mL) | ex : 8.5" , description: "Taux d'AMH (ng/mL)"},
    { id: "LH(mIU/mL)", placeholder: "LH(mIU/mL) | ex : 12.5" , description: "Taux de LH (mIU/mL)" },
    { id: "BP _Systolic (mmHg)", placeholder: "BP _Systolic (mmHg) | ex : 120" , description: "Pression systolique (mmHg)"},
    { id: "TSH (mIU/L)", placeholder: "TSH (mIU/L) | ex : 3.9" , description: "Taux de TSH (mIU/L)" },
    { id: "I   beta-HCG(mIU/mL)", placeholder: "I beta-HCG(mIU/mL) | ex : 1.2" , description: "Taux de bêta-HCG (mIU/L)"  },
    { id: "Avg. F size (R) (mm)", placeholder: "Avg. F size (R) (mm) | ex : 6.5" , description: "Taille moyenne des follicules (D) (mm)" },
    { id: "PRL(ng/mL)", placeholder: "PRL(ng/mL) | ex : 13.2" , description: "Taux de prolactine (ng/mL)"  },
    { id: "Weight (Kg)", placeholder: "Weight (Kg) | ex : 81" , description: "Poids (kg)" },
    { id: "Hip(inch)", placeholder: "Hip(inch) | ex : 38" , description: "Tour de hanches (inch)"  },
    { id: "No. of abortions", placeholder: "No. of abortions | ex : 0" , description: "Nombre d’avortements" },
    { id: "Hb(g/dl)", placeholder: "Hb(g/dl) | ex : 12.3" , description: "Taux d’hémoglobine (g/dl)"},
    { id: "Avg. F size (L) (mm)", placeholder: "Avg. F size (L) (mm) | ex : 6.5" , description: "Taille moyenne des follicules (G) (mm)"  },
    { id: "Blood Group", type: "select", options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] , description: "Groupe sanguin"},
    { id: "PRG(ng/mL)", placeholder: "PRG(ng/mL) | ex : 3.2" , description: "Taux de progestérone (ng/mL)"},
    { id: "Age (yrs)", placeholder: "Age | ex : 26" , description: "Age (années)"},
    { id: "RBS(mg/dl)", placeholder: "RBS(mg/dl) | ex : 110" , description: "Glycémie aléatoire (mg/dl)" },
    { id: "Waist:Hip Ratio", placeholder: "Waist:Hip Ratio | ex : 0.92" , description: "Rapport taille/hanches" },
  ]; 

const normalizeFormData = (formData) => {
  const toFloat = (val) => parseFloat(val) || 0; // Convertir en float ou 0 si la conversion échoue
  const toInt = (val) => parseInt(val, 10) || 0; // Convertir en int ou 0 si la conversion échoue

  return {
    "Follicle No. (R)": toInt(formData["Follicle No. (R)"]),
    "hair growth(Y/N)": formData["hair growth(Y/N)"], // Laisser tel quel si le backend le gère
    "Cycle(R/I)": formData["Cycle(R/I)"], // Laisser tel quel si le backend le gère
    "Weight gain(Y/N)": formData["Weight gain(Y/N)"], // Laisser tel quel
    "Skin darkening (Y/N)": formData["Skin darkening (Y/N)"], // Laisser tel quel
    "Fast food (Y/N)": formData["Fast food (Y/N)"], // Laisser tel quel
    "Follicle No. (L)": toInt(formData["Follicle No. (L)"]),
    "Pimples(Y/N)": formData["Pimples(Y/N)"], // Laisser tel quel
    "Cycle length(days)": toInt(formData["Cycle length(days)"]),
    "Reg.Exercise(Y/N)": formData["Reg.Exercise(Y/N)"], // Laisser tel quel
    "Hair loss(Y/N)": formData["Hair loss(Y/N)"], // Laisser tel quel
    "Marraige Status (Yrs)": toInt(formData["Marraige Status (Yrs)"]),
    "AMH(ng/mL)": toFloat(formData["AMH(ng/mL)"]),
    "LH(mIU/mL)": toFloat(formData["LH(mIU/mL)"]),
    "BP _Systolic (mmHg)": toInt(formData["BP _Systolic (mmHg)"]),
    "TSH (mIU/L)": toFloat(formData["TSH (mIU/L)"]),
    "I   beta-HCG(mIU/mL)": toFloat(formData["I   beta-HCG(mIU/mL)"]),
    "Avg. F size (R) (mm)": toFloat(formData["Avg. F size (R) (mm)"]),
    "PRL(ng/mL)": toFloat(formData["PRL(ng/mL)"]),
    "Weight (Kg)": toFloat(weight),
    "Hip(inch)": toFloat(formData["Hip(inch)"]),
    "No. of abortions": toInt(formData["No. of abortions"]),
    "Hb(g/dl)": toFloat(formData["Hb(g/dl)"]),
    "Avg. F size (L) (mm)": toFloat(formData["Avg. F size (L) (mm)"]),
    "Blood Group": formData["Blood Group"], // Laisser tel quel si le backend le gère
    "PRG(ng/mL)": toFloat(formData["PRG(ng/mL)"]),
    "Age (yrs)": toInt(age),
    "RBS(mg/dl)": toFloat(formData["RBS(mg/dl)"]),
    "Waist:Hip Ratio": toFloat(formData["Waist:Hip Ratio"])
  }
}



const resetFormData = () => {
  setFormData({
    "Follicle No. (R)": "",
    "hair growth(Y/N)": "",
    "Cycle(R/I)": "",
    "Weight gain(Y/N)": "",
    "Skin darkening (Y/N)": "",
    "Fast food (Y/N)": "",
    "Follicle No. (L)": "",
    "Pimples(Y/N)": "",
    "Cycle length(days)": "",
    "Reg.Exercise(Y/N)": "",
    "Hair loss(Y/N)": "",
    "Marraige Status (Yrs)": "",
    "AMH(ng/mL)": "",
    "LH(mIU/mL)": "",
    "BP _Systolic (mmHg)": "",
    "TSH (mIU/L)": "",
    "I   beta-HCG(mIU/mL)": "",
    "Avg. F size (R) (mm)": "",
    "PRL(ng/mL)": "",
    "Weight (Kg)": "",
    "Hip(inch)": "",
    "No. of abortions": "",
    "Hb(g/dl)": "",
    "Avg. F size (L) (mm)": "",
    "Blood Group": "",
    "PRG(ng/mL)": "",
    "Age (yrs)": "",
    "RBS(mg/dl)": "",
    "Waist:Hip Ratio": ""
  });
};






// ================

// const intFields = [
// const numbFields = [
//   "Follicle No. (R)",
//   "Follicle No. (L)",
//   "Cycle length(days)",
//   "Marraige Status (Yrs)",
//   "BP _Systolic (mmHg)",
//   "No. of abortions",
//   "Age (yrs)",
// ];


// const floatFields = [
//   "AMH(ng/mL)",
//   "LH(mIU/mL)",
//   "TSH (mIU/L)",
//   "I   beta-HCG(mIU/mL)",
//   "Avg. F size (R) (mm)",
//   "PRL(ng/mL)",
//   "Weight (Kg)",
//   "Hip(inch)",
//   "Hb(g/dl)",
//   "Avg. F size (L) (mm)",
//   "PRG(ng/mL)",
//   "RBS(mg/dl)",
//   "Waist:Hip Ratio"
// ];

// const selectFields = [

//   "hair growth(Y/N)",
//     "Cycle(R/I)",
//     "Weight gain(Y/N)",
//     "Skin darkening (Y/N)",
//     "Fast food (Y/N)",
//      "Pimples(Y/N)",
//       "Reg.Exercise(Y/N)",
//     "Hair loss(Y/N)",
//       "Blood Group"
// ];

// const validateForm = (formD) => {
//   for (const key in formD) {
//     const value = formD[key];
    
//     if (!value) {
//       return `Le champ "${key}" est requis.`;
//       // return `Tous les champ doivent étre requis.`;
//     }
//     if (intFields.includes(key) && isNaN(parseInt(value))) {
//       return `Le champ "${key}" doit être un entier valide.`;
//     }
//     if (floatFields.includes(key) && isNaN(parseFloat(value))) {
//       return `Le champ "${key}" doit être un nombre à virgule valide.`;
//     }
//   }
//   return null;
// };

// const validateForm = (formD , selFields) => {
//   for (const key in formD) {
//     const value = formD[key];
    
//     if (!value) {
//       // return "Tous Les champs sont requis";
//        return `Le champ "${key}" est requis.`;
//     }
  
//     //  if (!selectFields.includes(key)) {
//     //   const number = Number(value);
//     //   if (isNaN(number)) {
//     //     return `Le champ "${key}" doit être un nombre.`;
//     //   }
//     // }

//     if (typeof value === 'string') {
//       // return "Tous Les champs sont requis";
//        return `Le champ "${key}" doit être un nombre.`;
//     }
   
//   }
//   return null;
// };

// const validateForm = (formD, numbFields) => {
//   for (const key in formD) {
//     const rawValue = formD[key];
//     const value = rawValue?.toString().trim(); // Pour gérer les champs numériques ou null

//     const label = key;

//     // Vérifie si le champ est vide
//     if (!value) {
//       return `Le champ "${label}" est requis.`;
//     }

//     // Vérifie si le champ doit être un nombre
//     if (numbFields.includes(key) && isNaN(Number(value))) {
//       return `Le champ "${label}" doit être un nombre valide.`;
//     }
//   }

//   return null; // Formulaire valide
// };






// ====================





  const handleChange = (e) => {
       const { id, value } = e.target;
       setFormData((prev) => ({ ...prev, [id]: value }));
  }

  const handleSubmit =  async (e) => {
      e.preventDefault()
     

       // Étape 1: Créer une copie de formData en y incluant les bons champs
  // const updatedFormData = {
  //   ...formData,
  //   age: age,
  //   height: height,
  //   weight: weight
  // };


 
    
  
      try {
   
      // Normaliser les données
      const normalizedData = normalizeFormData(formData);

      const response = await axios.post(`http://localhost:5000/test_pcos/${userId}`, normalizedData , {
      headers: {
          Authorization: `Bearer ${token}`
      }
     })
       
       setPrediction(response.data.anomaly);
        // Met à jour l'objet user dans localStorage
       const currentUserId = localStorage.getItem('currentUserId');
       if (currentUserId) {
       const userData = localStorage.getItem(`user_${currentUserId}`);
       if (userData) {
        const user = JSON.parse(userData);
        user.resultat_test_sopk = response.data.anomaly;
        localStorage.setItem(`user_${currentUserId}`, JSON.stringify(user));
        // Met à jour le state aussi
        setResultatTestSopk(response.data.anomaly);
      }
    }
     
       resetFormData()
      }
       catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error); 
        } else {
          setError("Une erreur s'est produite");
        }
        //  setError("Une erreur s'est produite");
        
    }
  }

 
  const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}






//-------------- Start Tests


// Non SOPK 
  const handleAutoFillSopkNon = () => {
    setFormData({
     "Follicle No. (R)": 5,
   "hair growth(Y/N)": "N",
   "Cycle(R/I)": "Régulier",
   "Weight gain(Y/N)": "N",
   "Skin darkening (Y/N)": "N",
   "Fast food (Y/N)": "N",
   "Follicle No. (L)": 4,
   "Pimples(Y/N)": "N",
   "Cycle length(days)": 28,
   "Reg.Exercise(Y/N)": "Y",
   "Hair loss(Y/N)": "N",
   "Marraige Status (Yrs)": 1,
   "AMH(ng/mL)": 3.2,
   "LH(mIU/mL)": 6.5,
   "BP _Systolic (mmHg)": 118,
   "TSH (mIU/L)": 2.1,
   "I   beta-HCG(mIU/mL)": 0.5,
   "Avg. F size (R) (mm)": 14.0,
   "PRL(ng/mL)": 16.0,
   "Weight (Kg)": 60,
   "Hip(inch)": 38,
   "No. of abortions": 0,
   "Hb(g/dl)": 13.5,
   "Avg. F size (L) (mm)": 15.2,
   "Blood Group": "A+",
   "PRG(ng/mL)": 12.3,
   "Age (yrs)": 27,
   "RBS(mg/dl)": 89,
   "Waist:Hip Ratio": 0.78

    });
  } 


  // Oui SOPK
   const handleAutoFillSopkOui = () => {
    setFormData({
      "Follicle No. (R)": 14,
   "hair growth(Y/N)": "Y",
   "Cycle(R/I)": "Irrégulier",
   "Weight gain(Y/N)": "Y",
   "Skin darkening (Y/N)": "Y",
   "Fast food (Y/N)": "Y",
   "Follicle No. (L)": 12,
   "Pimples(Y/N)": "Y",
   "Cycle length(days)": 45,
   "Reg.Exercise(Y/N)": "N",
   "Hair loss(Y/N)": "Y",
   "Marraige Status (Yrs)": 2,
   "AMH(ng/mL)": 8.5,
   "LH(mIU/mL)": 12.2,
   "BP _Systolic (mmHg)": 130,
   "TSH (mIU/L)": 3.8,
   "I   beta-HCG(mIU/mL)": 2.0,
   "Avg. F size (R) (mm)": 6.0,
   "PRL(ng/mL)": 25.0,
   "Weight (Kg)": 82,
   "Hip(inch)": 40,
   "No. of abortions": 0,
   "Hb(g/dl)": 12.1,
   "Avg. F size (L) (mm)": 6.3,
   "Blood Group": "O+",
   "PRG(ng/mL)": 0.3,
   "Age (yrs)": 26,
   "RBS(mg/dl)": 110,
   "Waist:Hip Ratio": 0.92

    });
  } 





//--------------- End Tests
           

  return (
    <>
        {/* <BarreNavigation /> */}
      {/* <section className="py-5 mt-5 ">
        <div className="container">
          <div className="row">
            <div className="col-12 py-3">
              <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/people.png)', backgroundPosition: 'top center', backgroundSize: 'contain'}}>
              </div>
              <h1 className="text-center">Prédiction du SOPK</h1>
            </div>
          </div>
        </div>
      </section>


       <section className="py-3">
        <div className="container">
          <div className="row">
          

            <div className="bg-holder bg-size" style={{backgroundImage: 'url(assets/img/gallery/dot-bg.png)', backgroundPosition: 'bottom right', backgroundSize: 'auto'}}>
            </div>
            <div className="col-lg-6 z-index-2 mb-5" style={{ marginTop: '-50px' }}><img style={{ width: '95%' }}  src="assets/img/gallery/sopk1.png" alt="..." /></div>
            <div className="col-lg-6 z-index-2">



        <form className="row g-3" onSubmit={handleSubmit}>
          {fields.map(({ id, type, placeholder, options }) => (
            <>
                {type === 'select' ? (
                <div key={id}  class="col-md-6">
                  <label class="form-label visually-hidden" for={id}>{id}</label>
                  <select class="form-select"  id={id}  value={formData[id]} onChange={handleChange}>
                    <option selected="selected">{capitalizeFirstLetter(id)}</option>
                     {options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div> 
                
                ) : (
                  <div className="col-md-6">
                  <label className="visually-hidden" htmlFor={id} >{capitalizeFirstLetter(id)}</label>
                  <input className="form-control form-livedoc-control" id={id}  type="text"  placeholder={placeholder}  value={formData[id]}  onChange={handleChange} />
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
            
                {error && (
                  <div className="col-12">
                    <div className="alert alert-danger text-center">{error}</div>
                  </div>
                )}
                {resultatTestSopk && (
                  <div className="col-12">
                    <div className="alert alert-success text-center">{resultatTestSopk}</div>
                  </div> 
                 )}
          </form>
           </div>
           </div>
          </div>
      </section> */}

       <FormTest
        fields={fields}  
  titlepred={titlepred}
  imgUrl={imgUrl}
  formData={formData}
  handleChange={handleChange}
  handleSubmit={handleSubmit}
  capitalizeFirstLetter={capitalizeFirstLetter}
  id={fields.id}
  type={fields.type}
  placeholder={fields.placeholder}
  description={fields.description}
  options={fields.options}
  resultatTest={resultatTestSopk}
  error={error}
  handleAutoFillSopkNon = {handleAutoFillSopkNon}
  handleAutoFillSopkOui = {handleAutoFillSopkOui}
       />

      {/* <PiedPage /> */}
    </>
  )
}
