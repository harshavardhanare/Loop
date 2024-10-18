import clsx from "clsx";
import { useEffect } from "react";
import WebFont from "webfontloader";

export default function RootLayout({ children }) {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["DM Sans:400,500,700", "sans-serif"],
      },
    });
  }, []);

  return (
    <html lang="en">
      <body className={clsx("dm-sans", "antialiased")}>{children}</body>
    </html>
  );
}
