const router = require("express").Router();
const User = require("../modules/User");
const Post = require("../modules/post");

//CREATE NEW POST,

router.post("/",async (req,res) => {
      const newPost = new Post(req.body);
      try{
          const saved = newPost.save();
          res.status(200).json("Post saved");
      }
      catch(err) {
            res.status(500).json(err);
      }
})

// UPDATE POST 


router.put("/:id", async (req,res) => {
    try{
           const post = await Post.findById(req.params.id);
           if(post.username === req.body.username) {
               try{
                     const updatepost = await  Post.findByIdAndUpdate(
                         req.params.id, 
                         {
                             $set: req.body,
                         }, {
                             new: true
                         }
                     );
                             res.status(200).json(updatepost);                    
               }
               catch (err){
                   res.status(401).json(err);
               }
           }

           else {
               res.status(401).json("you can update only your post");
           }
    }

    catch {

    }
})


// DELETE POST


router.delete("/:id", async (req,res) => {
    try{
           const post = await Post.findById(req.params.id);
           if(post.username === req.body.username) {
               try{
                     
                await post.delete();
                res.status(200).json("Post is being deleted");
                                          
               }
               catch (err){
                   res.status(500).json(err);
               }
           }

           else {
               res.status(401).json("you can delete only your post");
           }
    }

    catch {

    }
}) 


// GET POST

router.get("/:id", async (req,res) => {
    try{
       const post = await Post.findById(req.params.id);
       res.status(200).json(post);
    }

    catch (err) {
           res.status(500).json(err);
    }
})


// GET ALL POSTS


router.get("/", async (req,res) => {
    
    const username = req.query.user;
    const catname = req.query.category;

    try{
        let posts;
        if(username) {
            posts = await Post.find({username});

        } else if(catname) {
            posts = await Post.find({categories: {
                $in: [catname], 
            },});           
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } 

    catch (err) {
           res.status(500).json(err);
    }
})



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