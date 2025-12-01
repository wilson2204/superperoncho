import React from "react";
import EditIcon from "../assets/icons/edit.svg";
import DeleteIcon from "../assets/icons/delete.svg";

function ProductRow({ product, onDelete, onEdit, onIncrease, onDecrease }) {
  return (
    <tr>
      <td>{product.nombre}</td>
      <td>{product.precio}</td>

      <td className="stock-cell">
        <div className="stock-wrapper">
          <span className="stock-number">{product.stock}</span>

          <div className="stock-buttons">
            <button className="arrow-btn up" onClick={() => onIncrease(product.id)}>
              ▲
            </button>

            <button className="arrow-btn down" onClick={() => onDecrease(product.id)}>
              ▼
            </button>
          </div>
        </div>
      </td>

      <td>
        <div className="action-buttons">
          {/* Botón editar */}
          <button className="icon-btn edit" onClick={() => onEdit(product)}>
            <img src={EditIcon} alt="edit" />
          </button>

          {/* Botón eliminar */}
          <button className="icon-btn delete" onClick={() => onDelete(product.id)}>
            <img src={DeleteIcon} alt="delete" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ProductRow;
