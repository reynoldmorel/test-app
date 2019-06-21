export interface GiphyImageDimension {
    height: string;
    width: string;
}

export interface GiphyImageSize {
    size: string;
}

export interface GiphyImageUrl {
    url: string;
}

export interface GiphyImageLooping {
    mp4: string;
}

export interface GiphyImageMP4 extends GiphyImageLooping {
    mp4_size: string;
}

export interface GiphyImageWebP {
    webp: string;
    webp_size: string;
}

export interface GiphyImageFixedHeight extends GiphyImageUrl, GiphyImageDimension, GiphyImageSize, GiphyImageMP4, GiphyImageWebP {
}

export interface GiphyImageFixedHeightStill extends GiphyImageUrl, GiphyImageDimension {
}

export interface GiphyImageFixedHeightDownsampled extends GiphyImageUrl, GiphyImageDimension, GiphyImageSize, GiphyImageWebP {
}

export interface GiphyImageFixedWidth extends GiphyImageUrl, GiphyImageDimension, GiphyImageSize, GiphyImageMP4, GiphyImageWebP {
}

export interface GiphyImageFixedWidthStill extends GiphyImageUrl, GiphyImageDimension {
}

export interface GiphyImageFixedWidthDownsampled extends GiphyImageUrl, GiphyImageDimension, GiphyImageSize, GiphyImageWebP {
}

export interface GiphyImageFixedHeightSmall extends GiphyImageUrl, GiphyImageDimension, GiphyImageSize, GiphyImageMP4, GiphyImageWebP {
}

export interface GiphyImageFixedHeightSmallStill extends GiphyImageUrl, GiphyImageDimension {
}

export interface GiphyImageFixedWidthSmall extends GiphyImageUrl, GiphyImageDimension, GiphyImageSize, GiphyImageMP4, GiphyImageWebP {
}

export interface GiphyImageFixedWidthSmallStill extends GiphyImageUrl, GiphyImageDimension {
}

export interface GiphyImageDownsized extends GiphyImageUrl, GiphyImageDimension, GiphyImageSize {
}

export interface GiphyImageDownsizedStill extends GiphyImageUrl, GiphyImageDimension {
}

export interface GiphyImageDownsizedLarge extends GiphyImageUrl, GiphyImageDimension, GiphyImageSize {
}

export interface GiphyImageDownsizedMedium extends GiphyImageUrl, GiphyImageDimension, GiphyImageSize {
}

export interface GiphyImageDownsizedSmall extends GiphyImageUrl, GiphyImageDimension, GiphyImageSize {
}

export interface GiphyImageOriginal extends GiphyImageUrl, GiphyImageDimension, GiphyImageSize, GiphyImageMP4, GiphyImageWebP {
    frames: string;
}

export interface GiphyImageOriginalStill extends GiphyImageUrl, GiphyImageDimension {
}

export interface GiphyImagePreview extends GiphyImageMP4, GiphyImageDimension {
}

export interface GiphyImagePreviewGif extends GiphyImageUrl, GiphyImageDimension, GiphyImageSize {
}

export class GiphyImage {
    constructor(
        public fixed_height?: GiphyImageFixedHeight,
        public fixed_height_still?: GiphyImageFixedHeightStill,
        public fixed_height_downsampled?: GiphyImageFixedHeightDownsampled,
        public fixed_width?: GiphyImageFixedWidth,
        public fixed_width_still?: GiphyImageFixedWidthStill,
        public fixed_width_downsampled?: GiphyImageFixedWidthDownsampled,
        public fixed_height_small?: GiphyImageFixedHeightSmall,
        public fixed_height_small_still?: GiphyImageFixedHeightSmallStill,
        public fixed_width_small?: GiphyImageFixedWidthSmall,
        public fixed_width_small_still?: GiphyImageFixedWidthSmallStill,
        public downsized?: GiphyImageDownsized,
        public downsized_still?: GiphyImageDownsizedStill,
        public downsized_large?: GiphyImageDownsizedLarge,
        public downsized_medium?: GiphyImageDownsizedMedium,
        public downsized_small?: GiphyImageDownsizedSmall,
        public original?: GiphyImageOriginal,
        public original_still?: GiphyImageOriginalStill,
        public looping?: GiphyImageLooping,
        public preview?: GiphyImagePreview,
        public preview_gif?: GiphyImagePreviewGif
    ) {

    }
}
