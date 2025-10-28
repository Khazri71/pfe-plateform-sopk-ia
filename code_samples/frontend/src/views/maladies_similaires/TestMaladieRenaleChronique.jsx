
import React , {useEffect, useState} from 'react'
import { BarreNavigation } from '../../layouts/BarreNavigation'
import { FormTest } from '../../layouts/FormTest'
import { PiedPage } from '../../layouts/PiedPage'
import axios from 'axios'




export const TestMaladieRenaleChronique = () => {
    
  const titlepred = "de maladie rénale chronique"
  const imgUrl = "assets/img/gallery/renale2.png"
    
  const [formData , setFormData] = useState({})
  const [success ,setSuccess]  = useState('')
  const [prediction , setPrediction] = useState('')
  const [diet , setDiet] = useState('')
  const[error , setError] = useState('')

  
  
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('currentUserId');

  // localStorage.setItem('resultat_test_maladie-renale-chronique', prediction);
  // const  resultatTestMaladieRenaleChronique =  localStorage.getItem('resultat_test_maladie-renale-chronique');


         //***********Récupérer les données de localstorage */
                  const [resultatTestMaladieRenaleChronique, setResultatTestMaladieRenaleChronique] = useState('');
                  useEffect(() => {
                     const currentUserId = localStorage.getItem('currentUserId');
                     if (currentUserId) {
                     const userData = localStorage.getItem(`user_${currentUserId}`);
                     if (userData) {
                     const user = JSON.parse(userData);
                     setResultatTestMaladieRenaleChronique(user.resultat_test_maladie_renale_chronique || '');
                     }
                   }
                  }, []);
  

const fields = [
    { id: "sg", placeholder: "Sg | ex : 1.02" , description: "Gravité urinaire"},
    { id: "hemo", placeholder: "Hemo | ex : 11.7" , description: "Hémoglobine dans le sang (g/dL)"},
    { id: "al", placeholder: "Al | ex : 1" , description: "Taux d'albumine dans l'urine" },
    { id: "sc", placeholder: "Sc | ex : 0.4" , description: "Créatinine (mg/dL)"},
    { id: "htn", type: "select", options: ['Y', 'N'] , description: "Hypertension présente ? (Y = oui, N = non)"},
    { id: "rc", placeholder: "Rc | ex : 2.5" , description: "Nombre de globules rouges (millions/µL)" },
    { id: "rbc", type: "select", options: ['normal', 'abnormal'], description: "État des globules rouges"  },
    { id: "bgr", placeholder: "Bgr | ex : 70" , description: "Glycémie (mg/dL)"},
    { id: "bu", placeholder: "Bu | ex : 18", description: "Urée sanguine (mg/dL)"  },
    { id: "dm", type: "select", options: ['Y', 'N'] , description: "Diabète présent ? (Y = oui, N = non)"},
    { id: "sod", placeholder: "Sod | ex : 140" , description: "Taux de sodium dans le sang (mEq/L)"  },
    { id: "appet", type: "select", options: ['good', 'poor'], description: "Appétit du patient (good = bon, poor = mauvais)" },
    { id: "pe", type: "select", options: ['Y', 'N'], description: "Présence d'œdème ? (Y = oui, N = non)"  },
    { id: "bp", placeholder: "Bp | ex : 112", description: "Pression artérielle systolique (mmHg)"  },
    { id: "pc", type: "select", options: ['normal', 'abnormal'] , description: "État des cellules pyuriques dans l'urine" },
]


const normalizeFormData = (formData) => {
  const toFloat = (val) => parseFloat(val) || 0;
  const toInt = (val) => parseInt(val, 10) || 0;

  return {
    "sg": toFloat(formData["sg"]),
    "hemo": toFloat(formData["hemo"]),
    "al": toInt(formData["al"]),
    "sc": toFloat(formData["sc"]),
    "htn": formData["htn"],      // "Y" / "N" → backend gère
    "rc": toFloat(formData["rc"]),
    "rbc": formData["rbc"],      // "normal" → backend gère
    "bgr": toInt(formData["bgr"]),
    "bu": toInt(formData["bu"]),
    "dm": formData["dm"],        // "Y" / "N" → backend gère
    "sod": toInt(formData["sod"]),
    "appet": formData["appet"],  // "good" → backend gère
    "pe": formData["pe"],        // "Y" / "N"
    "bp": toInt(formData["bp"]),
    "pc": formData["pc"]         // "normal" → backend gère
  };
};

const resetFormData = () => {
  setFormData({
    sg: "",
    hemo: "",
    al: "",
    sc: "",
    htn: "",
    rc: "",
    rbc: "",
    bgr: "",
    bu: "",
    dm: "",
    sod: "",
    appet: "",
    pe: "",
    bp: "",
    pc: ""
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
      const response = await axios.post(`http://localhost:5000/test_Chronic-kidney-disease/${userId}`, normalizedData , {
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
        user.resultat_test_maladie_renale_chronique = response.data.anomaly;
        localStorage.setItem(`user_${currentUserId}`, JSON.stringify(user));
        // Met à jour le state aussi
        setResultatTestMaladieRenaleChronique(response.data.anomaly);
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


// Non Maladie rénale chronique  
  const handleAutoFillMaladierenalechroniqueNon = () => {
    setFormData({
    "sg": 1.022,
  "hemo": 13.7,
  "al": 0,
  "sc": 0.7,
  "htn": "N",
  "rc": 1.0,
  "rbc": "normal",
  "bgr": 90,
  "bu": 17,
  "dm": "N",
  "sod": 142,
  "appet": "good",
  "pe": "N",
  "bp": 112,
  "pc": "normal"

    });
  } 

  // Oui Maladie rénale chronique  
  const handleAutoFillMaladierenalechroniqueOui = () => {
    setFormData({
          "sg": 1.020,
  "hemo": 10.5,
  "al": 3,
  "sc": 2.1,
  "htn": "Y",
  "rc": 0.5,
  "rbc": "abnormal",
  "bgr": 120,
  "bu": 35,
  "dm": "Y",
  "sod": 138,
  "appet": "poor",
  "pe": "Y",
  "bp": 150,
  "pc": "abnormal"

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
        resultatTest={resultatTestMaladieRenaleChronique}
        error={error}

        handleAutoFillMaladierenalechroniqueNon = {handleAutoFillMaladierenalechroniqueNon}
        handleAutoFillMaladierenalechroniqueOui = {handleAutoFillMaladierenalechroniqueOui}
             />
            {/* <PiedPage /> */}
    </>
  )
}
