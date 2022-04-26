import React, { useEffect } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { AnyAction } from "redux";
import { Provider as AlertProvider } from "react-alert";
import { OrbitControls, useGLTF } from "@react-three/drei";
import store from "./store";

import { AlertTemplate } from "../components/Alert/AlertTemplate";
import { Alerts } from "../components/Alert/Alert";
import { DASHBOARD, LOGIN } from "../constants/routes";
import { loadUser } from "../slices/authSlice";
import { Navbar } from "../components/Navbar";
import { Login } from "../Auth/Login/Login";
import PrivateRoute from "../components/PrivateRoute";
import { Dashboard } from "../Dashboard/Dashboard";

function App() {
  useEffect(() => {
    (async () => {
      if (localStorage.user) {
        store.dispatch(loadUser() as unknown as AnyAction);
      }
    })();
    useGLTF.preload("/scene.gltf");
  }, []);
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate}>
        <Router>
          <Alerts />
          <Navbar />
          <Routes>
            <Route path={LOGIN} element={<Login />} />

            <Route
              path={DASHBOARD}
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to={LOGIN} replace />} />
          </Routes>
        </Router>
      </AlertProvider>
    </Provider>
  );
}

export default App;
