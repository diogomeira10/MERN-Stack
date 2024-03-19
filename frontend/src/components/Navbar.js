// Navbar.js
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";

export function Navbar() {

  const { logout } = useLogout()
  const { user } = useAuthContext()


  const handleLogoutClick = () => {
    logout()
  }


  return (
    <header className=''>
      <div className='container'>
        <Link to='/'> {/* this link element becomes an anchor tag */}
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleLogoutClick}>Log out</button>
          </div>
          )}
          {!user && (
          <div>
            <Link to='/login'> {/* this link element becomes an anchor tag */}
              <h1>Login</h1>
            </Link>
            <Link to='/signup'> {/* this link element becomes an anchor tag */}
              <h1>Signup</h1>
            </Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  );
}
