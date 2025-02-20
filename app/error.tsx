'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error.message)
  }, [error])
 
  return (
    <div className='flex flex-col justify-center items-center h-screen w-full'>
      <h2 className='md:text-6xl text-3xl py-12'>Something went wrong! 😭 </h2>
      {error.digest && <p className='md:text-2xl text-xl'>Error digest: {error.digest}</p>}
      <Button
        onClick={
          () => reset()
        }
        variant={'secondary'}
        className='mt-8'
      >
        Try again
      </Button>
    </div>
  )
}

