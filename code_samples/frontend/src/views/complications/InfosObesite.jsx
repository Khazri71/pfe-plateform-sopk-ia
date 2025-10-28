import React , {useState} from 'react'
import { InfosPage } from '../../layouts/InfosPage'

export const InfosObesite = () => {
 
      const [title, setTitle] = useState("L'Obésité")
      
      const [subtitleone, setSubtitleone] = useState("Comprendre l'Obésité")
      const [subtitletwo, setSubtitletwo] = useState("Symptômes de l'Obésité")
   
      const [paragraphone, setParagraphone] = useState(
        <div>
 <p>
  L’obésité est une maladie caractérisée par une accumulation excessive de graisse dans le corps, au point qu’elle peut nuire à la santé. Elle se mesure souvent avec l’indice de masse corporelle (IMC), qui est le rapport entre le poids (en kilogrammes) et la taille au carré (en mètres). Une personne est considérée obèse lorsque son IMC est égal ou supérieur à 30. L’obésité peut entraîner plusieurs problèmes de santé, notamment des maladies cardiovasculaires, du diabète, et augmenter le risque de certains cancers.
</p>

<h4 className="fw-bold mb-2">Types d’obésité</h4>

<ul>
  <li><strong>Poids insuffisant :</strong> Poids trop bas, parfois problème de santé.</li>
  <li><strong>Poids normal :</strong> Poids sain et équilibré.</li>
  <li><strong>Surpoids niveau I :</strong> Poids un peu trop élevé.</li>
  <li><strong>Surpoids niveau II :</strong> Surpoids plus important.</li>
  <li><strong>Obésité type I (légère) :</strong> Début d’obésité.</li>
  <li><strong>Obésité type II (modérée) :</strong> Obésité avec risques santé.</li>
  <li><strong>Obésité type III (sévère) :</strong> Obésité grave, risques élevés.</li>
</ul>
</div>

      )
      const [paragraphtwo, setParagraphtwo] = useState(
      <ul>
  <li><strong>Prise de poids excessive : </strong>trop de graisse dans le corps.</li>
  <li><strong>Fatigue et faible endurance : </strong>fatigue rapide lors d’efforts.</li>
  <li><strong>Essoufflement : </strong>difficulté à respirer.</li>
  <li><strong>Douleurs articulaires : </strong>douleurs aux genoux, hanches, dos.</li>
  <li><strong>Transpiration excessive : </strong>sueur abondante.</li>
  <li><strong>Problèmes de sommeil : </strong>troubles comme l’apnée du sommeil.</li>
  <li><strong>Hypertension artérielle : </strong>pression sanguine élevée.</li>
  <li><strong>Résistance à l'insuline : </strong>risque de diabète.</li>
  <li><strong>Troubles digestifs : </strong>reflux ou brûlures d’estomac.</li>
  <li><strong>Problèmes de mobilité : </strong>difficulté à bouger.</li>
  <li><strong>Peau sèche ou irritée : </strong>surtout dans les plis de la peau.</li>
  <li><strong>Problèmes psychologiques : </strong>stress, dépression, baisse de confiance.</li>
</ul>

      )
   
      const [btnText, setBtnTex] = useState("Test de l'obésité")
      const [btnLink, setBtnLink] = useState("/test_obesity")
      const [srcImg, setSrcImg] = useState("assets/img/gallery/obesity.png")

 
 
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
