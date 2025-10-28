import logo from './logo.svg';
import './App.css';
import { Accueil } from './views/Accueil';
import { Inscription } from './views/authentification/Inscription';
import { Connexion } from './views/authentification/Connexion';
import { TestSopk } from './views/tests_sopk/TestSopk';
import { TestSopkEcho } from './views/tests_sopk/TestSopkEcho';
import { TestHypothyroidie } from './views/maladies_similaires/TestHypothyroidie';
import { TestDiabeteType2 } from './views/maladies_similaires/TestDiabeteType2';
import { TestCancerEndometre } from './views/complications/TestCancerEndometre';
import { TestObesite } from './views/complications/TestObesite';
import { TestDepression } from './views/complications/TestDepression';
import { TestMaladieRenaleChronique } from './views/maladies_similaires/TestMaladieRenaleChronique';
import { ReinitialisationLien } from './views/authentification/ReinitialisationLien';
import { ReinitialisationMotDePasse } from './views/authentification/ReinitialisationMotDePasse';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './views/Home';
import { InfosCancerEndometre } from './views/complications/InfosCancerEndometre';
import { InfosObesite } from './views/complications/InfosObesite';
import { InfosDepression } from './views/complications/InfosDepression';
import { InfosHypothyroidie } from './views/maladies_similaires/InfosHypothyroidie';
import { InfosDiabeteType2 } from './views/maladies_similaires/InfosDiabeteType2';
import { InfosMaladieRenaleChronique } from './views/maladies_similaires/InfosMaladieRenaleChronique';
import { RegimePerso } from './layouts/RegimePerso';
import ProtectedRoute from './ProtectedRoute';
import { ProfilTests } from './layouts/ProfilTests';




function App() {
  return (
<>
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />

        <Route path="/register" element={<Inscription />} />
        <Route path="/login" element={<Connexion />} />
        <Route path="/reset-link" element={<ReinitialisationLien />} />
        <Route path="/reset-password" element={<ReinitialisationMotDePasse />} />




        {/* Routes protégées */}

        <Route path="/test_pcos" element={ <ProtectedRoute><TestSopk /></ProtectedRoute>} />
        <Route path="/test_pcos_echo" element={<ProtectedRoute><TestSopkEcho /></ProtectedRoute>} />

        <Route path="/infos_endometrial-cancer" element={<ProtectedRoute><InfosCancerEndometre /></ProtectedRoute>} />
        <Route path="/test_endometrial-cancer" element={<ProtectedRoute><TestCancerEndometre/></ProtectedRoute>} />

        <Route path="/infos_obesity" element={<ProtectedRoute><InfosObesite/></ProtectedRoute>} />
        <Route path="/test_obesity" element={<ProtectedRoute><TestObesite/></ProtectedRoute>} />

        
        <Route path="/infos_depression" element={<ProtectedRoute><InfosDepression/></ProtectedRoute>} />
        <Route path="/test_depression" element={<ProtectedRoute><TestDepression/></ProtectedRoute> } />
        
        <Route path="/infos_hypothyroidism" element={<ProtectedRoute><InfosHypothyroidie/></ProtectedRoute>} />
        <Route path="/test_hypothyroidism" element={<ProtectedRoute><TestHypothyroidie/></ProtectedRoute> } />
        

        <Route path="/infos_type-2-diabetes" element={<ProtectedRoute><InfosDiabeteType2/></ProtectedRoute>} />
        <Route path="/test_type-2-diabetes" element={<ProtectedRoute><TestDiabeteType2/> </ProtectedRoute>} />

        <Route path="/infos_Chronic-kidney-disease" element={<ProtectedRoute><InfosMaladieRenaleChronique/></ProtectedRoute>} />
        <Route path="/test_Chronic-kidney-disease" element={<ProtectedRoute><TestMaladieRenaleChronique/> </ProtectedRoute>} />
        
        <Route path="/regime" element={<ProtectedRoute><RegimePerso/></ProtectedRoute> } />
        <Route path="/profil" element={<ProtectedRoute><ProfilTests/></ProtectedRoute> } />
        
       
        {/* useParams() est destiné à extraire les paramètres de chemin qui sont définis dans la route avec des : (ex : /reset-password/:token).
        Mais ici, tu veux récupérer un paramètre de requête (query parameter) comme ?token=..., donc il faut utiliser useLocation() et URLSearchParams(). */}

        

      </Routes>
    </Router>




    {/* <Accueil/> */}
    {/* <Inscription/> */}
    {/* <Connexion/> */}
    {/* <ReinitialisationLien/> */}
    {/* <ReinitialisationMotDePasse/> */}

    
    {/* <TestSopk/> */}
    {/* <TestSopkEcho/> */}


    {/* <TestHypothyroidie/> */}
    {/* <TestDiabeteType2/>  */}
    {/* <TestMaladieRenaleChronique/> */}

    
    {/* <TestCancerEndometre/> */}
    {/* <TestObesite/> */}
    {/* <TestDepression/> */}

    </>
  );
}

export default App;
