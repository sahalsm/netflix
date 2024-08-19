import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import * as ROUTERS from "./constants/routes"
import { Home, Browse, Signin, Signup } from "./pages";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import { useAuthListener } from "./hooks";

export default function App() {
  const { user } = useAuthListener();
  return (
    <Router>
      <Routes> 
        <Route exact path={ROUTERS.SIGN_IN} element={<IsUserRedirect user={user} loggedInPath={ROUTERS.BROWSE} path={ROUTERS.SIGN_IN}>{< Signin/>}</IsUserRedirect>}/>
        <Route exact path={ROUTERS.SIGN_UP} element={<IsUserRedirect user={user} loggedInPath={ROUTERS.BROWSE} path={ROUTERS.SIGN_UP}>{< Signup/>}</IsUserRedirect>}/>
        <Route exact path={ROUTERS.HOME} element={<Home />}/>
        <Route exact path={ROUTERS.BROWSE} element={<ProtectedRoute user={user}>{<Browse />}</ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}
