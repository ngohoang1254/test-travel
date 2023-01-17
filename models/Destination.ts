export interface DestinationType {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  use_description?: boolean;
  is_homepage?: boolean;
  created_at?: Date;
  updated_at?: Date;
  category_info?: CategoryInfo[];
  slide_image?: SlideImage[];
  featured_image?: Image;
  children?: JSX.Element | JSX.Element[];
}

export interface CategoryInfo {
  id?: number;
  sub_category?: Category;
  category?: Category;
  description?: string;
  main_post?: MainPost;
  use_list_post?: boolean;
  post_description?: string;
  featured_image?: FeaturedImage;
  relatedPosts?: any[];
  children?: JSX.Element | JSX.Element[];
}

export interface Category {
  id?: number;
  name?: string;
  slug?: string;
  description?: null;
  index?: number;
  name_alias?: string;
  published_at?: Date;
  created_by?: number;
  updated_by?: number;
  created_at?: Date;
  updated_at?: Date;
  featured_image?: null;
  category_v2?: number;
  children?: JSX.Element | JSX.Element[];
}

export interface FeaturedImage {
  id?: number;
  name?: string;
  alternativeText?: null;
  caption?: null;
  width?: number;
  height?: number;
  formats?: PurpleFormats;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url?: string;
  previewUrl?: null;
  provider?: string;
  provider_metadata?: null;
  created_by?: number;
  updated_by?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface PurpleFormats {
  small?: Small;
  medium?: Small;
  thumbnail?: Small;
}

export interface Small {
  ext?: string;
  url?: string;
  hash?: string;
  mime?: string;
  name?: string;
  path?: null;
  size?: number;
  width?: number;
  height?: number;
}

export interface Image {
  id?: number;
  name?: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: ImageFormats;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url?: string;
  previewUrl?: null;
  provider?: string;
  provider_metadata?: null;
  created_by?: number;
  updated_by?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ImageFormats {
  small?: Small;
  thumbnail?: Small;
}

export interface SlideImage {
  id?: number;
  image_name?: string;
  image?: Image;
}

export interface MainPost {
  id?: number;
  title?: string;
  category?: number;
  views?: number;
  sapo?: string;
  nation?: null;
  national_destination?: null;
  is_home_page?: boolean;
  rating?: string;
  public_time?: null;
  status?: string;
  sub_category_v2?: number;
  created_by?: number;
  updated_by?: null;
  created_at?: Date;
  updated_at?: Date;
  slug?: string;
  related_post?: boolean;
  for_you?: boolean;
  is_comment?: boolean;
  is_rating?: boolean;
  qrcode?: boolean;
  tour_place_v2?: number;
  name_alias?: string;
  thumbnail?: Thumbnail;
}

export interface Thumbnail {
  id?: number;
  name?: string;
  alternativeText?: null;
  caption?: null;
  width?: number;
  height?: number;
  formats?: Formats;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url?: string;
  previewUrl?: null;
  provider?: string;
  provider_metadata?: null;
  created_by?: number;
  updated_by?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Formats {
  small?: Medium;
  medium?: Medium;
  thumbnail?: Medium;
}

export interface Medium {
  ext?: string;
  url?: string;
  hash?: string;
  mime?: string;
  name?: string;
  path?: null;
  size?: number;
  width?: number;
  height?: number;
}

export interface RelatedPosts {
  id?: number;
  title?: string;
  slug?: string;
  thumbnail?: ThumbnailRelatedPosts;
  sapo?: string;
}

export interface ThumbnailRelatedPosts {
  id?: number;
  name?: string;
  alternativeText?: null;
  caption?: null;
  width?: number;
  height?: number;
  formats?: FormatsRelatedPosts;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url?: string;
  previewUrl?: null;
  provider?: string;
  provider_metadata?: null;
  created_at?: Date;
  updated_at?: Date;
}

export interface FormatsRelatedPosts {
  small?: MediumRelatedPosts;
  medium?: MediumRelatedPosts;
  thumbnail?: MediumRelatedPosts;
}

export interface MediumRelatedPosts {
  ext?: string;
  url?: string;
  hash?: string;
  mime?: string;
  name?: string;
  path?: null;
  size?: number;
  width?: number;
  height?: number;
}
