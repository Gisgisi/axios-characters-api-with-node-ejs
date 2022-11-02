const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.get("/create", (req, res) => {
    res.render("characters/create-character")
});

router.post("/characters/create", (req, res, next) => {
    axios.post('https://ih-crud-api.herokuapp.com/characters', req.body)
        .then(responseFromAPI => {
            res.redirect("/characters");
        })
});

router.get("/characters/:id/update", (req,res)=>{
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            res.render("characters/edit-character", { character: responseFromAPI.data });
        })
})

router.post("/characters/:id/update", (req,res)=>{
    axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`,req.body)
    .then(responseFromAPI=>{
        res.redirect(`/characters/${req.params.id}`)
    }).catch(err => console.error(err))

});

router.post("/characters/:id/delete", (req,res)=>{
    axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI=>{
        res.redirect(`/characters`)
    }).catch(err => console.error(err))
})


router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters