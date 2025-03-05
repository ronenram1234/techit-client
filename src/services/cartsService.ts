import axios from "axios";

import { getProductById } from "./productsService";

const api: string = `${process.env.REACT_APP_API}/carts`;



export async function getProductsFromCart() {
  return axios.get(api, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token") as string),
    },
  });
}

export async function addProductIdToCart(productId: string) {
  return axios.patch(
    api,
    { productId },
    {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token") as string),
      },
    }
  );
}
