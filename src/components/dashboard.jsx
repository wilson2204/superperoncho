import { useState, useEffect } from "react";
import "../styles/dashboard.css";
import { PlusCircleIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  // 🔥 PRODUCTOS ORIGINALES
  const products = {
    bebidas: [
      { id: 1, name: "Coca-Cola 1.5L", stock: 12 },
      { id: 2, name: "Pepsi 2L", stock: 4 },
      { id: 3, name: "Sprite 1.5L", stock: 9 },
      { id: 4, name: "Agua Mineral 500ml", stock: 15 },
      { id: 5, name: "Levité Pomelo", stock: 3 },
      { id: 6, name: "Manaos Cola", stock: 20 },
      { id: 7, name: "Monster Energy", stock: 6 },
      { id: 8, name: "Fanta 1.5L", stock: 7 },
      { id: 9, name: "Jugo Baggio Multifruta", stock: 14 },
      { id: 10, name: "Speed", stock: 2 },
      { id: 11, name: "Gatorade Naranja", stock: 5 },
      { id: 12, name: "Cepita Durazno", stock: 8 },
    ],
    snacks: [
      { id: 13, name: "Papas Lays Clásicas", stock: 10 },
      { id: 14, name: "Doritos Queso", stock: 6 },
      { id: 15, name: "Cheetos", stock: 3 },
      { id: 16, name: "Palitos Salados", stock: 11 },
      { id: 17, name: "Bizcochitos Don Satur", stock: 15 },
    ],
    limpieza: [
      { id: 18, name: "Lavandina Ayudín", stock: 7 },
      { id: 19, name: "Detergente Magistral", stock: 5 },
      { id: 20, name: "Jabón en Polvo Ala", stock: 12 },
      { id: 21, name: "Desinfectante Poett", stock: 9 },
      { id: 22, name: "Esponjas x3", stock: 18 },
    ],
  };

  // 🔀 Mezclar los productos una sola vez
  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
  const [allProductsState, setAllProductsState] = useState([]);

  useEffect(() => {
    const mezclados = shuffleArray([
      ...products.bebidas,
      ...products.snacks,
      ...products.limpieza
    ]);
    setAllProductsState(mezclados);
  }, []);

  // 🌙 Modo oscuro
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // 🔎 Buscador
  const filteredProducts = allProductsState.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔄 Paginación
  const itemsPerPage = 6;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // ⬆⬇ Cambiar stock
  function increaseStock(id) {
    setAllProductsState(prev =>
      prev.map(p => p.id === id ? { ...p, stock: p.stock + 1 } : p)
    );
  }

  function decreaseStock(id) {
    setAllProductsState(prev =>
      prev.map(p => p.id === id ? { ...p, stock: Math.max(0, p.stock - 1) } : p)
    );
  }

  // ✏ Editar producto
  function handleEdit(p) {
    setEditProduct(p);
    setIsEditModalOpen(true);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    setAllProductsState(prev =>
      prev.map(p => p.id === editProduct.id ? editProduct : p)
    );
    setIsEditModalOpen(false);
    setEditProduct(null);
  }

  // 🗑 Eliminar producto
  function handleDelete(id) {
    if (confirm("¿Seguro que querés eliminar el producto con ID " + id + "?")) {
      setAllProductsState(prev => prev.filter(p => p.id !== id));
    }
  }

  // ⭐ Fila según stock
  const getRowClass = (stock) => {
    if (stock < 5) return "low-row";
    if (stock < 10) return "mid-row";
    return "high-row";
  };

  return (
    <div className="dashboard-container">
      <main className="dashboard-content">

        {/* HEADER */}
        <header className="dashboard-header">
          <h1 className="titulo">🛒 Super Peroncho</h1>

          <div className="header-actions">
            <div className="theme-container">
              <div
                className={`theme-toggle ${darkMode ? "dark" : ""}`}
                onClick={() => setDarkMode(!darkMode)}
              >
                <div className="toggle-thumb">{darkMode ? "🌙" : "☀️"}</div>
              </div>
            </div>

            <button className="logout-btn" onClick={() => navigate("/")}>
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* TABLA */}
        <div className="table-container">

          <div className="table-header">
            <h2>Productos</h2>

            <div className="search-box">
              <input
                type="text"
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MagnifyingGlassIcon className="icon-search" />
            </div>

            <button className="add-btn" onClick={() => setIsModalOpen(true)}>
              <PlusCircleIcon className="icon-btn" />
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {currentProducts.map(p => (
                <tr key={p.id} className={getRowClass(p.stock)}>

                  <td>{p.id}</td>

                  <td>
                    {p.name}
                    {p.stock < 5 && (
                      <div className="low-warning">⚠ STOCK BAJO</div>
                    )}
                  </td>

                  {/* STOCK + FLECHAS */}
                  <td className="stock-cell">
                    <span className="stock-number">{p.stock}</span>

                    <div className="stock-controls">
                      <button className="stock-btn up" onClick={() => increaseStock(p.id)}>▲</button>
                      <button className="stock-btn down" onClick={() => decreaseStock(p.id)}>▼</button>
                    </div>
                  </td>

                  {/* ACCIONES */}
                  <td className="actions-cell">
                    <button className="btn-edit" onClick={() => handleEdit(p)}>
                      <PencilIcon className="icon-btn" />
                    </button>

                    <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                      <TrashIcon className="icon-btn" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINACIÓN */}
          <div className="pagination">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>⬅</button>
            <span>Página {currentPage} / {totalPages}</span>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>➡</button>
          </div>

        </div>

        {/* MODAL AGREGAR PRODUCTO */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Agregar Producto</h2>

              <form className="form-add" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
                <input type="text" placeholder="Nombre del producto" required />
                <input type="number" placeholder="Stock" required />
                <select required>
                  <option value="">Seleccione categoría</option>
                  <option value="bebidas">Bebidas</option>
                  <option value="snacks">Snacks</option>
                  <option value="limpieza">Limpieza</option>
                </select>

                <div className="modal-buttons">
                  <button type="button" className="cancel" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                  <button type="submit" className="save">Guardar</button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* MODAL EDITAR PRODUCTO */}
        {isEditModalOpen && editProduct && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Editar Producto</h2>

              <form className="form-add" onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  required
                />
                <input
                  type="number"
                  value={editProduct.stock}
                  onChange={(e) => setEditProduct({ ...editProduct, stock: parseInt(e.target.value) })}
                  required
                />
                <select
                  value={["bebidas", "snacks", "limpieza"].find(cat =>
                    products[cat].some(p => p.id === editProduct.id)
                  )}
                  disabled
                >
                  <option value="">Categoría</option>
                  <option value="bebidas">Bebidas</option>
                  <option value="snacks">Snacks</option>
                  <option value="limpieza">Limpieza</option>
                </select>

                <div className="modal-buttons">
                  <button type="button" className="cancel" onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
                  <button type="submit" className="save">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

