import { Outlet } from 'react-router-dom'

function AuthLayout() {
  
  return (
    <div className='p-0 mt-[-8px]'>
        <Outlet />
    </div>
  )
}

export default AuthLayout