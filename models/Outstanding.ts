export interface IOutStanding {
    id?:             number;
    name?:           string;
    slug?:           string;
    slide_image?:    ISlideImageOutstanding[];
    featured_image?: IImageOutstanding;
}

export interface IImageOutstanding {
    id?:                number;
    name?:              string;
    alternativeText?:   null | string;
    caption?:           null | string;
    width?:             number;
    height?:            number;
    formats?:           IFormatsOutstanding;
    hash?:              string;
    ext?:               IEXTOutstanding;
    mime?:              IMIMEOutstanding;
    size?:              number;
    url?:               string;
    previewUrl?:        null;
    provider?:          IProviderOutstanding;
    provider_metadata?: null;
    created_by?:        number;
    updated_by?:        number;
    created_at?:        Date;
    updated_at?:        Date;
}

export enum IEXTOutstanding {
    JPEG = ".jpeg",
    Jpg = ".jpg",
}

export interface IFormatsOutstanding {
    large?:     ILargeOutstanding;
    small?:     ILargeOutstanding;
    medium?:    ILargeOutstanding;
    thumbnail?: ILargeOutstanding;
}

export interface ILargeOutstanding {
    ext?:    IEXTOutstanding;
    url?:    string;
    hash?:   string;
    mime?:   IMIMEOutstanding;
    name?:   string;
    path?:   null;
    size?:   number;
    width?:  number;
    height?: number;
}

export enum IMIMEOutstanding {
    ImageJPEG = "image/jpeg",
}

export enum IProviderOutstanding {
    AwsS3Date = "aws-s3-date",
}

export interface ISlideImageOutstanding {
    id?:         number;
    image_name?: string;
    image?:      IImageOutstanding;
}
