const exchangeCodeForToken = async (code) => {
  return `MOCK_TOKEN_FOR_CODE${code}`;
};

const  getGithubProfile = async (token) => {
  return {
    login: 'fake_github_user',
    avatar_url: 'https://www.placecage.com/gif/300/300',
    email: 'lamp@shade.com'
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };


// not sure what happened in this
