import logo from "@/static/logo.png";
import { copy } from "@/constants/copy";

export default function Logo() {
  return (
    <img
      src={logo}
      alt={copy.brand.name}
      draggable={false}
      className="size-[22px] rounded-full"
    />
  );
}
