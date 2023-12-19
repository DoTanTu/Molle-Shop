import React, { useState, useEffect } from 'react';
import { Link, useNavigate , useParams } from 'react-router-dom';
import productService from '../service/ProductService';

function EditProduct() {
    const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [name, setName] = useState('');
  const [cate, setCate] = useState('');
  const [price, setPrice] = useState('');
  const [desShort, setDesShort] = useState('');
  const [pathImage, setPathImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responData = await productService.getProductById(params.id);
        setProduct(responData);
        setName(responData.title || '');
        setCate(responData.category || '');
        setPrice(responData.price || '');
        setDesShort(responData.shortdescription || '');
        setPathImage(responData.image || '');
        setDescription(responData.description || '');
      } catch (error) {
        console.log('Lỗi', error);
      }
    };
    fetchData();
  }, [params.id]);

  const resetValue = () => {
    setName('');
    setCate('');
    setPrice('');
    setDesShort('');
    setPathImage('');
    setDescription('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataProduct = {
      title: name,
      category: cate,
      price: price,
      shortdescription: desShort,
      image: pathImage,
      description: description,
      status: 'IN STOCK',
    };
    try {
       productService.updateProduct(product.id,dataProduct);
      alert('Cập nhật sản phẩm thành công');
      resetValue();
      navigate(-1);
    } catch (error) {
      alert('Cập nhật lỗi!');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="header">
        <h1 className="mt-3 font-semibold text-3xl">Edit sản phẩm</h1>
      </div>
      <div className="main__contain mt-10 bg-slate-700 px-5 py-4 rounded-lg">
        <div className="top_title border-b border-b-gray-400 pb-5">
          <h3 className="text-2xl font-semibold">Chỉnh sửa thông tin sản phẩm</h3>
        </div>
        <div className="input_infor_prod mt-10">
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-10">
              <div className="col-span-1">
                <input
                  className="w-full bg-slate-700 border-b py-2 outline-none"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên sản phẩm"
                />
              </div>
              <div className="col-span-1">
                <input
                  className="w-full bg-slate-700 border-b py-2 outline-none"
                  type="text"
                  value={cate}
                  onChange={(e) => setCate(e.target.value)}
                  placeholder="Nhập danh mục"
                />
              </div>
              <div className="col-span-1">
                <input
                  className="w-full bg-slate-700 border-b py-2 outline-none"
                  type="text"
                  value={desShort}
                  onChange={(e) => setDesShort(e.target.value)}
                  placeholder="Nhập mô tả ngắn"
                />
              </div>
              <div className="col-span-1">
                <input
                  className="w-full bg-slate-700 border-b py-2 outline-none"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Nhập giá"
                />
              </div>
              <div className="col-span-1">
                <input
                  className="w-full bg-slate-700 border-b py-2 outline-none"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Nhập mô tả chi tiết"
                />
              </div>
             
              <div className="col-span-1">
                <input
                  className="w-full bg-slate-700 border-b py-2 outline-none"
                  type="text"
                  value={pathImage}
                  onChange={(e) => {
                    setPathImage(e.target.value);
                  }}
                  placeholder="Nhập đường dẫn ảnh"
                />
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <img src={pathImage} className=" bg-slate-700 py-2 outline-none object-cover w-64 h-72 "
                />
              </div>
            </div>
            <div className="btn_submit flex justify-center mt-10">
              <button
                type="submit"
                className="px-5 py-2 bg-violet-700 mr-5 rounded-3xl hover:bg-violet-500"
              >
                Cập nhật
              </button>
              <Link to="/all-products">
                <button className="px-5 py-2 bg-red-600 rounded-3xl hover:bg-red-500">
                  Hủy bỏ
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
