import GalleryImage, { type GalleryImageProps } from "./GalleryImage";

export default function GalleryGrid({ images }: { images: GalleryImageProps[] }) {
    return (
        <div>
            <h2>Gallery Grid</h2>
            <p>This is where the gallery grid will be displayed.</p>

            <div className="gallery-grid grid grid-cols-3 gap-4">
                {images.map((image) => (
                    <GalleryImage key={image.id} {...image} />
                ))}
            </div>
        </div>
    );
}