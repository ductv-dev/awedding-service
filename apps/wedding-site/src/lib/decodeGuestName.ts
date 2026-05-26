// Bảng map tên không dấu → có dấu (họ và tên phổ biến tiếng Việt)
const ACCENT_MAP: Record<string, string> = {
  // Họ
  Nguyen: 'Nguyễn', Tran: 'Trần', Le: 'Lê', Pham: 'Phạm',
  Hoang: 'Hoàng', Huynh: 'Huỳnh', Vo: 'Võ', Vu: 'Vũ',
  Dang: 'Đặng', Bui: 'Bùi', Do: 'Đỗ', Ho: 'Hồ',
  Ngo: 'Ngô', Duong: 'Dương', Ly: 'Lý', Dinh: 'Đinh',
  // Tên
  Duc: 'Đức', Viet: 'Việt', Anh: 'Anh', Minh: 'Minh',
  Linh: 'Linh', Lan: 'Lan', Thu: 'Thu', Hoa: 'Hoa',
  Huong: 'Hương', Tuyen: 'Tuyên', Trang: 'Trang',
  Ngoc: 'Ngọc', Mai: 'Mai', Hieu: 'Hiếu', Hung: 'Hùng',
  Nam: 'Nam', Bao: 'Bảo', Thanh: 'Thanh', Thao: 'Thảo',
  Khanh: 'Khánh', Hanh: 'Hạnh', Quyen: 'Quyên',
  Phuong: 'Phương', Dung: 'Dung', Hien: 'Hiền',
  Thuy: 'Thủy', Yen: 'Yên', My: 'Mỹ', Van: 'Văn',
  Thi: 'Thị', An: 'An', Long: 'Long', Hao: 'Hào',
  Phuc: 'Phúc', Tai: 'Tài', Loc: 'Lộc', Dat: 'Đạt',
  Cuong: 'Cường', Tuan: 'Tuấn', Son: 'Sơn', Hai: 'Hải',
  Khoa: 'Khoa', Nhan: 'Nhân', Bich: 'Bích', Tuoi: 'Tươi',
  Nhu: 'Như', Xuan: 'Xuân', Ha: 'Hà', Ly2: 'Lý',
};

/**
 * Decode tên khách mời từ URL param.
 * "Viet-Duc" → "Việt Đức"
 * "Nguyen-Thi-Ngoc-Anh" → "Nguyễn Thị Ngọc Anh"
 */
export function decodeGuestName(raw: string): string {
  const parts = raw.split('-').map(p => p.trim()).filter(Boolean);
  return parts
    .map(part => {
      const capitalized = part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      return ACCENT_MAP[capitalized] ?? capitalized;
    })
    .join(' ');
}
