import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../helpers/cart";
import { validationSchema } from "../schema/checkout";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
};
const CheckoutForm = () => {
  let navigate = useNavigate();
  const [orderId, setorderId] = useState("");
  useEffect(() => {
    let cart_products = JSON.parse(localStorage.getItem("cart_products"));
    if (cart_products.length == 0) {
      navigate("/cart");
    }
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).slice(2);
    setorderId(`${timestamp}-${randomPart}`);
  }, []);

  let { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values, actions) => {
        let cart_products = JSON.parse(localStorage.getItem("cart_products"));
        let order = {
          customer: values,
          products: cart_products,
          orderId: orderId,
          date: new Date(),
        };
        console.log(order);
        let order_list = JSON.parse(localStorage.getItem("order_list"));
        if (!order_list) {
          order_list = [];
        }
        order_list.push(order);
        console.log(order_list);
        localStorage.setItem("order_list", JSON.stringify(order_list));
        clearCart();
        actions.resetForm();
        navigate("/cart");
      },
    });

  return (
    <div className="relative w-screen h-screen min-h-fit flex items-center justify-center bg-gray-200 ">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-md"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            className="form_input peer"
            required
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
          />
          <label
            htmlFor="name"
            className="input_label peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
          {errors.name && touched.name ? (
            <p className="text-red-800 font-semibold text-sm">{errors.name}</p>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="address"
            id="address"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address}
            className="form_input peer"
            required
          />
          <label
            htmlFor="address"
            className="input_label peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Address
          </label>
          {errors.address && touched.address ? (
            <p className="text-red-800 font-semibold text-sm">
              {errors.address}
            </p>
          ) : null}
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tell"
              name="phone"
              id="phone"
              className="form_input peer"
              placeholder=" "
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <label
              htmlFor="phone"
              className="input_label peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
            {errors.phone && touched.phone ? (
              <p className="text-red-800 font-semibold text-sm">
                {errors.phone}
              </p>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="form_input peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="input_label peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            {errors.email && touched.email ? (
              <p className="text-red-800 font-semibold text-sm">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>
        <button
          type="submit"
          disabled={
            errors.address && errors.email && errors.name && errors.phone
          }
          className="submit_btn"
        >
          Submit
        </button>
      </form>
      ;
    </div>
  );
};

export default CheckoutForm;
