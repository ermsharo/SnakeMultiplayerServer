const path = require("path");
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv-safe").config();

const jwt = require("jsonwebtoken");

const port = process.env.PORT;

let player_1_status; 
let player_2_status;

const returnToken = (user_id) => {
    const token = jwt.sign({id:user_id }, process.env.SECRET, {
        expiresIn: 3600,
    });
    console.log("token ->",token)
    return token;
 
}

const returnToken_2 = (user_id) => {
    const token = jwt.sign({id:user_id }, process.env.SECRET2, {
        expiresIn: 3600,
    });
    console.log("token ->",token)
    return token;
 
}


const verifyLogin = (email, password) => {
    //Função manual para fazer o processo de login
    console.log("email", email);
    console.log("password", password);


    if (email == process.env.USER1 && password == process.env.PASSWORD1) {
        console.log("usuario 1 logado")

        return {
            id: process.env.USER1_ID,
            name: process.env.USER1,
            token: returnToken(process.env.USER1_ID),
        };

    }

    if (email == process.env.USER2 && password == process.env.PASSWORD2) {
        console.log("usuario 2 logado")

        return {
            id: process.env.USER2_ID,
            name: process.env.USER2,
            token: returnToken_2(process.env.USER2_ID),
        };

    
    }

    return false;




}


router.post("/auth/singin", async (req, res) => {



    const { email, password } = req.body.body.formInputs
    console.log("email", email)
    console.log("password", password)

    let isLoginVerifided = verifyLogin(email, password)
    if (verifyLogin(email, password)) {
        return res.status(200).json(isLoginVerifided);
    }

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
    console.log("login incorreto")
    return res.status(400).send("Login incorreto");
});


module.exports = router;
