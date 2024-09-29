"use client"
import { Button } from "@/components/ui/button";
import { github } from "../utils/Icons";
import { useRouter } from "next/navigation";
import { ThemeDropDown } from "./ThemDropDown/ThemeDropDown";
import SearchDialog from "./SearchDialog/SearchDialog";
import { useGlobalContext } from "../context/globalContext"; // Use context

function Navbar() {
  const router = useRouter();
  const state = useGlobalContext(); // Directly use the context value
  console.log("Global State:", state);

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />
        <div className="btn-group flex items-center gap-2">
          <ThemeDropDown />
          <Button
            className="source-code flex items-center gap-2"
            onClick={() => {
              router.push("https://github.com/rebvar-ebra/weather-app");
            }}
          >
            {github}
            Source-Code
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
