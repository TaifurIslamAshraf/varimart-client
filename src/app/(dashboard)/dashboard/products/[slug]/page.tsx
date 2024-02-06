import UpdateProductInfo from "@/app/(dashboard)/components/productForm/UpdateProductInfo";
import { Card, CardContent } from "@/components/ui/card";
import { singleProduct } from "@/lib/fetch/getProduct";

type Props = {
  params: { slug: string };
};

const page = async ({ params }: Props) => {
  const product = await singleProduct(params.slug);

  return (
    <div className="ml-[230px] mt-[70px] p-4">
      <h1>Update Products</h1>
      <Card>
        <CardContent>
          <UpdateProductInfo product={product?.product} />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
