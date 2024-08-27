import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <header className='w-full p-8 flex items-center justify-between'>
         <span>LOGO</span>
      <Button title='Logar' className='white'>
        Logar
      </Button>
    </header>
  )
}

export default Header
