"use client";
import React, { useEffect } from "react";

const KKUCookieWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://pdp.kku.ac.th/api/v1/widget";
    script.type = "module";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="idChild">
      <kku-cookie-widget language="th" style={{ '--primary-color' : '#0072F5' } as React.CSSProperties}></kku-cookie-widget>
    </div>
  );
};

export default KKUCookieWidget;
