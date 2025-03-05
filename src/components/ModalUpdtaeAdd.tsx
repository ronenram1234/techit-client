import { FunctionComponent } from "react";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import { Product } from "../interfaces/Product";
import UpdateAdd from "./UpdateAdd";

interface ModalUpdtaeAddProps {
  show: boolean;
//   setModalShow:React.Dispatch<React.SetStateAction<boolean>>;
  onHide: any;
  modalAction:string;
  selectedProduct:Product;
  isProductChange:boolean;
  setIsProductChange:React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalUpdtaeAdd: FunctionComponent<ModalUpdtaeAddProps> = ({
  show,
//   setModalShow,
  onHide,modalAction,selectedProduct,
  isProductChange,
  setIsProductChange,
}) => {
//   console.log(show);
//   console.log(onHide);
//   console.log("modal components");
// console.log(selectedProduct)

function handleModalUpdate(){
    // setModalShow(false)
    console.log("handle")
    onHide()
}


  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modalAction==="add"? ("Add New Product") :("Update Product")}
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <UpdateAdd  selectedProduct={selectedProduct} modalAction={modalAction} isProductChange={isProductChange} setIsProductChange={setIsProductChange}
      handleModalUpdate={handleModalUpdate}/>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={onHide}>Close</Button>
          <Button onClick={handleUpdate}>{modalAction==="add"? ("Add") :("Update")}</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdtaeAdd;
