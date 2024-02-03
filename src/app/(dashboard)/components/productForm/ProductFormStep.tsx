import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { FC } from "react";

interface Props {
  formStep: number;
  setFormStep: (formStep: number) => void;
}

const ProductFormStep: FC<Props> = ({ formStep, setFormStep }) => {
  const formStepOption = [
    {
      name: "Product Info",
      icon: <Check />,
    },
    {
      name: "Description",
      icon: <Check />,
    },
    {
      name: "Preview",
      icon: <Check />,
    },
  ];

  return (
    <div className="flex items-center justify-center mb-10 text-base">
      <div className=" relative">
        <div className="flex items-center">
          <div
            className={cn(
              "rounded-full bg-blue-500 p-1 w-8 h-8 text-center text-white"
            )}
          >
            {formStep > 0 ? <Check /> : <h1>1</h1>}
          </div>
          <div className="w-[200px] h-1 bg-primary"></div>
        </div>
        <h1 className="absolute left-[-15%]">Product Info</h1>
      </div>

      <div className=" relative">
        <div className="flex items-center">
          <div
            className={cn(
              "rounded-full p-1 w-8 h-8 text-center text-white",
              formStep < 1 ? "bg-gray-500" : "bg-blue-500"
            )}
          >
            {formStep > 1 ? <Check /> : <h1>2</h1>}
          </div>
          <div className="w-[200px] h-1 bg-primary"></div>
        </div>
        <h1 className="absolute left-[-10%]">Description</h1>
      </div>

      <div className=" relative">
        <div className="flex items-center">
          <div
            className={cn(
              "rounded-full p-1 w-8 h-8 text-center text-white",
              formStep < 2 ? "bg-gray-500" : "bg-blue-500"
            )}
          >
            {formStep >= 2 ? <Check /> : <h1>3</h1>}
          </div>
        </div>
        <h1 className="absolute left-[-50%]">Preview</h1>
      </div>
    </div>
  );
};

export default ProductFormStep;
