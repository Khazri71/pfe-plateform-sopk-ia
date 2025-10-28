import React , {useState} from 'react'
import { InfosPage } from '../../layouts/InfosPage'

export const InfosMaladieRenaleChronique = () => {
      const [title, setTitle] = useState("La Maladie rénale chronique")
               
               const [subtitleone, setSubtitleone] = useState("Comprendre la Maladie rénale chronique")
               const [subtitletwo, setSubtitletwo] = useState("Symptômes de la Maladie rénale chronique")
            
               const [paragraphone, setParagraphone] = useState(
                "La maladie rénale chronique est une détérioration progressive et irréversible de la fonction des reins sur une période prolongée, souvent plusieurs mois ou années. Les reins perdent peu à peu leur capacité à filtrer les déchets et l'excès de liquide dans le sang, ce qui peut entraîner un déséquilibre des substances chimiques dans le corps. Chez la femme, comme chez l'homme, cette maladie peut évoluer silencieusement avant d'entraîner des complications graves, notamment l'insuffisance rénale terminale nécessitant une dialyse ou une transplantation."

               )
               const [paragraphtwo, setParagraphtwo] = useState(
                <ul>
  <li><strong>Fatigue :</strong> Moins de globules rouges produits.</li>
  <li><strong>Œdèmes :</strong> Eau qui s’accumule dans le corps.</li>
  <li><strong>Hypertension :</strong> Mauvais contrôle de la tension.</li>
  <li><strong>Mictions fréquentes :</strong> Plus d’urine, surtout la nuit.</li>
  <li><strong>Urine mousseuse ou sang :</strong> Fuite de protéines ou sang dans l’urine.</li>
  <li><strong>Perte d’appétit et nausées :</strong> Toxines dans le corps.</li>
  <li><strong>Démangeaisons :</strong> Toxines qui irritent la peau.</li>
  <li><strong>Essoufflement :</strong> Trop d’eau ou manque d’oxygène.</li>
  <li><strong>Crampes :</strong> Déséquilibre des minéraux.</li>
  <li><strong>Troubles du sommeil :</strong> Inconfort ou toxines.</li>
  <li><strong>Anémie :</strong> Moins de globules rouges.</li>
</ul>

               )
            
               const [btnText, setBtnTex] = useState("Test de la Maladie rénale chronique")
               const [btnLink, setBtnLink] = useState("/test_Chronic-kidney-disease")
               const [srcImg, setSrcImg] = useState("assets/img/gallery/renale1.png")
          
          
            return (
              <>
                <InfosPage
                  title = {title}
                  subtitleone = {subtitleone}
                  subtitletwo = {subtitletwo}
                  paragraphone = {paragraphone}
                  paragraphtwo = {paragraphtwo}
                  btnText = {btnText}
                  btnLink = {btnLink}
                  srcImg = {srcImg}
       
                
                />
              </>
            )
}
