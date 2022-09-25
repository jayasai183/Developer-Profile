import React from 'react';
import { useState } from 'react';
import LinkedInIcon from '../images/Profile/iconfinder_2018_social_media_popular_app_logo_linkedin_3225190.png';
import GithubIcon from '../images/Profile/iconfinder_github_317712.png';
import CodechefIcon from '../images/Profile/codechef-1324440139527402917_32.png';
import HackerRankIcon from '../images/Profile/iconfinder_160_Hackerrank_logo_logos_4373234.png';
import MediumIcon from '../images/Profile/iconfinder_Circled_Medium_svg5_5279113.png';
import TwitterIcon from '../images/Profile/iconfinder_2018_social_media_popular_app_logo_twitter_3225183.png';
import './devForm.css';

function DevForm(props){
    //document.querySelector(".devForm").style.display='flex';
    const[githubId,setGithubId]=useState("");
    const[linkedInId,setLinkedInId]=useState("");
    const[codeChefId,setCodeChefId]=useState("");
    const[hackerRankId,setHackerRankId]=useState("");
    const[twitterId,setTwitterId]=useState("");
    const[mediumId,setMediumId]=useState("");


    const HandleSubmit=async (e)=>{
        e.preventDefault();
        if(githubId==''){
            alert("Github Id should not be empty");
        }else{
        await fetch("/api/developers/",{
            method: "POST",
            headers:{
              "Content-type": "application/json"
            },
            body: JSON.stringify({
                "github_id": githubId,
                "linkedin_id": linkedInId,
                "codechef_id": codeChefId,
                "hackerrank_id": hackerRankId,
                "twitter_id": twitterId,
                "medium_id": mediumId
            })
        }).then(res=>{
            return res.json();
        }).then((data)=>{console.log(data)}).then(props.dev).then(()=>{alert("developer successfully added")}).catch((err)=>{
            alert("Error: Check Github ID or Try Again");
        })
    }
}

    const ClearFormData=async (e)=>{
        document.querySelector(".devForm").style.display='none';
        document.location.reload();
    }
    
    return(
        <React.Fragment>
            <form className='devForm'>
                <div className='form-header'>Add developer profile</div>
                <hr className='form-hr'></hr>
                <div className='input-fields'>
                <div className='github'>
                    <div className='label'>
                    <img className="image" src={GithubIcon} alt="github"></img>Github*
                    </div>
                    <div className='github-input'>
                        <input type="text" className='input-class' onChange={(e)=>{setGithubId(e.target.value)}} required></input>
                    </div>
                </div>
                <div className='linkedIn'>
                    <div className='label'>
                    <img className="image" src={LinkedInIcon} alt="LinkedIn"></img>Linkedin
                    </div>
                    <div className='linkedIn-input'>
                        <input type="text" className='input-class' onChange={(e)=>{setLinkedInId(e.target.value)}}></input>
                    </div>
                </div>
                <div className='CodeChef'>
                    <div className='label'>
                    <img className="image" src={CodechefIcon} alt="CodeChef"></img>Codechef
                    </div>
                    <div className='CodeChef-input'>
                        <input type="text" className='input-class' onChange={(e)=>{setCodeChefId(e.target.value)}}></input>
                    </div>
                </div>
                <div className='Hackerrank'>
                    <div className='label'>
                    <img className="image" src={HackerRankIcon} alt="Hackerrank"></img>Hackerrank
                    </div>
                    <div className='Hackerrank-input'>
                        <input type="text" className='input-class' onChange={(e)=>{setHackerRankId(e.target.value)}}></input>
                    </div>
                </div>
                <div className='Twitter'>
                    <div className='label'>
                    <img className="image" src={TwitterIcon} alt="Twitter"></img>Twitter
                    </div>
                    <div className='Twitter-input'>
                        <input type="text" className='input-class' onChange={(e)=>{setTwitterId(e.target.value)}}></input>
                    </div>
                </div>
                <div className='Medium'>
                    <div className='label'>
                    <img className="image" src={MediumIcon} alt="Medium"></img>Medium
                    </div>
                    <div className='Medium-input'>
                        <input type="text" className='input-class' onChange={(e)=>{setMediumId(e.target.value)}}></input>
                    </div>
                </div>
                </div>
                <hr className='form-hr'></hr>
                <div className='button-class'>
                   <div  className="cancel" onClick={ClearFormData}> Cancel </div>
                   <div  className="submit" onClick={HandleSubmit} >Submit</div>
                </div>
            </form>
        </React.Fragment>
    )
}

export default DevForm;