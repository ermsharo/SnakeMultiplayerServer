const path = require("path");
const { Op } = require("sequelize");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv-safe").config();

const jwt = require("jsonwebtoken");



router.post("/auth/singin", async (req, res) => {

    const { email, password } = req.body.formInputs;


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
