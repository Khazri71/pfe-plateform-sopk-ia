import React , {useEffect, useState} from 'react'
import { BarreNavigation } from '../../layouts/BarreNavigation'
import { FormTest } from '../../layouts/FormTest'
import { PiedPage } from '../../layouts/PiedPage'
import axios from 'axios'

export const TestCancerEndometre = () => {
   
    
      const titlepred = " du cancer de l'endomètre"
      const imgUrl = "assets/img/gallery/endo1.png"
        
      const [formData , setFormData] = useState({})
      const [success ,setSuccess]  = useState('')
      const [prediction , setPrediction] = useState('')
      const [diet , setDiet] = useState('')
      const[error , setError] = useState('')
    
      
       const userId = localStorage.getItem('currentUserId');
      const token = localStorage.getItem('token');
    
     
      // const  resultatTestCancerEndometre =  localStorage.getItem('resultat_test_cancer-endometre');
     //***********Récupérer les données de localstorage */
                     const [resultatTestCancerEndometre, setResultatTestCancerEndometre] = useState('');
                     useEffect(() => {
                        const currentUserId = localStorage.getItem('currentUserId');
                        if (currentUserId) {
                        const userData = localStorage.getItem(`user_${currentUserId}`);
                        if (userData) {
                        const user = JSON.parse(userData);
                        setResultatTestCancerEndometre(user.resultat_test_cancer_endometre || '');
                        }
                      }
                     }, []);
      
const fields = [
     { id: "Menstrual pain (Dysmenorrhea)", type: "select", options: ['Y', 'N'] , description: "Douleur ressentie pendant les règles (dysménorrhée) ? (Y = oui, N = non)"},
     { id: "Painful cramps during period", type: "select", options: ['Y', 'N'] , description: "Crampes douloureuses pendant les menstruations ? (Y = oui, N = non)"},
     { id: "Cramping", type: "select", options: ['Y', 'N'] , description: "Spasmes ou contractions abdominales ? (Y = oui, N = non)"},
     { id: "Ovarian cysts", type: "select", options: ['Y', 'N'] , description: "Présence de kystes ovariens ? (Y = oui, N = non)"},
     { id: "Heavy / Extreme menstrual bleeding", type: "select", options: ['Y', 'N'] , description: "Saignements menstruels abondants ? (Y = oui, N = non)"},



     { id: "Fatigue / Chronic fatigue", type: "select", options: ['Y', 'N'] , description: "Fatigue persistante ou chronique ? (Y = oui, N = non)"},
     { id: "Painful / Burning pain during sex (Dyspareunia)", type: "select", options: ['Y', 'N'], description: "Douleur pendant les rapports sexuels (dyspareunie) ? (Y = oui, N = non)" },
     { id: "Pelvic pain", type: "select", options: ['Y', 'N'] , description: "Douleur dans la région pelvienne ? (Y = oui, N = non)" },
     { id: "IBS-like symptoms", type: "select", options: ['Y', 'N'], description: "Symptômes similaires au syndrome de l’intestin irritable ? (Y = oui, N = non)" },
     { id: "Infertility", type: "select", options: ['Y', 'N'] , description: "Difficulté à concevoir un enfant ? (Y = oui, N = non)"},



     { id: "Fever", type: "select", options: ['Y', 'N'], description: "Température corporelle élevée ? (Y = oui, N = non)"  },
     { id: "Constipation / Chronic constipation", type: "select", options: ['Y', 'N'] , description: "Difficulté à évacuer les selles ? (Y = oui, N = non)" },
     { id: "Irregular / Missed periods", type: "select", options: ['Y', 'N'] , description: "Cycles menstruels irréguliers ou absents ? (Y = oui, N = non)"},
     { id: "Bloating", type: "select", options: ['Y', 'N'], description: "Ballonnements abdominaux ? (Y = oui, N = non)" },
     { id: "Hormonal problems", type: "select", options: ['Y', 'N'], description: "Déséquilibres hormonaux perçus ? (Y = oui, N = non)" },
     { id: "Extreme / Severe pain", type: "select", options: ['Y', 'N'] , description: "Douleurs intenses ou extrêmes ? (Y = oui, N = non)"},


      { id: "Cysts (unspecified)", type: "select", options: ['Y', 'N'] , description: "Présence de kystes (non spécifiés) ? (Y = oui, N = non)"},
     { id: "Abdominal pain / pressure", type: "select", options: ['Y', 'N'] , description: "Douleur ou pression abdominale ? (Y = oui, N = non)" },
     { id: "Excessive bleeding", type: "select", options: ['Y', 'N'] , description: "Saignement anormalement abondant ? (Y = oui, N = non)"},
     { id: "Bowel pain", type: "select", options: ['Y', 'N'], description: "Douleur au niveau de l’intestin ? (Y = oui, N = non)" },
     { id: "Painful bowel movements", type: "select", options: ['Y', 'N'] , description: "Douleur lors de la défécation ? (Y = oui, N = non)"},


      { id: "Migraines", type: "select", options: ['Y', 'N'] , description: "Céphalées sévères (migraines) ? (Y = oui, N = non)" },
     { id: "Loss of appetite", type: "select", options: ['Y', 'N'] , description: "Manque ou perte d'appétit ? (Y = oui, N = non)"},
     { id: "Menstrual clots", type: "select", options: ['Y', 'N'] , description: "Caillots sanguins dans les règles ? (Y = oui, N = non)"},
     { id: "Lower back pain", type: "select", options: ['Y', 'N'] , description: "Douleur au bas du dos ? (Y = oui, N = non)"},
     { id: "Vaginal Pain/Pressure", type: "select", options: ['Y', 'N'], description: "Douleur ou pression vaginale ? (Y = oui, N = non)" },

     { id: "Back pain", type: "select", options: ['Y', 'N'] , description: "Douleur dorsale ? (Y = oui, N = non)" },
     { id: "Painful ovulation", type: "select", options: ['Y', 'N'], description: "Douleur pendant l’ovulation ? (Y = oui, N = non)"  },
     { id: "Decreased energy / Exhaustion", type: "select", options: ['Y', 'N'], description: "Manque d’énergie ou épuisement ? (Y = oui, N = non)" },
     { id: "Long menstruation", type: "select", options: ['Y', 'N'] , description: "Règles longues (en durée) ? (Y = oui, N = non)"},
     
]



const normalizeFormData = (formData) => {
  return {
    "Menstrual pain (Dysmenorrhea)": formData["Menstrual pain (Dysmenorrhea)"],
    "Painful cramps during period": formData["Painful cramps during period"],
    "Cramping": formData["Cramping"],
    "Ovarian cysts": formData["Ovarian cysts"],
    "Heavy / Extreme menstrual bleeding": formData["Heavy / Extreme menstrual bleeding"],
    "Fatigue / Chronic fatigue": formData["Fatigue / Chronic fatigue"],
    "Painful / Burning pain during sex (Dyspareunia)": formData["Painful / Burning pain during sex (Dyspareunia)"],
    "Pelvic pain": formData["Pelvic pain"],
    "IBS-like symptoms": formData["IBS-like symptoms"],
    "Infertility": formData["Infertility"],
    "Fever": formData["Fever"],
    "Constipation / Chronic constipation": formData["Constipation / Chronic constipation"],
    "Irregular / Missed periods": formData["Irregular / Missed periods"],
    "Bloating": formData["Bloating"],
    "Hormonal problems": formData["Hormonal problems"],
    "Extreme / Severe pain": formData["Extreme / Severe pain"],
    "Cysts (unspecified)": formData["Cysts (unspecified)"],
    "Abdominal pain / pressure": formData["Abdominal pain / pressure"],
    "Excessive bleeding": formData["Excessive bleeding"],
    "Bowel pain": formData["Bowel pain"],
    "Painful bowel movements": formData["Painful bowel movements"],
    "Migraines": formData["Migraines"],
    "Loss of appetite": formData["Loss of appetite"],
    "Menstrual clots": formData["Menstrual clots"],
    "Lower back pain": formData["Lower back pain"],
    "Vaginal Pain/Pressure": formData["Vaginal Pain/Pressure"],
    "Back pain": formData["Back pain"],
    "Painful ovulation": formData["Painful ovulation"],
    "Decreased energy / Exhaustion": formData["Decreased energy / Exhaustion"],
    "Long menstruation": formData["Long menstruation"]
  };
};


const resetFormData = () => {
  setFormData({
    "Menstrual pain (Dysmenorrhea)": "",
    "Painful cramps during period": "",
    "Cramping": "",
    "Ovarian cysts": "",
    "Heavy / Extreme menstrual bleeding": "",
    "Fatigue / Chronic fatigue": "",
    "Painful / Burning pain during sex (Dyspareunia)": "",
    "Pelvic pain": "",
    "IBS-like symptoms": "",
    "Infertility": "",
    "Fever": "",
    "Constipation / Chronic constipation": "",
    "Irregular / Missed periods": "",
    "Bloating": "",
    "Hormonal problems": "",
    "Extreme / Severe pain": "",
    "Cysts (unspecified)": "",
    "Abdominal pain / pressure": "",
    "Excessive bleeding": "",
    "Bowel pain": "",
    "Painful bowel movements": "",
    "Migraines": "",
    "Loss of appetite": "",
    "Menstrual clots": "",
    "Lower back pain": "",
    "Vaginal Pain/Pressure": "",
    "Back pain": "",
    "Painful ovulation": "",
    "Decreased energy / Exhaustion": "",
    "Long menstruation": ""
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
      const response = await axios.post(`http://localhost:5000/test_endometrial-cancer/${userId}`, normalizedData , {
      headers: {
          Authorization: `Bearer ${token}`
      }
     })
      // Si succès
       setSuccess(true);
      //  localStorage.setItem('resultat_test_cancer-endometre', response.data.anomaly);
       setPrediction(response.data.anomaly);
       // Met à jour l'objet user dans localStorage
       const currentUserId = localStorage.getItem('currentUserId');
       if (currentUserId) {
       const userData = localStorage.getItem(`user_${currentUserId}`);
       if (userData) {
        const user = JSON.parse(userData);
        user.resultat_test_cancer_endometre = response.data.anomaly;
        localStorage.setItem(`user_${currentUserId}`, JSON.stringify(user));
        // Met à jour le state aussi
        setResultatTestCancerEndometre(response.data.anomaly);
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


// Non Cancer d'endométre  
  const handleAutoFillCancerendometreNon = () => {
    setFormData({
     "Menstrual pain (Dysmenorrhea)": "N",
  "Painful cramps during period": "N",
  "Cramping": "N",
  "Ovarian cysts": "N",
  "Heavy / Extreme menstrual bleeding": "N",
  "Fatigue / Chronic fatigue": "N",
  "Painful / Burning pain during sex (Dyspareunia)": "N",
  "Pelvic pain": "N",
  "IBS-like symptoms": "N",
  "Infertility": "N",
  "Fever": "N",
  "Constipation / Chronic constipation": "N",
  "Irregular / Missed periods": "N",
  "Bloating": "Y",
  "Hormonal problems": "N",
  "Extreme / Severe pain": "N",
  "Cysts (unspecified)": "N",
  "Abdominal pain / pressure": "N",
  "Excessive bleeding": "N",
  "Bowel pain": "N",
  "Painful bowel movements": "N",
  "Migraines": "Y",
  "Loss of appetite": "N",
  "Menstrual clots": "N",
  "Lower back pain": "Y",
  "Vaginal Pain/Pressure": "N",
  "Back pain": "Y",
  "Painful ovulation": "N",
  "Decreased energy / Exhaustion": "N",
  "Long menstruation": "N"
     
    });
  } 


  // Oui Cancer d'endométre  
   const handleAutoFillCancerendometreOui = () => {
    setFormData({
      
        "Menstrual pain (Dysmenorrhea)": "Y",
  "Painful cramps during period": "Y",
  "Cramping": "Y",
  "Ovarian cysts": "Y",
  "Heavy / Extreme menstrual bleeding": "Y",
  "Fatigue / Chronic fatigue": "Y",
  "Painful / Burning pain during sex (Dyspareunia)": "Y",
  "Pelvic pain": "Y",
  "IBS-like symptoms": "N",
  "Infertility": "Y",
  "Fever": "N",
  "Constipation / Chronic constipation": "Y",
  "Irregular / Missed periods": "Y",
  "Bloating": "Y",
  "Hormonal problems": "Y",
  "Extreme / Severe pain": "Y",
  "Cysts (unspecified)": "Y",
  "Abdominal pain / pressure": "Y",
  "Excessive bleeding": "Y",
  "Bowel pain": "Y",
  "Painful bowel movements": "Y",
  "Migraines": "N",
  "Loss of appetite": "Y",
  "Menstrual clots": "Y",
  "Lower back pain": "Y",
  "Vaginal Pain/Pressure": "Y",
  "Back pain": "Y",
  "Painful ovulation": "Y",
  "Decreased energy / Exhaustion": "Y",
  "Long menstruation": "Y"
     
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
            resultatTest={resultatTestCancerEndometre}
            error={error}
            handleAutoFillCancerendometreNon = {handleAutoFillCancerendometreNon}
            handleAutoFillCancerendometreOui = {handleAutoFillCancerendometreOui}
                 />
                {/* <PiedPage /> */}
      
    

    </>
  )
}
