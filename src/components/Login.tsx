import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { User } from "../interfaces/User";
import { checkUser } from "../services/usersService";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbackService";

interface LoginProps {
  setNotIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setUserApp: React.Dispatch<React.SetStateAction<User>>;
}

const Login: FunctionComponent<LoginProps> = ({
  setNotIsLogin,
  setUserApp,
}) => {
  const navigate: NavigateFunction = useNavigate();
  const formik = useFormik<User>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required().min(4),
    }),
    onSubmit: async (values) => {
      checkUser(values)
        .then((res) => {
          if (res.data.length > 0) {
            console.log(res.data);

            navigate("/products");

            localStorage.removeItem("userId");
            localStorage.setItem("userId", JSON.stringify(res.data[0]));
            setNotIsLogin(false);
            setUserApp(res.data[0]);
            // setUserName(values);
            // userSetItem(values);
            successMsg("Sucessful login");
          } else {
            console.log("User not found- ", res.data);
            errorMsg("User not found");
          }
        })
        .catch((err) => {
          console.log(err);
          errorMsg(err);
        });
    },
  });

  return (
    <>
      <div className="container d-flex justify-content-center align-item-center flex-column col-6">
        <h5 className="display-5 my-2">LOGIN</h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Email address</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingPassword">Password</label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
          </div>
          <button
            className="btn btn-primary mt-3 w-100"
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
          >
            Login
          </button>
        </form>
        <p className="mt-3">
          <Link to="/register">New user? Register now</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
