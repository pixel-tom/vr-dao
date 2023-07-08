import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NavbarProps {
  activePage: string;
}

export default function Navbar({ activePage }: NavbarProps) {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleTreasuryClick = () => {
    router.push("/treasury");
  };
  const handleAnalyticsClick = () => {
    router.push("/analytics");
  };
  const handleExplorerClick = () => {
    router.push("/explorer");
  };

  return (
    <header className="w-full">
      <div className="w-full mx-auto py-4 px-6 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button onClick={handleLogoClick} className="my-auto">
              <Image src="/logo.png" alt="Logo" width={72} height={32} />
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 my-auto flex items-baseline space-x-8">
              <button
                onClick={handleTreasuryClick}
                className={`text-gray-200 hover:text-white my-auto px-4 py-2 text-sm font-medium ${
                  activePage === "treasury" ? "border-b-2 border-gray-500" : ""
                }`}
              >
                TREASURY
              </button>
              <a
                onClick={handleAnalyticsClick}
                className={`text-gray-200 hover:text-white my-auto px-4 py-2 text-sm font-medium ${
                  activePage === "analytics" ? "border-b-2 border-gray-500" : ""
                }`}
              >
                ANALYTICS
              </a>
              <a
                onClick={handleExplorerClick}
                className={`text-gray-200 hover:text-white my-auto px-4 py-2 text-sm font-medium ${
                  activePage === "explorer" ? "border-b-2 border-gray-500" : ""
                }`}
              >
                EXPLORER
              </a>
              <div className="my-auto mb-[3px]">
                <WalletMultiButton />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
