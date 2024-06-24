import ReduxProvider from "@/lib/ReduxProvider";
import { allkeywords, descriptionShop } from "@/lib/contstens";
import { cn } from "@/lib/utils";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Varimartbd",
  description: descriptionShop,
  keywords: allkeywords,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-M7RXHBCL" />
      <body className={cn(poppins.className, "w-full")}>
        <ReduxProvider>
          <div className="max-w-[1400px] mx-auto">
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
