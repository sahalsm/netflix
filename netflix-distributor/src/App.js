import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import * as ROUTERS from "./constants/routes"
import { Home, Distributor, Signin, Signup, ViewContents, EditContent, AddContent, Payment} from "./pages";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import { useAuthListener } from "./hooks";

export default function App() {
  const { user } = useAuthListener();
  return (
    <Router>
      <Routes> 
        <Route exact path={ROUTERS.SIGN_IN} element={<IsUserRedirect user={user} loggedInPath={ROUTERS.DISTRIBUTOR} path={ROUTERS.SIGN_IN}>{< Signin/>}</IsUserRedirect>}/>
        <Route exact path={ROUTERS.SIGN_UP} element={<IsUserRedirect user={user} loggedInPath={ROUTERS.DISTRIBUTOR} path={ROUTERS.SIGN_UP}>{< Signup/>}</IsUserRedirect>}/>
        <Route exact path={ROUTERS.HOME} element={<Home />}/>
        <Route exact path={ROUTERS.DISTRIBUTOR} element={<ProtectedRoute user={user}>{<Distributor />}</ProtectedRoute>}/>
        <Route exact path={ROUTERS.VIEW_CONTENTS} element={<ProtectedRoute user={user}>{<ViewContents />}</ProtectedRoute>}/>
        <Route exact path={ROUTERS.EDIT_CONTENT} element={<ProtectedRoute user={user}>{<EditContent />}</ProtectedRoute>}/>
        <Route exact path={ROUTERS.ADD_CONTENT} element={<ProtectedRoute user={user}>{<AddContent />}</ProtectedRoute>}/>
        <Route exact path={ROUTERS.PAYMENT} element={<ProtectedRoute user={user}>{<Payment />}</ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}
