import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateOrderRequest, Order } from "../../types/order.types";
import { orderService } from "./order.api";
import {
  CANCEL_ORDER_KEY,
  CONFIRM_PICKUP_KEY,
  CREATE_ORDER_KEY,
  GET_ORDER_BY_ID_KEY,
  GET_ORDER_LIST_KEY,
  REORDER_KEY,
} from "../../constants/api";

/**
 * Hook để tạo order mới
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<Order, Error, CreateOrderRequest>({
    mutationKey: [CREATE_ORDER_KEY],
    mutationFn: (request: CreateOrderRequest) =>
      orderService.createOrder(request),
    onSuccess: () => {
      // Invalidate order list để refetch
      queryClient.invalidateQueries({ queryKey: [GET_ORDER_LIST_KEY] });
    },
  });
}

/**
 * Hook để hủy order
 */
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation<Order, Error, string>({
    mutationKey: [CANCEL_ORDER_KEY],
    mutationFn: (orderId: string) => orderService.cancelOrder(orderId),
    onSuccess: (updatedOrder) => {
      // Invalidate order list
      queryClient.invalidateQueries({ queryKey: [GET_ORDER_LIST_KEY] });
      // Update cache cho order detail
      queryClient.setQueryData(
        [GET_ORDER_BY_ID_KEY, updatedOrder.id],
        updatedOrder,
      );
    },
  });
}

/**
 * Hook để reorder (đặt lại order cũ)
 */
export function useReorder() {
  const queryClient = useQueryClient();

  return useMutation<Order, Error, string>({
    mutationKey: [REORDER_KEY],
    mutationFn: (orderId: string) => orderService.reorder(orderId),
    onSuccess: () => {
      // Invalidate order list để refetch
      queryClient.invalidateQueries({ queryKey: [GET_ORDER_LIST_KEY] });
    },
  });
}

/**
 * Hook để xác nhận đã nhận hàng (pickup orders)
 */
export function useConfirmPickup() {
  const queryClient = useQueryClient();

  return useMutation<Order, Error, string>({
    mutationKey: [CONFIRM_PICKUP_KEY],
    mutationFn: (orderId: string) => orderService.confirmPickup(orderId),
    onSuccess: (updatedOrder) => {
      // Invalidate order list
      queryClient.invalidateQueries({ queryKey: [GET_ORDER_LIST_KEY] });
      // Update cache cho order detail
      queryClient.setQueryData(
        [GET_ORDER_BY_ID_KEY, updatedOrder.id],
        updatedOrder,
      );
    },
  });
}
