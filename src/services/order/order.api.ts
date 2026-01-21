import {
  Order,
  CreateOrderRequest,
  OrderListResponse,
} from "../../types/order.types";
import { mockOrders, createMockOrder } from "./order.mock";

// Simulated in-memory storage (sẽ thay bằng API thật sau)
let orders: Order[] = [...mockOrders];

export const orderService = {
  /**
   * Tạo order mới từ checkout
   * TODO: Thay bằng POST /api/orders
   */
  createOrder: async (request: CreateOrderRequest): Promise<Order> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newOrder = createMockOrder(
      request.items.map((item, idx) => ({
        id: `temp-${idx}`,
        ...item,
      })),
      request.deliveryType,
      request.deliveryAddress,
      request.pickupStoreId,
      request.paymentMethod,
      request.note
    );

    // Thêm vào đầu list (mới nhất)
    orders = [newOrder, ...orders];

    return newOrder;
  },

  /**
   * Lấy danh sách orders (có phân trang)
   * TODO: Thay bằng GET /api/orders?page=1&pageSize=10
   */
  getOrders: async (
    page: number = 1,
    pageSize: number = 10
  ): Promise<OrderListResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedOrders = orders.slice(startIndex, endIndex);

    return {
      orders: paginatedOrders,
      total: orders.length,
      page,
      pageSize,
    };
  },

  /**
   * Lấy chi tiết 1 order
   * TODO: Thay bằng GET /api/orders/:orderId
   */
  getOrderById: async (orderId: string): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const order = orders.find((o) => o.id === orderId);

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    return order;
  },

  /**
   * Hủy order
   * TODO: Thay bằng PATCH /api/orders/:orderId/cancel
   */
  cancelOrder: async (orderId: string): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const orderIndex = orders.findIndex((o) => o.id === orderId);

    if (orderIndex === -1) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    const order = orders[orderIndex];

    if (!order.canCancel) {
      throw new Error("Cannot cancel this order");
    }

    // Update order state
    const updatedOrder: Order = {
      ...order,
      state: "cancelled",
      stateLabel: "Đã hủy",
      updatedAt: new Date(),
      canCancel: false,
      canReorder: true,
    };

    orders[orderIndex] = updatedOrder;

    return updatedOrder;
  },

  /**
   * Reorder - tạo order mới từ order cũ
   * TODO: Thay bằng POST /api/orders/:orderId/reorder
   */
  reorder: async (orderId: string): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const originalOrder = orders.find((o) => o.id === orderId);

    if (!originalOrder) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    if (!originalOrder.canReorder) {
      throw new Error("Cannot reorder this order");
    }

    // Tạo order mới với items giống order cũ
    const newOrder = createMockOrder(
      originalOrder.items.map((item) => ({
        ...item,
        id: "", // Will be regenerated
      })),
      originalOrder.deliveryType,
      originalOrder.deliveryAddress,
      originalOrder.pickupStore?.id,
      originalOrder.payment?.method || "cash",
      originalOrder.note
    );

    orders = [newOrder, ...orders];

    return newOrder;
  },

  /**
   * Xác nhận đã nhận hàng (cho pickup orders)
   * TODO: Thay bằng PATCH /api/orders/:orderId/confirm-pickup
   */
  confirmPickup: async (orderId: string): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const orderIndex = orders.findIndex((o) => o.id === orderId);

    if (orderIndex === -1) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    const order = orders[orderIndex];

    if (!order.canPickup) {
      throw new Error("Cannot confirm pickup for this order");
    }

    const updatedOrder: Order = {
      ...order,
      state: "completed",
      stateLabel: "Hoàn thành",
      updatedAt: new Date(),
      canPickup: false,
      canReorder: true,
    };

    orders[orderIndex] = updatedOrder;

    return updatedOrder;
  },
};
