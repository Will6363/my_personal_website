import { Form } from "react-router";
import type { Route } from "./+types/uploadImage";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const filter = formData.get("filter");
    const targetObject = formData.get("targetObject");
    const imageFile = formData.get("imageFile");
    const uploadDate = new Date();
    const uploader = "Current User"; // Replace with actual user info

    if (typeof title !== "string" || typeof description !== "string" || !(imageFile instanceof File)) {
        throw new Response("Invalid form data", { status: 400 });
    }
}

export default function UploadImage() {
    return (
        <div>
            <h1>Upload</h1>
            <p>This is the Upload Image Page!</p>
            <Form method="post" className="flex flex-col gap-4">
                <label>
                    Title:&nbsp;
                    <input type="text" name="title" />
                </label>
                <label>
                    Description:&nbsp;
                    <textarea name="description" />
                </label>
                <label>
                    Filter:&nbsp;
                    <input type="text" name="filter" />
                </label>
                <label>
                    Target Object:&nbsp;
                    <input type="text" name="targetObject" />
                </label>
                <label>
                    Image File:&nbsp;
                    <input type="file" name="imageFile" className="border border-gray-300 rounded hover:bg-gray-400" />
                </label>
                <button type="submit" className="px-4 py-2 w-50 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Upload
                </button>
            </Form>
        </div>
    );
}