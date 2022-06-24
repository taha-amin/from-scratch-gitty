/* eslint-disable no-console */
const exchangeCodeForToken = async (code) => {
  return `MOCK_TOKEN_FOR_CODEE${code}`;
};

const getGithubProfile = async (token) => {
  return {
    login: 'fake_github_user',
    avatar_url: 'https://www.placecage.com/gif/300/300',
    email: 'not-real@example.com',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
