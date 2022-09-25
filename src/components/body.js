import React, { useState, useEffect } from 'react';
import Header from './header';
import SearchIcon from "../images/Icons/search-24px.svg";
import './body.css';
import Profile from './profiles';
import Footer from './footer';
import DevForm from './devForm';


function Body() {
    
    const [addDev, setaddDev] = useState(false);
    const [developers, setDevelopers] = useState([]);
    const [newDev, setNewDev] = useState(false);
    const [searchWord,setSearchWord]= useState('');

    const HandleClick = () => {
        window.scrollTo(0, 300);
        setaddDev(true);
    }

    const settingNewDev =  () => {
        setNewDev(true);
    }

    const allDevelopers = () => {
        fetch("/api/developers").then(
            (res) => { return res.json() }
        ).then(
                (data) => { setDevelopers(data); }
            )
    }

    useEffect(() => { allDevelopers(); }, [newDev]);

    const searchDevelopers=()=>{
        if(searchWord===''){
            allDevelopers();
        }else{
            let devs=[];
            devs=developers.filter((developer)=>{return developer.id.startsWith(searchWord)});
            setDevelopers(devs);
        }
    }

    useEffect(()=>{searchDevelopers();},[searchWord]);

    return (
        <React.Fragment>
            <Header />
            <div className='explore-class'>Explore developer profiles</div>
            <hr></hr>
            <div className='search-bar'>
                <div className='search-bar-wrapper'>
                    <input type='text' className='searchBox' placeholder='Search For Developer' onChange={(e)=>{setSearchWord(e.target.value)}}/>
                    <img type="submit" className="searchBtn" src={SearchIcon} alt="search" onClick={searchDevelopers}/>
                </div>
            </div>
            <Profile developers={developers} />
            <hr className='hr-class'></hr>
            <div className='below-text-class'>Could not find what you were looking for?</div>
            <div className='rectangle-class'>
                <div className='add-class' type="button" onClick={HandleClick}>Add developer info</div>
            </div>
            {addDev && <DevForm dev={settingNewDev}/>}
            <Footer />
        </React.Fragment>
    )
}

export default Body;