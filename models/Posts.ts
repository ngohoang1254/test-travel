export interface IPosts {
    id?:                     number;
    title?:                  string;
    category?:               Category;
    views?:                  number;
    sapo?:                   string;
    nation?:                 null;
    national_destination?:   null;
    is_home_page?:           boolean;
    rating?:                 string;
    public_time?:            null;
    status?:                 string;
    sub_category_v2?:        Category;
    created_by?:             AtedBy;
    updated_by?:             AtedBy;
    created_at?:             Date;
    updated_at?:             Date;
    slug?:                   string;
    related_post?:           boolean;
    for_you?:                boolean;
    is_comment?:             boolean;
    is_rating?:              boolean;
    qrcode?:                 boolean;
    tour_place_v2?:          TourPlaceV2;
    name_alias?:             string;
    multi_language_content?: MultiLanguageContent[];
    main_info?:              MainInfo;
    ticket?:                 Map;
    enjoy_relax?:            EnjoyRelax;
    map?:                    Map;
    menu?:                   Menu;
    free_attraction?:        FreeAttraction;
    best_yummy?:             BestYummy;
    must_try?:               MustTry;
    upcoming?:               Upcoming;
    thumbnail?:              Thumbnail;
    tags_v2?:                Category[];
    related_posts?:          Post[];
    for_you_posts?:          Post[];
    error?:  string;
    message?: string;
    statusCode?: number
}

export interface BestYummy {
    id?:            number;
    enabled?:       boolean;
    yummy_content?: YummyContent[];
}

export interface YummyContent {
    id?:              number;
    title?:           string;
    thumbnail_image?: Thumbnail;
}

export interface Thumbnail {
    id?:                number;
    name?:              string;
    alternativeText?:   null | string;
    caption?:           null | string;
    width?:             number;
    height?:            number;
    formats?:           Formats;
    hash?:              string;
    ext?:               EXT;
    mime?:              MIME;
    size?:              number;
    url?:               string;
    previewUrl?:        null;
    provider?:          Provider;
    provider_metadata?: null;
    created_by?:        number;
    updated_by?:        number;
    created_at?:        Date;
    updated_at?:        Date;
}

export enum EXT {
    JPEG = ".jpeg",
    Jpg = ".jpg",
    PNG = ".png",
}

export interface Formats {
    small?:     Large;
    medium?:    Large;
    thumbnail?: Large;
    large?:     Large;
}

export interface Large {
    ext?:    EXT;
    url?:    string;
    hash?:   string;
    mime?:   MIME;
    name?:   string;
    path?:   null;
    size?:   number;
    width?:  number;
    height?: number;
}

export enum MIME {
    ImageJPEG = "image/jpeg",
    ImagePNG = "image/png",
}

export enum Provider {
    AwsS3Date = "aws-s3-date",
}

export interface Category {
    id?:             number;
    name?:           string;
    slug?:           string;
    description?:    null | string;
    index?:          number;
    name_alias?:     string;
    published_at?:   Date;
    created_by?:     number | null;
    updated_by?:     number | null;
    created_at?:     Date;
    updated_at?:     Date;
    featured_image?: null;
    category_v2?:    number;
}

export interface AtedBy {
    id?:                 number;
    firstname?:          string;
    lastname?:           string;
    username?:           null | string;
    email?:              string;
    password?:           string;
    resetPasswordToken?: null | string;
    registrationToken?:  null;
    isActive?:           boolean;
    blocked?:            null;
    preferedLanguage?:   null;
}

export interface EnjoyRelax {
    id?:            number;
    enabled?:       boolean;
    enjoy_content?: EnjoyContent[];
}

export interface EnjoyContent {
    id?:    number;
    title?: string;
    url?:   string;
}

export interface Post {
    id?:        number;
    title?:     string;
    slug?:      string;
    thumbnail?: Thumbnail;
}

export interface FreeAttraction {
    id?:                 number;
    enabled?:            boolean;
    attraction_content?: YummyContent[];
}

export interface MainInfo {
    id?:          number;
    enabled?:     boolean;
    description?: string;
    address?:     string;
    start_time?:  Date;
    hotline?:     string;
    end_time?:    Date;
    text_time?: string
}

export interface Map {
    id?:              number;
    enabled?:         boolean;
    description?:     string;
    url?:             string;
    thumbnail_image?: Thumbnail;
}

export interface Menu {
    id?:           number;
    enabled?:      boolean;
    full_menu?:    string;
    slide_images?: Thumbnail[];
}

export interface MultiLanguageContent {
    id?:       number;
    title?:    string;
    language?: string;
    content?:  string;
    slug?:     null;
}

export interface MustTry {
    id?:              number;
    enabled?:         boolean;
    title?:           string;
    description?:     string;
    slide_must_try?:  YummyContent[];
    thumbnail_image?: Thumbnail;
}

export interface TourPlaceV2 {
    id?:              number;
    name?:            string;
    slug?:            string;
    description?:     string;
    use_description?: boolean;
    is_homepage?:     boolean;
    created_by?:      number;
    updated_by?:      number;
    created_at?:      Date;
    updated_at?:      Date;
    category_info?:   CategoryInfo[];
    slide_image?:     SlideImage[];
    featured_image?:  Thumbnail;
}

export interface CategoryInfo {
    id?:               number;
    sub_category?:     Category;
    category?:         Category;
    description?:      string;
    main_post?:        MainPost;
    use_list_post?:    boolean;
    post_description?: string;
    featured_image?:   Thumbnail;
}

export interface MainPost {
    id?:                   number;
    title?:                string;
    category?:             number;
    views?:                number;
    sapo?:                 string;
    nation?:               null;
    national_destination?: null;
    is_home_page?:         boolean;
    rating?:               string;
    public_time?:          null;
    status?:               string;
    sub_category_v2?:      number;
    created_by?:           number;
    updated_by?:           number | null;
    created_at?:           Date;
    updated_at?:           Date;
    slug?:                 string;
    related_post?:         boolean;
    for_you?:              boolean;
    is_comment?:           boolean;
    is_rating?:            boolean;
    qrcode?:               boolean;
    tour_place_v2?:        number;
    name_alias?:           string;
    thumbnail?:            Thumbnail;
}

export interface SlideImage {
    id?:         number;
    image_name?: string;
    image?:      Thumbnail;
}

export interface Upcoming {
    id?:            number;
    enabled?:       boolean;
    upcoming_item?: UpcomingItem[];
}

export interface UpcomingItem {
    id?:              number;
    start_date?:      Date;
    end_date?:        Date;
    title?:           string;
    description?:     string;
    thumbnail_image?: Thumbnail[];
}
