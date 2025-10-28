import React , {useState} from 'react'
import { InfosPage } from '../../layouts/InfosPage'

export const InfosHypothyroidie = () => {
 
           const [title, setTitle] = useState("L'Hypothyroïdie")
            
            const [subtitleone, setSubtitleone] = useState("Comprendre l'Hypothyroïdie")
            const [subtitletwo, setSubtitletwo] = useState("Symptômes de l'Hypothyroïdie")
         
            const [paragraphone, setParagraphone] = useState(
              "L’hypothyroïdie est un trouble endocrinien dans lequel la glande thyroïde (située à la base du cou) ne produit pas suffisamment d’hormones thyroïdiennes. Ces hormones jouent un rôle essentiel dans la régulation du métabolisme, la température corporelle, la fréquence cardiaque et le bon fonctionnement de nombreux organes.Chez la femme, cette maladie est plus fréquente que chez l’homme, notamment en raison des variations hormonales liées aux règles, à la grossesse et à la ménopause."
            )
            const [paragraphtwo, setParagraphtwo] = useState(
             <ul>
  <li><strong>Fatigue persistante :</strong> Épuisement constant, même après du repos.</li>
  <li><strong>Prise de poids inexpliquée :</strong> Gain de poids sans changement alimentaire ou physique.</li>
  <li><strong>Sensibilité au froid :</strong> Sensation d’avoir toujours froid.</li>
  <li><strong>Règles irrégulières ou abondantes :</strong> Cycles menstruels perturbés ou flux très important.</li>
  <li><strong>Peau sèche et cheveux cassants :</strong> Peau rugueuse et perte de cheveux fréquente.</li>
  <li><strong>Troubles de l’humeur :</strong> Dépression, manque de motivation, lenteur mentale.</li>
    <li><strong>Gonflement du cou (goitre) :</strong> Augmentation de volume de la thyroïde visible au niveau du cou.</li>
  <li><strong>Crampes musculaires :</strong> Contractions involontaires et douloureuses des muscles.</li>
  <li><strong>Fourmillements dans les mains :</strong> Sensation de picotement ou d’engourdissement dans les doigts ou les mains.</li>

</ul>
             
             
             


            )
         
            const [btnText, setBtnTex] = useState("Test de l'Hypothyroïdie")
            const [btnLink, setBtnLink] = useState("/test_hypothyroidism")
            const [srcImg, setSrcImg] = useState("assets/img/gallery/hypothy2.png")
            
      
       
       
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
