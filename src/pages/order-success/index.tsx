import { useNavigate } from "react-router-dom";
import checkoutSuccessImg from "@/static/checkout-success.png";
import { Button, Text } from "zmp-ui";
import { copy } from "@/constants/copy";

export default function OrderSuccessPage() {
  const navigate = useNavigate();

  const handleViewOrder = () => {
    navigate("/order");
  };

  return (
    <div className="flex h-full flex-col items-center justify-center bg-background px-6">
      <img
        draggable={false}
        src={checkoutSuccessImg}
        alt={copy.orderSuccess.title}
        className="mb-4 h-24 w-24"
      />
      <Text.Title size="small" className="mb-3 text-text-primary">
        {copy.orderSuccess.title}
      </Text.Title>
      <Text size="xSmall" className="max-w-sm text-center text-text-secondary">
        {copy.orderSuccess.description}
      </Text>
      <div className="fixed bottom-0 left-0 right-0 border-divider01 border-t bg-white px-4 py-4">
        <Button
          onClick={handleViewOrder}
          className="w-full rounded-lg bg-primary py-3 text-base font-medium text-white active:bg-primary/50"
        >
          {copy.common.viewOrder}
        </Button>
      </div>
    </div>
  );
}
