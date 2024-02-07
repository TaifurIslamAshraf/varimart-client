import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type Props = {
  id: string;
};

const OrderAction: FC<Props> = ({ id }) => {
  return (
    <div className="flex items-center gap-6">
      <Link href={`/dashboard/orders/${id}`}>
        <Button size={"icon"} variant={"outline"}>
          <Edit size={20} />
        </Button>
      </Link>
      <Button size={"icon"} variant={"outline"}>
        <Trash2 className="text-red-500" size={20} />
      </Button>
    </div>
  );
};

export default OrderAction;
