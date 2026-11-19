
"use client";

import {
    useLayoutEffect,
    useRef,
    useState,
    type CSSProperties,
    type PointerEvent,
    type KeyboardEvent,
    type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "./navigation";
import styles from "./AppShell.module.css";
import SidebarIcon from "@/components/ui/Icon/SidebarIcon";

const MIN_WIDTH = 204;
const MAX_WIDTH = 360;
const RESIZE_STEP = 16;

const mobileNavigation = [...navigation[0], ...navigation[1]];

export default function AppShell({ children }: { children: ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(MIN_WIDTH);
    const [resizing, setResizing] = useState(false);

    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);
    const indicatorRef = useRef<HTMLSpanElement>(null);
    const drag = useRef<{ x: number; width: number } | null>(null);

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(`${href}/`);

    const moreActive =
        isActive("/more") ||
        navigation[2].some((item) => isActive(item.href)) ||
        isActive("/become-a-tutor");

    function clampWidth(width: number) {
        return Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, width));
    }

    function startResize(event: PointerEvent<HTMLDivElement>) {
        if (event.button !== 0) return;

        event.preventDefault();
        drag.current = { x: event.clientX, width: sidebarWidth };
        event.currentTarget.setPointerCapture(event.pointerId);
        setResizing(true);
    }

    function moveResize(event: PointerEvent<HTMLDivElement>) {
        if (!drag.current) return;

        const width = drag.current.width + event.clientX - drag.current.x;
        setSidebarWidth(clampWidth(width));
    }

    function stopResize() {
        drag.current = null;
        setResizing(false);
    }

    function keyboardResize(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

        event.preventDefault();
        const change = event.key === "ArrowRight" ? RESIZE_STEP : -RESIZE_STEP;
        setSidebarWidth((width) => clampWidth(width + change));
    }

    useLayoutEffect(() => {
        const active = navRef.current?.querySelector<HTMLElement>(
            '[aria-current="page"]'
        );

        if (!indicatorRef.current) return;

        indicatorRef.current.style.transform =
            `translateY(${active?.offsetTop ?? 0}px)`;
        indicatorRef.current.style.opacity = active ? "1" : "0";
    }, [pathname]);

    return (
        <div
            className={[
                styles.shell,
                collapsed && styles.collapsed,
                resizing && styles.resizing,
            ].filter(Boolean).join(" ")}
            style={{ "--sidebar-current-width": `${sidebarWidth}px` } as CSSProperties}
        >
            {/* Desktop sidebar */}

            <aside className={styles.sidebar}>
                {collapsed && (
                    <button
                        type="button"
                        className={styles.expandArea}
                        onClick={() => setCollapsed(false)}
                        aria-label="Expand sidebar"
                        aria-controls="app-nav"
                        aria-expanded={false}
                    />
                )}

                <header className={styles.brand}>
                    <Link href="/home" className={styles.logo} tabIndex={collapsed ? -1 : 0}>
                        Quack
                    </Link>

                    <span className={styles.compactBrand} aria-hidden="true">
                        <span className={styles.miniLogo}>q</span>
                        <span className={styles.compactIcon}>
                            <SidebarIcon />
                        </span>
                    </span>

                    <button
                        type="button"
                        className={styles.toggle}
                        onClick={() => setCollapsed(true)}
                        aria-label="Collapse sidebar"
                        aria-controls="app-nav"
                        aria-expanded={!collapsed}
                        tabIndex={collapsed ? -1 : 0}
                    >
                        <SidebarIcon />
                    </button>
                </header>

                <nav ref={navRef} id="app-nav" className={styles.nav} aria-label="Main navigation">
                    <span
                        ref={indicatorRef}
                        className={styles.activeIndicator}
                        aria-hidden="true"
                    />

                    {navigation.map((group, index) => (
                        <div className={styles.group} key={index}>
                            {group.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`${styles.navItem} ${isActive(item.href) ? styles.active : ""}`}
                                    aria-current={isActive(item.href) ? "page" : undefined}
                                    aria-label={collapsed ? item.label : undefined}
                                    title={collapsed ? item.label : undefined}
                                >
                                    <span className={styles.navIcon} aria-hidden="true">
                                        <item.icon />
                                    </span>
                                    <span className={styles.label}>{item.label}</span>
                                    {"badge" in item && (
                                        <span className={styles.badge}>{item.badge}</span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    ))}
                </nav>

                <div className={styles.bottom}>
                    <Link href="/become-a-tutor" className={styles.tutorLink}>
                        Become a tutor
                    </Link>

                    <div className={styles.profile} title="Arthur Anderson — Student">
                        <span className={styles.avatar}>AA</span>
                        <div className={styles.person}>
                            <strong>Arthur Anderson</strong>
                            <span>Student</span>
                        </div>
                    </div>
                </div>

                {!collapsed && (
                    <div
                        className={styles.resizeHandle}
                        role="separator"
                        aria-label="Resize sidebar"
                        aria-orientation="vertical"
                        aria-valuemin={MIN_WIDTH}
                        aria-valuemax={MAX_WIDTH}
                        aria-valuenow={Math.round(sidebarWidth)}
                        tabIndex={0}
                        onPointerDown={startResize}
                        onPointerMove={moveResize}
                        onPointerUp={stopResize}
                        onPointerCancel={stopResize}
                        onLostPointerCapture={stopResize}
                        onKeyDown={keyboardResize}
                    />
                )}
            </aside>

            {/* Mobile logo */}

            <Link href="/home" className={styles.mobileLogo} aria-label="Quack home">
                q
            </Link>

            <main className={styles.main}>{children}
                
                
            
            </main>

            {/* Mobile navigation */}

            <nav className={styles.mobileNav} aria-label="Mobile navigation">
                {mobileNavigation.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={styles.mobileItem}
                        aria-label={item.label}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        title={item.label}
                    >
                        <span className={styles.navIcon} aria-hidden="true">
                            <item.icon />
                        </span>
                    </Link>
                ))}

                <Link
                    href="/more"
                    className={styles.mobileItem}
                    aria-label="More"
                    aria-current={moreActive ? "page" : undefined}
                    title="More"
                >
                    <span className={styles.moreIcon} aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </span>
                </Link>
            </nav>
        </div>
    );
}
