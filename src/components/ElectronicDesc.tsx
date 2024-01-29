import { FC } from "react";
import { Separator } from "./ui/separator";

type Props = {
  description: any;
  title: string;
};

const ElectronicDesc: FC<Props> = ({ description, title }) => {
  const features = description?.features?.split("|");

  return (
    <div className="px-4">
      <h1 className="text-xl font-semibold">Product Summary & Specification</h1>
      <div className="">
        <h1 className="text-xl font-[500] mt-4 mb-2">Summary:</h1>
        <ul className="text-secondary-foreground mb-5">
          {features?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <Separator />

        <div className="text-sm mt-5">
          <h1 className="text-xl font-[500] mt-4 mb-2">Specification:</h1>
          <div className="flex items-center py-2 bg-gray-200 my-3">
            <p className="sm:max-w-[200px] w-auto sm:w-full sm:px-4 px-2  font-medium">
              Title
            </p>
            <p className="px-6">{title}</p>
          </div>
          <div className="flex items-center py-2 bg-gray-200 my-3">
            <p className="max-w-[200px] w-full px-4 font-medium">Brand</p>
            <p className="px-6">{description?.brand}</p>
          </div>
          <div className="flex items-center py-2 bg-gray-200 my-3">
            <p className="max-w-[200px] w-full px-4 font-medium">
              Warranty Period
            </p>
            <p className="px-6">{description?.warrantyPeriod}</p>
          </div>
          <div className="flex items-center py-2 bg-gray-200 my-3">
            <p className="max-w-[200px] w-full px-4 font-medium">Colour</p>
            <p className="px-6">{description?.colors}</p>
          </div>
          <div className="flex items-center py-2 bg-gray-200 my-3">
            <p className="max-w-[200px] w-full px-4 font-medium">
              Country of Origin
            </p>
            <p className="px-6">{description?.countryOrigin}</p>
          </div>
          <div className="flex items-center py-2 bg-gray-200 my-3">
            <p className="max-w-[200px] w-full px-4 font-medium">
              Battery Capacity
            </p>
            <p className="px-6">{description?.batteryCapacity}</p>
          </div>

          <div className="flex items-center py-2 bg-gray-200 my-3">
            <p className="sm:max-w-[200px] w-auto sm:w-full sm:px-4 px-2 font-medium">
              Features
            </p>
            <ul className="px-6">
              {features?.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex items-center py-2 bg-gray-200 my-3">
            <p className="max-w-[200px] w-full px-4 font-medium">Dimensions</p>
            <p className="px-6">{description?.dimensions}</p>
          </div>
          <div className="flex items-center py-2 bg-gray-200 my-3">
            <p className="max-w-[200px] w-full px-4 font-medium">Model</p>
            <p className="px-6">{description?.model}</p>
          </div>
          <div className="flex items-center py-2 bg-gray-200 my-3">
            <p className="max-w-[200px] w-full px-4 font-medium">Water Proof</p>
            <p className="px-6">{description?.waterproof}</p>
          </div>
          <div className="flex items-center py-2 bg-gray-200 my-3">
            <p className="max-w-[200px] w-full px-4 font-medium">
              Power Supply
            </p>
            <p className="px-6">{description?.powerSupply}</p>
          </div>
          <div className="flex items-center py-2 bg-gray-200 my-3">
            <p className="max-w-[200px] w-full px-4 font-medium">
              Body Materials
            </p>
            <p className="px-6">{description?.bodyMaterials}</p>
          </div>
          <div className="flex items-center py-2 bg-gray-200 my-3">
            <p className="max-w-[200px] w-full px-4 font-medium">
              Charging Time
            </p>
            <p className="px-6">{description?.chargingTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectronicDesc;
