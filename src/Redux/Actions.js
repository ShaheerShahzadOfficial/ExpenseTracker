import axios from "axios"

import { AddExpenseFail, AddExpenseRequest, AddExpenseSuccess, GetAllExpenseFail,LOGOUT_USER, LOGOUT_USER_FAIL, GetAllExpenseRequest, GetAllExpenseSuccess, GetExpenseByIdFail, GetExpenseByIdRequest, GetExpenseByIdSuccess, LoadUserFail, LoadUserRequest, LoadUserSuccess, LoginFail, LoginRequest, LoginSuccess, RegisterFail, RegisterRequest, RegisterSuccess,
    DeleteExpenseRequest,DeleteExpenseSuccess,DeleteExpenseFail, UpdateExpenseRequest,UpdateExpenseSuccess,UpdateExpenseFail} from "./constants";


export const RegisterUser = (name, email, password) => async (dispatch) => {
    dispatch({ type: RegisterRequest });

    const config = { headers: { "Content-Type": "application/json" } };

    await axios.post("https://recordmanagentapp.herokuapp.com/user/signUp", {
        name, email, password
    }, config).then((result) => {
        dispatch({
            type: RegisterSuccess,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: RegisterFail,
            payload: err.response.data.message
        })
        console.log(err.response.data)
    });

}


export const Login = (email, password) => async (dispatch) => {

    dispatch({ type: LoginRequest });

    await axios.post("https://recordmanagentapp.herokuapp.com/user/signIn", {
        email, password
    }, { withCredentials: true, credentials: "include", headers: { "Content-Type": "application/json" } }).then((result) => {
        dispatch({
            type: LoginSuccess,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: LoginFail,
            payload: err.response.data

        })
    });

}


export const LoadUser = () => async (dispatch) => {
    try {


        dispatch({ type: LoadUserRequest });


        const { data } = await axios.get("https://recordmanagentapp.herokuapp.com/user/userDetail", { withCredentials: true, credentials: "include" })
        dispatch({
            type: LoadUserSuccess,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LoadUserFail,
            payload: error.response.data
        })
    }

}




export const Logout = () => async (dispatch) => {

    await axios.get("https://recordmanagentapp.herokuapp.com/user/logout", {
        withCredentials: true,credentials: "include",
    }).then(() => {
        dispatch({
            type: LOGOUT_USER,
        })
    }).catch((err) => {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: err.response.data.message
        })
    });

}





// Add Expenses


export const AddAnExpense = (formData) => async (dispatch) => {

    try {
        dispatch({ type: AddExpenseRequest });
        await axios.post("https://recordmanagentapp.herokuapp.com/upload/AddExpenses", formData, { withCredentials: true, credentials: "include" }).then((result) => {
            dispatch({
                type: AddExpenseSuccess,
                payload: result.data
            })

        })
    } catch (err) {
        dispatch({
            type: AddExpenseFail,
            payload: err.response.data
        })
    }


}


// GetAllExpenses



export const GetAllExpenses = () => async (dispatch) => {
    try {


        dispatch({ type: GetAllExpenseRequest });


        const { data } = await axios.get("https://recordmanagentapp.herokuapp.com/upload/AllExpense", { withCredentials: true, credentials: "include" })
        dispatch({
            type: GetAllExpenseSuccess,
            payload: data.expenses
        })

    } catch (error) {
        dispatch({
            type: GetAllExpenseFail,
            payload: error.response.data
        })
    }

}




export const AddAnExpensewithoutFile = (ExpenseName,ExpenseTotal) => async (dispatch) => {
    try {
        dispatch({ type: AddExpenseRequest });
        await axios.post("https://recordmanagentapp.herokuapp.com/upload/AddExpenseWithOutFile",{ExpenseName,ExpenseTotal} , { withCredentials: true, credentials: "include" }).then((result) => {
            dispatch({
                type: AddExpenseSuccess,
                payload: result.data.expense
            })

        })
    } catch (err) {
        dispatch({
            type: AddExpenseFail,
            payload: err.response.data
        })
    }


}


export const GetAllExpenseswithNoFile = () => async (dispatch) => {
    try {

        dispatch({ type: GetAllExpenseRequest });

        const { data } = await axios.get("https://recordmanagentapp.herokuapp.com/upload/GetExpenses", { withCredentials: true, credentials: "include" })
        dispatch({
            type: GetAllExpenseSuccess,
            payload: data.expense
        })

    } catch (error) {
        dispatch({
            type: GetAllExpenseFail,
            payload: error.response.data
        })
    }

}



export const deleteExpense = (id) => async (dispatch) => {
    try {

        dispatch({ type: DeleteExpenseRequest });

        const { data } = await axios.delete(`https://recordmanagentapp.herokuapp.com/upload/delete/${id}`, { withCredentials: true, credentials: "include" })
        dispatch({
            type: DeleteExpenseSuccess,
            payload: data.expense
        })

    } catch (error) {
        dispatch({
            type: DeleteExpenseFail,
            payload: error.response.data
        })
    }

}

export const UpdateExpense = (id,ExpenseTotal,ExpenseName) => async (dispatch) => {
    try {

        dispatch({ type: UpdateExpenseRequest });

        const { data } = await axios.put(`https://recordmanagentapp.herokuapp.com/upload/update/${id}`,{ExpenseTotal,ExpenseName}, { withCredentials: true, credentials: "include" })
        dispatch({
            type: UpdateExpenseSuccess,
            payload: data.expense
        })

    } catch (error) {
        dispatch({
            type: UpdateExpenseFail,
            payload: error.response.data
        })
    }

}