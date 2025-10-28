import React , {useState} from 'react'
import { InfosPage } from '../../layouts/InfosPage'

export const InfosDiabeteType2 = () => {
 
            const [title, setTitle] = useState("Le Diabète de type 2")
             
             const [subtitleone, setSubtitleone] = useState("Comprendre le Diabète de type 2")
             const [subtitletwo, setSubtitletwo] = useState("Symptômes du Diabète de type 2")
          
             const [paragraphone, setParagraphone] = useState(
             "Le diabète de type 2 est une maladie chronique caractérisée par une augmentation du taux de sucre (glucose) dans le sang, due à une résistance à l'insuline (hormone qui régule la glycémie) et/ou à une sécrétion insuffisante d'insuline par le pancréas. Chez la femme, ce type de diabète peut avoir des répercussions spécifiques liées aux hormones, au cycle menstruel, à la grossesse et à la ménopause."
            )
             const [paragraphtwo, setParagraphtwo] = useState(
             <ul>
      <li><strong>Fatigue : </strong>Le corps ne peut pas utiliser le sucre comme énergie, donc on se sent toujours fatiguée.</li>
      <li><strong>Envie fréquente d’uriner : </strong>Le corps élimine le sucre en trop par l’urine, ce qui fait aller souvent aux toilettes.</li>
      <li><strong>Soif intense : </strong>À cause de l’urine fréquente, le corps se déshydrate, donc on a très soif.</li>
      <li><strong>Faim forte : </strong>Les cellules manquent d’énergie, alors on a toujours faim.</li>
      <li><strong>Infections vaginales répétées :</strong>Le sucre en excès favorise les infections comme les mycoses.</li>
      <li><strong>Règles irrégulières : </strong>Le diabète peut dérégler les hormones et perturber le cycle menstruel.</li>
      <li><strong>Cicatrisation lente : </strong>Le sang ne circule pas bien, donc les blessures guérissent lentement.</li>
      <li><strong>Vision floue : </strong>Le sucre affecte temporairement les yeux, rendant la vue floue.</li>
    </ul>

             )
          
             const [btnText, setBtnTex] = useState("Test du Diabète de type 2")
             const [btnLink, setBtnLink] = useState("/test_type-2-diabetes")
            const [srcImg, setSrcImg] = useState("assets/img/gallery/diab.png")
        
        
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
