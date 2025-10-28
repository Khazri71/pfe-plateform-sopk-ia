import React , {useState} from 'react'
import { PiedPage } from '../../layouts/PiedPage'
import { BarreNavigation } from '../../layouts/BarreNavigation'
import { NavLink } from 'react-router-dom'
import { InfosPage } from '../../layouts/InfosPage'




export const InfosCancerEndometre = () => {

     const [title, setTitle] = useState("Le Cancer de l'endométre")
     
     const [subtitleone, setSubtitleone] = useState("Comprendre le Cancer de l'endomètre")
     const [subtitletwo, setSubtitletwo] = useState("Symptômes du Cancer de l'endomètre")
  
     const [paragraphone, setParagraphone] = useState(
     "Le cancer de l’endomètre est un type de cancer qui se développe à partir des cellules de l’endomètre, la muqueuse qui tapisse l’intérieur de l’utérus chez la femme. C’est le cancer le plus fréquent de l’utérus. Il survient généralement après la ménopause, quand les cellules de l’endomètre commencent à croître de manière anormale et incontrôlée, formant une tumeur."
    )
     const [paragraphtwo, setParagraphtwo] = useState(
      <ul>
  <li><strong>Saignements vaginaux anormaux</strong> : surtout après la ménopause, des saignements ou des pertes sanguines inhabituelles.</li>
  <li><strong>Écoulements vaginaux anormaux</strong> : pouvant être aqueux, sanglants ou malodorants.</li>
  <li><strong>Douleurs pelviennes</strong> : douleurs dans le bas-ventre ou au niveau du bassin.</li>
  <li><strong>Douleurs lors des rapports sexuels</strong> : inconfort ou douleur pendant les rapports.</li>
  <li><strong>Perte de poids inexpliquée</strong> : parfois présente à un stade avancé.</li>
  <li><strong>Fatigue inhabituelle</strong> : liée à une anémie ou à la progression de la maladie.</li>
</ul>

    )
  
     const [btnText, setBtnTex] = useState("Test du Cancer de l'endomètre")
     const [btnLink, setBtnLink] = useState("/test_endometrial-cancer")
     const [srcImg, setSrcImg] = useState("assets/img/gallery/cancerendo.png")
     

     
     
  
  


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
