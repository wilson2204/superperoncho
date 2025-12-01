import React from "react";

const Productos = () => {
  const productos = [
    { id: 1, nombre: "Azúcar", stock: 20 },
    { id: 2, nombre: "Yerba", stock: 15 },
    { id: 3, nombre: "Harina", stock: 30 },
  ];

  return (
    <div className="tabla-container">
      <h1>Productos</h1>

      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;

