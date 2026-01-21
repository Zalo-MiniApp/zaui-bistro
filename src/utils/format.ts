import tokens from "@/tokens";

const DEFAULT_LOCALE = "vi-VN";

export const formatCurrency = (
  value: number,
  locale: string = DEFAULT_LOCALE,
) => `${value.toLocaleString(locale)}`;

export const formatCount = (value: number, max = 99) =>
  value > max ? tokens.text.common.countOverflow : String(value);
