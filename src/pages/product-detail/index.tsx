import NoteInput from "@/components/common/note-input";
import VariantSelect from "@/components/common/variant-select";
import { useState, useMemo, useEffect } from "react";
import CartFloatButton from "@/components/common/cart-float-button";
import QuantityStepper from "@/components/common/quantity-stepper";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BackIcon } from "@/components/common/vectors";
import { useProduct } from "@/services/product/product.queries";
import { useCartStore } from "@/stores/cart.store";
import { Button, Spinner, Text } from "zmp-ui";
import { copy } from "@/constants/copy";
import { formatCurrency } from "@/utils/format";

// Type cho variant selections
type VariantSelections = {
  [variantGroupId: string]: {
    type: "SINGLE" | "MULTIPLE" | "ADJUSTMENT" | "QUANTITY";
    // For SINGLE: string (option id)
    // For MULTIPLE: string[] (option ids)
    // For ADJUSTMENT: { [optionId: string]: number } (option id -> value)
    // For QUANTITY: { [optionId: string]: number } (option id -> quantity)
    value: string | string[] | { [key: string]: number };
  };
};

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [variantSelections, setVariantSelections] = useState<VariantSelections>(
    {},
  );
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const editCartItemId = searchParams.get("editCartItemId");
  const isEditMode = !!editCartItemId;

  const { data: product, isLoading, isError } = useProduct(id || "");
  const { addToCart, updateCartItem, items, totalItems } = useCartStore();

  useEffect(() => {
    if (!isEditMode || !editCartItemId || !product) return;

    const cartItem = items.find((item) => item.id === editCartItemId);
    if (!cartItem) return;

    setQuantity(cartItem.quantity);
    setNote(cartItem.note || "");

    const reconstructedSelections: VariantSelections = {};

    cartItem.selectedVariants.forEach((selectedVariant) => {
      const variantGroup = product.variantGroups.find(
        (vg) => vg.id === String(selectedVariant.groupId),
      );

      if (!variantGroup) return;

      const groupId = variantGroup.id;

      switch (variantGroup.type) {
        case "SINGLE": {
          const singleOption = variantGroup.options.find(
            (opt) => opt.id === String(selectedVariant.optionId),
          );
          if (singleOption) {
            reconstructedSelections[groupId] = {
              type: "SINGLE",
              value: singleOption.id,
            };
          }
          break;
        }

        case "MULTIPLE": {
          if (!reconstructedSelections[groupId]) {
            reconstructedSelections[groupId] = {
              type: "MULTIPLE",
              value: [],
            };
          }
          const multipleOption = variantGroup.options.find(
            (opt) => opt.id === String(selectedVariant.optionId),
          );
          if (multipleOption) {
            (reconstructedSelections[groupId].value as string[]).push(
              multipleOption.id,
            );
          }
          break;
        }

        case "ADJUSTMENT":
        case "QUANTITY": {
          if (!reconstructedSelections[groupId]) {
            reconstructedSelections[groupId] = {
              type: variantGroup.type,
              value: {},
            };
          }
          const adjOption = variantGroup.options.find(
            (opt) => opt.id === String(selectedVariant.optionId),
          );
          if (adjOption) {
            (reconstructedSelections[groupId].value as Record<string, number>)[
              adjOption.id
            ] = selectedVariant.quantity || 1;
          }
          break;
        }
      }
    });

    setVariantSelections(reconstructedSelections);
  }, [isEditMode, editCartItemId, items, product]);

  const handleVariantChange = (
    variantGroupId: string,
    value: any,
    type: string,
  ) => {
    setVariantSelections((prev) => ({
      ...prev,
      [variantGroupId]: {
        type: type as "SINGLE" | "MULTIPLE" | "ADJUSTMENT" | "QUANTITY",
        value,
      },
    }));
  };

  const totalPrice = useMemo(() => {
    if (!product) return 0;

    let basePrice = product.price;
    let variantPrice = 0;

    product.variantGroups.forEach((variantGroup) => {
      const selection = variantSelections[variantGroup.id];
      if (!selection) return;

      switch (variantGroup.type) {
        case "SINGLE":
          if (typeof selection.value === "string") {
            const selectedOption = variantGroup.options.find(
              (opt) => opt.id === selection.value,
            );
            if (selectedOption) {
              variantPrice += selectedOption.extraPrice;
            }
          }
          break;

        case "MULTIPLE":
          if (Array.isArray(selection.value)) {
            selection.value.forEach((optionId) => {
              const selectedOption = variantGroup.options.find(
                (opt) => opt.id === optionId,
              );
              if (selectedOption) {
                variantPrice += selectedOption.extraPrice;
              }
            });
          }
          break;

        case "ADJUSTMENT":
          if (
            typeof selection.value === "object" &&
            !Array.isArray(selection.value)
          ) {
            Object.entries(selection.value).forEach(
              ([optionId, adjustmentValue]) => {
                const selectedOption = variantGroup.options.find(
                  (opt) => opt.id === optionId,
                );
                if (selectedOption && typeof adjustmentValue === "number") {
                  variantPrice += selectedOption.extraPrice * adjustmentValue;
                }
              },
            );
          }
          break;

        case "QUANTITY":
          if (
            typeof selection.value === "object" &&
            !Array.isArray(selection.value)
          ) {
            Object.entries(selection.value).forEach(([optionId, qty]) => {
              const selectedOption = variantGroup.options.find(
                (opt) => opt.id === optionId,
              );
              if (selectedOption && typeof qty === "number") {
                variantPrice += selectedOption.extraPrice * qty;
              }
            });
          }
          break;
      }
    });

    return (basePrice + variantPrice) * quantity;
  }, [product, variantSelections, quantity]);

  const handleAddToCart = () => {
    if (!product) return;

    // Convert variantSelections to selectedVariants array
    const selectedVariants: Array<{
      groupId: number | string;
      groupTitle: string;
      optionId: number | string;
      optionName: string;
      extraPrice: number;
      quantity?: number;
    }> = [];

    Object.entries(variantSelections).forEach(([groupId, selection]) => {
      const variantGroup = product.variantGroups.find(
        (vg) => vg.id === groupId,
      );
      if (!variantGroup) return;

      switch (selection.type) {
        case "SINGLE":
          if (typeof selection.value === "string") {
            const option = variantGroup.options.find(
              (opt) => opt.id === selection.value,
            );
            if (option) {
              selectedVariants.push({
                groupId: groupId,
                groupTitle: variantGroup.title,
                optionId: option.id,
                optionName: option.name,
                extraPrice: option.extraPrice,
              });
            }
          }
          break;

        case "MULTIPLE":
          if (Array.isArray(selection.value)) {
            selection.value.forEach((optionId: string) => {
              const option = variantGroup.options.find(
                (opt) => opt.id === optionId,
              );
              if (option) {
                selectedVariants.push({
                  groupId: groupId,
                  groupTitle: variantGroup.title,
                  optionId: option.id,
                  optionName: option.name,
                  extraPrice: option.extraPrice,
                });
              }
            });
          }
          break;

        case "ADJUSTMENT":
        case "QUANTITY":
          if (
            typeof selection.value === "object" &&
            !Array.isArray(selection.value)
          ) {
            Object.entries(selection.value).forEach(([optionId, qty]) => {
              const option = variantGroup.options.find(
                (opt) => opt.id === optionId,
              );
              if (option && typeof qty === "number" && qty > 0) {
                selectedVariants.push({
                  groupId: groupId,
                  groupTitle: variantGroup.title,
                  optionId: option.id,
                  optionName: option.name,
                  extraPrice: option.extraPrice,
                  quantity: qty,
                });
              }
            });
          }
          break;
      }
    });

    const cartItemData = {
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      basePrice: product.price,
      selectedVariants,
      quantity,
      note: note || undefined,
    };

    if (isEditMode && editCartItemId) {
      updateCartItem(editCartItemId, cartItemData);
    } else {
      addToCart(cartItemData);
    }

    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <Spinner />
          <Text size="xSmall" className="mt-2 text-text-tertiary">
            {copy.product.loading}
          </Text>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex h-full items-center justify-center">
        <Text size="xSmall" className="text-text-tertiary">
          {copy.product.notFound}
        </Text>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col bg-background">
      <div className="no-scrollbar flex-1 overflow-y-auto pb-44">
        <div className="relative left-0 top-0">
          <img
            draggable={false}
            className="h-[360px] w-full object-cover"
            src={product.image}
            alt={product.name}
          />
          <div
            className={`header-margin absolute left-0 top-0 z-10 flex h-12 w-full items-center gap-2 bg-transparent px-4 py-2`}
          >
            <Button
              className="w-fit bg-transparent p-1 active:bg-transparent"
              type="neutral"
              size="small"
              fullWidth
              onClick={() => navigate(-1)}
            >
              <BackIcon className="text-text-primary" />
            </Button>

            <div className="text-header_title">Chọn chi tiết</div>
          </div>
          <div className="absolute inset-0 h-18 bg-transparent bg-gradient-to-b from-white/50 to-transparent/0 backdrop-blur-[1px]" />
          <div className="absolute inset-0 h-32 bg-gradient-to-b from-white to-transparent" />
        </div>

        <div className="bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="text-xlarge-m">{product.name}</div>
            <div className="text-xlarge-m text-primary">
              {formatCurrency(product.price)}
            </div>
          </div>
          <div className="mt-2 text-normal text-text-secondary">
            {product.description}
          </div>
        </div>

        <div>
          {product.variantGroups.map((variantGroup) => {
            const selection = variantSelections[variantGroup.id];

            return (
              <div
                key={variantGroup.id}
                className="m-3 rounded-lg bg-white p-4 pb-0"
              >
                <VariantSelect
                  variantGroup={variantGroup}
                  selectedOptionId={
                    variantGroup.type === "SINGLE" &&
                    typeof selection?.value === "string"
                      ? selection.value
                      : undefined
                  }
                  selectedOptionIds={
                    variantGroup.type === "MULTIPLE" &&
                    Array.isArray(selection?.value)
                      ? selection.value
                      : []
                  }
                  selectedValues={
                    (variantGroup.type === "ADJUSTMENT" ||
                      variantGroup.type === "QUANTITY") &&
                    typeof selection?.value === "object" &&
                    !Array.isArray(selection?.value)
                      ? (selection.value as Record<string, number>)
                      : {}
                  }
                  onSelect={(optionId) => {
                    if (variantGroup.type === "SINGLE") {
                      handleVariantChange(
                        variantGroup.id,
                        optionId,
                        variantGroup.type,
                      );
                    } else if (variantGroup.type === "MULTIPLE") {
                      const currentSelection = Array.isArray(selection?.value)
                        ? selection.value
                        : [];
                      const newSelection = currentSelection.includes(optionId)
                        ? currentSelection.filter((id) => id !== optionId)
                        : [...currentSelection, optionId];
                      handleVariantChange(
                        variantGroup.id,
                        newSelection,
                        variantGroup.type,
                      );
                    }
                  }}
                  onValueChange={(optionId, value) => {
                    const currentValues =
                      typeof selection?.value === "object" &&
                      !Array.isArray(selection?.value)
                        ? (selection.value as Record<string, number>)
                        : {};
                    handleVariantChange(
                      variantGroup.id,
                      { ...currentValues, [optionId]: value },
                      variantGroup.type,
                    );
                  }}
                />
              </div>
            );
          })}
          <NoteInput value={note} onChange={setNote} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-divider01 border-t bg-white px-4 py-3">
        <div className="mb-3 flex items-center justify-between">
          <Text className="text-base font-medium">{copy.common.total}</Text>
          <Text className="text-lg font-medium text-primary">
            {formatCurrency(totalPrice)}
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <QuantityStepper
            value={quantity}
            onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
            onIncrease={() => setQuantity(quantity + 1)}
            minValue={1}
            variant="rounded"
          />
          <Button
            onClick={handleAddToCart}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3 text-base font-medium text-white active:bg-primary/50"
          >
            {isEditMode ? copy.common.updateCart : copy.common.addToCart}
          </Button>
        </div>
        <CartFloatButton itemCount={totalItems} />
      </div>
    </div>
  );
}
