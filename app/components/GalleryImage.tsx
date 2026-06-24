export interface GalleryImageProps {
    id: string;
    path: string;
    resolution: [number, number];
    uploader: string;
    uploadDate: Date;
}

export default function GalleryImage({ id, path, resolution, uploader, uploadDate }: GalleryImageProps) {
    return (
        <div>
            <img src={path} alt={`Image uploaded by ${uploader}`} />
            <p>Resolution: {resolution[0]}x{resolution[1]}</p>
            <p>Uploaded by: {uploader}</p>
            <p>Upload date: {uploadDate.toLocaleDateString()}</p>
        </div>
    );
}