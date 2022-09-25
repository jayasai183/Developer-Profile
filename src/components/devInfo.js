import React, { useEffect, useState } from "react";
import accountCircle from "../images/Icons/account_circle-24px.svg";
import LinkedInIcon from '../images/Profile/iconfinder_2018_social_media_popular_app_logo_linkedin_3225190.png';
import GithubIcon from '../images/Profile/iconfinder_github_317712.png';
import CodechefIcon from '../images/Profile/codechef-1324440139527402917_32.png';
import HackerRankIcon from '../images/Profile/iconfinder_160_Hackerrank_logo_logos_4373234.png';
import MediumIcon from '../images/Profile/iconfinder_Circled_Medium_svg5_5279113.png';
import TwitterIcon from '../images/Profile/iconfinder_2018_social_media_popular_app_logo_twitter_3225183.png';
import Email from '../images/Profile/email-24px.svg';
import Arrow from '../images/Icons/north_east-24px.svg';
import location_img from '../images/Icons/location_on-24px.svg';
import company_img from '../images/Icons/business-24px.svg';
import link from '../images/Icons/insert_link-24px (1).svg';
import Footer from '../components/footer'
import './devInfo.css';
import { useParams, useNavigate } from "react-router-dom";



function DevInfo() {

    const { id } = useParams();
    const [devDetails, setDevDetails] = useState([]);
    const [data, setData] = useState(false);
    const navigate = useNavigate();

    const devData = async () => {
        fetch(`/api/developers/${id}`).then((res) => {
            return res.json();
        }).then(
            (data) => { setDevDetails(data); }
        ).then(() => { setData(true) });
    }

    useEffect(() => {
        devData();
    }, []);

    if (data) {
        const { repos, hackerrank_id, avatar_url, bio, blog, codechef_id, company, email, github_id, linkedin_id, location, medium_id, name, twitter_id } = devDetails[0];

        return (
            <React.Fragment>
                <div className="main-div">
                    <div className="devpro-header-class">
                        <div className="devpro-header-wrapper">
                            <div className="developer-profile">The Developer Profile</div>
                            <div className="all-developers" onClick={() => { navigate('/') }}>All Developers</div>
                        </div>
                    </div>
                    <div className="profile-body-class">
                        <div className="profile-pic-class">
                            <img className="profile" src={avatar_url} alt={accountCircle} />
                        </div>
                        <div className="details-body-class">
                            <div className="name-class">
                                <div className="name">{name}</div>
                            </div>
                            <div className="bio-class">{bio}</div>
                            <div className="socialmedia-class">
                                <a href={`https://www.codechef.com/${codechef_id}`}><img src={CodechefIcon} alt="Codechef-Icon" /></a>
                                <a href={`https://www.hackerrank.com/${hackerrank_id}`}><img src={HackerRankIcon} alt="hackerrank-Icon" /></a>
                                <a href={`mailto:${email}`}><img src={Email} alt="email-Icon" /></a>
                                <a href={`https://www.linkedin.com/in/${linkedin_id}`}><img src={LinkedInIcon} alt="linkedin-Icon" /></a>
                                <a href={`https://twitter.com/${twitter_id}`}><img src={TwitterIcon} alt="twitter-Icon" /></a>
                                <a href={`https://medium.com/${medium_id}`}><img src={MediumIcon} alt="medium-Icon" /></a>
                                <a href={`https://github.com/${github_id}`}><img src={GithubIcon} alt="github-Icon" /></a>
                            </div>
                            <div className="address-class">
                                <img src={location_img} alt="location" />
                                <span className="location">{location}</span>
                                <img src={company_img} alt="company" />
                                <span className="company">{company}</span>
                                <img src={link} alt="web-link" />
                                <span className="link">{blog}</span>
                            </div>
                        </div>
                    </div>
                    <div className="github-title">Github repositories</div>
                    <hr className="github-hr" />
                    <div className="repos-class">
                        { repos.map((repo, index) => {
                           return( <div className="repo-class" key={index}>
                                <div className="repo-title">
                                    <div className="repo-name">{repo["name"]}</div>
                                    <a href={repo["html_url"]}><img className="repo-link" src={Arrow} alt="repository-link" /></a>
                                    <div className="repo-update">{repo["updated_at"]}</div>
                                </div>
                                <div className="description">{repo["description"]}</div>
                                <hr className="repo-hr"></hr>
                            </div>)
                           })
                        }   
                    </div>
                    <Footer/>
                </div>
            </React.Fragment>
        )
    }
}

export default DevInfo;