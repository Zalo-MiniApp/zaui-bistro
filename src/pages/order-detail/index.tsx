import { useParams, useNavigate } from "react-router-dom";
import OrderCheckImg from "@/static/order.png";
import { useOrderById } from "@/services/order/order.queries";
import { Button, Spinner, Text } from "zmp-ui";
import { copy } from "@/constants/copy";
import { formatCurrency } from "@/utils/format";
import { formatOrderDate, getPaymentMethodLabel } from "@/utils/order";

export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const { data: order, isLoading, error } = useOrderById(orderId || "");

  return (
    <div className="flex h-full flex-col bg-elevation-01">
      <div className="no-scrollbar flex-1 overflow-y-auto pb-20">
        <div className="flex items-end px-4 text-center">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-2 text-start">
              <div className="text-xlarge-m">{copy.orderDetail.title}</div>
              <div className="text-xxsmall text-text-disabled">
                {copy.orderDetail.thankYou}
              </div>
            </div>
            <img
              draggable={false}
              src={OrderCheckImg}
              alt={copy.orderDetail.title}
              className="mr-4 aspect-auto h-24"
            />
          </div>
        </div>

        <div className="mx-3.5 mb-3 rounded-lg bg-white px-4 py-4">
          <div className="mb-3 text-large-m">{copy.common.orderSummary}</div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <div className="text-small text-text-secondary">
                {copy.orderDetail.id}
              </div>
              <div className="text-small"># {order?.orderCode}</div>
            </div>

            <div className="flex justify-between">
              <div className="text-small text-text-secondary">
                {copy.orderDetail.date}
              </div>
              {order?.createdAt && (
                <div className="text-small">
                  {formatOrderDate(order?.createdAt)}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <div className="text-small text-text-secondary">
                {copy.orderDetail.paymentMethod}
              </div>
              <div className="text-small">
                {order?.payment
                  ? getPaymentMethodLabel(order.payment.method)
                  : copy.common.notAvailable}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-3.5 mb-3 rounded-lg bg-white px-4 py-4">
          <div className="mb-3 text-large-m">{copy.orderDetail.items}</div>

          <div className="space-y-4">
            {order?.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  draggable={false}
                  src={item.image}
                  alt={item.name}
                  className="flex h-18 w-18 flex-shrink-0 flex-col items-center justify-center rounded-lg object-cover"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="text-large-m">{item.name}</div>
                    {item.options && item.options.length > 0 && (
                      <div className="text-xxsmall text-text-disabled">
                        {item.options
                          .map((opt) => opt.value)
                          .join(copy.common.listSeparator)}
                      </div>
                    )}
                    {item.note && (
                      <div className="text-text-secondary">{item.note}</div>
                    )}
                  </div>
                  <div className="text-xxsmall text-text-primary">
                    {formatCurrency(item.price)}
                  </div>
                </div>
                <div className="flex h-full flex-shrink-0 items-center text-right">
                  <div className="text-xxsmall text-text-disabled">
                    {copy.common.quantityPrefix}
                    {item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-3.5 rounded-lg bg-white px-4 py-4">
          <div className="mb-3 text-large-m">{copy.common.paymentSummary}</div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="text-text-secondary">
                {copy.checkout.subtotal}
              </div>
              <div>{formatCurrency(order?.payment?.subtotal ?? 0)}đ</div>
            </div>

            <div className="flex justify-between">
              <div className="text-text-secondary">
                {copy.common.shippingFee}
              </div>
              <div>{formatCurrency(order?.payment?.shippingFee ?? 0)}đ</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-text-secondary">
                {copy.common.discountLabel}
              </div>
              <div className="flex translate-x-1 items-center">
                <div className="text-orange500">
                  -{formatCurrency(order?.payment?.discount ?? 0)}đ
                </div>
                <svg
                  className="h-4 w-4 text-text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            <hr />
            <div className="flex items-center justify-between">
              <div className="text-small text-text-secondary">
                {copy.common.total}:
              </div>
              <div className="text-small">
                {formatCurrency(order?.payment?.total ?? 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
