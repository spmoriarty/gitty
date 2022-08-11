const { Router } = require("express");
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const GitHubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../services/github');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;




module.exports Router()

.get('/login', async (req, res, next) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
})
.get('/callback' , async (req, res, next) => {
    const { code } = req.query;
    const token = await exchangeCodeForToken(code);
    try {

    } catch {

    }
});