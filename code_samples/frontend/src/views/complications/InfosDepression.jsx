import React , {useState} from 'react'
import { InfosPage } from '../../layouts/InfosPage'



export const InfosDepression = () => {
       const [title, setTitle] = useState("La Dépression")
        
        const [subtitleone, setSubtitleone] = useState("Comprendre la Dépression")
        const [subtitletwo, setSubtitletwo] = useState("Symptômes de la Dépression")
     
        const [paragraphone, setParagraphone] = useState(
         "La dépression est un trouble mental caractérisé par une humeur triste, une perte d'intérêt ou de plaisir, et une diminution de l'énergie qui affecte la capacité d'une personne à fonctionner normalement. Chez la femme, la dépression peut être influencée par des facteurs hormonaux, sociaux, psychologiques, et biologiques, et elle peut survenir à différents moments de la vie (puberté, grossesse, post-partum, ménopause)."
        )
        const [paragraphtwo, setParagraphtwo] = useState(
          <ul>
  <li><strong>Tristesse longue :</strong> Être triste tout le temps.</li>
  <li><strong>Perte de plaisir :</strong> Ne plus aimer les choses.</li>
  <li><strong>Fatigue :</strong> Toujours fatiguée.</li>
  <li><strong>Problème de sommeil :</strong> Difficulté à dormir ou trop dormir.</li>
  <li><strong>Changement d’appétit :</strong> Manger beaucoup moins ou beaucoup plus.</li>
  <li><strong>Difficulté à penser :</strong> Avoir du mal à réfléchir.</li>
  <li><strong>Se sentir coupable :</strong> Penser qu’on fait tout de travers.</li>
  <li><strong>Être irritable :</strong> S’énerver vite.</li>
  <li><strong>Pensées tristes :</strong> Penser à la mort.</li>
  <li><strong>S’isoler :</strong> Ne plus voir les autres.</li>
</ul>

        )
     
        const [btnText, setBtnTex] = useState("Test de la Dépression")
        const [btnLink, setBtnLink] = useState("/test_depression")
        const [srcImg, setSrcImg] = useState("assets/img/gallery/anxi.png")

       
   
   
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
