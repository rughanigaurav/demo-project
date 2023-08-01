import { fetch } from "../service/fetch";
import { setCookie } from "../service/cookie";

export const setLogin = (payload) => ({
  type: "LOGIN_SET",
  payload: {
    ...payload,
  },
});


export const setSubmit = ({ email, password }) => async (dispatch) => {
  let response = "";
  try {
    response = await fetch({
      url: "/api/login",
      body: { username: email, password }
    });

    if(response.token) {
      setCookie(`BEARER=${response.token};`);

      sessionStorage.setItem('token', response.token);

      dispatch(setLogin({
        isAuthSuccess: true,
        loginError: " "
      }));

      window.location.href = "/";
    }

  }

  catch(error) {
    dispatch(setLogin({
      loginError: "Invalid email or password"
    }));

  }

  finally{if(!email && !password)
    dispatch(setLogin({
      loginError: "Please enter the email and password"
    }))
    else if(!email)
    dispatch(setLogin({
      loginError: "Please enter the email"
    }))
    else if(!password)
    dispatch(setLogin({
      loginError: "Please enter the password"
    }));
  }

  return response;
};
