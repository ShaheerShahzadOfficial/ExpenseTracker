import './App.css';
import React,{ useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from './Screens/SignIn/SignIn';
import SignUp from './Screens/SignUp/SignUp';
import AllExpenses from './Screens/SeeAllExpenses/AllExpenses';
import AddExpenses from './Screens/AddExpenses/AddExpenses';
import ProtectedRoutes from './ProtectedRoutes/Routes';
import {useDispatch} from "react-redux"
import { LoadUser } from './Redux/Actions';
import PdfGenerator from './Screens/AddExpenseAndCreatePdf/pdf';



function App() {
 const dispatch = useDispatch()
 useEffect(() => {
dispatch(LoadUser())
 }, [dispatch])
 
  return (
    <Router>
      <ProtectedRoutes exact path={"/"} component={AllExpenses} />
      <ProtectedRoutes exact path={"/AddExpenses"} component={AddExpenses} />
      <ProtectedRoutes exact path={"/AddExpenseAndCreatePdf"} component={PdfGenerator} />
      <Route exact path={"/Login"} component={SignIn} />
      <Route exact path="/Register" component={SignUp} />
    </Router>
  );
}

export default App;
