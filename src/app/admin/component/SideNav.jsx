import React from 'react'
import Link from 'next/link'

function Sidenav() {
  return (
    <nav className='bg-[var(--primary-color)] -lg p-10 rounded-lg'>
        <ul>
            <li><Link className='flex md:block my-3 p-3 rounded-lg' href="/admin">Dashboard</Link></li>
            <li><Link className='flex md:block my-3 p-3 rounded-lg' href="/admin/users">Users</Link></li>
            <li><Link className='flex md:block my-3 p-3 rounded-lg' href="/admin/posts">Posts</Link></li>
        </ul>

    </nav>
  )
}

export default Sidenav