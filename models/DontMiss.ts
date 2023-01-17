export interface IDontMiss {
    id?:        number;
    title?:     string;
    slug?:      string;
    thumbnail?: IThumbnailDontMiss;
}

export interface IThumbnailDontMiss {
    id?:                number;
    name?:              string;
    alternativeText?:   null | string;
    caption?:           null | string;
    width?:             number;
    height?:            number;
    formats?:           IFormatsDontMiss;
    hash?:              string;
    ext?:               string;
    mime?:              string;
    size?:              number;
    url?:               string;
    previewUrl?:        null;
    provider?:          string;
    provider_metadata?: null;
    created_at?:        Date;
    updated_at?:        Date;
}

export interface IFormatsDontMiss {
    large?:     ILargeDontMiss;
    small?:     ILargeDontMiss;
    medium?:    ILargeDontMiss;
    thumbnail?: ILargeDontMiss;
}

export interface ILargeDontMiss {
    ext?:    string;
    url?:    string;
    hash?:   string;
    mime?:   string;
    name?:   string;
    path?:   null;
    size?:   number;
    width?:  number;
    height?: number;
}