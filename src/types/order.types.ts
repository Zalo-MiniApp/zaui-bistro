export type OrderStatus = "all" | "ongoing" | "completed";

export type OrderDeliveryType = "pickup" | "delivery";

export type OrderState =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivering"
  | "delivered"
  | "completed"
  | "cancelled";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  note?: string;
  options?: {
    name: string;
    value: string;
    price?: number;
  }[];
}

export interface OrderAddress {
  recipientName: string;
  phoneNumber: string;
  address: string;
  ward?: string;
  district?: string;
  city?: string;
  note?: string;
}

export interface OrderPayment {
  method: "cash" | "zalopay" | "momo" | "credit_card";
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: "pending" | "paid" | "refunded";
}

export interface Order {
  id: string;
  orderCode?: string;
  deliveryType: OrderDeliveryType;
  deliveryTypeLabel: string;
  state: OrderState;
  stateLabel: string;
  items: OrderItem[];
  createdAt: string | Date;
  updatedAt?: string | Date;
  estimatedTime?: string | Date;
  totalAmount: number;
  payment?: OrderPayment;
  deliveryAddress?: OrderAddress;
  pickupStore?: {
    id: string;
    name: string;
    address: string;
  };
  pickupCode?: string;
  canReorder: boolean;
  canPickup: boolean;
  canCancel: boolean;
  note?: string;
  userId?: string;
}

export interface OrderHistory {
  id: string;
  orderId: string;
  state: OrderState;
  description: string;
  timestamp: string | Date;
  actor?: string;
}

export interface CreateOrderRequest {
  deliveryType: OrderDeliveryType;
  items: Omit<OrderItem, "id">[];
  deliveryAddress?: Omit<OrderAddress, "id">;
  pickupStoreId?: string;
  paymentMethod: OrderPayment["method"];
  note?: string;
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page: number;
  pageSize: number;
}
