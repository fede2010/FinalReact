import React from 'react'

function Footer() {

  const estilo = {
    marginTop: 'auto',
    backgroundColor: '#222',
    color: 'white',
    textAlign: 'center',
    padding: '15px 0',
  }
  
  return (
    <footer style={estilo}>
        <p>© 2025 MiTienda — Todos los derechos reservados.</p>
    </footer>
  )
}

export default Footer