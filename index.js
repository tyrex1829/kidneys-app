const express = require("express");
const app = express();

var users = [{
    name: "tyrex",
    kidneys: [{
        healthy: false
    }, {
        healthy: true
    }]
}]

app.use(express.json());

app.get("/", (req, res) => {
    const tyrexKidneys = users[0].kidneys;
    const numberOfKidneys = tyrexKidneys.length;
    let numberOfHealthyKidneys = 0;
    for(let i = 0; i < tyrexKidneys.length; i++){
        if(tyrexKidneys[i].healthy){
            numberOfHealthyKidneys += 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
    console.log(tyrexKidneys);
});

app.post("/", (req, res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "done!"
    })
});

app.put("/", (req, res) => {
    if(isThereAtleastOneUnhealthyKidney()){
        for(let i = 0; i < users[0].kidneys.length; i++){
            users[0].kidneys[i].healthy = true;
        }
        res.json({});
    }
    else{
        res.status(411).json({
            msg: "All kidneys are already healthy"
        })
    }
});

app.delete("/", (req, res) => {
    if(isThereAtleastOneUnhealthyKidney()){
        const newKidneys = [];
        for(let i = 0; i < users[0].kidneys.length; i++){
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            msg: "done"
        })
    }
    else{
        res.status(411).json({
            msg: "You have no bad kidneys"
        })
    }
    
});

function isThereAtleastOneUnhealthyKidney(){
    let atleastOneUnhealthyKidney = false;
    for(let i = 0; i < users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney
}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});