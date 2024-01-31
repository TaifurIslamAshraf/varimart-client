import { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface Props {
  pagination: {
    numberOfProducts: number;
    totalPage: number;
    currentPage: number;
    nextPage: number;
    prevPage: number;
  };
  category: string;
}

const Paginations: FC<Props> = ({ pagination, category }) => {
  const totalPage = Array.from({ length: pagination?.totalPage });

  const nextPage = pagination?.totalPage === 1 ? 1 : pagination?.nextPage;

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/products?subcategory=${category}&&page=${pagination?.prevPage}`}
            />
          </PaginationItem>

          {totalPage.map((_, index: number) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={`/products?subcategory=${category}&&page=${index + 1}`}
                isActive={index + 1 === pagination?.currentPage}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`/products?subcategory=${category}&&page=${nextPage}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginations;
