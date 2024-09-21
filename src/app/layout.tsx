import type { Metadata } from "next";
import { Inter_Tight } from '@next/font/google';
import './styles/global.scss';



const inter_tight = Inter_Tight({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700'], 
} );



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={inter_tight.className}>
        <body>
          {children}
        </body>
    </html>
  );
}
