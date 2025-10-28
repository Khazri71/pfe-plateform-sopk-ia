import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';
import { BarreNavigation } from '../../layouts/BarreNavigation';
import { PiedPage } from '../../layouts/PiedPage';
import { NavLink } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { BsArrowRepeat } from "react-icons/bs";
export const TestDepression = () => {


  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('currentUserId');
  const [final, setFinal] = useState('');
    const [resultatDep, setResultatDep] = useState('');
    const[error , setError] = useState('')


       //***********Récupérer les données de localstorage */
        const [resultatTestDepression, setResultatTestDepression] = useState('');
        useEffect(() => {
           const currentUserId = localStorage.getItem('currentUserId');
           if (currentUserId) {
           const userData = localStorage.getItem(`user_${currentUserId}`);
           if (userData) {
           const user = JSON.parse(userData);
           setResultatTestDepression(user.resultat_test_depression || '');
           }
         }
        }, []);
    


const resetChatboot = async ( ) => {
    //Appel à l’API pour vider le chatbot après résultat final
        try {
          await axios.get(`http://localhost:5000/chatbot/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          //Vider les états du frontend
    setMessages([]);
    // setResultatDep(null);
    // setFinal(false);
    setInput('');
    // setError(null);
          console.log('Chat reset');
        } catch (resetErr) {
          console.error('Erreur lors de la réinitialisation du chat:', resetErr);
        }
}

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await axios.post(
       `http://localhost:5000/chatbot_depression/${userId}`,
        { message: input },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.data.response) {

        const botMessage = { text: response.data.response, sender: 'bot' };
        setMessages((prev) => [...prev, botMessage]);
        console.log(response.data.response);
        
        if (response.data.isFinal) {
              setResultatDep(response.data.response); // affiche dans le bloc vert
              setFinal(response.data.isFinal)


 // Met à jour l'objet user dans localStorage
       const currentUserId = localStorage.getItem('currentUserId');
       if (currentUserId) {
       const userData = localStorage.getItem(`user_${currentUserId}`);
       if (userData) {
        const user = JSON.parse(userData);
        user.resultat_test_depression = response.data.response;
        localStorage.setItem(`user_${currentUserId}`, JSON.stringify(user));
        // Met à jour le state aussi
        // setResultatTestSopk(response.data.anomaly);
        setResultatTestDepression( response.data.response)
      }
    }
              
        //Appel à l’API pour vider le chatbot après résultat final
        // try {
        //   await axios.get(`http://localhost:5000/chatbot/${userId}`, {
        //     headers: {
        //       Authorization: `Bearer ${token}`
        //     }
        //   });
        //   console.log('Chat reset');
        // } catch (resetErr) {
        //   console.error('Erreur lors de la réinitialisation du chat:', resetErr);
        // }
        
          resetChatboot()


         }
        // setResultatDep(response.data.response)
      }
    } catch (err) {
      console.error('Erreur chatbot:', err.response?.data || err.message);
      setError(err.response?.data?.error || err.message)
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>


      
<div className="container row">


  <div className="col-12 col-md-5 mx-auto ">
 
     {/* <img style={{ width: '100%' }}  src="assets/img/gallery/chmed.jpg" alt="..." /> */}
     <img style={{ width: '100%' , marginTop: '150px' }} src="assets/img/gallery/chatimg.png" alt="..." />

  </div>

   <div className="col-12 col-md-7 mx-auto">

      {/* <BarreNavigation /> */}
      <div>
 {/* className="m-3" */}
      <div className="chat-container ">
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Écris un message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSend}>Envoyer</button>
            <button  onClick={resetChatboot}>
            <BsArrowRepeat />
        </button>


        </div>
      </div>
      {error && (
                        <div className="col-12 mx-auto mb-4" style={{marginTop:"-55px" ,marginBottom:"30px"}}>
                          <div className="alert alert-danger text-center">{error}</div>
                        </div>
                      )}
                      {resultatTestDepression && (
                        <div className="col-12 mx-auto mt-1"  style={{marginTop:"-55px" ,marginBottom:"30px"}}>
                          <div className="alert alert-success text-center">
                            <p className="mb-0">{resultatTestDepression}</p>
                           
                            </div>
                         
      
                        </div> 
                       )}
      


      <div className="d-flex justify-content-center">
        <NavLink to="/" className="navlink-hover-white">
          <button className="btn btn-lg btn-outline-primary rounded-pill me-2 mb-4 bt-white" type="submit">
            <IoChevronBack size={20} />
          </button>
        </NavLink>


        
      </div>

</div>
      {/* <PiedPage /> */}
  </div>



</div>

    

    </>
  );
};
