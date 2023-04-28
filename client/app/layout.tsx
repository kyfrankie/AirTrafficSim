import './globals.css'

import {ContextProvider } from './context';

export const metadata = {
  title: 'AirTrafficSim',
  description: 'Web-based air traffic control simulator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ContextProvider>
        <body>{children}</body>
      </ContextProvider>
    </html>
  )
}
