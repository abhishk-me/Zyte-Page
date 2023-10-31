import { cssBundleHref } from "@remix-run/css-bundle";
import { json, type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "@remix-run/react";
import Postmate from 'postmate';
import { useCallback, useEffect, useRef, useState } from 'react';
import stylesheet from "~/tailwind.css";
import { WebsiteHeader } from './components/header';
import { PageDataType } from './types/page-data';
import { pageDataInitial } from './components/consts';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
];

type ContextType = { page: PageDataType, onSelectElement: (id: string) => void, inspectorOn: boolean };

export const loader = async () => {
  return json({ nodeEnv: process.env.NODE_ENV, gaTrackingId: process.env.GA_TRACKING_ID });
};

export default function App() {
  const navigate = useNavigate();
  const [inspectorOn, setInspectorOn] = useState(false);
  const handshakeRef = useRef<Postmate.Model>();
  const parentRef = useRef<Postmate.ChildAPI>();
  const [page, setPage] = useState<PageDataType>(pageDataInitial);

  const onSelectElement = useCallback((elementId: string) => {
    if (parentRef.current) {
      const element = document.querySelector(`#el_${elementId}`);
      const focused = document.querySelectorAll('.is-focused');
      focused.forEach((el) => {
        el.classList.remove('is-focused');
      });
      if (element) {
        element.classList.add("is-focused");
      }
      parentRef.current.emit('SELECT_ELEMENT', elementId);
    }
  }, [])

  useEffect(() => {
    if (!handshakeRef.current) {
      const handshake = new Postmate.Model({
        setData: (data: PageDataType) => {
          setPage(data);
        },
        setPage: (page: PageDataType) => {
          setPage(page);
        },
        focusElement: (id: string) => {
          const element = document.querySelector(`#el_${id}`);
          const focusedElements = document.querySelectorAll('.is-focused');
          focusedElements.forEach((el) => {
            el.classList.remove('is-focused');
          });
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add("is-focused");
          }
        },
        toggleInspector: (open: boolean) => {
          setInspectorOn(open);
        },
        removeFocus: (index: number) => {
          const section = document.querySelector(`#section_${index + 1}`);
          if (section) {
            section.classList.remove("border");
          }
        },
        changePage: (url: string) => {
          navigate(url)
        },
      });
      handshakeRef.current = handshake
      handshake.then(parent => {
        parentRef.current = parent;
        parent.emit('FETCH_DATA');
      });
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className='bg-[var(--background)]'>
        <Outlet context={{ page, onSelectElement, inspectorOn } satisfies ContextType} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
