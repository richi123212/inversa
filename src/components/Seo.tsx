import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { company, pending } from "../data/company";
export function Seo({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title + " | Inversa";
    const desc = description ?? company.descripcion;
    function meta(key: string, content: string, property = false) {
      let el = document.head.querySelector<HTMLMetaElement>(
        "meta[" + (property ? "property" : "name") + '="' + key + '"]',
      );
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(property ? "property" : "name", key);
        document.head.append(el);
      }
      el.content = content;
    }
    meta("description", desc);
    meta("og:title", title + " | Inversa", true);
    meta("og:description", desc, true);
    meta("og:url", company.sitioWeb + pathname, true);
    meta("og:type", "website", true);
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = company.sitioWeb + pathname;
  }, [title, description, pathname]);
  return null;
}
