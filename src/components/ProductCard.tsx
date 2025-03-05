import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import ButtonIsAdmin from "./ButtonIsAdmin";
import { Product } from "../interfaces/Product";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { deleteProduct } from "../services/productServices";
import { errorMsg, successMsg } from "../services/feedbackService";

interface ProductCardProps {
  product: Product;
  addCart(product: Product): void;
  isAdmin?: boolean;
  isProductChange: boolean;
  setIsProductChange: React.Dispatch<React.SetStateAction<boolean>>;
  allProducts: Product[];

  setSelectedProduct: React.Dispatch<React.SetStateAction<Product>>;
  setModalAction: React.Dispatch<React.SetStateAction<string>>;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProdectCard: FunctionComponent<ProductCardProps> = ({
  product,
  addCart,
  isAdmin,
  isProductChange,
  setIsProductChange,
  allProducts,

  setSelectedProduct,
  setModalAction,
  setModalShow,
  
}) => {
  const handleDelete = async (id: string = "") => {
    try {
      if (!id) {
        throw new Error("Product ID is missing");
      }

      const response = await deleteProduct(id);

      if (response.data) {
        setIsProductChange(!isProductChange);
        successMsg("Product deleted successfully");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      errorMsg("Failed to delete product");
    }
  };

  function handleUpdate(id: string = "") {
    const selected = allProducts.find((prod) => prod.id === id);
    if (selected) {
      setSelectedProduct(selected);
      setModalAction("update");
      setModalShow(true);
    }
  }

  return (
    <>
      <div className="col mb-3">
        <div
          className="card h-100 "
          style={{
            width: "18rem",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{product.category}</h5>
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>

            <p className="card-text">Price -${product.price}</p>

            <div className="d-flex flex-row justify-content-center mt-auto">
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={() => addCart(product)}
              >
                <FontAwesomeIcon icon={faCartShopping} />
                Add to Cart
              </button>
              {isAdmin && product.id && (
                <>
                  <ButtonIsAdmin
                    id={product.id}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProdectCard;
