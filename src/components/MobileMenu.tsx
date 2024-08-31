"use client";

import { userAuth } from "@/lib/userAuth";
import { cn } from "@/lib/utils";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { ChevronRight, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Profile from "./Profile";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const MobileMenu = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { data, isLoading } = useGetAllCategoryQuery({});
  const isAuthentidated = userAuth();
  const handleCategoryHover = (categoryId: any) => {
    setHoveredCategory(categoryId);
  };

  return (
    <div className="overflow-y-auto">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto" side={"left"}>
          <div className="mt-4">
            <Tabs defaultValue="category" className="">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="category">Category</TabsTrigger>
                <TabsTrigger value="menu">Menu</TabsTrigger>
              </TabsList>
              <TabsContent value="category">
                <ul className="space-y-2">
                  {data?.category.map((item: any) => (
                    <li
                      className={cn(
                        hoveredCategory === item._id
                          ? "bg-gray-200"
                          : "bg-gray-100",
                        "transition-all duration-500 p-2"
                      )}
                      key={item._id}
                      onMouseEnter={() => handleCategoryHover(item._id)}
                      onMouseLeave={() => handleCategoryHover(null)}
                    >
                      <div className="flex items-center justify-between ">
                        <div className="font-semibold">{item.name}</div>
                        {item?.subcategory.length > 0 && (
                          <span>
                            <ChevronRight
                              className={cn(
                                "h-5 w-5 my-auto transition-all",
                                hoveredCategory === item._id ? "rotate-90" : ""
                              )}
                            />
                          </span>
                        )}
                      </div>

                      <ul
                        className={cn(
                          hoveredCategory === item._id ? "block" : "hidden",
                          "mt-1 ml-1 space-y-2"
                        )}
                      >
                        {item?.subcategory.length > 0 &&
                          item.subcategory.map((subItem: any) => (
                            <li
                              key={subItem._id}
                              className="hover:underline hover:text-blue-500"
                            >
                              <Link
                                className="block"
                                href={`/products?subcategory=${subItem._id}`}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="menu" className="space-y-4">
                <div className="">
                  <ul className="space-y-3">
                    <li>
                      <Link href={"/"}>Home</Link>
                    </li>
                    <li>
                      <Link href={"/"}>About Us</Link>
                    </li>
                    <li>
                      <Link href={"/"}>Blog</Link>
                    </li>
                    <li>
                      <Link href={"/"}>Contact</Link>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between border pl-2 rounded-md">
                    <h1 className="font-semibold">Cart Items</h1>
                    <Button variant={"outline"}>
                      <Link href={"/cart"}>
                        <ShoppingCart />
                      </Link>
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="">
                  {isAuthentidated ? (
                    <div className="flex items-center justify-between border pl-2 rounded-md">
                      <h1 className="font-semibold">Your Profile</h1>
                      <Profile />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      {" "}
                      <Button className="w-full">
                        <Link href={"/login"}>Login</Link>
                      </Button>
                      <h1>OR</h1>
                      <Button variant={"outline"} className="w-full">
                        <Link href={"/register"}>Register</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
