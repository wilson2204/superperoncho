import React, { useState } from "react";
import editIcon from "../assets/icons/edit.png";
import deleteIcon from "../assets/icons/delete.png";
import "./ProductTable.css";

const ProductTable = ({ products, setProducts }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (id) => {
    alert("Editar producto con ID: " + id);
  };

  const handleStock = (id, type) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, stock: type === "up" ? p.stock + 1 : p.stock - 1 }
          : p
      )
    );
  };

  const shuffled = [...products].sort(() => Math.random() - 0.5);

  const startIndex = (page - 1) * itemsPerPage;
  const currentProducts = shuffled.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {currentProducts.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>

              {/* STOCK */}
              <td className="stock-cell">
                <div className="stock-wrapper">
                  <span className="stock-number">{p.stock}</span>

                  <div className="stock-buttons">
                    <button className="arrow-btn up" onClick={() => handleStock(p.id, "up")}>▲</button>
                    <button className="arrow-btn down" onClick={() => handleStock(p.id, "down")}>▼</button>
                  </div>
                </div>
              </td>

              {/* ACCIONES */}
              <td className="action-cell">
                <button className="action-btn" onClick={() => handleEdit(p.id)}>
                  <img src={editIcon} alt="editar" className="action-icon" />
                </button>

                <button className="action-btn delete" onClick={() => handleDelete(p.id)}>
                  <img src={deleteIcon} alt="eliminar" className="action-icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINACIÓN */}
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
