import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import * as ROUTERS from "./constants/routes"
import { Home, Admin, Signin, Contents, UpdateCpntents } from "./pages";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import { useAuthListener } from "./hooks";

export default function App() {
  const { user } = useAuthListener();
  return (
    <Router>
      <Routes> 
        <Route exact path={ROUTERS.SIGN_IN} element={<IsUserRedirect user={user} loggedInPath={ROUTERS.ADMIN} path={ROUTERS.SIGN_IN}>{< Signin/>}</IsUserRedirect>}/>
        <Route exact path={ROUTERS.HOME} element={<Home />}/>
        <Route exact path={ROUTERS.ADMIN} element={<ProtectedRoute user={user}>{<Admin />}</ProtectedRoute>}/>
        <Route exact path={ROUTERS.USER} element={<ProtectedRoute user={user}>{<Admin />}</ProtectedRoute>}/>
        <Route exact path={ROUTERS.CONTENTS} element={<ProtectedRoute user={user}>{<Contents />}</ProtectedRoute>}/>
        <Route exact path={ROUTERS.DISTRIBUTORS} element={<ProtectedRoute user={user}>{<Admin />}</ProtectedRoute>}/>
        <Route exact path={ROUTERS.UPDATE_CONTENTS} element={<ProtectedRoute user={user}>{<UpdateCpntents />}</ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}
