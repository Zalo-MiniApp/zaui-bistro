import { Product, ProductFeature } from "@/types/product.types";

export const mockProductFeature: ProductFeature[] = [
  {
    id: "ice",
    name: "Đá",
  },
  {
    id: "hot",
    name: "Nóng",
  },
  {
    id: "spicy",
    name: "Cay",
  },
  {
    id: "vegetarian",
    name: "Chay",
  },
  {
    id: "bestseller",
    name: "Bán chạy",
  },
];

export const mockListOfProduct: Product[] = [
  // ========== VIETNAMESE CATEGORY ==========
  // Vietnamese - Drinks
  {
    id: 1,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-drinks",
    description: "Cà phê đá truyền thống Việt Nam, đậm đà hương vị",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-1.png",
    name: "Cà Phê Đá",
    price: 25000,
    variantGroups: [
      {
        id: "size",
        title: "Kích cỡ",
        description: "Chọn kích cỡ",
        type: "SINGLE",
        isRequired: true,
        options: [
          { id: "size-small", name: "Nhỏ", extraPrice: 0 },
          { id: "size-medium", name: "Vừa", extraPrice: 5000 },
          { id: "size-large", name: "Lớn", extraPrice: 10000 },
        ],
      },
      {
        id: "toppings",
        title: "Topping",
        description: "Chọn thêm topping (có thể chọn nhiều)",
        type: "MULTIPLE",
        isRequired: false,
        options: [
          { id: "topping-pearl", name: "Thêm trân châu", extraPrice: 8000 },
          { id: "topping-jelly", name: "Thêm thạch", extraPrice: 8000 },
          { id: "topping-pudding", name: "Thêm pudding", extraPrice: 10000 },
        ],
      },
      {
        id: "adjustment-ice",
        title: "Mức độ đường và đá",
        description: "Không bắt buộc",
        type: "ADJUSTMENT",
        isRequired: false,
        options: [
          {
            id: "ice",
            name: "Đường",
            maxValue: 100,
            defaultValue: 50,
            extraPrice: 0,
            step: 20,
          },
          {
            id: "sugar",
            name: "Đá",
            maxValue: 100,
            defaultValue: 50,
            extraPrice: 0,
            step: 20,
          },
        ],
      },
      {
        id: "side-dishes",
        title: "Món ăn kèm",
        description: "Thêm các món ăn kèm để hoàn thiện",
        type: "QUANTITY",
        isRequired: false,
        options: [
          {
            id: "side-flan",
            name: "Bánh flan",
            extraPrice: 15000,
            image:
              "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-1.png",
            value: 0,
          },
          {
            id: "side-toast",
            name: "Bánh mì nướng",
            extraPrice: 20000,
            image:
              "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-2.png",
            value: 0,
          },
          {
            id: "side-cream-puff",
            name: "Bánh su kem",
            extraPrice: 25000,
            image:
              "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-3.png",
            value: 0,
          },
        ],
      },
    ],
    sales: {
      freeShipping: true,
    },
    features: ["ice", "bestseller"],
  },
  {
    id: 2,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-drinks",
    description: "Cà phê sữa đá ngọt ngào, thơm béo",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-2.png",
    name: "Cà Phê Sữa Đá",
    price: 28000,
    variantGroups: [
      {
        id: "size",
        title: "Kích cỡ",
        description: "Chọn kích cỡ",
        type: "SINGLE",
        isRequired: true,
        options: [
          { id: "size-small", name: "Nhỏ", extraPrice: 0 },
          { id: "size-medium", name: "Vừa", extraPrice: 5000 },
          { id: "size-large", name: "Lớn", extraPrice: 10000 },
        ],
      },
    ],
    features: ["ice", "bestseller"],
    newMarked: true,
  },
  {
    id: 3,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-drinks",
    description: "Trà đá thơm mát, giải nhiệt mùa hè",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-3.png",
    name: "Trà Đá",
    price: 15000,
    variantGroups: [
      {
        id: "size",
        title: "Kích cỡ",
        description: "Chọn kích cỡ",
        type: "SINGLE",
        isRequired: true,
        options: [
          { id: "size-small", name: "Nhỏ", extraPrice: 0 },
          { id: "size-medium", name: "Vừa", extraPrice: 3000 },
          { id: "size-large", name: "Lớn", extraPrice: 5000 },
        ],
      },
    ],
    features: ["ice"],
  },

  // Vietnamese - Food (Món chính)
  {
    id: 4,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-food",
    description: "Cơm tấm sườn nướng đặc biệt",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-4.png",
    name: "Cơm Tấm Sườn",
    price: 45000,
    variantGroups: [],
    features: ["hot", "bestseller"],
  },
  {
    id: 5,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-food",
    description: "Bún chả Hà Nội truyền thống",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-5.png",
    name: "Bún Chả",
    price: 50000,
    variantGroups: [],
    features: ["hot"],
    sales: {
      discount: 15,
    },
  },
  {
    id: 6,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-food",
    description: "Cơm gà xối mỡ thơm ngon",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-1.png",
    name: "Cơm Gà",
    price: 42000,
    variantGroups: [],
    features: ["hot"],
  },

  // Vietnamese - Breakfast
  {
    id: 7,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-breakfast",
    description: "Phở bò truyền thống với nước dùng thơm ngon",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-2.png",
    name: "Phở Bò",
    price: 55000,
    variantGroups: [
      {
        id: "pho-type",
        title: "Loại phở",
        description: "Chọn loại phở",
        type: "SINGLE",
        isRequired: true,
        options: [
          { id: "pho-rare", name: "Phở tái", extraPrice: 0 },
          { id: "pho-well-done", name: "Phở chín", extraPrice: 0 },
          { id: "pho-mixed", name: "Phở tái chín", extraPrice: 5000 },
          { id: "pho-special", name: "Phở đặc biệt", extraPrice: 15000 },
        ],
      },
    ],
    features: ["hot", "bestseller"],
  },
  {
    id: 8,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-breakfast",
    description: "Bánh mì thịt nguội kẹp rau củ thơm ngon",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-3.png",
    name: "Bánh Mì Thịt",
    price: 25000,
    variantGroups: [
      {
        id: "banh-mi-toppings",
        title: "Topping",
        description: "Chọn thêm topping",
        type: "MULTIPLE",
        isRequired: false,
        options: [
          { id: "topping-egg", name: "Thêm trứng", extraPrice: 8000 },
          { id: "topping-pate", name: "Thêm pate", extraPrice: 5000 },
          { id: "topping-cha", name: "Thêm chả", extraPrice: 10000 },
        ],
      },
    ],
    features: ["bestseller"],
    newMarked: true,
  },
  {
    id: 9,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-breakfast",
    description: "Xôi xéo với đậu xanh và hành phi",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-4.png",
    name: "Xôi Xéo",
    price: 20000,
    variantGroups: [],
    features: ["vegetarian"],
  },

  // Vietnamese - Soup
  {
    id: 10,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-soup",
    description: "Canh chua cá lóc miền Nam",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-5.png",
    name: "Canh Chua Cá",
    price: 48000,
    variantGroups: [],
    features: ["hot"],
  },
  {
    id: 11,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-soup",
    description: "Canh khổ qua nhồi thịt thanh mát",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-1.png",
    name: "Canh Khổ Qua",
    price: 35000,
    variantGroups: [],
    features: ["hot"],
  },

  // Vietnamese - Dessert
  {
    id: 12,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-dessert",
    description: "Chè ba màu mát lạnh, ngọt ngào",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-2.png",
    name: "Chè Ba Màu",
    price: 22000,
    variantGroups: [],
    features: ["ice"],
  },
  {
    id: 13,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-dessert",
    description: "Chè thập cẩm nhiều nguyên liệu",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-3.png",
    name: "Chè Thập Cẩm",
    price: 25000,
    variantGroups: [],
    features: ["ice"],
  },

  // Vietnamese - Snack
  {
    id: 14,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-snack",
    description: "Nem chua rán giòn rụm",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-4.png",
    name: "Nem Chua Rán",
    price: 30000,
    variantGroups: [],
    features: ["hot"],
  },
  {
    id: 15,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-snack",
    description: "Gỏi cuốn tươi mát với tôm thịt",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-5.png",
    name: "Gỏi Cuốn",
    price: 28000,
    variantGroups: [],
    features: [],
  },

  // Vietnamese - Vegetarian
  {
    id: 16,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-vegetarian",
    description: "Cơm chay đầy đủ dinh dưỡng",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-1.png",
    name: "Cơm Chay",
    price: 35000,
    variantGroups: [],
    features: ["vegetarian", "hot"],
  },
  {
    id: 17,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-vegetarian",
    description: "Phở chay nước dùng thanh đạm",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-2.png",
    name: "Phở Chay",
    price: 40000,
    variantGroups: [],
    features: ["vegetarian", "hot"],
  },

  // Vietnamese - Fast Food
  {
    id: 18,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-fastfood",
    description: "Mì gói trộn thập cẩm nhanh gọn",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-3.png",
    name: "Mì Trộn",
    price: 18000,
    variantGroups: [],
    features: ["spicy"],
  },
  {
    id: 19,
    categoryId: "vietnamese",
    subCategoryId: "vietnamese-fastfood",
    description: "Bánh tráng trộn đủ vị",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-4.png",
    name: "Bánh Tráng Trộn",
    price: 20000,
    variantGroups: [],
    features: ["spicy"],
  },

  // ========== WESTERN CATEGORY ==========

  // Western - Steak
  {
    id: 20,
    categoryId: "western",
    subCategoryId: "western-steak",
    description: "Bít tết bò Úc thơm ngon với sốt tiêu đen",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-5.png",
    name: "Bít Tết Bò",
    price: 120000,
    variantGroups: [
      {
        id: "steak-doneness",
        title: "Độ chín",
        description: "Chọn độ chín",
        type: "SINGLE",
        isRequired: true,
        options: [
          { id: "doneness-rare", name: "Tái", extraPrice: 0 },
          { id: "doneness-medium", name: "Medium", extraPrice: 0 },
          { id: "doneness-well-done", name: "Chín kỹ", extraPrice: 0 },
        ],
      },
    ],
    features: ["hot", "bestseller"],
  },
  {
    id: 21,
    categoryId: "western",
    subCategoryId: "western-steak",
    description: "Bít tết gà tender juicy",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-1.png",
    name: "Bít Tết Gà",
    price: 95000,
    variantGroups: [],
    features: ["hot"],
  },
  {
    id: 22,
    categoryId: "western",
    subCategoryId: "western-steak",
    description: "Bít tết cá hồi với sốt kem",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-2.png",
    name: "Bít Tết Cá Hồi",
    price: 140000,
    variantGroups: [],
    features: ["hot"],
  },

  // Western - Pasta
  {
    id: 23,
    categoryId: "western",
    subCategoryId: "western-pasta",
    description: "Mì Ý sốt carbonara béo ngậy",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-3.png",
    name: "Spaghetti Carbonara",
    price: 85000,
    variantGroups: [],
    features: ["hot", "bestseller"],
    newMarked: true,
  },
  {
    id: 24,
    categoryId: "western",
    subCategoryId: "western-pasta",
    description: "Mì Ý sốt cà chua thịt bò băm",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-4.png",
    name: "Spaghetti Bolognese",
    price: 80000,
    variantGroups: [],
    features: ["hot"],
  },
  {
    id: 25,
    categoryId: "western",
    subCategoryId: "western-pasta",
    description: "Mì Ý sốt kem nấm",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-5.png",
    name: "Fettuccine Alfredo",
    price: 88000,
    variantGroups: [],
    features: ["hot", "vegetarian"],
  },

  // Western - Burger
  {
    id: 26,
    categoryId: "western",
    subCategoryId: "western-burger",
    description: "Burger bò kẹp phô mai và rau củ tươi",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-1.png",
    name: "Cheese Burger",
    price: 65000,
    variantGroups: [
      {
        id: "burger-combo",
        title: "Combo",
        description: "Chọn combo",
        type: "SINGLE",
        isRequired: false,
        options: [
          { id: "combo-single", name: "Burger đơn", extraPrice: 0 },
          { id: "combo-fries", name: "Combo khoai tây", extraPrice: 20000 },
          { id: "combo-full", name: "Combo full", extraPrice: 35000 },
        ],
      },
    ],
    features: ["hot", "bestseller"],
  },
  {
    id: 27,
    categoryId: "western",
    subCategoryId: "western-burger",
    description: "Burger gà giòn rụm",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-2.png",
    name: "Chicken Burger",
    price: 60000,
    variantGroups: [],
    features: ["hot"],
  },

  // Western - Pizza
  {
    id: 28,
    categoryId: "western",
    subCategoryId: "western-pizza",
    description: "Pizza phô mai 4 loại thơm ngon",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-3.png",
    name: "Pizza 4 Cheese",
    price: 150000,
    variantGroups: [
      {
        id: "pizza-size",
        title: "Kích cỡ",
        description: "Chọn kích cỡ",
        type: "SINGLE",
        isRequired: true,
        options: [
          { id: "size-6inch", name: "Nhỏ (6 inch)", extraPrice: 0 },
          { id: "size-9inch", name: "Vừa (9 inch)", extraPrice: 50000 },
          { id: "size-12inch", name: "Lớn (12 inch)", extraPrice: 100000 },
        ],
      },
    ],
    features: ["hot", "bestseller"],
  },
  {
    id: 29,
    categoryId: "western",
    subCategoryId: "western-pizza",
    description: "Pizza hải sản tươi ngon cao cấp",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-4.png",
    name: "Seafood Pizza",
    price: 180000,
    variantGroups: [],
    features: ["hot"],
  },

  // Western - Salad
  {
    id: 30,
    categoryId: "western",
    subCategoryId: "western-salad",
    description: "Salad Caesar với gà nướng",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-5.png",
    name: "Caesar Salad",
    price: 70000,
    variantGroups: [],
    features: [],
  },
  {
    id: 31,
    categoryId: "western",
    subCategoryId: "western-salad",
    description: "Salad rau trộn nhiều màu sắc",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-1.png",
    name: "Garden Salad",
    price: 55000,
    variantGroups: [],
    features: ["vegetarian"],
  },

  // Western - Breakfast
  {
    id: 32,
    categoryId: "western",
    subCategoryId: "western-breakfast",
    description: "Trứng ốp la với bacon và toast",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-2.png",
    name: "English Breakfast",
    price: 75000,
    variantGroups: [],
    features: ["hot"],
  },
  {
    id: 33,
    categoryId: "western",
    subCategoryId: "western-breakfast",
    description: "Bánh pancake với mật ong và bơ",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-3.png",
    name: "Pancakes",
    price: 60000,
    variantGroups: [],
    features: [],
  },

  // Western - Dessert
  {
    id: 34,
    categoryId: "western",
    subCategoryId: "western-dessert",
    description: "Bánh tiramisu Ý truyền thống",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-4.png",
    name: "Tiramisu",
    price: 55000,
    variantGroups: [],
    features: [],
  },
  {
    id: 35,
    categoryId: "western",
    subCategoryId: "western-dessert",
    description: "Kem vani với chocolate sauce",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-5.png",
    name: "Ice Cream Sundae",
    price: 45000,
    variantGroups: [],
    features: ["ice"],
  },

  // Western - Drinks
  {
    id: 36,
    categoryId: "western",
    subCategoryId: "western-drinks",
    description: "Cà phê Latte thơm béo",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-1.png",
    name: "Latte",
    price: 50000,
    variantGroups: [],
    features: ["hot"],
  },
  {
    id: 37,
    categoryId: "western",
    subCategoryId: "western-drinks",
    description: "Nước ép trái cây tươi nguyên chất",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-2.png",
    name: "Fresh Juice",
    price: 40000,
    variantGroups: [],
    features: ["ice"],
  },

  // ========== THAILAND CATEGORY ==========

  // Thailand - Soup
  {
    id: 38,
    categoryId: "thailand",
    subCategoryId: "thailand-soup",
    description: "Tôm yum chua cay đặc trưng Thái Lan",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-3.png",
    name: "Tôm Yum",
    price: 75000,
    variantGroups: [
      {
        id: "spicy-level",
        title: "Độ cay",
        description: "Chọn độ cay",
        type: "SINGLE",
        isRequired: true,
        options: [
          { id: "spicy-none", name: "Không cay", extraPrice: 0 },
          { id: "spicy-mild", name: "Ít cay", extraPrice: 0 },
          { id: "spicy-medium", name: "Cay vừa", extraPrice: 0 },
          { id: "spicy-hot", name: "Cay nồng", extraPrice: 0 },
        ],
      },
    ],
    features: ["hot", "spicy", "bestseller"],
  },
  {
    id: 39,
    categoryId: "thailand",
    subCategoryId: "thailand-soup",
    description: "Súp gà dừa thơm ngon",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-4.png",
    name: "Tom Kha Gai",
    price: 70000,
    variantGroups: [],
    features: ["hot"],
  },

  // Thailand - Noodles
  {
    id: 40,
    categoryId: "thailand",
    subCategoryId: "thailand-noodles",
    description: "Pad Thai xào kiểu Thái truyền thống",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-5.png",
    name: "Pad Thai",
    price: 60000,
    variantGroups: [],
    features: ["hot", "spicy", "bestseller"],
    sales: {
      discount: 20,
    },
  },
  {
    id: 41,
    categoryId: "thailand",
    subCategoryId: "thailand-noodles",
    description: "Phở Thái với hương vị đặc trưng",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-1.png",
    name: "Kuay Teow",
    price: 65000,
    variantGroups: [],
    features: ["hot"],
  },

  // Thailand - Rice
  {
    id: 42,
    categoryId: "thailand",
    subCategoryId: "thailand-rice",
    description: "Cơm xào Thái Lan thơm ngon đặc biệt",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-2.png",
    name: "Cơm Xào Thái",
    price: 55000,
    variantGroups: [],
    features: ["hot", "spicy"],
    newMarked: true,
  },
  {
    id: 43,
    categoryId: "thailand",
    subCategoryId: "thailand-rice",
    description: "Cơm gà xối mỡ kiểu Thái",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-3.png",
    name: "Khao Man Gai",
    price: 58000,
    variantGroups: [],
    features: ["hot"],
  },

  // Thailand - Salad
  {
    id: 44,
    categoryId: "thailand",
    subCategoryId: "thailand-salad",
    description: "Gỏi đu đủ chua cay, tươi mát",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-4.png",
    name: "Som Tam",
    price: 45000,
    variantGroups: [],
    features: ["spicy", "vegetarian"],
  },
  {
    id: 45,
    categoryId: "thailand",
    subCategoryId: "thailand-salad",
    description: "Gỏi bò kiểu Thái cay nồng",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-5.png",
    name: "Yam Nuea",
    price: 68000,
    variantGroups: [],
    features: ["spicy"],
  },

  // Thailand - Grilled
  {
    id: 46,
    categoryId: "thailand",
    subCategoryId: "thailand-grilled",
    description: "Gà nướng kiểu Thái thơm lừng",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-1.png",
    name: "Gai Yang",
    price: 72000,
    variantGroups: [],
    features: ["hot"],
  },
  {
    id: 47,
    categoryId: "thailand",
    subCategoryId: "thailand-grilled",
    description: "Heo nướng kiểu Thái Lan",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-2.png",
    name: "Moo Yang",
    price: 75000,
    variantGroups: [],
    features: ["hot"],
  },

  // Thailand - Curry
  {
    id: 48,
    categoryId: "thailand",
    subCategoryId: "thailand-curry",
    description: "Cà ri đỏ Thái Lan cay nồng",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-3.png",
    name: "Red Curry",
    price: 78000,
    variantGroups: [],
    features: ["hot", "spicy"],
  },
  {
    id: 49,
    categoryId: "thailand",
    subCategoryId: "thailand-curry",
    description: "Cà ri xanh thơm ngon hấp dẫn",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-4.png",
    name: "Green Curry",
    price: 78000,
    variantGroups: [],
    features: ["hot", "spicy"],
  },

  // Thailand - Seafood
  {
    id: 50,
    categoryId: "thailand",
    subCategoryId: "thailand-seafood",
    description: "Cá hấp chanh cay kiểu Thái",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-5.png",
    name: "Pla Nueng Manao",
    price: 120000,
    variantGroups: [],
    features: ["hot", "spicy"],
  },
  {
    id: 51,
    categoryId: "thailand",
    subCategoryId: "thailand-seafood",
    description: "Tôm nướng sốt Thái đặc biệt",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-1.png",
    name: "Goong Pao",
    price: 110000,
    variantGroups: [],
    features: ["hot"],
  },

  // Thailand - Dessert
  {
    id: 52,
    categoryId: "thailand",
    subCategoryId: "thailand-dessert",
    description: "Xoài dầm nước cốt dừa",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-2.png",
    name: "Mango Sticky Rice",
    price: 45000,
    variantGroups: [],
    features: [],
  },
  {
    id: 53,
    categoryId: "thailand",
    subCategoryId: "thailand-dessert",
    description: "Chè chuối nước dừa Thái Lan",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-3.png",
    name: "Kluay Buat Chi",
    price: 35000,
    variantGroups: [],
    features: [],
  },

  // ========== JAPANESE CATEGORY ==========

  // Japanese - Sushi
  {
    id: 54,
    categoryId: "japanese",
    subCategoryId: "japanese-sushi",
    description: "Sushi cá hồi tươi ngon cao cấp",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-4.png",
    name: "Sushi Cá Hồi",
    price: 95000,
    variantGroups: [
      {
        id: "sushi-quantity",
        title: "Số lượng",
        description: "Chọn số lượng miếng",
        type: "SINGLE",
        isRequired: true,
        options: [
          { id: "quantity-4pcs", name: "4 miếng", extraPrice: 0 },
          { id: "quantity-8pcs", name: "8 miếng", extraPrice: 40000 },
          { id: "quantity-12pcs", name: "12 miếng", extraPrice: 80000 },
        ],
      },
    ],
    features: ["bestseller"],
  },
  {
    id: 55,
    categoryId: "japanese",
    subCategoryId: "japanese-sushi",
    description: "Sushi cá ngừ tươi sống",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-5.png",
    name: "Sushi Cá Ngừ",
    price: 105000,
    variantGroups: [],
    features: [],
  },
  {
    id: 56,
    categoryId: "japanese",
    subCategoryId: "japanese-sushi",
    description: "Sashimi tổng hợp cao cấp",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-1.png",
    name: "Sashimi Combo",
    price: 150000,
    variantGroups: [],
    features: ["bestseller"],
  },

  // Japanese - Ramen
  {
    id: 57,
    categoryId: "japanese",
    subCategoryId: "japanese-ramen",
    description: "Ramen Nhật Bản nước dùng đậm đà",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-2.png",
    name: "Ramen",
    price: 85000,
    variantGroups: [
      {
        id: "ramen-type",
        title: "Loại ramen",
        description: "Chọn loại",
        type: "SINGLE",
        isRequired: true,
        options: [
          { id: "ramen-shoyu", name: "Shoyu Ramen", extraPrice: 0 },
          { id: "ramen-miso", name: "Miso Ramen", extraPrice: 10000 },
          { id: "ramen-tonkotsu", name: "Tonkotsu Ramen", extraPrice: 15000 },
        ],
      },
    ],
    features: ["hot", "bestseller"],
  },
  {
    id: 58,
    categoryId: "japanese",
    subCategoryId: "japanese-ramen",
    description: "Ramen cay kiểu Nhật",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-3.png",
    name: "Spicy Ramen",
    price: 90000,
    variantGroups: [],
    features: ["hot", "spicy"],
  },

  // Japanese - Rice Bowl
  {
    id: 59,
    categoryId: "japanese",
    subCategoryId: "japanese-rice-bowl",
    description: "Cơm thịt nướng kiểu Nhật",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-4.png",
    name: "Teriyaki Don",
    price: 75000,
    variantGroups: [
      {
        id: "meat-type",
        title: "Loại thịt",
        description: "Chọn loại thịt",
        type: "SINGLE",
        isRequired: true,
        options: [
          { id: "meat-chicken", name: "Thịt gà", extraPrice: 0 },
          { id: "meat-beef", name: "Thịt bò", extraPrice: 20000 },
          { id: "meat-salmon", name: "Cá hồi", extraPrice: 25000 },
        ],
      },
    ],
    features: ["hot", "bestseller"],
  },
  {
    id: 60,
    categoryId: "japanese",
    subCategoryId: "japanese-rice-bowl",
    description: "Cơm trứng gà xối kiểu Nhật",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-5.png",
    name: "Oyako Don",
    price: 68000,
    variantGroups: [],
    features: ["hot"],
  },

  // Japanese - Tempura
  {
    id: 61,
    categoryId: "japanese",
    subCategoryId: "japanese-tempura",
    description: "Tempura rau củ và hải sản giòn rụm",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-1.png",
    name: "Tempura",
    price: 70000,
    variantGroups: [],
    features: ["hot"],
    sales: {
      discount: 10,
    },
  },
  {
    id: 62,
    categoryId: "japanese",
    subCategoryId: "japanese-tempura",
    description: "Tempura tôm Nhật Bản",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-2.png",
    name: "Ebi Tempura",
    price: 85000,
    variantGroups: [],
    features: ["hot"],
  },

  // Japanese - Grilled
  {
    id: 63,
    categoryId: "japanese",
    subCategoryId: "japanese-grilled",
    description: "Cá hồi nướng muối kiểu Nhật",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-3.png",
    name: "Sake Shioyaki",
    price: 95000,
    variantGroups: [],
    features: ["hot"],
  },
  {
    id: 64,
    categoryId: "japanese",
    subCategoryId: "japanese-grilled",
    description: "Lươn nướng sốt teriyaki",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-4.png",
    name: "Unagi Kabayaki",
    price: 120000,
    variantGroups: [],
    features: ["hot", "bestseller"],
  },

  // Japanese - Noodles
  {
    id: 65,
    categoryId: "japanese",
    subCategoryId: "japanese-noodles",
    description: "Mì Udon nước dùng thanh đạm",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-5.png",
    name: "Udon",
    price: 72000,
    variantGroups: [],
    features: ["hot"],
  },
  {
    id: 66,
    categoryId: "japanese",
    subCategoryId: "japanese-noodles",
    description: "Mì Soba lạnh kiểu Nhật",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-1.png",
    name: "Zaru Soba",
    price: 70000,
    variantGroups: [],
    features: ["ice"],
  },

  // Japanese - Dessert
  {
    id: 67,
    categoryId: "japanese",
    subCategoryId: "japanese-dessert",
    description: "Mochi kem Nhật Bản nhiều vị",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-2.png",
    name: "Mochi",
    price: 35000,
    variantGroups: [
      {
        id: "mochi-flavor",
        title: "Vị",
        description: "Chọn vị",
        type: "SINGLE",
        isRequired: true,
        options: [
          { id: "flavor-matcha", name: "Vị trà xanh", extraPrice: 0 },
          { id: "flavor-strawberry", name: "Vị dâu", extraPrice: 0 },
          { id: "flavor-chocolate", name: "Vị chocolate", extraPrice: 0 },
          { id: "flavor-mango", name: "Vị xoài", extraPrice: 0 },
        ],
      },
    ],
    features: ["ice"],
    newMarked: true,
  },
  {
    id: 68,
    categoryId: "japanese",
    subCategoryId: "japanese-dessert",
    description: "Bánh dorayaki nhân đậu đỏ truyền thống",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-3.png",
    name: "Dorayaki",
    price: 30000,
    variantGroups: [],
    features: [],
  },

  // Japanese - Drinks
  {
    id: 69,
    categoryId: "japanese",
    subCategoryId: "japanese-drinks",
    description: "Trà xanh Nhật Bản truyền thống",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-4.png",
    name: "Matcha",
    price: 48000,
    variantGroups: [],
    features: ["hot"],
  },
  {
    id: 70,
    categoryId: "japanese",
    subCategoryId: "japanese-drinks",
    description: "Trà sữa Hokkaido thơm béo",
    image:
      "https://h5.zadn.vn/static/zaui-templates/zaui-coffee-and-food/product-5.png",
    name: "Hokkaido Milk Tea",
    price: 52000,
    variantGroups: [],
    features: ["ice"],
  },
];
