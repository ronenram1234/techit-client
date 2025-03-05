import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";

interface ButtonIsAdminProps {
    id:string;
    handleUpdate(id?: string): void;
    handleDelete: (id?: string) => Promise<void>;
}
 
const ButtonIsAdmin: FunctionComponent<ButtonIsAdminProps> = ({id,handleUpdate,handleDelete }) => {
    return ( <>
    
    <button
                            type="button"
                            className="btn btn-warning me-2"
                            onClick={() => handleUpdate(id)}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger "
                            onClick={() => handleDelete(id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
    </> );
}
 
export default ButtonIsAdmin;