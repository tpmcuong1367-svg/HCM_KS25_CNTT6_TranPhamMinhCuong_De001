let currentBookingCode = "";
let isBookingValid = false;
let totalRevenue = 0;
let totalBookings = 0;

function formatMoney(n) {
  return n.toLocaleString("vi-VN") + " VNĐ";
}

function case1() {
  currentBookingCode = "";
  isBookingValid = false;

  let input = prompt("Nhập mã đặt vé:");
  if (input === null) {
    console.log("Chưa nhập mã đặt vé");
    return;
  }
  let code = input.trim().toUpperCase();
  if (code === "") {
    console.log("Chưa nhập mã đặt vé");
  } else if (code.length < 6) {
    console.log("Lỗi: mã đặt vé phải có tối thiểu 6 ký tự!");
  } else if (code.slice(0, 4) !== "CIN-") {
    console.log("Lỗi: mã đặt vé phải bắt đầu bằng 'CIN-'!");
  } else if (code.includes(" ")) {
    console.log("Lỗi: mã đặt vé không được chứa khoảng trắng ở giữa!");
  } else {
    currentBookingCode = code;
    isBookingValid = true;
    console.log("Mã đặt vé hợp lệ: " + code);
  }
}

function case2() {
  if (!isBookingValid) {
    console.log("Vui lòng chọn chức năng 1 để nhập mã đặt vé hợp lệ trước!");
    return;
  }

  let ticketCount;
  let pricePerTicket;

  while (true) {
    let input = prompt("Số lượng vé xem phim:");
    if (input === null) {
      console.log("Đã hủy giao dịch.");
      return;
    }
    let s = input.trim();
    ticketCount = Number(s);
    if (s !== "" && Number.isInteger(ticketCount) && ticketCount > 0) {
      break;
    }
    console.log("Lỗi: số vé phải là số nguyên lớn hơn 0, nhập lại!");
  }

  while (true) {
    let input = prompt("Giá mỗi vé (VNĐ):");
    if (input === null) {
      console.log("Đã hủy giao dịch.");
      return;
    }
    let s = input.trim();
    pricePerTicket = Number(s);
    if (s !== "" && Number.isInteger(pricePerTicket) && pricePerTicket > 0) {
      break;
    }
    console.log("Lỗi: giá vé phải là số nguyên lớn hơn 0, nhập lại!");
  }

  let baseCost = ticketCount * pricePerTicket;
  let discount = 0;
  if (ticketCount >= 4) {
    discount = Math.round(baseCost * 0.1);
  }
  let serviceFee = Math.round((baseCost - discount) * 0.08);
  let total = baseCost - discount + serviceFee;

  console.log("============= HÓA ĐƠN TIỀN VÉ =============");
  console.log("Mã đặt vé          : " + currentBookingCode);
  console.log("Số vé              : " + ticketCount);
  console.log("Giá mỗi vé         : " + formatMoney(pricePerTicket));
  console.log("Chi phí cơ sở      : " + formatMoney(baseCost));
  console.log("Tiền giảm giá      : " + formatMoney(discount));
  console.log("Phí dịch vụ đặt vé : " + formatMoney(serviceFee));
  console.log("Tổng thanh toán    : " + formatMoney(total));
  console.log("===========================================");

  totalRevenue += total;
  totalBookings++;
  currentBookingCode = "";
  isBookingValid = false;
}

function case3() {
  let input = prompt("Nhập số seri vé xem phim:");
  if (input === null) {
    console.log("Số seri in trên vé xem phim chưa hợp lệ!");
    return;
  }
  let code = input.trim();
  if (code.length < 2) {
    console.log("Lỗi: số seri phải có từ 2 chữ số trở lên!");
    return;
  }

  let reverse = "";
  let digitSum = 0;
  let allZero = true;
  for (let i = 0; i < code.length; i++) {
    let ch = code[i];
    if (ch < "0" || ch > "9") {
      console.log("Lỗi: số seri chỉ được gồm các ký tự từ 0 đến 9!");
      return;
    }
    if (ch !== "0") {
      allZero = false;
    }
    digitSum += Number(ch);
    reverse = ch + reverse;
  }
  if (allZero) {
    console.log("Lỗi: số seri không được toàn chữ số 0!");
    return;
  }

  let isSymmetric = reverse === code;
  let divisibleBy9 = digitSum % 9 === 0;

  let prize = "";
  if (isSymmetric && divisibleBy9) {
    prize =
      "Giải Đặc biệt - Thẻ xem phim miễn phí 10 lượt trị giá " +
      formatMoney(1000000);
  } else if (isSymmetric) {
    prize = "Giải Nhất - Combo bắp nước đôi trị giá " + formatMoney(150000);
  } else if (divisibleBy9) {
    prize =
      "Giải Nhì - Voucher giảm " +
      formatMoney(30000) +
      " cho lần đặt vé kế tiếp";
  } else {
    prize = "Không trúng thưởng";
  }

  console.log("Số seri gốc        : " + code);
  console.log("Số seri đảo ngược  : " + reverse);
  console.log("Tổng chữ số        : " + digitSum);
  console.log("Chia hết cho 9     : " + (divisibleBy9 ? "Có" : "Không"));
  console.log("Giải thưởng        : " + prize);
}

let choice = "";
do {
  console.log("====================================================");
  console.log("       HỆ THỐNG BÁN VÉ RẠP MOONLIGHT CINEMA");
  console.log("====================================================");
  console.log("1. Nhập và kiểm chuẩn mã đặt vé");
  console.log("2. Tính tiền vé xem phim");
  console.log("3. Thẩm định số seri vé may mắn");
  console.log("0. Thoát chương trình");
  console.log("====================================================");

  let input = prompt("Vui lòng nhập lựa chọn của bạn (0 - 3):");
  if (input === null) {
    choice = "";
  } else {
    choice = input.trim();
  }

  switch (choice) {
    case "1":
      case1();
      break;
    case "2":
      case2();
      break;
    case "3":
      case3();
      break;
    case "0":
      console.log("Cảm ơn bạn đã sử dụng hệ thống. Tạm biệt!");
    default:
      console.log("Lựa chọn không hợp lệ, vui lòng chọn từ 0 đến 3!");
      break;
  }
} while (choice !== "0");
