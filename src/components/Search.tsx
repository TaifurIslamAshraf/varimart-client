"use client";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
  searchRoute: string;
  className?: string;
};

const Search: FC<Props> = ({ searchRoute, className }) => {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (name) {
      router.push(`${searchRoute}?search=${name}`);
      setName("");
    }
  };

  return (
    <div className={cn(className, "flex items-center justify-center w-full")}>
      <Input
        className="max-w-[500px]"
        name="search"
        placeholder="Search for products"
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
      />
      <Button onClick={handleSearch} variant={"outline"}>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
