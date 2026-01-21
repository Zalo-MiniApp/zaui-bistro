import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "@/components/common/tabs";
import { OrderItemCard } from "@/components/common/order-item-card";
import CartImg from "@/static/cart.png";
import { OrderStatus } from "@/types/order.types";
import { useOrders } from "@/services/order/order.queries";
import { Spinner, Text } from "zmp-ui";
import { copy } from "@/constants/copy";

export default function OrderPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<OrderStatus>("all");
  const [page] = useState(1);

  const tabs: Tab<OrderStatus>[] = [
    { value: "all", label: copy.common.all },
    { value: "ongoing", label: copy.order.ongoing },
    { value: "completed", label: copy.order.completedTab },
  ];

  const { data: orderData, isLoading, error } = useOrders(page, 20);
  const orders = orderData?.orders || [];

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (activeTab === "all") return true;

      if (activeTab === "ongoing") {
        return !["completed", "delivered", "cancelled"].includes(order.state);
      }

      if (activeTab === "completed") {
        return ["completed", "delivered", "cancelled"].includes(order.state);
      }

      return true;
    });
  }, [orders, activeTab]);

  const emptyOrders = filteredOrders.length === 0;

  return (
    <div className="relative flex h-full flex-col">
      <div className="mx-3.5 mt-2">
        <Tabs<OrderStatus>
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          fullWidth
        />
      </div>

      <div className="no-scrollbar flex flex-1 justify-center overflow-y-auto px-4 py-3">
        {!isLoading && emptyOrders ? (
          <div className="flex h-full max-w-60 flex-col items-center justify-center gap-10">
            <div className="flex flex-col items-center gap-4">
              <img
                src={CartImg}
                draggable={false}
                alt={copy.order.empty}
                className="h-16 w-16"
              />
              <div className="flex flex-col items-center gap-2">
                <div className="text-xlarge-m text-text-primary">
                  {copy.order.empty}
                </div>
                <div className="text-center text-xxsmall text-[#A9A9A9]">
                  {copy.order.emptyHint}
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/menu")}
              className="border-border-primary rounded-full border bg-transparent px-20 py-3.5 text-small text-primary active:bg-transparent"
            >
              {copy.common.buyNow}
            </button>
          </div>
        ) : (
          <div className="w-full space-y-3">
            {filteredOrders.map((order) => (
              <OrderItemCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
