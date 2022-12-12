const path = require("path");
const { Op } = require("sequelize");
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv-safe").config();

const jwt = require("jsonwebtoken");



router.post("/auth/singin", async (req, res) => {
    console.log("singin req", req.body);
    const { email, password } = req.body.formInputs;
    console.log("->", email, password);
    let atalho = "emilio@mail.com";
    let atalhoSenha = "abc123";

    const userByMail = getUserByMail.dataValues;
    console.log("---> user obj", userByMail);
    let isPasswordValid = bcrypt.compareSync(
        atalhoSenha,
        userByMail.password
    );




    if (
        userByMail.email == email &&
        bcrypt.compareSync(password, userByMail.password)
    ) {
        let userId = userByMail.id;
        const token = jwt.sign({ userId }, process.env.SECRET, {
            expiresIn: 3600,
        });

        return res.status(200).json({
            id: userByMail.id,
            name: userByMail.userName,
            token: token,
        });
    }

    return res.status(400).send("User or password invalid");
});

module.exports = router;
