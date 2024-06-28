import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orderHistory, setorderHistory] = useState([]);
  useEffect(() => {
    setorderHistory(JSON.parse(localStorage.getItem("order_list")));
  }, []);

  return (
    <div className="relative overflow-x-auto pt-16 pb-6">
      <h1 className="font-bold text-gray-700 text-4xl mb-5 text-center mx-auto">
        Order History
      </h1>
      <table className="container mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3">
              User Email
            </th>
            <th scope="col" className="px-6 py-3">
              No.of Products
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map((order) => {
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {order.orderId}
              </th>
              <td className="px-6 py-4">{order.customer.email}</td>
              <td className="px-6 py-4">{order.products.lenght}</td>
              <td className="px-6 py-4">{order.date}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
