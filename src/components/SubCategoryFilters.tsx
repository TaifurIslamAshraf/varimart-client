import Link from "next/link";
import { Separator } from "./ui/separator";

interface Props {
  subcategory: any;
}

const SubCategoryFilters = ({ subcategory }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {subcategory && (
        <>
          <h1 className="font-[400] text-lg">Categories</h1>
          <Separator />
        </>
      )}

      {subcategory?.map((item: any) => (
        <Link
          className="font-[500] hover:underline hover:text-[#000000b2]"
          href={`/products?subcategory=${item._id}`}
          key={item._id}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default SubCategoryFilters;
