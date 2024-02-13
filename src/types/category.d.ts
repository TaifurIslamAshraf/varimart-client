export type ICategory = {
  name: string;
  slug: string;
  _id: string;
  subcategory?: {
    name: string;
    slug: string;
    _id: string;
  }[];
}[];

export type ISubcategory = {
  name: string;
  slug: string;
  _id: string;
}[];
