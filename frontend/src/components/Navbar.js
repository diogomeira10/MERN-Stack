// Navbar.js
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className=''>
      <div className='container'>
        <Link to='/'> {/* this link element becomes an anchor tag */}
          <h1>Workout Buddy</h1>
        </Link>
      </div>
    </header>
  );
}
