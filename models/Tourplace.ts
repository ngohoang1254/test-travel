export interface ITourplaceDestination {
    id?:              number;
    name?:            string;
    slug?:            string;
    description?:     string;
    use_description?: boolean;
    featured_image?:  IFeaturedImageTourplaceDestination;
}

export interface IFeaturedImageTourplaceDestination {
    id?:                number;
    name?:              string;
    alternativeText?:   null | string;
    caption?:           null | string;
    width?:             number;
    height?:            number;
    formats?:           IFormatsTourplaceDestination;
    hash?:              string;
    ext?:               IEXTTourplaceDestination;
    mime?:              IMIMETourplaceDestination;
    size?:              number;
    url?:               string;
    previewUrl?:        null;
    provider?:          string;
    provider_metadata?: null;
    created_by?:        number;
    updated_by?:        number;
    created_at?:        Date;
    updated_at?:        Date;
}

export enum IEXTTourplaceDestination {
    JPEG = ".jpeg",
    Jpg = ".jpg",
}

export interface IFormatsTourplaceDestination {
    large?:     ILargeTourplaceDestination;
    small?:     ILargeTourplaceDestination;
    medium?:    ILargeTourplaceDestination;
    thumbnail?: ILargeTourplaceDestination;
}

export interface ILargeTourplaceDestination {
    ext?:    IEXTTourplaceDestination;
    url?:    string;
    hash?:   string;
    mime?:   IMIMETourplaceDestination;
    name?:   string;
    path?:   null;
    size?:   number;
    width?:  number;
    height?: number;
}

export enum IMIMETourplaceDestination {
    ImageJPEG = "image/jpeg",
}
