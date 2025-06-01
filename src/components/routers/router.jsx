import {
    createBrowserRouter,
   
  } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Home from "../home/Home";
import FishAndSeafoods from "../fish&Seafoods/Fish&Seafoods";
import SteaksFillets from "../steaksFillets/SteaksFillets";
import ChickenAndDuck from "../chicken&Duck/ChickenAndDuck";


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
      },
      {
        path: "/chickenAndDuck",
        element: <ChickenAndDuck/>
      }
    ]
  },
]);

export default router;