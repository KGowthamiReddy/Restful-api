const Userdb = require('../model/model');
const userdb = require('../model/model');

// create and save new user
exports.create = (req, res) => {
    // validate a request
    if(!req.body) {
        res.status(400).send({message : "content can not be empty!"})
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data);
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || 'some error occured while creating a create operation'
            });
        });

}

// retrieve and return all users/ retrieve and return a single user
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({
                        message : `not found user with id ${id}`
                    });
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message : `error retrieving user with id ${id}`
                })
            })

    } else {
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch( err => {
            res.status(500).send({
                message : err.message || 'error occured while retriving user information' 
            });
        });

    }

}

// update a new identified user by user id
exports.update = (req, res) => {
    if(!req.body){
        return res
            .status(400)
            .send({message : 'data to update can not be empty'})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {userFindAndModify : false})
        .then(data => {
            if(!data) {
                res.status(404).send({message : `cannot update user with ${id}. maybe user not found `})
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message : 'error update user information'})
        });

}

// delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message : `cannot delete with id ${id}. Maybe id is wrong`
                });
            } else {
                res.send({
                    message : `user was deleted successfully`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message : `could not delete user with id : ${id}`
            });
        });

}