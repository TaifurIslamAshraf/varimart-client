import { Button } from "@/components/ui/button";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const Cart = () => {
  return (
    <div>
      <div className="cart">
        <Button variant={"outline"}>
          <Link href={"/cart"} className="flex items-center">
            <ShoppingCart />
            (0)
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Cart;
