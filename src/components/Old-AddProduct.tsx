import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Product } from "../interfaces/Product";
import { addNewProduct } from "../services/productServices";
import { errorMsg, successMsg } from "../services/feedbackService";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';

interface AddProductProps {

    
}
 
const AddProduct: FunctionComponent<AddProductProps> = () => {

    


    

    // In AddProduct/UpdateProduct:
    const { isProductChange, setIsProductChange } = useOutletContext<{
      isProductChange: boolean;
      setIsProductChange: (value: boolean) => void;
    }>();




    const navigate: NavigateFunction = useNavigate();
    const formik = useFormik<Product>({
        initialValues: {
          
          id:"",
          name: "",
          price: 0,
          category: "",
          description: "",
          image: "",
          
        //   id:"",
        //   name: "test",
        //   price: 100,
        //   category: "test 123",
        //   description: "test test",
        //   image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6582/6582841_sd.jpg",
          

        },
        validationSchema: yup.object({
          
          
          name: yup.string().required(),
          price: yup.number().required().moreThan(0),
          category: yup.string().required(),
          description: yup.string().required(),
          image: yup.string().url().required(),

        }),
        onSubmit: async (values) => {
            addNewProduct(values)
            .then((res) => {
             
                console.log(res.data);
             
                setIsProductChange(!isProductChange);
             
                successMsg("AddnewProduct");
                navigate("/products");
             
            })
            .catch((err) => {
              console.log(err);
              errorMsg(err);
            });
        },
      });
    

    return ( <>
    

   


   

    <div className="container d-flex justify-content-center align-item-center flex-column col-4">
        <h5 className="display-5 my-2">Add New Product</h5>
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
            Add Product
          </button>
        </form>
        
      </div>
    
    
    </> );
}
 
export default AddProduct;