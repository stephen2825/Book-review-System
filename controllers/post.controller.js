const { where } = require('sequelize');
const models = require('../models');
const validator = require('fastest-validator');

function save(req,res){
    const post = {
        title:req.body.title,
        author:req.body.author,
        genre:req.body.genre,
        imageUrl:req.body.imageUrl,
        description:req.body.description,
        reviewId:req.body.reviewId,
        userId:12
        
    }

    const schema = {
        title:{type:"string",optional:false,max:"100"},
         author:{type:"string",optional:false,max:"100"},
          genre:{type:"string",optional:false,max:"100"},
           description:{type:"string",optional:false,max:"500"},
            reviewId:{type:"number",optional:false},
            
    }
    const v = new validator();
    const validateResponse = v.validate(post,schema);
    if(validateResponse!==true){
        return res.status(400).json({
            message:"Validation faied",
            error:validateResponse
        });
    }

    models.Post.create(post).then(result=>{
        res.status(201).json({
            message:"book created successfully",
            post:result
        });
    }).catch(error=>{
        res.status(500).json({
            message:"something went wrong",
            error:error
    });

    });
}

function show (req,res){
    const id = req.params.id;
    models.Post.findByPk(id).then(result=>{
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
            message:"Post not found!"
        })

        }
        res.status(200).json(result);
    }).catch(error=>{
        res.status(500).json({
            message:"something wrong"
        })

    });
}

function index (req,res){
    
    models.Post.findAll().then(result=>{

        res.status(200).json(result);
    }).catch(error=>{
        res.status(500).json({
            message:"something wrong"
        })

    });
}


function update (req,res){
    const id = req.params.id;
    const updatedPost = {
        title:req.body.title,
        author:req.body.author,
        genre:req.body.genre,
        imageUrl:req.body.imageUrl,
        description:req.body.description,
        reviewId:req.body.reviewId,
    }

    const userId=12;

    const schema = {
        title:{type:"string",optional:false,max:"100"},
         author:{type:"string",optional:false,max:"100"},
          genre:{type:"string",optional:false,max:"100"},
           description:{type:"string",optional:false,max:"500"},
            reviewId:{type:"number",optional:false},
            
    }
    const v = new validator();
    const validateResponse = v.validate(updatedPost,schema);
    if(validateResponse!==true){
        return res.status(400).json({
            message:"Validation faied",
            error:validateResponse
        });
    }

    models.Post.update(updatedPost,{where: {id:id,userId:userId}}).then(result=>{
        res.status(200).json({
            message:"book updated  successfully",
            post:updatedPost
        });
        
    }).catch(error=>{
        res.status(500).json({
            message:"something wrong",
            error:error
        })

    });
    
}

function destroy(req,res){
    const id = req.params.id;
    const userId=10;

    models.Post.destroy({where: {id:id,userId:userId}}).then(result=>{
        res.status(200).json({
            message:"book deleted successfully",
            
        });
        
    }).catch(error=>{
        res.status(500).json({
            message:"something wrong",
            error:error
        })

    });

}



module.exports = {
    save:save,
    show:show,
    index:index,
    update:update,
    destroy:destroy
}
