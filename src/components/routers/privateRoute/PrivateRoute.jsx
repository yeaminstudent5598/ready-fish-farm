
import { Navigate, useLocation } from "react-router-dom";



const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();


     if (loading) {
        return <h2> <div className="loading min-h-screen flex items-center justify-center bg-gray-50">
        <svg width="64px" height="48px">
          <polyline
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
            id="back"
            className="stroke-gray-300 stroke-2 fill-none"
          ></polyline>
          <polyline
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
            id="front"
            className="stroke-blue-500 stroke-2 fill-none animate-dash"
          ></polyline>
        </svg>
      </div></h2>
     }
    
    if (user) {
        return children
    }
    return <Navigate to={'/login'} state={{from: location}} replace></Navigate>
};

export default PrivateRoute;