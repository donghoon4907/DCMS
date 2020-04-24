import { toast } from "react-toastify";
// 토스트 작성
export const showToast = ({
  type,
  message,
  position = toast.POSITION.BOTTOM_RIGHT
}) => {
  switch (type) {
    case "info": {
      toast.info(message, {
        position
      });
      break;
    }
    case "success": {
      toast.success(message, {
        position
      });
      break;
    }
    case "warn": {
      toast.warn(message, {
        position
      });
      break;
    }
    case "error": {
      toast.error(message, {
        position
      });
      break;
    }
    default: {
      toast(message, {
        position
      });
      break;
    }
  }
};
