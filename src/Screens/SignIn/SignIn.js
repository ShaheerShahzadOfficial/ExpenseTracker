import "./sign.css"
import React, { Fragment, useEffect, useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Button } from "@material-ui/core";
import image from "../../Images/Login.png"
import swal from "sweetalert"
import { useDispatch, useSelector } from "react-redux"
import { LoadUser, Login } from "../../Redux/Actions";
import Loader from "../../Loader/loader";

const SignIn = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const { isAuthenticated, loading, error } = useSelector(state => state.Auth)

  useEffect(() => {

    if (isAuthenticated) {
      history.push("/")
    }


  }, [dispatch, history, isAuthenticated])

  const SignIn = (e) => {
    e.preventDefault()
    const Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email !== "" && password !== "") {
      if (Email.test(email) === true) {


          dispatch(Login(email, password))

      } else {
        swal("Email Validation Failed", "Enter Valid Email", "warning")
      }
    } else {
      swal("Ooops", "You Forgot To Write Something!", "warning"
      )
    }
    if (error.msg === "Email or Password not matched") {
      swal("Error", "Email or Password not matched", "error")
    }

if(error.message === "Cannot read properties of null (reading 'password')"){
  swal("Error", "Email or Password not matched", "error")

}

  }

  return (
    <Fragment>
      {loading ?
        <Loader /> :
        <div className="Div">
          <div className="FormContainer">

            <form
              className="SignInForm"
              encType="multipart/form-data"
              onSubmit={SignIn}
            >
              <h1>SIGN IN</h1>


              <div>
                <EmailIcon />

                <input
                  placeholder="Email"
                  // type={"email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>



              <div>
                <VpnKeyIcon />

                <input
                  placeholder="Password"
                  type={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>


              <Button
                id="signInbtn"
                type="submit"
              >
                Sign In
              </Button>

              <p className="Redirect" onClick={() => {
                history.push("/Register")
              }}>Not Registered? <span style={{color:"blue", textDecoration:"underline",fontWeight:"700"}}>SignUp</span> </p>

            </form>

          </div>
          <div className="ImageDiv">
            <img src={image} alt="Login Pic" width={"100%"} height={"auto"} />
          </div>
        </div>}
    </Fragment>
  )
}

export default SignIn