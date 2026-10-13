import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {metadataBase:new URL('https://www.clearstone-ventures.com'),title:'Clearstone Ventures LTD | Clear Perspective. Lasting Vision.',description:'An emerging, privately held real estate investment and acquisition company developing a disciplined platform for long-term opportunity.',openGraph:{title:'Clearstone Ventures LTD',description:'Clear perspective. Lasting vision. An emerging real estate investment and acquisition platform.',type:'website'},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
