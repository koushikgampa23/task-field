import { Button } from "react-bootstrap";
import classes from "./Header.module.css";
import { IoSave } from "react-icons/io5";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";
import { IoIosWarning } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Header = ({ data, toggle, onSubmit }: any) => {
  const taskData = collection(db, "taskData");
  const handleSubmit = async () => {
    try {
      await addDoc(taskData, { ...data });
      toast.success("Data Inserted", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (e) {
      toast.error(
        "Failed to Insert Data please fill all required fields and enter valid entries",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const data = await getDocs(taskData);
  //       const filteredData = data.docs.map((doc) => ({
  //         ...doc.data,
  //         id: doc.id,
  //       }));
  //       console.log(filteredData);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getData();
  // }, [taskData]);
  return (
    <div className={classes.background}>
      <div>
        <span>Header Information</span>
        {!toggle && (
          <span>
            (<IoIosWarning />
            Warning: The active is off){" "}
          </span>
        )}
      </div>
      <ToastContainer />
      <Button
        variant="warning"
        className={classes.buttonContainer}
        onClick={handleSubmit}
      >
        <IoSave />
        Save
      </Button>
    </div>
  );
};
