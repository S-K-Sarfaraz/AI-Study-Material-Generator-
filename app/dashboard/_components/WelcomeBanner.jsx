'use client'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
const {user} = useUser();
  return (
    <div className='p-5 bg-blue-500 text-white rounded-lg flex items-center gap-6'>
        <Image src={'/laptop.png'} alt='laptop' width={100} height={100} />
        <div>
            <h2 className='font-bold text-3xl'>Hello, {user?.firstName}</h2>
            <p>welcome back, It's time to start learning your favorite topics !!</p>
        </div>
    </div>
  )
}

export default WelcomeBanner