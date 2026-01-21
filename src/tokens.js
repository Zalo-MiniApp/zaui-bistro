// Deep merge utility function
function deepMerge(target, source) {
  const result = { ...target };

  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

const base = {
  fontSize: {
    fs000: "10px",
    fs100: "11px",
    fs200: "12px",
    fs300: "13px",
    fs400: "14px",
    fs500: "15px",
    fs600: "16px",
    fs800: "18px",
    fs1000: "20px",
    fs1400: "24px",
  },
  lineHeight: {
    lh000: "14px",
    lh100: "16px",
    lh200: "16px",
    lh300: "18px",
    lh400: "18px",
    lh500: "20px",
    lh600: "22px",
    lh800: "24px",
    lh1400: "30px",
    lh_full: "100%",
  },
  letterSpacing: {
    ls000: "0px",
    ls100: "0px",
    ls200: "0px",
    ls300: "0px",
    ls400: "0px",
    ls500: "0px",
    ls600: "0px",
    ls800: "0px",
    ls1400: "0px",
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    black: "900",
  },
  fontFamily: {
    system: "Roboto, sans-serif",
  },
  colors: {
    black: "#000000",
    white: "#FFFFFF",

    neutral100: "#EBEDEF",
    neutral300: "#909498",
    neutral900: "#0D0D0D",
    neutral500: "#EBEDEF",
    neutral400: "#F7F7F8",
    peach100: "#FFECE2",

    yellow100: "#FFF8E0",
    yellow200: "#FFC70033",
    yellow500: "#FAC000",
    yellow600: "#E0AC00",
    yellow700: "#B87A00",

    orange500: "#FA8B24",
    orange600: "#EF8F00",
    orange700: "#FFB661CC",

    red100: "#FFF0F0",
    red500: "#FF3333",
    red600: "#F50000",
    red700: "#DB0000",
    red800: "#FA4747",

    green100: "#ECF9F0",
    green500: "#32A458",

    blue100: "#F0F7FF",
    blue200: "#DBEBFF",
    blue500: "#0068FF",
    blue600: "#0045AD",

    gray500: "#8F8F8F",
    gray600: "#3F3A38",

    divider01: "#0000001A",
  },
  opacity: {
    opacity10: "0.1",
  },
  borderWidth: {
    divider01: "0.5px",
  },
  spacing: {
    18: "4.5rem",
    15: "3.75rem",
    66: "16.5rem",
  },
  height: {
    4.5: "18px",
  },
};

const semantic = {
  colors: {
    primary: "#A0673D",
    background: "#F7F7F7",
    text: {
      primary: base.colors.neutral900,
      secondary: "#767A7F",
      tertiary: "#6F7071",
      disabled: "#A9ADB2",
      title: base.colors.gray600,
    },
    border: {
      primary: "#E6E6E6",
    },
    icon: {
      tertiary: "#6F7071",
    },
    accent: base.colors.blue500,
    info: base.colors.blue600,
    warning: base.colors.yellow600,
    danger: base.colors.red700,
    components: {
      list: {
        title: base.colors.neutral900,
        subtitle: base.colors.neutral500,
      },
      badge: {
        error: {
          solid: {
            backgroundColor: base.colors.red500,
            textOnBackground: base.colors.white,
          },
          outline: {
            backgroundColor: base.colors.red100,
            textOnBackground: base.colors.red500,
          },
        },
        shipping: {
          backgroundColor: base.colors.orange500,
          textOnBackground: base.colors.white,
        },
        new: {
          backgroundColor: base.colors.red800,
          textOnBackground: base.colors.white,
        },
        discount: {
          backgroundColor: base.colors.red800,
          textOnBackground: base.colors.white,
        },
      },
      sub_cate: {
        border: "#FFB661CC",
      },
      chip: {
        backgroundColor: base.colors.white,
        textOnBackground: base.colors.neutral500,
        border: base.colors.orange700,
        selected: {
          backgroundColor: base.colors.neutral100,
          textOnBackground: base.colors.neutral900,
        },
        feature: {
          unselected: {
            backgroundColor: base.colors.yellow200,
            textOnBackground: base.colors.gray500,
          },
          selected: {
            backgroundColor: base.colors.yellow100,
            textOnBackground: base.colors.orange600,
          },
        },
      },
    },
  },
  backgroundImage: {
    "peach-fade": `linear-gradient(
                    180deg,
                    rgba(255,195,165,0.5) 0%,
                    rgba(255,195,165,0) 100%
                  )
`,
  },
  text: {
    common: {
      freeShipping: "Miễn phí giao hàng",
      new: "Mới",
      discount: "Giảm",
      promotion: "Ưu đãi",
      currency: "đ",
      addToCart: "Thêm vào giỏ",
      updateCart: "Cập nhật giỏ hàng",
      order: "Đặt hàng",
      backToHome: "Về trang chủ",
      viewOrder: "Xem đơn hàng",
      cancel: "Hủy",
      confirm: "Xác nhận",
      close: "Đóng",
      edit: "Chỉnh sửa",
      delete: "Xóa",
      search: "Tìm kiếm",
      filter: "Lọc",
      sort: "Sắp xếp",
      all: "Tất cả",
      empty: "Trống",
      loading: "Đang tải...",
      error: "Đã có lỗi xảy ra",
      success: "Thành công",
      networkError: "Vui lòng kiểm tra kết nối mạng",
      addMore: "Thêm nhiều hơn",
      total: "Tổng cộng",
      totalItems: "Tổng mục",
      shippingFee: "Phí giao hàng",
      discountLabel: "Giảm giá",
      paymentSummary: "Tổng hợp thanh toán",
      orderSummary: "Tóm tắt đơn hàng",
      viewDetails: "Chi tiết",
      defaultOption: "Mặc định",
      pickupCode: "Mã lấy hàng",
      resultCountSuffix: "kết quả",
      countOverflow: "99+",
      items: "sản phẩm",
      percentSuffix: "%",
      listSeparator: ", ",
      quantityPrefix: "x",
      buyNow: "Mua ngay",
      notAvailable: "Không khả dụng",
    },
    brand: {
      name: "La Viet Cafe & Dining",
    },
    nav: {
      home: "Trang chủ",
      menu: "Menu",
      order: "Đơn hàng",
      profile: "Cá nhân",
    },
    header: {
      profile: "Cá nhân",
      delivery: "Giao hàng",
      selectLocation: "Chọn địa điểm",
      confirmation: "Xác nhận",
      productOptions: "Chọn chi tiết",
    },
    home: {
      suggestions: "Gợi ý cho bạn",
    },
    cart: {
      title: "Giỏ hàng",
      empty: "Giỏ hàng trống",
      emptyHint: "Hãy thêm sản phẩm yêu thích vào giỏ hàng nhé!",
      total: "Tổng cộng",
      checkout: "Thanh toán",
      continue: "Tiếp tục mua sắm",
    },
    checkout: {
      title: "Thanh toán",
      deliveryInfo: "Thông tin giao hàng",
      paymentMethod: "Phương thức thanh toán",
      orderSummary: "Tóm tắt đơn hàng",
      subtotal: "Tạm tính",
      shippingFee: "Phí vận chuyển",
      discount: "Giảm giá",
      total: "Tổng cộng",
      placeOrder: "Đặt hàng",
      cash: "Tiền mặt",
      card: "Thẻ",
      phoneNumber: "Số điện thoại",
      address: "Địa chỉ",
      note: "Ghi chú",
      processing: "Đang xử lý...",
      delivery: "Giao hàng",
      pickup: "Tự đến lấy",
      pickupLocation: "Địa điểm lấy hàng",
      pickupTime: "Thời gian lấy hàng",
      deliveryTime: "Thời gian nhận hàng",
      chooseStore: "Chọn cửa hàng",
      cartTitle: "Giỏ hàng của tôi",
      addressPlaceholder: "Nhập thông tin địa chỉ cụ thể",
      scheduleSample: "Hôm nay 14h00 - 14h30, 20/02/2023",
      paymentMethodCash: "Tiền mặt",
      paymentMethodCard: "Thẻ tín dụng",
      paymentMethodZaloPay: "ZaloPay",
      paymentMethodMomo: "MoMo",
      locationHint: "Địa điểm lấy hàng",
      sampleRecipient: "Bình Nguyễn - 09***828",
      sampleLocation: "KDC Jamona - Art Gallery",
      samplePhoneNumber: "0901234567",
      sampleCity: "TP. Hồ Chí Minh",
      createOrderError: "Lỗi tạo đơn hàng",
    },
    order: {
      title: "Đơn hàng",
      status: {
        pending: "Chờ xác nhận",
        confirmed: "Đã xác nhận",
        preparing: "Đang chuẩn bị",
        ready: "Sẵn sàng",
        completed: "Hoàn thành",
        cancelled: "Đã hủy",
      },
      empty: "Chưa có đơn hàng",
      detail: "Chi tiết đơn hàng",
      reorder: "Đặt lại",
      cancelOrder: "Hủy đơn",
      confirmPickup: "Xác nhận đã lấy",
      loading: "Đang tải đơn hàng...",
      emptyHint: "Khi có đơn hàng, nó sẽ xuất hiện ở đây",
      ongoing: "Đang diễn ra",
      completedTab: "Hoàn thành",
    },
    product: {
      detail: "Chi tiết sản phẩm",
      description: "Mô tả",
      price: "Giá",
      quantity: "Số lượng",
      size: "Size",
      options: "Tùy chọn",
      required: "Bắt buộc",
      optional: "Tùy chọn",
      note: "Ghi chú",
      notePlaceholder: "Thêm ghi chú cho món này",
      notFound: "Không tìm thấy sản phẩm",
      loading: "Đang tải...",
    },
    profile: {
      title: "Tài khoản",
      personalInfo: "Thông tin cá nhân",
      orders: "Đơn hàng của tôi",
      addresses: "Địa chỉ",
      paymentMethods: "Phương thức thanh toán",
      settings: "Cài đặt",
      logout: "Đăng xuất",
      personalProfile: "Hồ sơ cá nhân",
      vouchers: "Phiếu giảm giá",
      supportCenter: "Trung tâm trợ giúp",
      avatarAlt: "Ảnh đại diện của khách hàng",
      sampleName: "Bình Nguyễn",
      featureDeveloping: "Chức năng dành cho các bên tích hợp phát triển...",
    },
    search: {
      placeholder: "Tìm kiếm",
      locationPlaceholder: "Tìm kiếm địa điểm",
      noResults: "Không tìm thấy sản phẩm nào",
      resultCount: "Tìm thấy {count} sản phẩm",
    },
    selectLocation: {
      nearestTitle: "Vị trí gần bạn nhất",
      notFound: "Không tìm thấy địa điểm",
    },
    orderDetail: {
      title: "Chi tiết đơn hàng",
      thankYou: "Rất cảm ơn quý khách đã đặt hàng",
      id: "ID đơn hàng",
      date: "Ngày đặt hàng",
      paymentMethod: "Phương thức thanh toán",
      status: "Trạng thái",
      pickupLocation: "Địa điểm lấy hàng",
      deliveryAddress: "Địa chỉ giao hàng",
      items: "Chi tiết đơn hàng",
      loading: "Đang tải chi tiết đơn hàng...",
      notFound: "Không tìm thấy đơn hàng",
      backToOrders: "Quay lại danh sách đơn hàng",
    },
    orderSuccess: {
      title: "Thanh toán thành công",
      description:
        "Đơn hàng của bạn đã được thanh toán thành công. Đơn hàng của bạn sẽ được xử lý trong thời gian sớm nhất.",
    },
  },
  fontSize: {
    header_title: [
      base.fontSize.fs1000,
      {
        lineHeight: "26px",
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.medium,
        fontFamily: base.fontFamily.system,
      },
    ],
    "variant-title": [
      base.fontSize.fs800,
      {
        lineHeight: "24px",
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.semibold,
        fontFamily: base.fontFamily.system,
      },
    ],
    xxxxsmall: [
      base.fontSize.fs000,
      {
        lineHeight: base.lineHeight.lh000,
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.regular,
        fontFamily: base.fontFamily.system,
      },
    ],
    "xxxxsmall-m": [
      base.fontSize.fs000,
      {
        lineHeight: base.lineHeight.lh000,
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.medium,
        fontFamily: base.fontFamily.system,
      },
    ],
    xxxsmall: [
      base.fontSize.fs100,
      {
        lineHeight: base.lineHeight.lh_full,
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.regular,
        fontFamily: base.fontFamily.system,
      },
    ],
    "xxxsmall-m": [
      base.fontSize.fs100,
      {
        lineHeight: base.lineHeight.lh100,
        letterSpacing: base.letterSpacing.ls100,
        fontWeight: base.fontWeight.medium,
        fontFamily: base.fontFamily.system,
      },
    ],
    "xxxsmall-bl": [
      base.fontSize.fs100,
      {
        lineHeight: base.lineHeight.lh_full,
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.black,
        fontFamily: base.fontFamily.system,
      },
    ],
    xxsmall: [
      base.fontSize.fs200,
      {
        lineHeight: base.lineHeight.lh_full,
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.regular,
        fontFamily: base.fontFamily.system,
      },
    ],
    "xxsmall-m": [
      base.fontSize.fs200,
      {
        lineHeight: base.lineHeight.lh_full,
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.medium,
        fontFamily: base.fontFamily.system,
      },
    ],
    xsmall: [
      base.fontSize.fs300,
      {
        lineHeight: base.lineHeight.lh300,
        letterSpacing: base.letterSpacing.ls300,
        fontWeight: base.fontWeight.regular,
        fontFamily: base.fontFamily.system,
      },
    ],
    small: [
      base.fontSize.fs400,
      {
        lineHeight: base.lineHeight.lh_full,
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.regular,
        fontFamily: base.fontFamily.system,
      },
    ],
    "small-m": [
      base.fontSize.fs400,
      {
        lineHeight: base.lineHeight.lh_full,
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.medium,
        fontFamily: base.fontFamily.system,
      },
    ],
    normal: [
      base.fontSize.fs500,
      {
        lineHeight: base.lineHeight.lh500,
        letterSpacing: base.letterSpacing.ls500,
        fontWeight: base.fontWeight.regular,
        fontFamily: base.fontFamily.system,
      },
    ],
    "normal-sb": [
      base.fontSize.fs500,
      {
        lineHeight: base.lineHeight.lh500,
        letterSpacing: base.letterSpacing.ls500,
        fontWeight: base.fontWeight.semibold,
        fontFamily: base.fontFamily.system,
      },
    ],
    "h-normal": [
      base.fontSize.fs800,
      {
        lineHeight: base.lineHeight.lh800,
        letterSpacing: base.letterSpacing.ls800,
        fontWeight: base.fontWeight.medium,
        fontFamily: base.fontFamily.system,
      },
    ],
    "normal-m": [
      base.fontSize.fs500,
      {
        lineHeight: base.lineHeight.lh500,
        letterSpacing: base.letterSpacing.ls500,
        fontWeight: base.fontWeight.medium,
        fontFamily: base.fontFamily.system,
      },
    ],
    large: [
      base.fontSize.fs600,
      {
        lineHeight: base.lineHeight.lh600,
        letterSpacing: base.letterSpacing.ls600,
        fontWeight: base.fontWeight.regular,
        fontFamily: base.fontFamily.system,
      },
    ],
    "large-m": [
      base.fontSize.fs600,
      {
        lineHeight: base.lineHeight.lh600,
        letterSpacing: base.letterSpacing.ls600,
        fontWeight: base.fontWeight.medium,
        fontFamily: base.fontFamily.system,
      },
    ],
    "large-sb": [
      base.fontSize.fs600,
      {
        lineHeight: base.lineHeight.lh_full,
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.semibold,
        fontFamily: base.fontFamily.system,
      },
    ],
    xlarge: [
      base.fontSize.fs800,
      {
        lineHeight: base.lineHeight.lh800,
        letterSpacing: base.letterSpacing.ls800,
        fontWeight: base.fontWeight.medium,
        fontFamily: base.fontFamily.system,
      },
    ],
    "xlarge-m": [
      base.fontSize.fs800,
      {
        lineHeight: base.lineHeight.lh_full,
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.medium,
        fontFamily: base.fontFamily.system,
      },
    ],
    "xlarge-sb": [
      base.fontSize.fs800,
      {
        lineHeight: base.lineHeight.lh_full,
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.semibold,
        fontFamily: base.fontFamily.system,
      },
    ],
    xxlarge: [
      base.fontSize.fs1400,
      {
        lineHeight: base.lineHeight.lh1400,
        letterSpacing: base.letterSpacing.ls1400,
        fontWeight: base.fontWeight.medium,
        fontFamily: base.fontFamily.system,
      },
    ],
    "xxlarge-m": [
      base.fontSize.fs1400,
      {
        lineHeight: base.lineHeight.lh1400,
        letterSpacing: base.letterSpacing.ls1400,
        fontWeight: base.fontWeight.medium,
        fontFamily: base.fontFamily.system,
      },
    ],
  },
  borderColor: {
    "divider/default": base.colors.divider01,
  },
  borderWidth: {
    "divider/default": base.borderWidth.divider01,
  },
  divide: {
    "divider/default": base.colors.divider01,
  },
  backgroundColor: {
    subtle: base.colors.black,
    elevation: {
      "01": "#F7F7F8",
      "02": base.colors.white,
    },
  },
  rounded: {
    corner08: "8px",
  },
};

// Generic merge - no overwriting, deep merge all nested objects
const themeTokens = deepMerge(base, semantic);

export default themeTokens;
export { base, semantic };
