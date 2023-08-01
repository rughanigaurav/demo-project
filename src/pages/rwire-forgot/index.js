import React from "react";
import { useState } from "react";

import { exportEmailRequired, email, required } from "../../common/validation";
import RWireButton from "../../components/rwire-ui/rwire-button/rwire-button";

const renderField = ({
  input,
  label,
  type,
  className,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <div className="input-box">
        <input {...input} className={className} placeholder={placeholder} type={type} />
      </div>
      {touched &&
        ((error && <div className="text-danger position-absolute">{error}</div>) ||
          (warning && <div className="text-danger position-absolute">{warning}</div>))}
    </div>
  </div>
)

const RwireForgot = (props) => {
  const { onSubmitForgot, onSetForgot, forgotSuccess} = props;
  const [emailId, setEmailID] = useState()
  const handleFormSubmit = (e) => {
    e.preventDefault();
    return onSubmitForgot({ email: e.currentTarget.email.value});
  }

  const emailOnChangeHandler=(e)=>{
    setEmailID(e.target.value)
    onSetForgot({ forgotError: ""});
  }

  return (
    <div className="login-page-design forgot-password-page">
      <div className="login-font row g-0 bg-image">
        <div className="d-none d-md-flex col-md-4 col-lg-6">
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
                  <div className="forgot-main">
                  <h1 className="login-heading mb-4 pb-2">Forgot Your Password</h1>

                  <p className="pb-2 link-info">Enter Your Address And We'll Send Link To Reset Your Password</p>
                  <form
                  onSubmit={handleFormSubmit} autoComplete="off" method="post" validate={required}
                  className="label-size pt-2 forgot-password">
                    <label>Enter Your Email</label>
                    <div className="form-group mb-3">
                      <input
                        name="email"
                        type="email"
                        className="form-control enter-email-forgot"
                        id="floatingInput"
                        placeholder="Enter Your Email"
                        component={renderField}
                        onChange={emailOnChangeHandler}
                        autoComplete="off"
                        validate={[exportEmailRequired, email]}
                        />
                    </div>
                    {forgotSuccess ? <div className="email-link-info"><p>{forgotSuccess}</p></div>: ""}
                    <div className="d-grid mt-3 reset-group">
                      <RWireButton buttonCName={`button text-black reset-button screen-button ${emailId ? "" :"reset-hide"}`} type="submit" disabled={!emailId}>
                        Reset Password
                      </RWireButton>
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
export default RwireForgot;
