import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ReactQueryProvider } from "./lib/react-query-provider";
import React, { useEffect } from "react";
import { SnackbarProvider } from "zmp-ui";

export default function MiniApp() {
  return (
    <React.StrictMode>
      <SnackbarProvider>
        <ReactQueryProvider>
          <RouterProvider router={router} />
        </ReactQueryProvider>
      </SnackbarProvider>
    </React.StrictMode>
  );
}
