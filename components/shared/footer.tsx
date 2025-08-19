'use client'

import { ChevronUp } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'

export default function Footer() {
 return (
   <footer className='bg-black text-white underline-link'>
     <div className='w-full'>
       <Button
         variant='ghost'
         className='bg-gray-800 w-full rounded-none'
         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
       >
         <ChevronUp className='mr-2 h-4 w-4' />
         Retour en haut
       </Button>
     </div>
     <div className='p-4'>
       <div className='flex justify-center gap-3 text-sm'>
         <Link href='/page/conditions-of-use'>Conditions d'utilisation</Link>
         <Link href='/page/privacy-policy'>Notice de confidentialité</Link>
         <Link href='/page/help'>Aide</Link>
       </div>
     </div>
     <div className='flex justify-center text-sm'>
       <p>© 2017-{new Date().getFullYear()}, {APP_NAME}, Inc. ou ses affiliés</p>
     </div>
     <div className='mt-8 flex justify-center text-sm text-gray-400'>
       <p>123 Main Street, Anytown, CA, Zip 12345 | +1 (555) 456-7890</p>
     </div>
   </footer>
 )
}