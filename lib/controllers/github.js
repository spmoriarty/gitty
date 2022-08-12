const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const GitHubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../services/github');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;




module.exports = Router()

  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;
      const token = await exchangeCodeForToken(code);
      const githubProfile = await getGithubProfile(token);
      console.log(githubProfile);
      let user = await GitHubUser.findByUsername(githubProfile.login);

      if (!user) {
        user = await GitHubUser.insert({
          username: githubProfile.login,
          email: githubProfile.email,
          avatar: githubProfile.avatar_url,
        });
      }

      const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });

      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .redirect('/api/v1/github/dashboard');
    } catch(e) {
      next(e);
    }
  })
  .get('/dashboard', authenticate, async (req, res) => {
    res.json(req.user);
  })

  .delete('/session', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed Out' });
  });
