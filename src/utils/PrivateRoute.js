import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from 'src/context/AuthContext'
import SessionTimeout from "./../SessionTimeOut"
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const history = useNavigate()
    const {user , setUser, setAuthTokens} = useContext(AuthContext)
    const handleSessionTimeout = () => {
        // Implement your logout or session expiration logic here
        console.log("User logged out or session expired");
        
        sessionStorage.removeItem('authTokens')
        // return <Navigate to="/login" />;
        history('/')
        setAuthTokens(null)
        setUser(null)
      };

    // const auth = useAuth();
    return( <>
    {user? children : <Navigate to="/login" /> }
    <SessionTimeout timeoutInSeconds={900} onTimeout={handleSessionTimeout} />
    
    </>)
}

export default PrivateRoute;