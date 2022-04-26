import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { NavigateFunction } from "react-router-dom";

import { LoginForm } from "./LoginForm";
import { login } from "../../slices/authSlice";
import { AppThunk } from "../../app/store";

interface IDispatchProps {
  login: (
    email: string,
    password: string,
    navigate: NavigateFunction
  ) => AppThunk;
}

export interface EnhancedLoginFormValues {
  email: string;
  password: string;
}

export interface EnhancedLoginFormProps {
  email?: string;
  password?: string;
  navigate: NavigateFunction;
  login: (email: string, password: string, navigate: NavigateFunction) => void;
}
const EnhancedLoginForm = withFormik<
  EnhancedLoginFormProps,
  EnhancedLoginFormValues
>({
  mapPropsToValues: (props) => ({
    email: props.email || "",
    password: props.password || "",
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { login, navigate } = props;
    const { email, password } = values;
    login(email, password, navigate);
    setSubmitting(false);
  },
  displayName: "BasicForm",
})(LoginForm);

export default connect<null, IDispatchProps>(null, { login })(
  EnhancedLoginForm
);
