// Navbar.js
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className=''>
      <div className='container'>
        <Link to='/'> {/* this link element becomes an anchor tag */}
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          <div>
            <Link to='/login'> {/* this link element becomes an anchor tag */}
              <h1>Login</h1>
            </Link>
            <Link to='/signup'> {/* this link element becomes an anchor tag */}
              <h1>Signup</h1>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
