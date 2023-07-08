import { useState } from "react";

interface SidebarProps {
  setActiveComponent: (componentName: string) => void;
}

export default function Sidebar({ setActiveComponent }: SidebarProps) {
  const handleComponentChange = (componentName: string) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#111111] text-white mt-10">
      <div className="p-8">
        
        <ul className="space-y-5">
          <li>
            <button
              className="flex items-center space-x-2 text-[#f8f8f8] hover:text-gray-300 transition-colors duration-300"
              onClick={() => handleComponentChange("SmartMoney")}
            >
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L1 12l11 10 11-10L12 2zm0 4.474L20.526 12 12 17.526 3.474 12 12 6.474zM5.132 13h4.975l2.96 3.987L18.881 13h3.987l-7.868 10-7.868-10z" />
              </svg>
              <span>Smart Money</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center space-x-2 text-[#f8f8f8] hover:text-gray-300 transition-colors duration-300"
              onClick={() => handleComponentChange("SocialBuying")}
            >
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M10.287 6.477L6.704 3.065C6.3 2.656 5.673 2.689 5.287 3.135L4.048 4.35C3.663 4.795 3.69 5.434 4.109 5.828L8.16 9.387C8.396 9.59 8.396 9.972 8.16 10.175L4.11 13.734C3.691 14.128 3.665 14.767 4.05 15.211l1.236 1.218c.384.444 1.012.477 1.417.068l3.584-3.412c.405-.407.397-1.063-.022-1.46l-1.235-1.218c-.419-.406-1.067-.419-1.485-.022zM20 6h-3c-1.103 0-2 .897-2 2v3c0 1.103.897 2 2 2h3c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm1 5c0 .551-.449 1-1 1h-3c-.551 0-1-.449-1-1V8c0-.551.449-1 1-1h3c.551 0 1 .449 1 1v3zm-1 2c0 .551-.449 1-1 1h-3c-.551 0-1-.449-1-1v-3c0-.551.449-1 1-1h3c.551 0 1 .449 1 1v3zm-1 2c0 .551-.449 1-1 1h-3c-.551 0-1-.449-1-1v-3c0-.551.449-1 1-1h3c.551 0 1 .449 1 1v3z" />
              </svg>
              <span>Social Buying</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center space-x-2 text-[#f8f8f8] hover:text-gray-300 transition-colors duration-300"
              onClick={() => handleComponentChange("Component3")}
            >
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M18.621 11.51c.455-.247.569-.757.267-1.133l-5.845-8.929C12.37 1.078 11.63 1.078 11.47.448L5.624 9.376c-.303.376-.188.886.267 1.133L11.47 14.551c.455.248 1.02.064 1.264-.382l5.844-8.929c.16-.63-.18-1.082-.848-.848L18.621 11.51zM9.56 17.334l5.887-2.93c.601-.3.858-.993.558-1.594l-2.93-5.886 5.17-5.17-5.885 2.93c-.6.3-1.293.044-1.593-.558l-2.93-5.886-5.17 5.17 2.93 5.886c.3.601.044 1.293-.558 1.593l-5.886 2.93 5.17 5.17z" />
              </svg>
              <span>Popular Collections</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
