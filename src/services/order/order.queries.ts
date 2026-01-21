import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Order, OrderListResponse } from "../../types/order.types";
import { orderService } from "./order.api";
import { GET_ORDER_BY_ID_KEY, GET_ORDER_LIST_KEY } from "../../constants/api";

export function useOrders(page: number = 1, pageSize: number = 10) {
  return useQuery<OrderListResponse>({
    queryKey: [GET_ORDER_LIST_KEY, page, pageSize],
    queryFn: () => orderService.getOrders(page, pageSize),
    placeholderData: keepPreviousData,
  });
}

export function useOrderById(orderId: string, enabled: boolean = true) {
  return useQuery<Order>({
    queryKey: [GET_ORDER_BY_ID_KEY, orderId],
    queryFn: () => orderService.getOrderById(orderId),
    enabled: enabled && !!orderId,
    placeholderData: keepPreviousData,
  });
}
