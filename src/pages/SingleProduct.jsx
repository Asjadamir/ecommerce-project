import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../features/SingleProductSlice";
import Carousal from "../components/carousal";
import Loader from "../components/Loader";
import { addCartItem } from "../helpers/cart";

const SingleProduct = () => {
  const { id } = useParams();
  let { loading, error, singleProduct } = useSelector(
    (state) => state.singleProduct
  );
  const options = {
    method: "GET",
    url: "https://real-time-product-search.p.rapidapi.com/product-details",
    params: {
      product_id: id,
      country: "us",
      language: "en",
    },
    headers: {
      "x-rapidapi-key": "a3eb2719cfmshef19ce1681f4dcdp172284jsn003c7654d8a5",
      "x-rapidapi-host": "real-time-product-search.p.rapidapi.com",
    },
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleProduct(options));
  }, []);

  console.log(singleProduct, loading, error);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }
  return (
    <section className="pt-24">
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <Carousal images={singleProduct?.product_photos} />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-full px-2">
                  <button
                    onClick={() => {
                      addCartItem(singleProduct);
                    }}
                    className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {singleProduct.product_title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {singleProduct.product_attributes?.Material}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 ">Price:</span>
                  <span className="text-gray-600 ">
                    ${singleProduct.product_price}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 ">
                    Availability:
                  </span>
                  <span className="text-gray-600 ">In Stock</span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700">Select Color:</span>
                <div className="flex items-center mt-2">
                  <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Size:
                </span>
                <div className="flex items-center mt-2">
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    S
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    M
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    L
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XL
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XXL
                  </button>
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {singleProduct.product_description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;