import { Navigate, Outlet } from "react-router-dom";
import {useSelector} from "react-redux";

function PrivateRoute() {
    const { userInfo } = useSelector((state) => state.auth);
    // const location = useLocation();

    // If user is authenticated, render child routes via Outlet.
    // Otherwise redirect to /login and keep the attempted location in state
    // so the login page can navigate back after successful auth.
    return userInfo ? <Outlet /> : <Navigate to="/login" replace  />;
}

export default PrivateRoute;