import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header  className="p-4 text-center border-2 flex justify-between gap-4 ">

        <div className="italic text-2xl font-sans">GoalGuru</div>
        <nav>Navigation...</nav>
          <div>
            <Link to={'/signin'} className="py-1 px-4 active:scale-[96%] rounded mr-2 border-2">Sign In</Link>

            <Link to={'/signup'} className="py-1 px-4 active:scale-[96%] rounded mr-2 border-2">Sign Up</Link>
            </div>
        </header>
    )
}

export default Header;