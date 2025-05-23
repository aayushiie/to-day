import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
    const [date, setDate] = useState(new Date())

    return (
        <>
            {/* <Link to={'/login'}>
                <button className="mx-2">
                    Login
                </button>
            </Link> */}
            <nav
                className='flex items-center flex-nowrap text-[#fffffe] border-b-solid border-b-2 rounded-sm border-[#0f0e17] bg-[#05281c]'>
                <ul className='flex items-center w-full justify-between p-2'>
                    <li className='text-3xl font-bold'>TO-DAY</li>
                    <li className='text-2xl font-bold'>{date.toDateString()}</li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
