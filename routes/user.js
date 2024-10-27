const router = require("express").Router();
const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");
const Doctor = require("../models/Doctor");
const Pharmacist = require("../models/Pharmacist");
const parient = require("../models/Patient");
const Patient = require("../models/Patient");

// update
router.put("/:id", async (req, res)=>{
    const userId = req.params.id;
    if(req.body.userId === userId){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);

            }catch(err){
                res.status(404).json(err);
            }
            try{
                const user = await Doctor.findOne(userId)
                let role = "Doctor"
                if(!user){
                    user = await Patient.findOne(userId);
                    let role = "Patient "
                }
                if(!user){
                    user = await Pharmacist.find(userid); 
                }
                if(!user){
                    res.status(404).json("user not found");
                }
            }
        } 
    }
})