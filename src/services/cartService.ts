import axios from "axios";
import { Cart } from "../interfaces/Cart";

const api: string = `${process.env.REACT_APP_API}/Carts`;

export function getCartbyUserId(id: string): Promise<any> {
  return axios.get(`${api}?userId=${id}`);
}

export async function addProductIdToCart(
  productId: string,
  userId: string
): Promise<any> {
  try {
    const res = await getCartbyUserId(userId);
    

    if (res.data.length > 1) throw "Multiple open carts";

    const cart: Cart = res.data[0];
    cart.products.push(productId);

    // console.log(`${api}?userId=${userId}`);

    return axios.patch(`${api}/${cart.id}`, cart);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
