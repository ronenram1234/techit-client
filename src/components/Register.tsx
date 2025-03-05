import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { FunctionComponent } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";
import { addUser, checkUser } from "../services/usersService";

import { Form } from "react-bootstrap";
import { errorMsg, successMsg } from "../services/feedbackService";

interface RegisterProps {
setNotIsLogin: React.Dispatch<React.SetStateAction<boolean>>;}

const Register: FunctionComponent<RegisterProps> = ({ setNotIsLogin }) => {
  const navigate: NavigateFunction = useNavigate();

  const formik: FormikValues = useFormik<User>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      isAdmin: false,
    },

    validationSchema: yup.object({
      name: yup.string().required(),
      email: yup.string().required().email(),
      password: yup.string().required().min(4),
      isAdmin: yup.string().required(),
    }),

    onSubmit: async (values) => {
      const userExist = await checkUser(values);
      if (userExist.data.length===0) {
        addUser(values as User)
          .then(() => {
            successMsg("New user added");
            setNotIsLogin(true);
            localStorage.removeItem("userId");
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
            errorMsg(err);
          });
      }
      else
      errorMsg("Email already exists");
    },
  });

  return (
    <>
      <div className=" container d-flex justify-content-center align-item-center flex-column col-6">
        <h6 className="display-6">Register New User </h6>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="John c kirk"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="rr@rr.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="John c kirk"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Password</label>
          </div>
          <div className="form-floating mb-3">
            <Form.Check // prettier-ignore
              type="switch"
              id="isAdmin"
              label="Admin"
              
              checked={formik.values.isAdmin}
              onChange={formik.handleChange}
            />
            
          </div>
          <button
            className="btn btn-success w-100 mb-3"
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
          >
            Add User
          </button>
        </form>
        <a href="/">return to login</a>
      </div>
    </>
  );
};

export default Register;

