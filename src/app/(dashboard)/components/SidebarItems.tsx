"use client";

import { cn } from "@/lib/utils";
import {
  FileImage,
  Layers3,
  LayoutDashboard,
  ListOrdered,
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
  },

  {
    name: "Reviews",
    path: "/dashboard/products",
    icon: <Star />,
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
  },
  {
    name: "Category",
    path: "/dashboard/category",
    icon: <Layers3 />,
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
    <div className="fixed top-0 bg-gray-100 space-y-6 max-w-[230px] w-full h-screen">
      <div className="px-6 mt-6">
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="shop logo" width={100} height={100} />
        </Link>
      </div>
      <div className="">
        {navItems.map((item, index) => (
          <div className="" key={index}>
            <Link
              href={item.path}
              className={cn(
                selectedSegment === item.path ? "bg-gray-200" : "",
                "flex items-center gap-4 my-5 hover:bg-gray-200 py-2 px-6 font-medium"
              )}
            >
              {item.icon} {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarItems;
