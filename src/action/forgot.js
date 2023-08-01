import { fetch } from "../service/fetch";

export const setForgot = (payload) => ({
  type: "FORGOT_SET",
  payload: {
    ...payload,
  },
});

export const setReset = (payload) => ({
  type: "RESET_SET",
  payload: {
    ...payload,
  },
});

export const setSubmitForgot =
  ({ email }) =>
  async (dispatch) => {
    dispatch(
      setForgot({
        forgotSuccess:
          "If your email id exists, an email will be sent to you for resetting the password!",
      })
    );
    let response = "";
    try {
      response = await fetch({
        url: "/api/reset-password/forgot-password",
        body: { email: email },
      });
    } catch (error) {
      dispatch(
        setForgot({
          forgotSuccess:
            "If your email id exists, an email will be sent to you for resetting the password!",
        })
      );
    }
    return response;
  };

export const setSubmitReset =
  ({ password, token }) =>
  async (dispatch) => {
    let response = "";
    try {
      response = await fetch({
        url: `/api/reset-password/reset/${token}`,
        body: { password: password },
      });
      if (response) {
        dispatch(
          setReset({
            resetSuccess: "Password updated successfully.",
          })
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    } catch (error) {
      dispatch(
        setReset({
          resetError: error.message,
        })
      );
    } finally {
      if (!password)
        dispatch(
          setReset({
            resetError: "Please enter the password",
          })
        );
    }
    return response;
  };

export const checkResetToken = (token) => async (dispatch) => {
  let response = "";

  try {
    response = await fetch(
      {
        url: `/api/reset-password/check-reset/${token}`,
      },
      "GET"
    );
    if (response) {
      dispatch(
        setReset({
          isValidToken: true,
          invalidResetTokenCode: "",
        })
      );
    }
  } catch (error) {
    let invalidCode = "";
    if (error.message.includes("reset password link is invalid")) {
      invalidCode = "INVALID";
    } else if (error.message.includes("link in your email is expired")) {
      invalidCode = "EXPIRED";
    }

    dispatch(
      setReset({
        isValidToken: false,
        invalidResetTokenCode: invalidCode,
      })
    );
  }
};
