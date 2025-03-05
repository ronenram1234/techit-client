import axios from "axios";
import { Product } from "../interfaces/Product";


const api: string = `${process.env.REACT_APP_API}/Products`;

export function  checkProductById(id:string){

    return axios.get(`${api}?id=${id}`)
}

export function  getProductById(id:string){

    return axios.get(`${api}?id=${id}`)
}

export function addNewProduct(product:Product){
    // product.id=String(Math.floor(Math.random()*1000))
    return axios.post(`${api}`,product)

}


export function getAllProducts(){
    return axios.get(`${api}`)
}

export function changeProductDetails(id:string,product:Product){



        return axios.put(`${api}/${id}`, product);
        
        // If that doesn't work, try these alternatives:

}

export function deleteProduct(id:string){
    return axios.delete(`${api}/${id}`)
}