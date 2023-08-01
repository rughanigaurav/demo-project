import React from "react";
import { useState } from "react";
import { passwordRequired, required } from "../../common/validation";
import { useParams } from "react-router-dom";
import "./style.scss";
import { useTranslation } from "react-i18next";
import RwireResetLinkExpire from "../rwire-reset-link-expire";
import RwireLoader from "../../container/rwire-loader";

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

const RwireResetPassword = (props) => {
  const { t } = useTranslation();

  const { onSubmitReset, resetError, onSetReset, resetSuccess, isValidToken } =
    props;
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const params = useParams();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const re =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const isOk = re.test(confirmPassword);
    // eslint-disable-next-line eqeqeq
    if (newPassword == confirmPassword) {
      if (!isOk) {
        onSetReset({
          resetError:
            "Please create password like [8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character]",
        });
      } else {
        return onSubmitReset({
          password: confirmPassword,
          token: params.token,
        });
      }
    } else {
      onSetReset({ resetError: "Password mismatch please check the password" });
    }
  };

  const newPasswordHandle = (e) => {
    setNewPassword(e.target.value);
    onSetReset({ resetError: "" });
  };

  const confirmPasswordHandle = (e) => {
    setConfirmPassword(e.target.value);
    onSetReset({ resetError: "" });
  };
  return (
    <>
      {isValidToken === undefined ? (
        <RwireLoader />
      ) : !isValidToken ? (
        <RwireResetLinkExpire />
      ) : (
        <div className="login-page-design reset-password-page">
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
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem
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
                        <h1 className="login-heading mb-4 pb-2">
                          {t("reset_title")}
                        </h1>
                        <p className="pb-2 link-info">{t("reset_sub_title")}</p>
                        <form
                          onSubmit={handleFormSubmit}
                          autoComplete="off"
                          method="post"
                          validate={required}
                          className="label-size pt-2 forgot-password"
                        >
                          <label>New Password</label>
                          <div className="form-group mb-3">
                            <input
                              name="password"
                              type="password"
                              className="form-control"
                              id="floatingPassword"
                              autocomplete="off"
                              placeholder="New Password"
                              component={renderField}
                              onChange={newPasswordHandle}
                              autoComplete="off"
                              validate={passwordRequired}
                            />
                          </div>
                          <label className="pt-3">Confirm New Password</label>
                          <div className="form-group mb-3">
                            <input
                              name="password"
                              type="password"
                              className="form-control"
                              id="floatingPassword"
                              autocomplete="off"
                              placeholder="Confirm New Password"
                              component={renderField}
                              onChange={confirmPasswordHandle}
                              autoComplete="off"
                              validate={passwordRequired}
                            />
                          </div>
                          {resetError ? (
                            <div className="email-link-info-error">
                              <p>{resetError}</p>
                            </div>
                          ) : (
                            ""
                          )}
                          {resetSuccess ? (
                            <div className="email-link-info">
                              <p>{resetSuccess}</p>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="d-grid mt-3 reset-group">
                            {!newPassword || !confirmPassword ? (
                              <button
                                className="button p-2 text-black reset-button reset-hide"
                                type="submit"
                                disabled
                              >
                                <b>Reset Password</b>
                              </button>
                            ) : (
                              <button
                                className="button p-2 text-black reset-button"
                                type="submit"
                              >
                                <b>Reset Password</b>
                              </button>
                            )}
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
      )}
    </>
  );
};
export default RwireResetPassword;
