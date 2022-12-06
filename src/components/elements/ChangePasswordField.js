import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import zxcvbn from "zxcvbn";
import FormField from "./FormField";

const ChangePasswordField = ({
  children,
  minStrengthParam = 3,
  thresholdLengthParam = 7,
  onPasswordChanged,
  onPassword2Changed,
}) => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [password2Errors, setPassword2Errors] = useState([]);
  const [strength, setStrength] = useState(0);

  let minStrength =
    typeof minStrengthParam === "number"
      ? Math.max(Math.min(minStrengthParam, 4), 0)
      : 3;
  let thresholdLength =
    typeof thresholdLengthParam === "number"
      ? Math.max(thresholdLengthParam, 7)
      : 7;
  // dynamically set the password length counter class
  let counterClass = [
    "badge badge-pill",
    password.length > thresholdLength
      ? strength >= minStrength
        ? "badge-success"
        : "badge-warning"
      : "badge-danger",
  ]
    .join(" ")
    .trim();
  // password strength meter is only visible when password is not empty
  let strengthClass = [
    "strength-meter mt-2",
    password.length > 0 ? "visible" : "invisible",
  ]
    .join(" ")
    .trim();

  useEffect(() => {
    onPasswordChanged({ value: password, errors: passwordErrors });
  }, [password]);

  useEffect(() => {
    onPassword2Changed({ value: password2, errors: password2Errors });
  }, [password2]);

  const validatePasswordStrong = (value) => {
    // ensure password is long enough
    if (value.length <= thresholdLength) throw new Error("Password is short");

    // ensure password is strong enough using the zxcvbn library
    if (zxcvbn(value).score < minStrength) throw new Error("Password is weak");

    if (value !== password2) throw new Error("Passwords do not match");
  };

  const validatePasswordMatch = (value) => {
    // ensure passwords match
    if (value !== password) throw new Error("Passwords do not match");
  };

  const passwordChanged = (state) => {
    setPassword(state.value);
    setStrength(zxcvbn(state.value).score);
    setPasswordErrors(state.errors);
  };

  const password2Changed = (state) => {
    setPassword2(state.value);
    setPassword2Errors(state.errors);
  };

  return (
    <Fragment>
      <div className="mb-3">
        {/** Pass the validation and stateChanged functions as props to the form field **/}
        <FormField
          type="password"
          name="password"
          validator={validatePasswordStrong}
          onStateChanged={passwordChanged}
          fieldId="password"
          label="New"
          placeholder="Enter new password"
          required
        >
          <span className="d-block form-hint">
            To conform with our Strong Password policy, you are required to use
            a sufficiently strong password. Password must be more than 8
            characters.
          </span>
          {children}
          {/** Render the password strength meter **/}
          <div className={strengthClass}>
            <div className="strength-meter-fill" data-strength={strength} />
          </div>
        </FormField>
        <div className="position-absolute password-count mx-3">
          {/** Render the password length counter indicator **/}
          <span className={counterClass}>
            {password.length
              ? password.length > thresholdLength
                ? `${thresholdLength}+`
                : password.length
              : ""}
          </span>
        </div>
      </div>
      <div className="mb-4">
        <FormField
          type="password"
          name="password2"
          fieldId="password2"
          label="Re-type new"
          placeholder="Re-type new password"
          validator={validatePasswordMatch}
          onStateChanged={password2Changed}
          required
        />
      </div>
    </Fragment>
  );
};

ChangePasswordField.propTypes = {
  children: PropTypes.node,
  minStrengthParam: PropTypes.number,
  thresholdLengthParam: PropTypes.number,
  onPasswordChanged: PropTypes.func.isRequired,
  onPassword2Changed: PropTypes.func.isRequired,
};

export default ChangePasswordField;
