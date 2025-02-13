import React from 'react'
import { FaStar,FaStarHalfAlt,FaRegStar } from 'react-icons/fa'

export default function Rating({rating,className}) {
    const stars=[];
 
    for(let i=1;i<=5;i++)    
    {
        if(i<=rating)
        {
           stars.push(<FaStar/>);
        }
        else if(i-0.5<=rating)
        {
            stars.push(<FaStarHalfAlt/>)
        }
        
        else{
            stars.push(<FaRegStar/>)
        }

    }
  return (
    <div className={className} >
{stars}
      
    </div>
  )
}
