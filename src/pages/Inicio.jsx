import React, { useEffect, useState } from 'react';
import "../estilos/inicio.css";
import { Link } from 'react-router-dom';
import { useProducts } from "../context/ProductsContext";

function Inicio() {

  const { productos, cargando, error } = useProducts();
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    if (productos && productos.length > 0) {
      
      // IDs de los productos que quieres mostrar como destacados
      const idsDestacados = ['1', '5', '9'];
      
      // Filtrar los productos
      const productosDestacadosSeleccionados = productos.filter(producto => 
        idsDestacados.includes(producto.id)
      );

      // Actualizamos el estado con los productos seleccionados
      setProductosDestacados(productosDestacadosSeleccionados);
    }
  }, [productos]);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const cardStyle = {
    border: '1px solid #ccc',
  };

  return (
    <div className="inicio-container">
      
      <section className="hero">
        <h1>Bienvenido a su Ecommerce de Electrónica</h1>
        <h2>Compra electrónica de calidad, entrega rápida y segura</h2>
        <Link to="/productos">
          <button className="btn-explorar">Explorar Productos</button>
        </Link>
      </section>

      <section className="destacados">
        <h2>Productos Destacados</h2>
        <div className="productos-grid">
          {productosDestacados.length > 0 ? (
            productosDestacados.map((producto) => (
              <div key={producto.id} className="producto-card" style={cardStyle}>
                <img src={producto.imagen} alt={producto.nombre} />
                <h3>{producto.nombre}</h3>
                <p>${producto.precio}</p>
                <Link to={`/productos/${producto.categoria}/${producto.id}`} state={{ producto }}>
                  <button style={buttonStyle}>Más detalles</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No se encontraron productos destacados.</p>
          )}
        </div>
      </section>

    </div>
  );
}

export default Inicio;
