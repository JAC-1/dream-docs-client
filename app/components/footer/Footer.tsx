'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname == '/' || pathname == '/signin' || pathname == '/signup') {
    return (
      <footer className=" w-full bg-transparent  py-4 bottom-0">
        <p className="text-xs text-gray-900 text-center px-20">
          &copy; {new Date().getFullYear()}　英語国際
        </p>
      </footer>
    );
  }

  if (pathname == '/info') {
    return (
      <footer className="bottom-0 w-full bg-transparent border-t border-gray-200 py-5 mt-auto">
        <p className="text-xs text-gray-900 text-center w-full">
          {/* &copy; {new Date().getFullYear()}　英語国際 */}
        </p>
      </footer>
    );
  }
  return (
    <div className="fixed bottom-0 w-full p-2 md:bottom-4 md:px-4 bg-transparent">
      <div className="container ml-4 md:ml-auto">
        <Link href="/" className="">
          <p
            className="text-md underline hover:text-slate-400 transition duration-300 md:"
            onClick={() => router.back()}
          >
            <ArrowLeft size={30} />
          </p>
        </Link>
      </div>
      <p className="text-xs text-gray-900 text-center w-full">
        &copy; {new Date().getFullYear()} 英語国際
      </p>
    </div>
  );
}
