import { NavLink, Outlet } from "react-router";
import { TabSelector, type TabInfo } from "~/components/TabsSelector";

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
                flex px-4 py-2 relative z-10
                bg-blue-600 shadow-md shadow-blue-500/50"
            >
                <TabSelector
                    tabs={tabs}
                />
                <div className="profile-and-settings ml-auto flex">
                    <NavLink className="login-nav" key="login-nav" to="/login">
                        <span className="px-2 py-2 text-white hover:bg-blue-700">
                            Login
                        </span>
                    </NavLink>
                    <NavLink className="settings-nav ml-2" key="settings-nav" to="/settings">
                        <span className="px-2 py-2 text-white hover:bg-blue-700">
                            Settings
                        </span>
                    </NavLink>
                </div>

            </div>
            <div className="main-content px-4 py-4 mx-16 bg-gray-200 text-black min-h-screen">
                <Outlet />
            </div>
        </div>
    )
}