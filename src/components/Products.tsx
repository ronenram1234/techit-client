import { FunctionComponent, useEffect, useState } from "react";
import { getAllProducts, getProductById } from "../services/productsService";
import { Product } from "../interfaces/Product";
import { User } from "../interfaces/User";
import ModalUpdtaeAdd from "./ModalUpdtaeAdd";
import ButtonAddProduct from "./ButtonAddProduct";

import { addProductIdToCart } from "../services/cartsService";
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
    _id: "",
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
    const fetchP = async () => {
      try {
        const res = await getAllProducts();
        setAllProducts(res.data);
        // console.log(res.data);
      } catch (err) {

      }
    };
    fetchP();
  }, [isProductChange]);

  

  function addCart(product: Product) {
    // const myCart:Product[] = [];
    const tempCart: Product[] = [];

    product._id &&
      userApp._id &&
      addProductIdToCart(product._id)
        .then((res) => {
         
        })
       

        .catch((err) => console.log(err));
  }

  function addProduct() {
    let selected: Product = {
      _id: "",
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
