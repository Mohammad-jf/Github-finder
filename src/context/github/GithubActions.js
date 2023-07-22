import axios from "axios";
const githubUrl = process.env.REACT_APP_GITHUB_URL;

const github = axios.create({
  baseURL: githubUrl,
});


// search for users
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const res = await github.get(`/search/users?${params}`);
  return res.data.items;
};


// get a single userInformation
export const getUserInfo = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });

  const res = await github.get(`/users/${login}`);
  const reposRes = await github.get(`/users/${login}/repos?${params}`);

  if (res.status === 404) {
    window.location = "/notfound";
  } else {
    return {
      user: res.data,
      repos: reposRes.data,
    };
  }
};
