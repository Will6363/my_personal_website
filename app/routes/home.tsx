import { database } from "~/database/context";
import * as schema from "~/database/schema";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
  return (
    <div className="home">
      <h1>Welcome to the Home Page</h1>
    </div>
  );
}
