"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <Button
          className="source-code flex items-center gap-2"
          onClick={() => {
            router.push("https://github.com/rebvar-ebra/weather-app");
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
