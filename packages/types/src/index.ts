export interface GroomBride {
  name: string;
  /** Ví dụ: "Trưởng Nam" | "Thứ Nam" | "Trưởng Nữ" | "Thứ Nữ" */
  role: string;
  fatherName: string;
  motherName: string;
  address: string;
  qrImageUrl?: string;
  /** Portrait photo riêng (dùng cho theme có avatar tròn như Traditional Red) */
  photo?: string;
}

export interface WeddingEvent {
  type: 'ceremony' | 'reception' | 'other';
  label: string;
  /** Định dạng: "YYYY-MM-DD" */
  date: string;
  /** Định dạng: "HH:MM" */
  time: string;
  venue: string;
  address: string;
  mapEmbedUrl?: string;
}

export interface TimelineItem {
  /** Định dạng: "HH:MM" */
  time: string;
  title: string;
  description?: string;
}

export type ThemeName =
  | 'emerald-forest'
  | 'traditional-red'
  | 'champagne-gold'
  | 'sage-green'
  | 'blush-rose'
  | 'ink-minimal';

export interface WeddingConfig {
  /** Subdomain slug, ví dụ: "ngocanhvietduc" */
  slug: string;
  /** basic = gói 99k, personal = gói 149k (có tên khách mời) */
  plan: 'basic' | 'personal';
  /** Hiện banner "TRANG MẪU" khi true */
  isDemo?: boolean;

  groom: GroomBride;
  bride: GroomBride;

  events: WeddingEvent[];
  timeline: TimelineItem[];

  /** Cloudinary URL hoặc đường dẫn tĩnh */
  coverPhoto: string;
  /** Mảng URL ảnh gallery, tối đa 20 */
  galleryPhotos: string[];

  music?: {
    url: string;
    title: string;
    autoplay: boolean;
  };

  theme: ThemeName;

  closingText?: {
    vi: string;
    en: string;
  };
}
