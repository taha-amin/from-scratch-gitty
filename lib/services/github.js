const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  //take the code from GitHub and exchange it for a token
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  });

  const resp = await response.body;
  return resp.access_token;
};

const getGithubProfile = async (token) => {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  return response.json();
};

module.exports = { exchangeCodeForToken, getGithubProfile };
