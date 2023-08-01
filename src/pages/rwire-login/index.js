import React, { useEffect } from "react";
import { useState } from "react";
import VisibleIcon from "@rsuite/icons/Visible";
import UnvisibleIcon from "@rsuite/icons/Unvisible";
import {
  exportEmailRequired,
  email,
  passwordRequired,
  required,
} from "../../common/validation";
import { Link } from "react-router-dom";
import "./login.scss";
import { Input, InputGroup } from "rsuite";

const renderField = ({
  input,
  label,
  type,
  className,
  placeholder,
  meta: { touched, error, warning },
}) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <div className="input-box">
        <input
          {...input}
          className={className}
          placeholder={placeholder}
          type={type}
        />
      </div>
      {touched &&
        ((error && (
          <div className="text-danger position-absolute">{error}</div>
        )) ||
          (warning && (
            <div className="text-danger position-absolute">{warning}</div>
          )))}
    </div>
  </div>
);

const RwireLogin = (props) => {
  const { onSubmit, loginError, onSetLogin } = props;

  // eslint-disable-next-line no-unused-vars
  const [isExpired, setExpired] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    setExpired(sessionStorage.getItem("expired"));

    sessionStorage.removeItem("expired");

  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault();

    return onSubmit({
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    });
  };

  const emailOnChangeHandler = () => {
    onSetLogin({ loginError: " " });
  };

  const passwordOnChangeHandler = () => {
    onSetLogin({ loginError: " " });
  };

  return (
    <div className="login-page-design">
      <div className="login-font row g-0 bg-image">
        <div className="d-none d-md-flex col-md-4 col-lg-6 login-inner-left">
          <div className="d-flex flex-column justify-content-center left-side-alignment">
            <p className="left-side-value">Value</p>
            <div className="left-side-proposition font-weight-bold">
              <p className="prop-header">Proposition</p>
            </div>
            <div>
              <p className="para text-black">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem
              </p>
            </div>
            <div>&nbsp;</div>
            <div className="original-img">
              <div className="pt-5">Screenshots</div>
              <div>/Features</div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 login-main">
          <div className="d-flex align-items-center py-4 login-page-inner">
            <div className="container container-bg">
              <div className="row">
                <div className="col-md-12 col-lg-11 mx-auto ">
                  <div>
                    <div className="mb-4">
                      <h1 className="login-heading">Welcome to RW</h1>
                      {Boolean(isExpired) ? (
                        <div className="text-danger login-session-error font-weight-bold">
                          Your session has expired, Please login again.
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <form
                      onSubmit={handleFormSubmit}
                      autoComplete="off"
                      method="post"
                      validate={required}
                      className="label-size pt-2"
                    >
                      <label>Email *</label>
                      <div className="form-group mb-3">
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Email id"
                          component={renderField}
                          onChange={emailOnChangeHandler}
                          autoComplete="off"
                          validate={[exportEmailRequired, email]}
                        />
                      </div>
                      <label className="pt-3">Password *</label>
                      <div className="form-group mb-3 password-input-section">
                        <InputGroup inside>
                          <Input
                            name="password"
                            type={`${passwordVisible ? "text" : "password"}`}
                            className="form-control password-input"
                            id="floatingPassword"
                            placeholder="Password"
                            component={renderField}
                            onChange={passwordOnChangeHandler}
                            autoComplete="off"
                            validate={passwordRequired}
                          />
                          <InputGroup.Addon
                            className="cursor-pointer"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                          >
                            {passwordVisible ? (
                              <VisibleIcon color="black" />
                            ) : (
                              <UnvisibleIcon color="#000" />
                            )}
                          </InputGroup.Addon>
                        </InputGroup>
                      </div>

                      <div className="login-remember d-flex flex-column col-md-12 p-0">
                        <div className="d-flex justify-content-end">
                          <Link
                            className="label-size frgt-pass"
                            to="/en/forgot-password"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <div className="login-text-danger">
                          {loginError ? loginError : ""}
                        </div>
                      </div>
                      <div className="d-grid mt-3">
                        <button className="button p-2 text-black" type="submit">
                          <b>Sign In</b>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RwireLogin;
