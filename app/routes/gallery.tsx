import GalleryGrid from "~/components/GalleryGrid";
import { type GalleryImageProps } from "~/components/GalleryImage";
import { database } from "~/database/context";
import type { Route } from "./+types/gallery";
import { NavLink } from "react-router";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const uploader = formData.get("uploader");
    const uploadDate = formData.get("uploadDate");
    const imageFile = formData.get("imageFile");
    const filter = formData.get("filter");
    const targetObject = formData.get("targetObject");
    

    if (typeof title !== "string" || typeof description !== "string") {
        throw new Response("Invalid form data", { status: 400 });
    }

    // const db = await database();
}
    
export async function loader({ request }: Route.LoaderArgs) {
    const db = await database();

    // const images = await db.query.galleryImages.findMany({
    //     with: {
    //         uploader: true
    //     }
    // });
    // return { images };
    return {};
}

export default function Gallery() {

    const imagesExample : GalleryImageProps[] = [
        {
            id: "1",
            path: "/images/image1.jpg",
            resolution: [800, 600],
            uploader: "John Doe",
            uploadDate: new Date("2023-01-01")
        },
        {
            id: "2",
            path: "/images/image2.jpg",
            resolution: [800, 600],
            uploader: "Jane Smith",
            uploadDate: new Date("2023-01-02")
        }
    ]

    return (
        <div>
            <h1>Gallery</h1>
            <p>Welcome to the gallery!</p>
            <NavLink to="/upload" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Upload New Image
            </NavLink>
            <br />
            <GalleryGrid images={imagesExample} />
        </div>
    );
}