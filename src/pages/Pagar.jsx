import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';
import "../estilos/Pagar.css";

export default function Pagar() {
  const { usuario, cerrarSesion } = useAuthContext();
  const { carrito, total, vaciarCarrito } = useCartContext();
  const navigate = useNavigate();

  const tokenActual = localStorage.getItem('authToken');  // Se asume que el token está en localStorage

  // Función para finalizar compra
  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    vaciarCarrito(); // Limpiar carrito después de comprar
    navigate("/productos");
  };

  return (
    <div className="pagar-container">
      {/* Info del usuario */}
      <section className="usuario-info">
        <h2>Hola {usuario.nombre}</h2>
        <p>Email: {usuario.email}</p>

        {/* Token */}
        {tokenActual && (
          <div className="token">
            <strong>Token:</strong> {tokenActual}
          </div>
        )}

        <button className="btn" onClick={cerrarSesion}>Cerrar sesión</button>
      </section>

      <hr />

      {/* Carrito */}
      <section className="carrito-info">
        <h2>Tu compra:</h2>

        {carrito.length > 0 ? (
          <div className="productos-lista">
            {carrito.map((producto) => {
              const cantidad = Number(producto.cantidad || 1);
              const precioUnitario = Number(producto.precio || 0);
              const subtotal = cantidad * precioUnitario;

              return (
                <div key={producto.id} className="producto-item">
                  <img src={producto.imagen} alt={producto.nombre} />
                  <div className="producto-detalle">
                    <span className="producto-nombre">{producto.nombre}</span>
                    <span className="producto-cantidad">x{cantidad}</span>
                    <strong className="producto-precio">${subtotal.toFixed(3)}</strong>
                  </div>
                </div>
              );
            })}
            <h3 className="total">Total a pagar: ${total.toFixed(3)}</h3>
          </div>
        ) : (
          <p>No hay productos en el carrito</p>
        )}
      </section>

      {/* Botones */}
      <section className="acciones">
        {carrito.length > 0 && (
          <button className="btn btn-comprar" onClick={comprar}>
            Confirmar y Pagar
          </button>
        )}
        <button className="btn" onClick={() => navigate("/productos")}>
          {carrito.length > 0 ? "Seguir Comprando" : "Volver a Productos"}
        </button>
        {carrito.length > 0 && (
          <button className="btn" onClick={vaciarCarrito}>
            Vaciar Carrito
          </button>
        )}
      </section>
    </div>
  );
}
