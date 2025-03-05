import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";

interface ButtonAddProductProps {
    addProduct(): void;
}
 
const ButtonAddProduct: FunctionComponent<ButtonAddProductProps> = ({addProduct}) => {
    return (<>
       <button
            type="button"
            className="btn btn-primary me-2"
            onClick={() => addProduct()}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Product
          </button>
    </>  );
}
 
export default ButtonAddProduct;