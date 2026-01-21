import { copy } from "@/constants/copy";

export const formatOrderDate = (date: string | Date) => {
  const parsed = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsed);
};

export const getPaymentMethodLabel = (method: string) => {
  const labels: Record<string, string> = {
    cash: copy.checkout.paymentMethodCash,
    zalopay: copy.checkout.paymentMethodZaloPay,
    momo: copy.checkout.paymentMethodMomo,
    credit_card: copy.checkout.paymentMethodCard,
  };
  return labels[method] || method;
};
