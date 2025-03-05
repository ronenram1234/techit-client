import { FunctionComponent } from "react";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";
import { Product } from "../interfaces/Product";

interface NavbarProps {
  setNotIsLogin:React.Dispatch<React.SetStateAction<boolean>>,
  userApp: User;
  cart:Product[] ; 
  
}

const Navbar: FunctionComponent<NavbarProps> = ({setNotIsLogin, userApp, cart}) => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <>
    

      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/home">
            Techit
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link active" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link active" to="/cart" state={cart}>
                  Cart
                </NavLink>
              </li>

         
            </ul>
            <form className="d-flex" role="search">
              <button
                className="btn btn-outline-info"
                type="submit"
                onClick={() => {
                  navigate("/");
                  localStorage.removeItem("userId");
                  setNotIsLogin(true)
                }}
              >
                Logout
              </button>
            </form>
          </div>
        </div>
        
        
      </nav>
      <p className="pt-1 namep" >
        <img className="faceimage" src="https://i.pravatar.cc" alt="face"  />
        {userApp.isAdmin ? 
      `User:${userApp.name} - Admin` : 
      `User:${userApp.name} - Not Admin`}</p>
    </>
  );
};

export default Navbar;
