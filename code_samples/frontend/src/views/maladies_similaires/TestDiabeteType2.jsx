
import React  ,{useEffect, useState} from 'react'
import { PiedPage } from '../../layouts/PiedPage'
import { BarreNavigation } from '../../layouts/BarreNavigation'
import { FormTest } from '../../layouts/FormTest'
import axios from 'axios'

export const TestDiabeteType2 = () => {
    

      const titlepred = "du diabète de type 2"
      const imgUrl = "assets/img/gallery/diab2.png"
        
      const [formData , setFormData] = useState({})
      const [success ,setSuccess]  = useState('')
      const [prediction , setPrediction] = useState('')
      const [diet , setDiet] = useState('')
      const[error , setError] = useState('')

        const [age, setAge] = useState(0);
               const [height, setHeight] = useState(0);
               const [weight, setWeight] = useState(0);
    
    
      
      const token = localStorage.getItem('token');
       const userId = localStorage.getItem('currentUserId');
    
      // const  resultatTestDiabeteType2 =  localStorage.getItem('resultat_test_diabete-de-type-2');
       //***********Récupérer les données de localstorage */
                const [resultatTestDiabeteType2, setResultatTestDiabeteType2] = useState('');
                useEffect(() => {
                   const currentUserId = localStorage.getItem('currentUserId');
                   if (currentUserId) {
                   const userData = localStorage.getItem(`user_${currentUserId}`);
                   if (userData) {
                   const user = JSON.parse(userData);
                   setResultatTestDiabeteType2(user.resultat_test_diabete_de_type2 || '');
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
           { id: "age", placeholder: "Age" , description: "Age (années)"  },
           { id: "pulse_rate", placeholder: "Pulse_rate | ex : 72" , description: "Fréquence cardiaque au repos (bpm)"},
           { id: "systolic_bp", placeholder: "Systolic_bp | ex : 90" , description: "Pression artérielle systolique (mmHg)"},
           { id: "diastolic_bp", placeholder: "Diastolic_bp | ex : 74" , description: "Pression artérielle diastolique (mmHg)" },
           { id: "glucose", placeholder: "Glucose | ex : 5.7" , description: "Taux de glucose dans le sang (mmol/L ou g/L selon l’unité)" },
           { id: "height", placeholder: "Height | ex : 1.65", description: "Taille (m)" },
           { id: "weight", placeholder: "weight | ex : 65.8" , description: "Poids (kg)" },
           { id: "bmi", placeholder: "bmi | ex : 65.8" , description: "Indice de masse corporelle (BMI)" },
           { id: "family_diabetes", type: "select", options: ['Y', 'N'] , description: "Antécédents familiaux de diabète ? (Y = oui, N = non)"},
           { id: "hypertensive", type: "select", options: ['Y', 'N'] , description: "Hypertension connue ? (Y = oui, N = non)"},
           { id: "cardiovascular_disease", type: "select", options: ['Y', 'N'] , description: "Présence de maladies cardiovasculaires ? (Y = oui, N = non)"},
           { id: "stroke", type: "select", options: ['Y', 'N'] , description: "Antécédents d’AVC ? (Y = oui, N = non)"},
       ]
    
       
    const normalizeFormData = (formData) => {
  const toFloat = (val) => parseFloat(val) || 0;
  const toInt = (val) => parseInt(val, 10) || 0;

  return {
    "age": toInt(age),
    "pulse_rate": toInt(formData["pulse_rate"]),
    "systolic_bp": toInt(formData["systolic_bp"]),
    "diastolic_bp": toInt(formData["diastolic_bp"]),
    "glucose": toFloat(formData["glucose"]),
    "height": toFloat(height),
    "weight": toFloat(weight),
    "bmi": toFloat(formData["bmi"]),
    "family_diabetes": formData["family_diabetes"],
     "hypertensive": formData["hypertensive"],
    // "family_hypertension": formData["family_hypertension"],
    "cardiovascular_disease": formData["cardiovascular_disease"],
    "stroke": formData["stroke"]
  };
};
    


const resetFormData = () => {
  setFormData({
    age: "",
    pulse_rate: "",
    systolic_bp: "",
    diastolic_bp: "",
    glucose: "",
    height: "",
    weight: "",
    bmi: "",
    family_diabetes: "",
    hypertensive: "",
    cardiovascular_disease: "",
    stroke: ""
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
      const response = await axios.post(`http://localhost:5000/test_type-2-diabetes/${userId}`, normalizedData , {
      headers: {
          Authorization: `Bearer ${token}`
      }
     })
      // Si succès
       setSuccess(true);
      //  localStorage.setItem('resultat_test_diabete-de-type-2', response.data.anomaly);
       setPrediction(response.data.anomaly);
          // Met à jour l'objet user dans localStorage
       const currentUserId = localStorage.getItem('currentUserId');
       if (currentUserId) {
       const userData = localStorage.getItem(`user_${currentUserId}`);
       if (userData) {
        const user = JSON.parse(userData);
        user.resultat_test_diabete_de_type2 = response.data.anomaly;
        localStorage.setItem(`user_${currentUserId}`, JSON.stringify(user));
        // Met à jour le state aussi
        setResultatTestDiabeteType2(response.data.anomaly);
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


// Non Diabéte type 2  
  const handleAutoFillDiabetetype2Non = () => {
    setFormData({
      "age": 30,
  "pulse_rate": 70,
  "systolic_bp": 120,
  "diastolic_bp": 80,
  "glucose": 5.1,
  "height": 160.0,
  "weight": 55.0,
  "bmi": 21.5,
  "family_diabetes": "N",
  "hypertensive": "N",
  "cardiovascular_disease": "N",
  "stroke": "N"

    });
  } 


  // Oui Diabéte type 2
   const handleAutoFillDiabetetype2Oui = () => {
    setFormData({
       "age": 58,
  "pulse_rate": 88,
  "systolic_bp": 160,
  "diastolic_bp": 95,
  "glucose": 210.5,
  "height": 1.62,
  "weight": 85.0,
  "bmi": 32.4,
  "family_diabetes": "Y",
  "hypertensive": "Y",
  "cardiovascular_disease": "Y",
  "stroke": "N"

    });
  } 

  // Prédiabète 
   const handleAutoFillPrediabete = () => {
    setFormData({
        "age": 45,
  "pulse_rate": 78,
  "systolic_bp": 135,
  "diastolic_bp": 85,
  "glucose": 5.8,
  "height": 165.0,
  "weight": 70.0,
  "bmi": 25.7,
  "family_diabetes": "Y",
  "hypertensive": "Y",
  "cardiovascular_disease": "N",
  "stroke": "N"

    });
  } 



//--------------- End Tests
           

    
  return (
    <>

   {/* <BarreNavigation/> */}
    
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
      resultatTest={resultatTestDiabeteType2}
      error={error}
      handleAutoFillDiabetetype2Non = {handleAutoFillDiabetetype2Non}
      handleAutoFillDiabetetype2Oui = {handleAutoFillDiabetetype2Oui}
      handleAutoFillPrediabete = {handleAutoFillPrediabete}
           />
          {/* <PiedPage /> */}





    </>
  )
}
