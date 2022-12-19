const path = require("path");
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv-safe").config();

const jwt = require("jsonwebtoken");

const port = process.env.PORT;
const verifyLogin = (email, password) =>{
    //Função manual para fazer o processo de login
    console.log("email", email); 
    console.log("password", password); 
    //     let userId = userByMail.id;
    const token = jwt.sign({ userId }, process.env.SECRET, {
            expiresIn: 3600,
    });

    if(email == process.env.us)

    //     return res.status(200).json({
    //         id: userByMail.id,
    //         name: userByMail.userName,
    //         token: token,
    //     });

    if(password == process.env.)

}


router.post("/auth/singin", async (req, res) => {


    const { email, password } = req.body.body.formInputs
    console.log("email", email)
    console.log("password", password)
    return res.status(200).send("Done");
    // if (
    //     userByMail.email == email &&
    //     bcrypt.compareSync(password, userByMail.password)
    // ) {
    //     let userId = userByMail.id;
    //     const token = jwt.sign({ userId }, process.env.SECRET, {
    //         expiresIn: 3600,
    //     });

    //     return res.status(200).json({
    //         id: userByMail.id,
    //         name: userByMail.userName,
    //         token: token,
    //     });
    // }

    // return res.status(400).send("User or password invalid");
});


module.exports = router;
