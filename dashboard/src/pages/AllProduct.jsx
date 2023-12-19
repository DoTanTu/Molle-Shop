import React from 'react'
import { Link } from 'react-router-dom';
import ItemProduct from '../component/ItemProduct';
function AllProduct() {
  return (
    <div className="heading_contain">
      <h2 className="mt-3 font-semibold text-3xl">Tất cả sản phẩm</h2>
      <div className="filter flex mt-6 justify-between">
        <div className="flex">
          <div className="filter_cate mr-10">
            <select className="px-5 py-2 text-white border-gray-100 bg-slate-700 rounded-sm">
              <option value="">Danh mục</option>
              <option value="">Áo Nam</option>
              <option value="">Áo Nam</option>
              <option value="">Áo Nam</option>
            </select>
          </div>
          <div className="filter_price">
            <select className="px-5 py-2 text-white border-gray-100 bg-slate-700 rounded-sm">
              <option value="">Mức giá</option>
              <option value="">Áo Nam</option>
              <option value="">Áo Nam</option>
              <option value="">Áo Nam</option>
            </select>
          </div>
        </div>
        <div className="div">
            <Link to="/new-product">
            <span className="new-prod flex items-center bg-indigo-800 hover:bg-indigo-600 py-2 px-3 rounded-md font-semibold text-sm"
          >
            <span className="mr-2">Thêm mới</span>
            <svg
              className="w-5 font-bold"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
            </Link>
        </div>
      </div>
      <div className="contain_prod bg-slate-700 mt-5 rounded-lg px-5 py-4">
        <div className="list_prod">
          <div className="relative">
            <table className="w-full flex-1 text-sm text-left rtl:text-right text-gray-500 border border-slate-800 ">
              <thead className="text-xs text-gray-200 uppercase bg-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-slate-700 border-gray-200 rounded focus:ring-blue-500  focus:ring-2 dark:bg-gray-700"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-4">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <ItemProduct />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProduct