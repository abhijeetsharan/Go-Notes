import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      <div className='flex flex-col items-center mt-20 px-4 py-4 text-center text-gray-800 border border-gray-300'>
        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Home</h1>
        <h2 className='text-3xl sm:text-2xl font-semibold mb-4'>Welcome to Go Notes</h2>
        <p className='mb-8 max-w-md'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, eligendi.</p>
      </div>
    </div>
  )
}

export default Home
