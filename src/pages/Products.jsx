import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Card from "../components/Card";

const Products = () => {
  const { error, loading, products } = useSelector((state) => state.products);

  // console.log(products, loading, error);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <section className="pb-12 pt-24">
      <div className="container mx-auto sm:w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-12 grid-flow-row justify-items-center content-start">
        {products?.map((product, index) => {
          return <Card key={index} data={product} />;
        })}
      </div>
    </section>
  );
};

export default Products;
