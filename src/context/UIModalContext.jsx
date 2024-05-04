import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const UIModalContext = createContext();

export const UIModalProvider = ({ children }) => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState();

  // Effect
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handlers
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSetModalForm = (formName) => {
    setModalForm(formName);
  };

  // Custom toast
  const showToast = (type, message) => {
    if (type === "success") {
      toast.success(message, { autoClose: 1500 });
    } else if (type === "error") {
      toast.error(message, { autoClose: 1500 });
    } else {
      toast.info(message, { autoClose: 1500 });
    }
  };

  console.log(modalForm);

  // Memo
  const UIModalContextValue = useMemo(
    () => ({
      isModalOpen,
      handleOpenModal,
      handleCloseModal,
      showToast,
      handleSetModalForm,
      modalForm,
    }),
    [isModalOpen, modalForm]
  );

  return (
    <UIModalContext.Provider value={UIModalContextValue}>
      {children}
    </UIModalContext.Provider>
  );
};

export const useUIModal = () => {
  return useContext(UIModalContext);
};
