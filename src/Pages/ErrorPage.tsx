import { Link } from 'react-router-dom'

function ErrorPages() {
  return (
    <div className="w-full mx-auto pt-10 h-screen dark:bg-slate-800 dark:text-white">
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 dark:text-white">
        &#128531;Oops! Page not found.
      </h1>
      <p className="text-xl md:text-2xl text-white mb-8">
        Looks like you're lost in space.
      </p>
      <Link to="/"
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white 
        font-bold py-2 px-4 rounded-md transition duration-300"
        >Back to our site 
     </Link>
    </div>
  </div>
  )
}

export default ErrorPages