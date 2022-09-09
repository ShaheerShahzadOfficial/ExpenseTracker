import "./signup.css"
import React, { Fragment, useEffect, useState } from 'react'
import FaceIcon from '@mui/icons-material/Face';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Button } from "@material-ui/core";
import image from "../../Images/Login.png"
import swal from 'sweetalert';
import { useDispatch, useSelector } from "react-redux"
import { RegisterUser } from "../../Redux/Actions";
import Loader from "../../Loader/loader";


const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch()

  const { isAuthenticated,loading,error,user } = useSelector(state => state.Auth)


  useEffect(() => {

    if (isAuthenticated) {
      history.push("/")
    }


    if(error==="User All Ready Exist"){
      swal("Registration Error","You Are AlReady A User","error")
    }
  }, [dispatch, history, isAuthenticated])



  const SignUp = (e) => {
    const Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const Pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
    e.preventDefault()
    if (email !== "" && password !== "" && name !== "") {

      if (Email.test(email) === true) {
        if (Pass.test(password) === true) {

      dispatch(RegisterUser(name, email, password))
    } else {
      swal("Password Validation Failed", "Password Must contain letter Number and Symbols and Capital Letter", "warning")
    }
  } else {
    swal("Email Validation Failed", "Enter Valid Email", "warning")
  }
      if (user?.success === true) {
        swal("Success", "You Are SuccessFully Registered!", "success")
        if(!isAuthenticated){
          swal("Please Login To Continue")
          history.push("/Login")
        }

      }
    } else {
      swal("Ooops", "You Forgot To Write Something!", "warning")
    }
  }
  return (
    <Fragment>
      {
        loading ? <Loader/> :
        <div className="Div">

        <div className="FormContainer">
  
          <form
            className="SignInForm"
            encType="multipart/form-data"
            onSubmit={SignUp}
          >
            <h1>SIGN UP</h1>
  
  
            <div>
              <FaceIcon />
  
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
  
  
            <div>
              <EmailIcon />
  
              <input
                placeholder="Email"
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
              Sign Up
            </Button>
  
            <p className="Redirect" onClick={() => {
              history.push("/Login")
            }}>Already Registered? <span style={{color:"blue", textDecoration:"underline",fontWeight:"700"}}>SignIn</span></p>
  
          </form>
  
        </div>
        <div className="ImageDiv">
          <img src={image} alt="Login Pic" width={"100%"} height={"auto"} />
        </div>
      </div>
      }
   
    </Fragment>
  )
}

export default SignUp