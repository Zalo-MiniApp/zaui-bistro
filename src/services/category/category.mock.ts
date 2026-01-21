import { Category, SubCategory } from "@/types/category.types";
import category01 from "@/static/category-01.png";
import category02 from "@/static/category-02.png";
import category03 from "@/static/category-03.png";
import category04 from "@/static/category-04.png";
import category05 from "@/static/category-05.png";
import category06 from "@/static/category-06.png";
import category07 from "@/static/category-07.png";
import category08 from "@/static/category-08.png";

export const mockListOfCategory: Category[] = [
  {
    id: "vietnamese",
    name: "Món Việt",
    subCategoryIds: [
      "vietnamese-drinks",
      "vietnamese-food",
      "vietnamese-breakfast",
      "vietnamese-soup",
      "vietnamese-dessert",
      "vietnamese-snack",
      "vietnamese-vegetarian",
      "vietnamese-fastfood",
    ],
  },
  {
    id: "western",
    name: "Món Âu",
    subCategoryIds: [
      "western-steak",
      "western-pasta",
      "western-burger",
      "western-pizza",
      "western-salad",
      "western-breakfast",
      "western-dessert",
      "western-drinks",
    ],
  },
  {
    id: "thailand",
    name: "Món Thái",
    subCategoryIds: [
      "thailand-soup",
      "thailand-noodles",
      "thailand-rice",
      "thailand-salad",
      "thailand-grilled",
      "thailand-curry",
      "thailand-seafood",
      "thailand-dessert",
    ],
  },
  {
    id: "japanese",
    name: "Món Nhật",
    subCategoryIds: [
      "japanese-sushi",
      "japanese-ramen",
      "japanese-rice-bowl",
      "japanese-tempura",
      "japanese-grilled",
      "japanese-noodles",
      "japanese-dessert",
      "japanese-drinks",
    ],
  },
];

export const mockListOfSubCategory: SubCategory[] = [
  // Vietnamese subcategories
  {
    id: "vietnamese-drinks",
    name: "Đồ uống",
    image: category01,
  },
  {
    id: "vietnamese-food",
    name: "Món chính",
    image: category02,
  },
  {
    id: "vietnamese-breakfast",
    name: "Bữa sáng",
    image: category03,
  },
  {
    id: "vietnamese-soup",
    name: "Món canh",
    image: category04,
  },
  {
    id: "vietnamese-dessert",
    name: "Tráng miệng",
    image: category05,
  },
  {
    id: "vietnamese-snack",
    name: "Món ăn vặt",
    image: category06,
  },
  {
    id: "vietnamese-vegetarian",
    name: "Món chay",
    image: category07,
  },
  {
    id: "vietnamese-fastfood",
    name: "Ăn nhanh",
    image: category08,
  },
  // Western subcategories
  {
    id: "western-steak",
    name: "Bít tết",
    image: category01,
  },
  {
    id: "western-pasta",
    name: "Mì Ý",
    image: category02,
  },
  {
    id: "western-burger",
    name: "Burger",
    image: category03,
  },
  {
    id: "western-pizza",
    name: "Pizza",
    image: category04,
  },
  {
    id: "western-salad",
    name: "Salad",
    image: category05,
  },
  {
    id: "western-breakfast",
    name: "Bữa sáng",
    image: category06,
  },
  {
    id: "western-dessert",
    name: "Tráng miệng",
    image: category07,
  },
  {
    id: "western-drinks",
    name: "Đồ uống",
    image: category08,
  },
  // Thailand subcategories
  {
    id: "thailand-soup",
    name: "Canh/Súp",
    image: category01,
  },
  {
    id: "thailand-noodles",
    name: "Món mì/phở",
    image: category02,
  },
  {
    id: "thailand-rice",
    name: "Cơm",
    image: category03,
  },
  {
    id: "thailand-salad",
    name: "Gỏi",
    image: category04,
  },
  {
    id: "thailand-grilled",
    name: "Món nướng",
    image: category05,
  },
  {
    id: "thailand-curry",
    name: "Cà ri",
    image: category06,
  },
  {
    id: "thailand-seafood",
    name: "Hải sản",
    image: category07,
  },
  {
    id: "thailand-dessert",
    name: "Tráng miệng",
    image: category08,
  },
  // Japanese subcategories
  {
    id: "japanese-sushi",
    name: "Sushi/Sashimi",
    image: category01,
  },
  {
    id: "japanese-ramen",
    name: "Ramen",
    image: category02,
  },
  {
    id: "japanese-rice-bowl",
    name: "Cơm đậy",
    image: category03,
  },
  {
    id: "japanese-tempura",
    name: "Tempura",
    image: category04,
  },
  {
    id: "japanese-grilled",
    name: "Món nướng",
    image: category05,
  },
  {
    id: "japanese-noodles",
    name: "Mì/Bún",
    image: category06,
  },
  {
    id: "japanese-dessert",
    name: "Tráng miệng",
    image: category07,
  },
  {
    id: "japanese-drinks",
    name: "Đồ uống",
    image: category08,
  },
];
