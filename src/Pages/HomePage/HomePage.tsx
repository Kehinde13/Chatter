import Header from './Header'
import SideBar from './SideBar'

function HomePage() {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <SideBar />
      </div>
    </div>
  )
}

export default HomePage