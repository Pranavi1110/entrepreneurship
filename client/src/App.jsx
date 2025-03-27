// client/src/App.js
import React from 'react';
import EntrepreneurForm from './components/EntrepreneurForm';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home"
import RootLayout from "./components/RootLayout"
import './styles/App.css'

const browserRouterObj=createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },{
        path:"form",
        element:<EntrepreneurForm/>
      }
    ]
  }
])

function App() {
  return (

    <div className="App">
      <RouterProvider router={browserRouterObj}/>
    </div>
  );
}

export default App;