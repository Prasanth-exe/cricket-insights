import React from "react";
import Navbar from "./components/Navbar";

import { Outlet } from "react-router";

function DashboardLayout() {
  return (
    <div>
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>{/* <p>this is footer</p> */}</footer>
    </div>
  );
}

export default DashboardLayout;
