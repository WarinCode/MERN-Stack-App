import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./data/data";

import "./style/globals.css";
import "@fontsource/sarabun";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(routes);
const rootId = document.querySelector("#root");
const root = createRoot(rootId);

root.render(<RouterProvider router={router} />);
