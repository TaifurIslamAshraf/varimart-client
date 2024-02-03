import Search from "@/components/Search";
import Paginations from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/fetch/getProduct";
import { serverUrl } from "@/lib/utils";
import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import ProductAction from "../../components/ProductAction";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const page: FC<Props> = async ({ searchParams }) => {
  const products = await getAllProducts(searchParams);
  console.log(searchParams);
  return (
    <div className="ml-[230px] mt-[70px] p-4">
      <div className="space-y-6">
        <h1 className="font-semibold text-2xl">All Products</h1>
        <div className="flex items-center justify-start flex-col gap-3">
          <div className="max-w-[600px] w-full flex items-center gap-4">
            <Search className="" searchRoute="/dashboard/products" />

            {searchParams?.search !== undefined && (
              <Link href={"/dashboard/products"}>
                <Button disabled={searchParams?.search === undefined}>
                  Clear
                </Button>
              </Link>
            )}
          </div>
          <table className="border-collapse border-2 border-slate-300 p-4">
            <thead>
              <tr className="">
                <th className="border-2 border-slate-300 px-4 py-1">Image</th>
                <th className="border-2 border-slate-300 px-4 py-1">Name</th>
                <th className="border-2 border-slate-300 px-4 py-1">Stock</th>
                <th className="border-2 border-slate-300 px-4 py-1">Price</th>
                <th className="border-2 border-slate-300 px-4 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.products &&
                products?.products?.map((item: IProduct) => (
                  <tr key={item._id}>
                    <td className="border-2 border-slate-300 px-4 py-2">
                      <Image
                        src={`${serverUrl}/${item?.images[0]}`}
                        alt={item.name}
                        width={60}
                        height={60}
                      />
                    </td>
                    <td className="border-2 border-slate-300 px-4 py-2">
                      <Link href={`/products/${item?.slug}`}>{item?.name}</Link>
                    </td>
                    <td className="border-2 border-slate-300 px-4 py-2">
                      {item?.stock}
                    </td>
                    <td className="border-2 border-slate-300 px-4 py-2">
                      {item?.discountPrice}
                    </td>
                    <td className="border-2 border-slate-300 px-4 py-2">
                      <ProductAction product={item} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Paginations type="admin" pagination={products?.pagination} />
      </div>
    </div>
  );
};

export default page;
