export interface IElectronicsDescription {
  colors: string;
  brand: string;
  warrantyPeriod?: string;
  countryOrigin?: string;
  batteryCapacity?: string;
  features?: string;
  dimensions?: string;
  model?: string;
  waterproof?: string;
  powerSupply?: string;
  bodyMaterials?: string;
  chargingTime?: string;
}

export interface IFoodsDescription {
  ingredients: string;
  foodDesc: string;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  descriptionType: "electronics" | "foods";
  price: number;
  discountPrice?: string;
  stock: number;
  sold: number;
  soldAt: Date;
  shipping: number;
  images: [string];
  numOfReviews: number;
  ratings?: number;
  description: IElectronicsDescription | IFoodsDescription;
  category: mongoose.Schema.Types.ObjectId;
  subcategory?: string;
}
