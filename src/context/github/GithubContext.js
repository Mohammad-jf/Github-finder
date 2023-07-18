import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();
const githubUrl = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialstate = {
    users: [],
    lodaing: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialstate);


  const searchUsers = async (text) => {
    setLoading();
      const params = new URLSearchParams({
        q: text,
      });

    const res = await fetch(`${githubUrl}/search/users?${params}`);
    const {items} = await res.json();

    dispatch({
      type:"GET_USERS",
      payload:items,
    })
  };


  const clearUsers = ()=>{
    dispatch({
      type:"CLEAR_USERS",
      payload:[]
    })
  }

 
  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };


  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
