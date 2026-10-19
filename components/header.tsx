"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [strategiesOpen, setStrategiesOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    setOpen(false);
    setStrategiesOpen(false);
  }, [pathname]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setStrategiesOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) {
        setOpen(false);
        setStrategiesOpen(false);
      }
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  const current = (path: string) =>
    pathname === path ? ("page" as const) : undefined;
  return (
    <header className="site-header" ref={root}>
      <div className="container header-content">
        <Link
          href="/"
          className="brand"
          aria-label="Clearstone Ventures LTD home"
        >
          <img
            src="/clearstone-logo.png"
            alt="Clearstone Ventures LTD — Real. Deal. Done."
            width="1706"
            height="922"
          />
        </Link>
        <button
          className="mobile-toggle"
          ref={toggle}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}{" "}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="main-navigation"
          className={open ? "main-navigation is-open" : "main-navigation"}
          aria-label="Main navigation"
        >
          <Link href="/" aria-current={current("/")}>
            Home
          </Link>
          <Link href="/about" aria-current={current("/about")}>
            About
          </Link>
          <div
            className="nav-strategies"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget))
                setStrategiesOpen(false);
            }}
          >
            <button
              aria-expanded={strategiesOpen}
              aria-controls="strategy-navigation"
              className={pathname.startsWith("/strategies") ? "active" : ""}
              onClick={() => setStrategiesOpen(!strategiesOpen)}
            >
              Strategies <span aria-hidden="true">⌄</span>
            </button>
            <div
              id="strategy-navigation"
              className="strategy-navigation"
              hidden={!strategiesOpen}
            >
              <Link href="/strategies">All strategies</Link>
              <Link href="/strategies/multifamily">Multifamily</Link>
              <Link href="/strategies/net-lease">Net Lease</Link>
              <Link href="/strategies/residential-acquisitions">
                Residential Acquisitions
              </Link>
            </div>
          </div>
          <Link href="/our-approach" aria-current={current("/our-approach")}>
            Our Approach
          </Link>
          <Link
            className="nav-cta"
            href="/contact"
            aria-current={current("/contact")}
          >
            Contact <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
