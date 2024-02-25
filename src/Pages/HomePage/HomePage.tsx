import { Outlet } from 'react-router-dom'
import Header from './Header'
import SideBar from './SideBar'

function HomePage() {
  return (
    <div /* className='dark:bg-slate-800 dark:text-white' */>
      <Header />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <SideBar />
        <Outlet />
      </div>
    </div>
  )
}

export default HomePage