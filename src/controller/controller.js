const User = require('../models/model')

//Create and save new user

exports.create = (req, res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"});
        return
    }

    //new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    //save user in database
    user
    .save(user)
    .then(data=>{
        //res.send(data)
        res.redirect('/add-user')
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occoured while creating a create operation"
        })
    })
}

//retrive and return all users or retrive or return single user 
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;
        User.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    message: err.message || "Not found user with id" +id
                }) 
            }else{
                res.send(data)
            }
        }).catch(err=>{
            res.status(500).send({message: "Error retriving user with id" +id})
        })
    }
    else{
    User.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Error occoured while retriving user information"
        })
    })
}
}

//update a new user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res.status(400).send({message:"Data to update cannot be empty"})
    }
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data=>{
        if(!data){
            res.status(404).send({message: `Cannot update user with ${id}. May be user not found.`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Error Update user information"
        }) 
    })
}

//delete a user with user id
exports.delete = (req, res)=>{
    const id = req.params.id;
    User.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message: `Cannot delete with ${id}. May be id is wrong`})
        }else{
            res.send({
                message: "User was deleted successfully!"
            })
        }
    }).catch(err=>{
        res.status(500).send({
            message: "Could not delete user with id =" +id
        });
    });
}

//data are the parameters for the above codes