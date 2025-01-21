import React from "react";


const Menu = () => {
    return (
        <nav style={{ backgroundColor: '#f4f4f4', padding: '5px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '5px', margin: 0, padding:0 }}>
            <li><a href="http://127.0.0.1:8000/api/">Apps_backend</a></li>
            <li><a href="http://127.0.0.1:8000/admin/">Adminka</a></li>
          </ul>
        </nav>
  );
};


export default Menu