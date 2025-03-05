import { FunctionComponent } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { Product } from "../interfaces/Product";
import { addNewProduct, changeProductDetails } from "../services/productServices";
import { errorMsg, successMsg } from "../services/feedbackService";


interface UpdateAddProps {
  selectedProduct: Product;
  modalAction: string;
  isProductChange: boolean;
  setIsProductChange: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalUpdate: any;
}


const UpdateAdd: FunctionComponent<UpdateAddProps> = ({
  selectedProduct,
  modalAction,
  isProductChange,
  setIsProductChange,
  handleModalUpdate,
}) => {
  // function handleChange() {
  //   setIsProductChange(!isProductChange);
  //   console.log("1");
  // }

  const formik = useFormik<Product>({
    initialValues: {
      // id: selectedProduct?.id || "",
      name: selectedProduct?.name || "",
      price: selectedProduct?.price || 0,
      category: selectedProduct?.category || "",
      description: selectedProduct?.description || "",
      image: selectedProduct?.image || "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      price: yup.number().required().moreThan(0),
      category: yup.string().required(),
      description: yup.string().required(),
      image: yup.string().url().required(),
    }),
    onSubmit: async (values) => {
      if (modalAction === "add") {

        addNewProduct(values)
        .then((res) => {
         
            // console.log(res.data);
         
            setIsProductChange(!isProductChange);
         
            successMsg("AddnewProduct");
            // navigate("/products");
            handleModalUpdate()
         
        })
        .catch((err) => {
          console.log(err);
          errorMsg(err);
        });




      } else {


          if (!selectedProduct?.id) {
            throw new Error("Product ID is missing");
          }

          changeProductDetails(
            selectedProduct.id,
            values
          )
          .then((res)=>{

            setIsProductChange(!isProductChange);
            successMsg("Product updated successfully");
            handleModalUpdate()

          })
          .catch((err)=>{
            console.log(err);
            errorMsg(err);
          })



        
      }
    },
  });

  return (
    <>
      <div className="container d-flex justify-content-center align-item-center flex-column col-12">
        {/* <h5 className="display-5 my-2">Update Product</h5> */}
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="John dow"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Name</label>
            {formik.touched.name && formik.errors.name && (
              <p className="text-danger">{formik.errors.name}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="floatingInput"
              placeholder="100"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Price</label>
            {formik.touched.price && formik.errors.price && (
              <p className="text-danger">{formik.errors.price}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder=""
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Category</label>
            {formik.touched.category && formik.errors.category && (
              <p className="text-danger">{formik.errors.category}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder=""
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Description</label>
            {formik.touched.description && formik.errors.description && (
              <p className="text-danger">{formik.errors.description}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder=""
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Image URL</label>
            {formik.touched.image && formik.errors.image && (
              <p className="text-danger">{formik.errors.image}</p>
            )}
          </div>

          <button
            className="btn btn-primary    col-4"
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
            //   onClick={console.log("update")}
          >
            {modalAction === "add" ? "Add Product" : "Update Product"}
          </button>
          <button
            className="btn btn-primary mx-3  col-4"
            type="button"
            onClick={() => handleModalUpdate()}
          >
            Close
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateAdd;
