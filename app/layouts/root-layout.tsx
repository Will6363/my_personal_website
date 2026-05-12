import { NavLink, Outlet } from "react-router";
import { TabSelector, type TabInfo } from "~/components/tabsSelector";

export default function RootLayout() {
    const tabs: TabInfo[] = [
        { id: 'homeTab', label: "Home", to: "/", end: true },
        { id: 'galleryTab', label: "Gallery", to: "/gallery" },
        { id: 'contactTab', label: "Contact", to: "/contact" },
        { id: 'demosTab', label: "Demos", to: "/demos" },
    ];

    return (
        <div className="root">
            <div className="navigation-bar
                bg-blue-600 flex px-4 py-2" 
            >
                <TabSelector
                    tabs={tabs}
                />
                <NavLink className="ml-auto"
                    key="LOGIN"
                    to="/login"
                >
                    <h3>Login</h3>
                </NavLink>
            </div>
            <div className="root-tab-content">
                <Outlet />
            </div>
        </div>
    )
}