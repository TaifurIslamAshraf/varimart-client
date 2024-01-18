"use client";

import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const Category = () => {
  const [isMount, setIsMount] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { data, isLoading } = useGetAllCategoryQuery({});
  const handleCategoryHover = (categoryId: any) => {
    setHoveredCategory(categoryId);
  };

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return (
    <div className="">
      <ul className="h-[320px] bg-primary-foreground rounded-md shadow-md">
        {data?.category.map((item: any) => (
          <li
            key={item._id}
            className={`relative w-full py-1 px-4 cursor-pointer ${
              hoveredCategory === item._id ? "bg-white" : ""
            }`}
            onMouseEnter={() => handleCategoryHover(item._id)}
            onMouseLeave={() => handleCategoryHover(null)}
          >
            <span className="flex items-center justify-between">
              {item.name}
              {item.subcategory?.length > 0 && hoveredCategory === item._id && (
                <ChevronRight />
              )}
            </span>

            {item.subcategory?.length > 0 && (
              <ul
                className={`absolute left-[100%] z-40 top-0 bg-primary-foreground py-2 max-w-[250px] w-full rounded-lg shadow-md ${
                  hoveredCategory === item._id ? "block" : "hidden"
                }`}
              >
                {item.subcategory.map((subItem: any) => (
                  <li className="py-1 px-4 hover:bg-white" key={subItem._id}>
                    {subItem.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
