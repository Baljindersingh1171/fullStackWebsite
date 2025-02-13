import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase';
import React from 'react'
import { data, useNavigate } from 'react-router-dom';
import Home from './Home';
import image from '../assests/images/google.png';
import "../continue.css"


export default function ContinueWithgoogle() {
    const navigate=useNavigate();
    const googleLogin=async()=>
    {
        const provider=new GoogleAuthProvider();
        try{
               let data= await signInWithPopup(auth,provider)
                console.log('data',data.user.displayName)
                let Username=data.user.displayName;
                let  Profileurl=data.user.photoURL;            
                navigate('/Home', { state: {displayName: Username,Profileurl:Profileurl } });
                // navigate('/Home')
            
        }
        catch(err){
            console.log(err);

        }
       
        

    }
  return (
    <div>
 
    <img id="google"src={image} alt='' onClick={googleLogin}/>
    
      
    </div>
  )
}
