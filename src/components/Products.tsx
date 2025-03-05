import { FunctionComponent, useEffect, useState } from "react";
import { getAllProducts, getProductById } from "../services/productServices";
import { Product } from "../interfaces/Product";
import { User } from "../interfaces/User";
import ModalUpdtaeAdd from "./ModalUpdtaeAdd";
import ButtonAddProduct from "./ButtonAddProduct";

import { addProductIdToCart } from "../services/cartService";
import ProductCard from "./ProductCard";

// const SharedStateContext = createContext();

interface ProductsProps {
  userApp: User;
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Products: FunctionComponent<ProductsProps> = ({
  userApp,
  cart,
  setCart,
}) => {
  // const navigate: NavigateFunction = useNavigate();
  // const location = useLocation();

  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    category: "",
    description: "",
    image: "",
  });
  const [isProductChange, setIsProductChange] = useState<boolean>(true);
  // const [shouldCartUpdate, setShouldCartUpdate] = useState<boolean>(true);

  const [modalShow, setModalShow] = useState(false);
  const [modalAction, setModalAction] = useState("add");

  useEffect(() => {
    getAllProducts()
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.log(err));
  }, [isProductChange]);

  // useEffect(() => {
  //   if (shouldCartUpdate === true) {
  //     setShouldCartUpdate(false);
  //   }
  // }, [shouldCartUpdate]);

  function addCart(product: Product) {
    // const myCart:Product[] = [];
    const tempCart: Product[] = [];

    product.id &&
      userApp.id &&
      addProductIdToCart(product.id, userApp.id)
        .then((res) => {
          let promises = [];
          for (let key of res.data.products) {
            promises.push(getProductById(key));
          }
          Promise.all(promises)
            .then((res) => {
              console.log(res);

              res.map((item)=> tempCart.push(item.data[0]))
              console.log(tempCart)
              setCart(tempCart);
            })
            .catch((err) => console.log(err));
        })
        //       tempCart.push(res.data[0]);

        // res.data.products.map((key: string) => {
        //   getProductById(key)
        //     .then((res) => {
        //       tempCart.push(res.data[0]);

        //       setCart(tempCart);
        //       // setShouldCartUpdate(true)
        //     })
        //     .catch((err) => console.log(err));
        // });

        .catch((err) => console.log(err));
  }

  function addProduct() {
    let selected: Product = {
      id: "",
      name: "",
      price: 0,
      category: "",
      description: "",
      image: "",
    };
    setModalAction("add");
    setSelectedProduct(selected);
    setModalShow(true);
  }

  return (
    <>
      <h1 className="text-center">Products</h1>

      {userApp.isAdmin ? <ButtonAddProduct addProduct={addProduct} /> : <></>}
      <div className="container text-center">
        <div className="row">
          {allProducts.map((product) => (
            <ProductCard
              product={product}
              addCart={addCart}
              isAdmin={userApp.isAdmin}
              isProductChange={isProductChange}
              setIsProductChange={setIsProductChange}
              allProducts={allProducts}
              setSelectedProduct={setSelectedProduct}
              setModalAction={setModalAction}
              setModalShow={setModalShow}
            />
          ))}
        </div>
      </div>

      <ModalUpdtaeAdd
        show={modalShow}
        // setModalShow={setModalShow}
        onHide={() => setModalShow(false)}
        modalAction={modalAction}
        selectedProduct={selectedProduct}
        isProductChange={isProductChange}
        setIsProductChange={setIsProductChange}
      />
    </>
  );
};

export default Products;
