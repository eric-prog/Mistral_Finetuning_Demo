// app/layout.tsx
import Provider from "./provider";
import { Noto_Sans } from "next/font/google";

const roboto_mono = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Mistral Fine-tuning Platform",
  description: "Mistral Fine-tuning Platform",

  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto_mono.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
