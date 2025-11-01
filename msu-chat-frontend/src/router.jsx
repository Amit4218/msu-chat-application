import { createBrowserRouter } from "react-router-dom";
import ChatPage from "@/pages/ChatPage";
import AppSidebar from "@/pages/AppSidebar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppSidebar/>,
    children: [
      {
        path: "chat",
        element: <ChatPage/>
     }
   ]
  },
  {
    path: "/login",
    element:<LoginPage/>
  },
  {
    path: "/register",
    element:<RegisterPage/>
  }
 
]);

export default router;
