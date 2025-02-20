import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'サインイン',
  description: 'アカウントをサインイン',
  robots: {
    index: false,
    follow: false,
  },
}

interface LayoutProps {
  children: React.ReactNode
}

export default function SignInLayout({ children }: LayoutProps) {
  return (
    <div className="bg-white min-h-screen h-screen flex flex-col">
      {children}
    </div>
  )
}
