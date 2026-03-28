import '../styles/globals.css'

export const metadata = {
  title: 'Design Point | Graphic Designing, Printing & Digital Marketing Agency',
  description: 'Design Point offers modern graphic design, high-quality printing, and performance-driven digital marketing.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  )
}
