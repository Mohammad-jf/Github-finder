import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();
const githubUrl = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialstate = {
    users: [],
    user: {},
    repos:[],
    lodaing: false,
  };

  // reducer
  const [state, dispatch] = useReducer(githubReducer, initialstate);
 


  // search for users
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });

    const res = await fetch(`${githubUrl}/search/users?${params}`);
    const { items } = await res.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };



  // get a single user
  const getUser = async (login) => {
    setLoading();

    const res = await fetch(`${githubUrl}/users/${login}`);

    if (res.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await res.json();
        dispatch({
          type: "GET_USER",
          payload:data,
        });
    }
  };


  // get user repos
  const getUserRepos = async (login) => {
    setLoading();

     const params = new URLSearchParams({
       sort: 'created',
       per_page:10
     });

    const res = await fetch(`${githubUrl}/users/${login}/repos?${params}`);


    if (res.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await res.json();
      dispatch({
        type: "GET_USER_REPOS",
        payload: data,
      });
    }
  };





  // clear users
  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
      payload: [],
    });
  };
  


  // lodaing spinner
  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };




  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos:state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
