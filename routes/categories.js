const router = require("express").Router();
const Category = require("../modules/categpry");


router.post("/", async (req,res) => {
    const newcat = new Category(req.body);
    try{

        const savedcat = await newcat.save();
        res.status(200).json(savedcat);
    }
    catch(err) {
        res.status(500).json(err);
    }

})


// ALL CATEGORIES

router.get("/", async (req,res) => {
    const newcat = new Category(req.body);
    try{

        const savedcat = await newcat.find();
        res.status(200).json(savedcat);
    }
    catch(err) {
        res.status(500).json(err);
    }

})



module.exports  = router;