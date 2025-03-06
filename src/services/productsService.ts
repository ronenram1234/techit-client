import axios from "axios";
import { Product } from "../interfaces/Product";

const api: string = `${process.env.REACT_APP_API}/products`;

// get all products
export function getAllProducts() {
  return axios.get(api, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token") as string),
    },
  });
}

// get product by id
export function getProductById(id: string) {
  return axios.get(`${api}/${id}`, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token") as string),
    },
  });
}

// add new product
export function addNewProduct(product: Product) {
  return axios.post(api, product, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token") as string),
    },
  });
}

// update product
export function changeProductDetails(product: Product) {
  const productCopy = { ...product };
  delete productCopy._id;

  // delete productCopy.quantity;

  return axios.put(`${api}/${product._id}`, productCopy, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token") as string),
    },
  });
}

// delete product
export function deleteProduct(id: string) {

  return axios.patch(
    `${api}/${id}`,
    { available: false },
    {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token") as string),
      },
    }
  );
}
