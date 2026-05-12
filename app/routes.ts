import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/root-layout.tsx", [
        index("routes/home.tsx"),
        route("/gallery", "routes/gallery.tsx"),
        route("/contact", "routes/contact.tsx"),
        route("/demos", "routes/demos.tsx"),
        route("/login", "routes/login.tsx"),
    ])
] satisfies RouteConfig;