import React from 'react';
import { useNavigate } from 'react-router-dom';
import avatar_url from '../images/Icons/account_circle-24px.svg';
import Arrow from '../images/Icons/north_east-24px.svg';
import './profile.css';

function Profile(props) {

    const developers = props.developers;
    const navigate = useNavigate();
    return (
        <div className='profile-class'>
            {
                developers.map((dev, index) => {
                    const id=dev["id"];
                    const avatar=dev["avatar_url"];
                    return (
                        <div className="item" key={index}>
                            <div className='profile-picture'> <img src={avatar} className='profilePic' alt={avatar_url} /></div>
                            <div className='id-class'>{id}</div>
                            <div className='link-class'><img className='link' src={Arrow} alt="Profile-link" onClick={()=>{navigate(`devInfo/${id}`)}}></img></div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Profile;