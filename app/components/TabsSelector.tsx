import { useState } from "react";
// import tabStyle from '../styles/tabsSelector.module.css'
import { NavLink } from "react-router";

export interface TabInfo {
    id: string;
    label: string;
    to: string;
    end?: boolean;
}

export function TabSelector({ tabs }: { tabs: TabInfo[]; }) {

    return (
        <nav>
            {tabs.map((tab) => (
                <NavLink
                    key={tab.id}
                    to={tab.to}
                    end={tab.end}
                    onClick={() => {
                        console.log("Clicked tab:", tab.id);
                        console.log("Path is:", tab.to)
                    }}
                >
                    {({ isActive }) => (
                        <span className="px-4 py-2 text-white hover:bg-blue-700">
                            {tab.label}
                        </span>
                    )}
                </NavLink>
            ))}
        </nav>
    )
}