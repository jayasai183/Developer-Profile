import React from 'react';
import './header.css'
import img from '../images/Icons/undraw_dev_productivity_umsq 1.png';


function Header(){
     return(
         <div className='header-class'>
             <div className='text-class'>The Developer Repository</div>
             <div className='image-class'>
                 <img src={img} alt="dev"></img>
             </div>
         </div>
     );
}

export default Header