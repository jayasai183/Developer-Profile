const express = require('express');
const mongoose = require('mongoose');
const schema = require("./db");
//const fetch = require('node-fetch');
require('dotenv').config();
const router = express.Router();
const db=process.env.DATABASE;
const user = process.env.DBUSER;
const pass = process.env.PASSWORD;

router.use(express.json());

const uri=`mongodb+srv://${user}:${pass}@cluster0.wgmnd.mongodb.net/${db}?retryWrites=true&w=majority`

console.log(uri)
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connected");
    }
});



//adding a new developer
router.post("/developers", async (req, res) => {
    const devProfile = {};
    const reqData = req.body;
    const git_id = reqData["github_id"];
    fetch(`https://api.github.com/users/${git_id}`).then((response) => {
        return response.json();
    }).then((data) => {
        devProfile["id"] = git_id;
        devProfile["avatar_url"] = data["avatar_url"];
        devProfile["name"] = data["name"];
        devProfile["company"] = data["company"];
        devProfile["blog"] = data["blog"];
        devProfile["location"] = data["location"];
        devProfile["email"] = data["email"];
        devProfile["bio"] = data["bio"];
        devProfile["github_id"] = reqData["github_id"];
        devProfile["linkedin_id"] = reqData["linkedin_id"];
        devProfile["codechef_id"] = reqData["codechef_id"];
        devProfile["hackerrank_id"] = reqData["hackerrank_id"];
        devProfile["twitter_id"] = reqData["twitter_id"];
        devProfile["medium_id"] = reqData["medium_id"];
        //console.log(devProfile);
        const repositories = [];
        fetch(data["repos_url"]).then((response) => response.json()).then((data) => {
            data.forEach(element => {
                const repoData = {};
                repoData["name"] = element["name"];
                repoData["html_url"] = element["html_url"];
                repoData["description"] = element["description"];
                repoData["updated_at"] = element["updated_at"];
                repositories.push(repoData);
            });
            //console.log(repositories);
            devProfile["repos"] = repositories;
            //console.log(devProfile);
            return devProfile;
        }).then(async (devProfile) => {
            //console.log(devProfile);
            const profile = new schema(devProfile);
            await profile.save().then(res.status(201).send({id:devProfile["id"]}));
        }).catch((err) => {
            console.log(err);
            res.status(400).send("Error");
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send("Error");
    })
})

//fetching developer data using id
router.get("/developers/:id", async (req, res) => {
    const reqId = req.params.id;
    const result = await schema.find({ id: reqId });
    if (result != []) {
        res.status(200).send(result);
    } else {
        res.status(404).send("user does not exist");
    }
})

//fetching all developers
router.get("/developers", async (req, res) => {
    const devArray = await schema.find();
    const devs = [];
    devArray.forEach(dev => {
        const devData = {};
        devData["id"] = dev["id"];
        devData["avatar_url"] = dev["avatar_url"];
        devs.push(devData);
    })
    res.send(devs);
})

//have to create api for full dev list.

//delete dev
router.delete("/developers/:id", async (req, res) => {
    const reqId = req.params.id;
    await schema.deleteOne({ id: reqId }).then(res.status(204).send("Profile Deleted"));
})

module.exports=router;