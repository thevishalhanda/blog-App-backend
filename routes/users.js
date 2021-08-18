const router = require("express").Router();
const User = require("../modules/User");
const Post = require("../modules/post");
const bcrypt = require("bcrypt");

//UPDATES

router.put("/:id", async(req,res) => {
   if(req.body.userId === req.params.id) {
       if(req.body.password) {
           const salt = await bcrypt.genSalt(10);
           req.body.password = await bcrypt.hash(req.body.password, salt);
       } 
       try{
           const updateUser = await User.findByIdAndUpdate(req.params.id, {
               $set: req.body,
           });
           res.status(200).json(updateUser);

       } catch(err){
           res.status(500).json(err);
       }
   } 
   else {
       res.status(401).json("You're wrong cridentials");
   }

});

//DELETE 


router.delete("/:id", async (req,res) => {
   
     if(req.body.userId === req.params.id) {
   
    try {
        const user = await User.findById(req.params.id);      
        try{  

            await Post.deleteMany({username: user.username});
             await User.findByIdAndDelete(req.params.id); 
                res.status(200).json("User has been deleted");
 
            
            
        } catch(err){
            res.status(500).json(err);
        }
    }  catch(err) {
               res.status(404).json("User dont found");
    }
}

    else {
        res.status(401).json("You can't your accounts");
    }
   
});

//GET USER 


router.get("/:id", async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }
    catch(err) {
        res.status(500).json(err);
    }

})

module.exports = router;