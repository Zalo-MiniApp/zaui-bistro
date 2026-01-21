import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "@/components/common/tabs";
import NoteInput from "@/components/common/note-input";
import {
  MapPinIcon,
  ChevronRightIcon,
  StoreIcon,
} from "@/components/common/vectors";
import QuantityStepper from "@/components/common/quantity-stepper";
import { useCartStore } from "@/stores/cart.store";
import { useCreateOrder } from "@/services/order/order.mutations";
import { Button, Text, useSnackbar } from "zmp-ui";
import { copy } from "@/constants/copy";
import { formatCurrency } from "@/utils/format";
import { calculateCartItemPrice, calculateCartTotal } from "@/utils/cart";

type DeliveryMethod = "delivery" | "pickup";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DeliveryMethod>("delivery");
  const [deliveryTime, setDeliveryTime] = useState(
    copy.checkout.scheduleSample,
  );
  const [note, setNote] = useState("");
  const [selectedAddress, setSelectedAddress] = useState({
    name: copy.checkout.sampleRecipient,
    address: copy.checkout.sampleLocation,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { openSnackbar } = useSnackbar();

  const { items: cartItems, updateQuantity, clearCart } = useCartStore();
  const { mutate: createOrder, isPending } = useCreateOrder();

  const totalItems = calculateCartTotal(cartItems);
  const shippingFee = 25000;
  const discountAmount = 5000;
  const totalWithDelivery = totalItems + shippingFee - discountAmount;
  const totalWithoutDelivery = totalItems - discountAmount;

  const tabs: Tab<DeliveryMethod>[] = [
    { value: "delivery", label: copy.checkout.delivery },
    { value: "pickup", label: copy.checkout.pickup },
  ];

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      openSnackbar({ text: copy.cart.empty, type: "warning" });
      return;
    }

    setIsProcessing(true);

    const orderItems = cartItems.map((item) => ({
      name: item.productName,
      quantity: item.quantity,
      price: calculateCartItemPrice(item),
      image: item.productImage,
      note: item.note,
      options: item.selectedVariants.map((variant) => ({
        name: variant.groupTitle,
        value: variant.optionName,
        price: variant.extraPrice,
      })),
    }));

    createOrder(
      {
        deliveryType: activeTab,
        items: orderItems,
        deliveryAddress:
          activeTab === "delivery"
            ? {
                recipientName: selectedAddress.name,
                phoneNumber: copy.checkout.samplePhoneNumber,
                address: selectedAddress.address,
                ward: "",
                district: "",
                city: copy.checkout.sampleCity,
                note: note,
              }
            : undefined,
        pickupStoreId: activeTab === "pickup" ? "store-001" : undefined,
        paymentMethod: "cash",
        note: note,
      },
      {
        onSuccess: (order) => {
          clearCart();
          setIsProcessing(false);
          navigate("/order-success", { state: { order } });
        },
        onError: (error) => {
          setIsProcessing(false);
          openSnackbar({
            text: `${copy.checkout.createOrderError}: ${error.message}`,
            type: "error",
          });
        },
      },
    );
  };

  return (
    <div className="flex h-full flex-col bg-elevation-01">
      <div className="no-scrollbar flex-1 overflow-y-auto pb-32">
        <div className="px-4">
          <Tabs<DeliveryMethod>
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            fullWidth
            className="rounded-rounded bg-neutral100 p-1"
          />
        </div>

        {activeTab === "delivery" && (
          <div className="mx-3.5 mt-4 flex flex-col gap-4 rounded-xl bg-white p-4">
            <button
              onClick={() => navigate("/select-location")}
              className="flex w-full items-start gap-3 text-left"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary">
                <MapPinIcon className="size-6" color="black" />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="text-xxsmall text-text-secondary">
                  {selectedAddress.name}
                </div>
                <div className="text-small-m">{selectedAddress.address}</div>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-text-secondary" />
            </button>

            <div className="rounded-2xl bg-white">
              <NoteInput
                maxLength={80}
                hideLabel
                placeholder={copy.checkout.addressPlaceholder}
                className="m-0"
              />
            </div>
          </div>
        )}

        {activeTab === "pickup" && (
          <div className="mx-3.5 mt-4 flex flex-col gap-4 rounded-xl bg-white p-4">
            <button className="flex w-full items-start gap-3 text-left">
              <div className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary">
                <MapPinIcon className="size-6" color="black" />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="text-xxsmall text-text-secondary">
                  {copy.checkout.pickupLocation}
                </div>
                <div className="text-small-m">{copy.checkout.chooseStore}</div>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-text-secondary" />
            </button>
          </div>
        )}

        <div className="mx-3.5 mt-3 rounded-lg bg-white p-3">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-large-m font-medium">
              {copy.checkout.cartTitle}
            </div>
            <div className="bg-transparent text-xxsmall text-primary active:bg-transparent">
              + {copy.common.addMore}
            </div>
          </div>
          <div className="space-y-4">
            {cartItems.map((item) => {
              const variants = item.selectedVariants
                .map((v) =>
                  v.quantity && v.quantity !== 1
                    ? `${v.optionName} ${v.quantity}${copy.common.percentSuffix}`
                    : v.optionName,
                )
                .join(copy.common.listSeparator);

              return (
                <div key={item.id} className="flex gap-3">
                  <img
                    draggable={false}
                    src={item.productImage}
                    alt={item.productName}
                    className="h-18 w-18 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between gap-2">
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="text-normal-sb">{item.productName}</div>
                      {variants && (
                        <div className="text-xxsmall text-text-secondary">
                          {variants}
                        </div>
                      )}
                    </div>
                    <div className="flex items-end justify-between gap-2">
                      <div className="flex-1 text-xxsmall">
                        {formatCurrency(item.basePrice)}
                      </div>

                      <QuantityStepper
                        variant="rounded"
                        value={item.quantity}
                        onDecrease={() =>
                          updateQuantity(
                            item.id,
                            Math.max(0, item.quantity - 1),
                          )
                        }
                        onIncrease={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-3.5 mt-3 rounded-lg bg-white px-4 py-4">
          <div className="flex flex-col gap-2">
            <div className="text-large-m">
              {activeTab === "delivery"
                ? copy.checkout.deliveryTime
                : copy.checkout.pickupTime}
            </div>
            <button className="flex w-full items-center justify-between text-small">
              <div>{deliveryTime}</div>
              <ChevronRightIcon className="h-5 w-5 text-text-secondary" />
            </button>
          </div>
        </div>

        <div className="mx-3.5 mt-3 flex flex-col gap-3 rounded-lg bg-white px-4 py-4">
          <div className="text-large-m">{copy.common.paymentSummary}</div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="text-small text-text-secondary">
                {copy.checkout.subtotal}
              </div>
              <div className="text-small text-text-primary">
                {formatCurrency(totalItems)}
              </div>
            </div>
            {activeTab === "delivery" && (
              <div className="flex justify-between text-small">
                <div className="text-text-secondary">
                  {copy.common.shippingFee}
                </div>
                <div>{formatCurrency(shippingFee)}</div>
              </div>
            )}
            <div className="flex justify-between text-small">
              <div className="text-text-secondary">
                {copy.common.discountLabel}
              </div>
              <div className="text-orange500">
                -{formatCurrency(discountAmount)}
              </div>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <div className="text-small text-text-secondary">
                {copy.common.total}:
              </div>
              <Text.Title size="normal" className="text-lg">
                {formatCurrency(
                  activeTab === "delivery"
                    ? totalWithDelivery
                    : totalWithoutDelivery,
                )}
              </Text.Title>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-divider01 border-t bg-white px-4 py-4 pb-5">
        <Button
          onClick={handleCheckout}
          disabled={isPending || isProcessing || cartItems.length === 0}
          className="w-full rounded-lg bg-primary py-3 font-medium text-white active:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending || isProcessing
            ? copy.checkout.processing
            : copy.cart.checkout}
        </Button>
      </div>
    </div>
  );
}
