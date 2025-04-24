import React from 'react'

function Container({children}) {
  return (
    <div className='bg-stone-900 flex flex-col min-h-screen'>
        {children}
    </div>
  )
}

export default Container