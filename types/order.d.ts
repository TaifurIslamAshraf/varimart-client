export type IOrders = {
  _id: string;
  shippingInfo: {
    address: string;
    fullName: string;
    phone: string;
  };
  orderItems: [
    {
      productName: string;
      price: number;
      quantity: number;
      image: string;
      product: string;
      id: string;
    }
  ];
  orderNots: string;
  user: string;
  orderStatus: string;
  orderId: string;
  paymentType: string;
  shippingPrice: string;
  totalAmount: string;
  createdAt: Date;
  deliveredAt?: Date;
  updatedAt: Date;
};

export type IOrderTable = {
  fullName: string;
  orderStatus: string;
  _id: string;
  createdAt: Date;
  totalAmount: number;
};
