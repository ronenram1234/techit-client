import { FunctionComponent } from "react";
import { Product } from "../interfaces/Product";

interface CartProps {
  cart: Product[];
}

const Cart: FunctionComponent<CartProps> = ({ cart }) => {
  console.log(cart);
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
          {cart.map((item) => (
            <>
            {/* {console.log(item)} */}
            <tr key={item.id}>
              <td >{item.name}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
            </tr>
            </>   ))}
        </tbody>
      </table>
    </>
  );
};

export default Cart;
