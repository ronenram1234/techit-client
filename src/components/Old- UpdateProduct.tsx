import { FunctionComponent, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Product } from "../interfaces/Product";
import { changeProductDetails } from "../services/productServices";
import { errorMsg, successMsg } from "../services/feedbackService";
import axios from "axios";

interface UpdateProductProps {}

const UpdateProduct: FunctionComponent<UpdateProductProps> = () => {
  const navigate: NavigateFunction = useNavigate();

  // In AddProduct/UpdateProduct:
  const { isProductChange, setIsProductChange, selectedProduct } =
    useOutletContext<{
      isProductChange: boolean;
      setIsProductChange: (value: boolean) => void;
      selectedProduct: Product;
    }>();

  //   console.log(selectedProduct)

  useEffect(() => {
    if (!selectedProduct) {
      errorMsg("No product selected for update");
      navigate("/products");
    }
  }, [selectedProduct, navigate]);

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
      try {


        if (!selectedProduct?.id) {
          throw new Error("Product ID is missing");
        }

        const response = await changeProductDetails(selectedProduct.id, values);

        if (response.data) {
          setIsProductChange(!isProductChange);
          successMsg("Product updated successfully");
          navigate("/products");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          errorMsg(`Update failed: ${error.response?.data || error.message}`);
        } else {
          console.error("Update Error:", error);
          errorMsg(
            error instanceof Error ? error.message : "Failed to update product"
          );
        }

        
      }
    },
  });

  return (
    <>
      <div className="container d-flex justify-content-center align-item-center flex-column col-4">
        <h5 className="display-5 my-2">Update Product</h5>
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
            className="btn btn-primary mt-3 w-100"
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
          >
            Update Product
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
