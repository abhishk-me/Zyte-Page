import React, { FC } from 'react';
import { Link } from '@remix-run/react';

export const WebsiteHeader: FC = () => {
  return (
    <>
      <header className='max-w-xl mx-auto px-4 flex flex-col flex-wrap'>
        <div className='flex items-center px-2'>
          <Link to={"/"} className='h-8 w-8 my-10 mx-auto'>
            {/* <img src={Logo} className='h-full w-full' /> */}
          </Link>
          <span className='flex flex-1' />
        </div>
      </header>
    </>
  )
}