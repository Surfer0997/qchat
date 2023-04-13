import { toast } from "react-toastify";

export const showToast = (type: "SUCCESS" | "ERROR" | "INFO", msg: string) => {
  switch (type) {
    case "SUCCESS":
      toast.success(msg, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      break;
    case "ERROR":
      toast.error(msg, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      break;
    case "INFO":
      toast.info(msg, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      break;
    default:
      return false;
  }
};
