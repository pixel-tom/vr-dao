"use client"
import { useState } from "react";
import Navbar from '../components/Navbar';
import SmartMoney from './components/SmartMoney';
import Sidebar from './components/Sidebar';
import SocialBuying from "./components/SocialBuying";

export default function Analytics() {
  const [activeComponent, setActiveComponent] = useState("SmartMoney");

  const renderActiveComponent = () => {
    if (activeComponent === "SmartMoney") {
      return <SmartMoney />;
    } else if (activeComponent === "SocialBuying") {
      return <SocialBuying />;
    } else if (activeComponent === "Component3") {
      return <Component3 />;
    }
    return null;
  };

  return (
    <main className="flex flex-col min-h-screen items-center bg-[url(/background.png)]">
      <Navbar activePage={'analytics'} />
      <div className="flex">
        <div className="h-[80vh] flex-1 left-0 w-64">
          <Sidebar setActiveComponent={setActiveComponent} />
        </div>
        <div className="flex-2 ml-10 mt-10">{renderActiveComponent()}</div>
      </div>
    </main>
  );
}

// Define your components to be rendered inside the Analytics component
function Component3() {
  return <div>Component 3</div>;
}
