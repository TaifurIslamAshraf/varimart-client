export interface IManageReview {
  _id: string;
  productName: string;
  productId: string;
  reviews: [
    {
      user: string;
      fullName: string;
      avatar: string;
      rating: number;
      comment: string;
      approved: boolean;
      createdOn: Date;
      _id: string;
    }
  ];
}
