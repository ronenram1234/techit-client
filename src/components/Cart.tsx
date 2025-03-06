import { FunctionComponent, useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { getProductsFromCart } from "../services/cartsService";

// interface CartProps {}

const Cart: FunctionComponent = () => {
  
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getProductsFromCart();
        setCart(res.data); // Update state
      } catch (err) {
        console.error(err);
      }
    };

    fetchCart();

  }, []);

  return (
    <>
      <h1>Cart</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Descrption</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item: Product) => (
            <>
              {/* {console.log(item)} */}
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Cart;
