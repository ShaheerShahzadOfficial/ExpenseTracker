import React, { Fragment } from 'react'
import { useSelector } from "react-redux"
import { Redirect, Route } from 'react-router-dom'
const ProtectedRoutes = ({  component: Component, ...rest }) => {

    const { isAuthenticated,loading } = useSelector(state => state.Auth)

    return (

        <Fragment>
            {
                loading === false && (
                    <Route {...rest}
                        render={(props) => {
                            if (isAuthenticated === false) {
                                return <Redirect to={"/Login"} />
                            }

                            return <Component {...props} />
                        }} />
                )
            }
        </Fragment>

    )
}

export default ProtectedRoutes