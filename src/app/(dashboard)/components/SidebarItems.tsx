"use client";

import { cn } from "@/lib/utils";
import {
  FileImage,
  Layers3,
  LayoutDashboard,
  ListOrdered,
  MessageCircleWarning,
  ShoppingBasket,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: <ShoppingBasket />,
    subMenu: {
      name: "Create Product",
      path: "/dashboard/products/create",
    },
  },

  {
    name: "Reviews",
    path: "/dashboard/reviews",
    icon: <Star />,
    subMenu: {
      name: "Create Reviews",
      path: "/dashboard/reviews/create",
    },
  },
  {
    name: "Manage Reviews",
    path: "/dashboard/manage-reviews",
    icon: <MessageCircleWarning />,
  },

  {
    name: "Orders",
    path: "/dashboard/orders",
    icon: <ListOrdered />,
  },
  {
    name: "Banners",
    path: "/dashboard/banners",
    icon: <FileImage />,
    subMenu: {
      name: "Create Product",
      path: "/dashboard/banners/create",
    },
  },
  {
    name: "Category",
    path: "/dashboard/category",
    icon: <Layers3 />,
    subMenu: {
      name: "Create Product",
      path: "/dashboard/category/create",
    },
  },
  {
    name: "Users",
    path: "/dashboard/users",
    icon: <Users />,
  },
];

const SidebarItems = () => {
  const selectedSegment = usePathname();

  return (
    <div className="fixed top-0 z-40 bg-gray-100 space-y-6 max-w-[230px] w-full h-screen">
      <div className="px-6 mt-6">
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="shop logo" width={100} height={100} />
        </Link>
      </div>
      <div className="">
        {navItems.map((item, index) => (
          <div className="my-4" key={index}>
            <Link
              href={item.path}
              className={cn(
                selectedSegment === item.path ||
                  selectedSegment === item.subMenu?.path
                  ? "bg-gray-200"
                  : "",
                "flex items-center gap-4 my-1 hover:bg-gray-200 py-2 px-6 font-medium"
              )}
            >
              {item.icon} {item.name}
            </Link>
            {item.subMenu && (
              <Link
                className={cn(
                  selectedSegment === item.subMenu.path
                    ? "text-blue-400 font-medium"
                    : "",
                  "ml-[70px]"
                )}
                href={item.subMenu.path}
              >
                {item.subMenu.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarItems;
