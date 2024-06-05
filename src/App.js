import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import ScrollToTopArrow from './scroll/ScrollToTopArrow'
import './scroll/ScrollToTopArrow.css'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import AuthprivateRoute from './utils/AuthPrivateRoute'

import { ColorProvider } from './menu/adminsetting/colorcontext'; // Import ColorProvider
// import Layout from './menu/adminsetting/adminsetting';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Landing = React.lazy(() => import('./views/pages/landingpage/landing'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const LoginDomain = React.lazy(() => import('./views/pages/login/logindomain'))
const Contact = React.lazy(() => import('./views/pages/contactus/contact'))
const Forgate = React.lazy(() => import('./views/pages/login/forgate'))
const Resetpassword = React.lazy(() => import('./views/pages/login/resetpassword'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Tenant = React.lazy(() => import('./views/pages/register/Tenant'))
const Tenantadmin = React.lazy(() => import('./views/pages/register/tenantadmin'))
const Terms = React.lazy(() => import('./views/pages/login/terms'))
const Privacy = React.lazy(() => import('./views/pages/login/privacy'))
const Disclaimer = React.lazy(() => import('./views/pages/login/disclaimer'))
const Refund = React.lazy(() => import('./views/pages/login/refund'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Complaints = React.lazy(() => import('./views/pages/complaints/complaints'))
const Document = React.lazy(() => import('./menu/websitecms/document'))
// const Toolfeedback = React.lazy(() => import('./views/pages/feedback/toolfeedback'))

class App extends Component {
  render() {
    return (
      
      <HashRouter>
        
        {/* <PageTransition location={location}> */}
        <Suspense fallback={loading}>
        
          <AuthProvider>
          <ColorProvider>
          {/* <Layout>  */}
          <Routes>
          <Route exact path="/" name="Landing Page" element={<Landing />} /> 
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/logindomain" name="logindomain Page" element={<LoginDomain />} />
            <Route exact path="/complaints" name=" Complaints" element={<Complaints />} />
            <Route exact path="/document" name=" Document" element={<Complaints />} />
            {/* <Route exact path="/toolfeedback" name="Tool Feedback" element={<Toolfeedback/>} /> */}
            <Route exact path="/contact" name="Contact Page" element={<Contact/>} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/Tenant" name="Tenant Page" element={<Tenant />} />
            <Route exact path="/Tenantadmin" name="Tenantadmin Page" element={<Tenantadmin />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="/terms" name="Terms" element={<Terms />} />
            <Route path="/privacy" name="Privacy" element={<Privacy />} />
            <Route path="/disclaimer" name="disclaimer" element={<Disclaimer />} />
            <Route path="/refund" name="Refund" element={<Refund />} />
            <Route path="/forgate" name="Forgate" element={<Forgate />} />
            <Route path="/resetpassword/:uid/:token" name="Resetpassword" element={<Resetpassword />} />

            {/* <Route path="*" name="Home" element={<PrivateRoute><DefaultLayout /></PrivateRoute>} /> */}
            <Route path="*" name="Home" element={<DefaultLayout />} />

          </Routes>
          </ColorProvider>
          {/* </Layout>  */}
          </AuthProvider>
        </Suspense>
        <ScrollToTopArrow />
        {/* </PageTransition> */}
      </HashRouter>
    )
  }
}

export default App
