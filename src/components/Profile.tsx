import { FunctionComponent } from "react";
import { User } from "../interfaces/User";
import { errorMsg } from "../services/feedbackService";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface ProfileProps {
  setNotIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  userApp: User;
}

const Profile: FunctionComponent<ProfileProps> = ({
  setNotIsLogin,
  userApp,
}) => {
  const navigate: NavigateFunction = useNavigate();
  const userString: string | null = localStorage.getItem("token");
  let user: User | null = null;

  if (userString !== null) {

    // user = JSON.parse(userString);
    user = userApp;

    // console.log(user[0].name);
  } else {
    errorMsg("Critical error - please login again");
    localStorage.removeItem("token");
    setNotIsLogin(true);
    navigate("/");
  }

  return (
    <>
      {user !== null ? (
        <div className="card mb-3 col-6" style={{ maxWidth: "540px;" }}>
          <div className="row g-0">
            <div className="col-4">
              <img
                src="face.jpeg"
                className="img-fluid rounded-start "
                alt="face"
              />
            </div>
            <div className="col-md-8 col-8">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    {user.isAdmin ? (
                      <p>The user is an admin</p>
                    ) : (
                      <p>The user is not an admin</p>
                    )}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Profile</h1>
      )}
    </>
  );
};

export default Profile;
