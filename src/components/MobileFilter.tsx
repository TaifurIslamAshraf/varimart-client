import { Filter } from "lucide-react";
import { FC } from "react";
import ClearFilter from "./ClearFilter";
import PriceFilters from "./PriceFilters";
import RatingsFilters from "./RatingsFilters";
import SubCategoryFilters from "./SubCategoryFilters";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

type Props = {
  subcategory: [any];
};

const MobileFilter: FC<Props> = ({ subcategory }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"}>
            <Filter /> Filters
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>

          <div className="">
            <div className="my-5">
              <SubCategoryFilters subcategory={subcategory} />
            </div>
            <div className="my-5">
              <PriceFilters />
            </div>
            <div className="my-5">
              <RatingsFilters />
            </div>
            <div className="my-5">
              <ClearFilter />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilter;
