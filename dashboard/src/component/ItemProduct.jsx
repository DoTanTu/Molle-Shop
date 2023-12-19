import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productService from "../service/ProductService";
function ItemProduct() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const responData = await productService.getProducts();
      setProducts(responData);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };
  const handleDelete = async (productId) => {
    const isConfirmed = window.confirm('Bạn có chắc muốn xóa sản phẩm này?');
    if (isConfirmed) {
      try {
        productService.deleteProduct(productId);
        alert('Xóa thành công!');
        fetchData();
      } catch (error) {
        alert('Xóa thất bại!');
      }
    }
  }

  return (
    <>
      {products.map((product, index) => (
        <tr key={product.id} className="bg-slate-600 font-semibold border-b-slate-300 hover:bg-slate-900 text-gray-400">
          <th
            scope="row"
            className="px-6 py-2 font-medium text-gray-300 whitespace-nowrap"
          >
            <div className="flex items-center">
              <input
                id="checkbox-table-search-2"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
              />
              <label htmlFor="checkbox-table-search-2" className="sr-only">
                checkbox
              </label>
            </div>
          </th>
          <th className="px-6 py-2 ">
            <div className="w-11 h-11 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={product.image}
                alt=""
              />
            </div>
          </th>
          <th className="px-6 py-2 ">{product.title}</th>
          <td className="px-6 py-2">{product.category}</td>
          <td className="px-6 py-2">{product.status}</td>
          <td className="px-6 py-2 overflow-x-hidden overflow-y-hidden truncate max-w-xs">
            {product.description}
          </td>
          <td className="px-6 py-2 whitespace-nowrap">{`${product.price} VND`}</td>
          <td className="px-6 py-2 text-right">
            <div className="flex items-center justify-end">
              <Link to={`/product/${product.id}`}>
                <span className="w-8 h-8 rounded-lg bg-green-300 opacity-80 text-green-100 hover:bg-green-500 hover:text-white  px-2 py-2 font-medium mr-3 flex items-center hover:underline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                  </svg>
                </span>
              </Link>
              <button onClick={() => handleDelete(product.id)}  className="font-medium w-8 h-8 rounded-lg bg-orange-500 px-2 py-2 opacity-80 hover:bg-orange-600 hover:text-white hover:opacity-1 text-red-300 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default ItemProduct;
