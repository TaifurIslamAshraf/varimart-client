"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (name) {
      router.push(`/products?search=${name}`);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
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
