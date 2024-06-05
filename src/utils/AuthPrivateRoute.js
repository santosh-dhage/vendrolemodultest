import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from 'src/context/AuthContext'


const AuthPrivateRoute = ({children}) => {
    const {user } = useContext(AuthContext)
    // const auth = useAuth();
    return !user? children : <Navigate to={'dashboard/'} />
}

export default AuthPrivateRoute;