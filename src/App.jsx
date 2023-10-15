import { CssBaseline } from "@mui/material";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const HomePage = lazy(() => import("./pages/Home"));

  return (
    <BrowserRouter basename="/">
      <CssBaseline />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
