import {
    createBrowserRouter,
   
  } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Home from "../home/Home";
import FishAndSeafoods from "../fish&Seafoods/Fish&Seafoods";
import SteaksFillets from "../steaksFillets/SteaksFillets";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/fish&seafoods",
        element: <FishAndSeafoods/>
      },
      {
        path: "/steaks/fillets",
        element: <SteaksFillets/>
      }
    ]
  },
]);

export default router;