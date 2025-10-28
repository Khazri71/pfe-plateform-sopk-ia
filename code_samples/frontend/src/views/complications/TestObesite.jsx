
import React  , {useEffect, useState} from 'react'
import { BarreNavigation } from '../../layouts/BarreNavigation'
import { FormTest } from '../../layouts/FormTest'
import { PiedPage } from '../../layouts/PiedPage'
import axios from 'axios'

export const TestObesite = () => {

    const titlepred = "d'obésité "
      const imgUrl = "assets/img/gallery/obes2.png"
        
      const [formData , setFormData] = useState({})
      const [success ,setSuccess]  = useState('')
      const [prediction , setPrediction] = useState('')
      const [diet , setDiet] = useState('')
      const[error , setError] = useState('')

      
        const [age, setAge] = useState();
         const [height, setHeight] = useState();
         const [weight, setWeight] = useState();
            
      
    
      
      const userId = localStorage.getItem('currentUserId');
      const token = localStorage.getItem('token');
    
      // localStorage.setItem('resultat_test_obesite', prediction);
      // const  resultatTestObesite =  localStorage.getItem('resultat_test_obesite');

      //***********Récupérer les données de localstorage */
                const [resultatTestObesite, setResultatTestObesite] = useState('');
                useEffect(() => {
                   const currentUserId = localStorage.getItem('currentUserId');
                   if (currentUserId) {
                   const userData = localStorage.getItem(`user_${currentUserId}`);
                   if (userData) {
                   const user = JSON.parse(userData);
                   setResultatTestObesite(user.resultat_test_obesite || '');
                   }

                    //  ===
       const infoData = localStorage.getItem(`userInfo_${currentUserId}`);
           if (infoData) {
            const info = JSON.parse(infoData);
            setAge(info.age);
            setHeight(info.height);
            setWeight(info.weight);

           }
      //  ====
                 }
                }, []);

      
      const fields = [
            { id: "Age", placeholder: "Age" , description: "Age (années)"},
            { id: "Height", placeholder: "Height | ex : 1.65" , description: "Taille (m)"  },
            { id: "Weight", placeholder: "weight | ex : 65.8", description: "Poids (kg)" },
            { id: "family_history_with_overweight", type: "select", options: ['Y', 'N'] , description: "Antécédents familiaux d'obésité ? (Y = oui, N = non)"  },
            { id: "FAVC", type: "select", options: ['Y', 'N'] , description: "Consommation fréquente d’aliments caloriques ? (Y = oui, N = non)" },
            { id: "FCVC", placeholder: "FCVC | ex : 1.9" , description: "Portions de légumes par repas (unités)"},
            { id: "NCP", placeholder: "NCP | ex : 2.0" , description: "Nombre de repas principaux par jour"},
            { id: "CAEC", type: "select", options: ['No', 'Sometimes' , 'Frequently' , 'Always'] , description: "Grignotage entre les repas"},
            { id: "SMOKE", type: "select", options: ['Y', 'N'] , description: "Fumeur ? (Y = oui, N = non)" },
            { id: "CH2O", placeholder: "CH2O | ex : 1.3", description: "Consommation d’eau par jour (litres)" },
            { id: "SCC", type: "select", options: ['Y', 'N'] , description: "Suivi de calories ? (Y = oui, N = non)" },
            { id: "FAF", placeholder: "FAF | ex : 0.5", description: "Activité physique (heures/semaine)" },
            { id: "TUE", placeholder: "TUE | ex : 1.75" , description: "Temps devant un écran (heures/jour)"},
            { id: "CALC", type: "select", options: ['No', 'Sometimes', 'Frequently'] , description: "Consommation d’alcool" },
            { id: "MTRANS", type: "select", options: ['Public_Transportation', 'Motorbike', 'Automobile', 'Walking'], description: "Moyen de transport principal" },   
      ]


      const normalizeFormData = (formData) => {
  const toFloat = (val) => parseFloat(val) || 0;
  const toInt = (val) => parseInt(val, 10) || 0;

  return {
    "Age": toInt(age),
    "Height": toFloat(height),
    "Weight": toFloat(weight),
    "family_history_with_overweight": formData["family_history_with_overweight"], // yes/no
    "FAVC": formData["FAVC"],                         // yes/no
    "FCVC": toFloat(formData["FCVC"]),
    "NCP": toFloat(formData["NCP"]),
    "CAEC": formData["CAEC"],                         // ex: Frequently
    "SMOKE": formData["SMOKE"],                       // yes/no
    "CH2O": toFloat(formData["CH2O"]),
    "SCC": formData["SCC"],                           // yes/no
    "FAF": toFloat(formData["FAF"]),
    "TUE": toFloat(formData["TUE"]),
    "CALC": formData["CALC"],                         // ex: Frequently
    "MTRANS": formData["MTRANS"]                      // ex: Automobile
  };
};


const resetFormData = () => {
  setFormData({
    Age: "",
    Height: "",
    Weight: "",
    family_history_with_overweight: "",
    FAVC: "",
    FCVC: "",
    NCP: "",
    CAEC: "",
    SMOKE: "",
    CH2O: "",
    SCC: "",
    FAF: "",
    TUE: "",
    CALC: "",
    MTRANS: ""
  });
};



  const handleChange = (e) => {
       const { id, value } = e.target;
       setFormData((prev) => ({ ...prev, [id]: value }));
  }

  const handleSubmit =  async (e) => {
        e.preventDefault()

      try {
      // Normaliser les données
      const normalizedData = normalizeFormData(formData);
      const response = await axios.post(`http://localhost:5000/test_obesity/${userId}`, normalizedData , {
      headers: {
          Authorization: `Bearer ${token}`
      }
     })
      // Si succès
       setSuccess(true);
       setPrediction(response.data.anomaly);
        // Met à jour l'objet user dans localStorage
       const currentUserId = localStorage.getItem('currentUserId');
       if (currentUserId) {
       const userData = localStorage.getItem(`user_${currentUserId}`);
       if (userData) {
        const user = JSON.parse(userData);
        user.resultat_test_obesite = response.data.anomaly;
        localStorage.setItem(`user_${currentUserId}`, JSON.stringify(user));
        // Met à jour le state aussi
        setResultatTestObesite(response.data.anomaly);
      }

      
    }




resetFormData();


      }
       catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error); // Affiche "Email existe déjà" par exemple
        } else {
          setError("Une erreur s'est produite");
        }
    }
  }

   const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}





//-------------- Start Tests

// # Insufficient_Weight => 0
// # Normal_Weight => 1
// # Obesity_Type_I => 2
// # Obesity_Type_III => 3
// # Overweight_Level_I => 4
// # Overweight_Level_II => 5



// # Poids_Insuffisant => 0
// # Poids_Normal => 1
// # Obésité_Type_I => 2
// # Obésité_Type_III => 3
// # Surpoids_Niveau_I => 4
// # Surpoids_Niveau_II => 5


// PoidsInsuffisant
  const handleAutoFillPoidsInsuffisant = () => {
    setFormData({
    "Age": 21,
    "Height": 1.68,
    "Weight": 45.0,
    "family_history_with_overweight": "N",
    "FAVC": "N",
    "FCVC": 2.5,
    "NCP": 3.0,
    "CAEC": "No",
    "SMOKE": "N",
    "CH2O": 2.0,
    "SCC": "N",
    "FAF": 1.5,
    "TUE": 1.0,
    "CALC": "No",
    "MTRANS": "Walking"

    });
  } 


  // PoidsNormal
   const handleAutoFillPoidsNormal = () => {
    setFormData({
      
    "Age": 24,
    "Height": 1.65,
    "Weight": 55.0,
    "family_history_with_overweight": "N",
    "FAVC": "N",
    "FCVC": 3.0,
    "NCP": 3.0,
    "CAEC": "Sometimes",
    "SMOKE": "N",
    "CH2O": 2.0,
    "SCC": "N",
    "FAF": 2.5,
    "TUE": 1.5,
    "CALC": "Sometimes",
    "MTRANS": "Public_Transportation"
  
    });
  } 


  // ObesiteTypeI
   const handleAutoFillObesiteTypeI= () => {
    setFormData({
   
  "Age": 29,
  "Height": 1.58,
  "Weight": 78.5,
  "family_history_with_overweight": "Y",
  "FAVC": "Y",
  "FCVC": 1.7,
  "NCP": 4.0,
  "CAEC": "Frequently",
  "SMOKE": "N",
  "CH2O": 1.2,
  "SCC": "Y",
  "FAF": 0.8,
  "TUE": 0.5,
  "CALC": "Sometimes",
  "MTRANS": "Automobile"



    });
  } 


  // ObesiteTypeIII
   const handleAutoFillObesiteTypeIII = () => {
    setFormData({

        
  "Age": 29,
  "Height": 1.58,
  "Weight": 120.0,
  "family_history_with_overweight": "Y",
  "FAVC": "Y",
  "FCVC": 1.0,
  "NCP": 5.0,
  "CAEC": "Always",
  "SMOKE": "N",
  "CH2O": 0.5,
  "SCC": "Y",
  "FAF": 0.0,
  "TUE": 0.0,
  "CALC": "Frequently",
  "MTRANS": "Automobile"

 
    });
  } 


  // SurpoidsNiveauI 
   const handleAutoFillSurpoidsNiveauI = () => {
    setFormData({
    
        
    "Age": 29,
    "Height": 1.63,
    "Weight": 70.0,
    "family_history_with_overweight": "Y",
    "FAVC": "Y",
    "FCVC": 2.0,
    "NCP": 4.0,
    "CAEC": "Sometimes",
    "SMOKE": "N",
    "CH2O": 1.5,
    "SCC": "N",
    "FAF": 1.0,
    "TUE": 1.0,
    "CALC": "Sometimes",
    "MTRANS": "Motorbike"
  


    });
  } 

 
   //  SurpoidsNiveauII  
   const handleAutoFillSurpoidsNiveauII   = () => {
    setFormData({
     
  "Age": 36,
  "Height": 1.70,
  "Weight": 84.5,
  "family_history_with_overweight": "Y",
  "FAVC": "Y",
  "FCVC": 2.0,
  "NCP": 4.0,
  "CAEC": "Frequently",
  "SMOKE": "N",
  "CH2O": 1.0,
  "SCC": "N",
  "FAF": 0.5,
  "TUE": 4.0,
  "CALC": "Frequently",
  "MTRANS": "Automobile"


    });
  } 


//--------------- End Tests
           







 
  return (
    <>
     
          {/* <BarreNavigation /> */}
           
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
             options={fields.options}
             resultatTest={resultatTestObesite}
             error={error}
             handleAutoFillPoidsInsuffisant  = {handleAutoFillPoidsInsuffisant}
             handleAutoFillPoidsNormal = {handleAutoFillPoidsNormal}
             handleAutoFillObesiteTypeI = {handleAutoFillObesiteTypeI}
             handleAutoFillObesiteTypeIII = {handleAutoFillObesiteTypeIII}
             handleAutoFillSurpoidsNiveauI = {handleAutoFillSurpoidsNiveauI}
             handleAutoFillSurpoidsNiveauII = {handleAutoFillSurpoidsNiveauII}
                  />
                 {/* <PiedPage /> */}
       
     

    </>
  )
}
