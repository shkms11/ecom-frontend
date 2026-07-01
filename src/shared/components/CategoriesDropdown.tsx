import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CategoriesContent } from "@/shared/components";

export default function CategoriesDropdown() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-1 font-semibold hover:text-orange-600"
        >
          Categories
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={10}
        className="w-[700px] p-0 rounded-lg border shadow-lg z-50 bg-white"
      >
        <CategoriesContent />
      </PopoverContent>
    </Popover>
  );
}
