"use client";

import { styles } from "@/app/styles";
import { cn } from "@/lib/utils";

const page = () => {
  return (
    <div className={cn(styles.paddingX, "mt-[140px]")}>
      <div className="">
        <div className="top">Top</div>
        <div className="bottom">
          <div className="part-1">Part One</div>
          <div className="part-2">Part two</div>
        </div>
      </div>
    </div>
  );
};

export default page;
