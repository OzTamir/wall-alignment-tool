export interface Measurements {
    wallToFirst: number;
    betweenImages: number;
    lastToWall: number;
}

export interface WallAlignmentProps {
    wallLength: number;
    imageWidth: number;
    imageHeight: number;
    imageCount: number;
    onWallLengthChange: (value: number) => void;
    onImageWidthChange: (value: number) => void;
    onImageHeightChange: (value: number) => void;
    onImageCountChange: (value: number) => void;
} 