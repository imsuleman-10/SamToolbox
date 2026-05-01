"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function AdSenseAdUnit() {
  useEffect(() => {
    // AdSense script is handled by the Script component below
  }, []);

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ins
        className="adsbygoogle block mx-auto"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6367920112912612"
        data-ad-slot="8949858719"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id="adsense-page-unit" strategy="lazyOnload">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  );
}
