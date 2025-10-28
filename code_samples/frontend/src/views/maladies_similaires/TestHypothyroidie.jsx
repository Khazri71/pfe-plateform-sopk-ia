import React , {useEffect, useState} from 'react'
import { FormTest } from '../../layouts/FormTest'
import { BarreNavigation } from '../../layouts/BarreNavigation'
import { PiedPage } from '../../layouts/PiedPage'
import axios from 'axios'


export const TestHypothyroidie = () => {
    
    
      const titlepred = "de l'hypothyroïdie"
      const imgUrl = "assets/img/gallery/thyro.png"
        
      const [formData , setFormData] = useState({})
      const [success ,setSuccess]  = useState('')
      const [prediction , setPrediction] = useState('')
      const [diet , setDiet] = useState('')
      const[error , setError] = useState('')
    
    
       const [age, setAge] = useState(0);
              //  const [height, setHeight] = useState();
              //  const [weight, setWeight] = useState();


      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('currentUserId');
    
      // const  resultatTestHypothyroidie =  localStorage.getItem('resultat_test_hypothyroidie');
         //***********Récupérer les données de localstorage */
          const [resultatTestHypothyroidie, setResultatTestHypothyroidie] = useState('');
          useEffect(() => {
             const currentUserId = localStorage.getItem('currentUserId');
             if (currentUserId) {
             const userData = localStorage.getItem(`user_${currentUserId}`);
             if (userData) {
             const user = JSON.parse(userData);
             setResultatTestHypothyroidie(user.resultat_test_hypothyroidie || '');
             }

                 //  ===
       const infoData = localStorage.getItem(`userInfo_${currentUserId}`);
           if (infoData) {
            const info = JSON.parse(infoData);
            setAge(info.age);
            // setHeight(info.height);
            // setWeight(info.weight);

           }
      //  ====
           }
          }, []);
       
      
    

      const fields = [
          { id: "TSH", placeholder: "TSH | ex : 22.6" , description: "Taux de TSH (hormone stimulant la thyroïde)" },
          { id: "TT4", placeholder: "TT4 | ex : 4.1" , description: "Taux de thyroxine totale (T4)"},
          { id: "TSH_measured", type: "select", options: ['Y', 'N'] , description: "TSH mesurée ? (Y = oui, N = non)"  },
          { id: "Age", placeholder: "Age" , description: "Age (années)"},
          { id: "on_thyroxine", type: "select", options: ['Y', 'N'], description: "Traitement à la thyroxine ? (Y = oui, N = non)" },
          { id: "query_hypothyroid", type: "select", options: ['Y', 'N'] , description: "Suspicion d’hypothyroïdie ? (Y = oui, N = non)"  },
          { id: "T4U", placeholder: "T4U | ex : 0.4", description: "Taux de T4 libre estimé" },
          { id: "T3", placeholder: "T3 | ex : 0.7" , description: "Taux de triiodothyronine (T3)" },
          { id: "thyroid_surgery", type: "select", options: ['Y', 'N'] , description: "Chirurgie de la thyroïde antérieure ? (Y = oui, N = non)"},
          { id: "query_on_thyroxine", type: "select", options: ['Y', 'N'] , description: "Suspicion de traitement à la thyroxine ? (Y = oui, N = non)"},
          { id: "on_antithyroid_medication", type: "select", options: ['Y', 'N'] , description: "Prise d'antithyroïdiens ? (Y = oui, N = non)" },
          { id: "query_hyperthyroid", type: "select", options: ['Y', 'N'] , description: "Suspicion d’hyperthyroïdie ? (Y = oui, N = non)" },
          { id: "goitre", type: "select", options: ['Y', 'N']  , description: "Présence de goitre ? (Y = oui, N = non)"},
          { id: "lithium", type: "select", options: ['Y', 'N'] , description: "Prise de lithium ? (Y = oui, N = non)" },
          { id: "tumor", type: "select", options: ['Y', 'N'], description: "Antécédents de tumeur thyroïdienne ? (Y = oui, N = non)" },
          { id: "sick", type: "select", options: ['Y', 'N'] , description: "État de maladie générale ? (Y = oui, N = non)"},
          { id: "pregnant", type: "select", options: ['Y', 'N'] , description: "Grossesse en cours ? (Y = oui, N = non)"},
          { id: "T3_measured", type: "select", options: ['Y', 'N'] , description: "T3 mesurée ? (Y = oui, N = non)" },
      ]


      
  const normalizeFormData = (formData) => {
  const toFloat = (val) => parseFloat(val) || 0;
  const toInt = (val) => parseInt(val, 10) || 0;

  return {
    "TSH": toFloat(formData["TSH"]),
    "TT4": toFloat(formData["TT4"]),
    "TSH_measured": formData["TSH_measured"],
    "Age": toInt(age),
    "on_thyroxine": formData["on_thyroxine"],
    "query_hypothyroid": formData["query_hypothyroid"],
    "T4U": toFloat(formData["T4U"]),
    "T3": toFloat(formData["T3"]),
    "thyroid_surgery": formData["thyroid_surgery"],
    "query_on_thyroxine": formData["query_on_thyroxine"],
    "on_antithyroid_medication": formData["on_antithyroid_medication"],
    "query_hyperthyroid": formData["query_hyperthyroid"],
    "goitre": formData["goitre"],
    "lithium": formData["lithium"],
    "tumor": formData["tumor"],
    "sick": formData["sick"],
    "pregnant": formData["pregnant"],
    "T3_measured": formData["T3_measured"]
  };
};


const resetFormData = () => {
  setFormData({
    TSH: "",
    TT4: "",
    TSH_measured: "",
    Age: "",
    on_thyroxine: "",
    query_hypothyroid: "",
    T4U: "",
    T3: "",
    thyroid_surgery: "",
    query_on_thyroxine: "",
    on_antithyroid_medication: "",
    query_hyperthyroid: "",
    goitre: "",
    lithium: "",
    tumor: "",
    sick: "",
    pregnant: "",
    T3_measured: ""
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
      const response = await axios.post(`http://localhost:5000/test_hypothyroidism/${userId}`, normalizedData , {
      headers: {
          Authorization: `Bearer ${token}`
      }
     })
      // Si succès
       setSuccess(true);
       setPrediction(response.data.anomaly);
      //  localStorage.setItem('resultat_test_hypothyroidie', response.data.anomaly);
        // Met à jour l'objet user dans localStorage
       const currentUserId = localStorage.getItem('currentUserId');
       if (currentUserId) {
       const userData = localStorage.getItem(`user_${currentUserId}`);
       if (userData) {
        const user = JSON.parse(userData);
        user.resultat_test_hypothyroidie = response.data.anomaly;
        localStorage.setItem(`user_${currentUserId}`, JSON.stringify(user));
        // Met à jour le state aussi
        setResultatTestHypothyroidie(response.data.anomaly);
      }
    }
    resetFormData();
      }
       catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error); // Affiche "erreur existe déjà" par exemple
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


// Non Hypothyroïdie  
  const handleAutoFillHypothyroïdieNon = () => {
    setFormData({
    "TSH": 3.2,
  "TT4": 120.0,
  "TSH_measured": "Y",
  "Age": 30,
  "on_thyroxine": "N",
  "query_hypothyroid": "N",
  "T4U": 1.2,
  "T3": 1.0,
  "thyroid_surgery": "N",
  "query_on_thyroxine": "N",
  "on_antithyroid_medication": "N",
  "query_hyperthyroid": "N",
  "goitre": "N",
  "lithium": "N",
  "tumor": "N",
  "sick": "N",
  "pregnant": "N",
  "T3_measured": "Y"

    });
  } 


  // Oui Hypothyroïdie
   const handleAutoFillHypothyroïdieOui = () => {
    setFormData({
       "TSH": 80.5,
  "TT4": 40.0,
  "TSH_measured": "Y",
  "Age": 45,
  "on_thyroxine": "Y",
  "query_hypothyroid": "Y",
  "T4U": 0.6,
  "T3": 0.9,
  "thyroid_surgery": "N",
  "query_on_thyroxine": "N",
  "on_antithyroid_medication": "N",
  "query_hyperthyroid": "N",
  "goitre": "Y",
  "lithium": "N",
  "tumor": "N",
  "sick": "N",
  "pregnant": "N",
  "T3_measured": "Y"

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
      resultatTest={resultatTestHypothyroidie}
      error={error}
      handleAutoFillHypothyroïdieNon = {handleAutoFillHypothyroïdieNon}
      handleAutoFillHypothyroïdieOui = {handleAutoFillHypothyroïdieOui}
           />
          {/* <PiedPage /> */}



    </>
  )
}
