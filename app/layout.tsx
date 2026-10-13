import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {title:'Clearstone Ventures LTD | Investing with Vision',description:'A privately held investment company focused on real estate acquisitions, income-producing assets and strategic investment opportunities.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
