import React from 'react'

const Header = () => {
  return (
    <div className=' bg-gray-700'>
        <div className=' flex justify-between items-center p-4'>
            <h1 className='text-white font-bold text-4xl'>DriveWorthy</h1>
            <nav className='flex space-x-4'>
                <a href="#" className='text-white hover:text-gray-300'>About</a>
                <a href="#" className='text-white hover:text-gray-300'>Contact</a>
            </nav>
        </div>
    </div>
)
}

export default Header