import React from 'react'

const Title = ({title, description}) => {
  return (
   
    <div className='flex flex-col items-center text-center mt-6 text-slate-700 px-4'>
     
        <h2 className='text-3xl sm:text-4xl font-semibold text-slate-900'>{title}</h2>
        
      
        <p className='max-w-2xl mt-4 text-slate-500 text-base md:text-lg mx-auto leading-relaxed'>
          {description}
        </p>
    </div>
  )
}

export default Title