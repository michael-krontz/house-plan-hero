import React from 'react'
import { Container } from 'react-bootstrap'
import Signup from './Signup'
import { AuthProvider } from './AuthContext'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"

export default function AuthContent() {

  return (
    <div>
      <Container className="d-flex align-items-center justify-content-center" style={{ height: 'auto', minHeight: "50vh" }}>
        <div className="w-100" style={{ maxWidth: '600px' }}>
          <Router>
            <AuthProvider>
              <Switch>
                <Redirect exact from="/authcontent" to="/dashboard" />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </div>
  )
}
