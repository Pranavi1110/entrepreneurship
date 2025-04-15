import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import EntrepreneurForm from "./components/EntrepreneurForm";
import Report from "./components/Report";  // Import the new report page
import RootLayout from "./components/RootLayout";
import './styles/App.css';
import StudentTable from './components/StudentTable';

const browserRouterObj = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "form", element: <EntrepreneurForm /> },
      { path: "reports", element: <Report /> }, 
      {path:"students",element:<StudentTable/>}// New report route
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={browserRouterObj} />
    </div>
  );
}

export default App;