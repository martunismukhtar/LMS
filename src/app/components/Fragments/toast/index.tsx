"use client";

import Toast from "@/app/components/Elements/Toast/Index";
import { returnMessageState } from "@/app/Jotai/atom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

type StatusType = "success" | "error" | "info" | undefined;
interface ToastType {
    message: string;
    type?: StatusType;
    visible: boolean
}

const ToastElement = () => {
  const [isVisibleToast, setReturnMessage] = useAtom(returnMessageState);

  const [toast, setToast] = useState<ToastType>({
    visible: false,
    message: "testing",
    type: undefined,
  });

  const showToast = ({
    message,
    type,
  }: {
    message: string;
    type?: "success" | "error" | "info";
  }) => {
    setToast({ visible: true, message, type: type? type:undefined});
    setTimeout(() => {
      setToast({ visible: false, message: "", type: type? type:undefined });
      setReturnMessage({ visible: false, message: "" });
    }, 3000); // Toast akan hilang setelah 3 detik
  };

  const handleCloseToast = () => {    
    setReturnMessage({
        visible: false,
        message: "",
        // type: "",
      });
  };

  useEffect(() => {    
    console.log(`isVisibleToast : ${JSON.stringify(isVisibleToast)}`);
    if (isVisibleToast.visible) {
      if (isVisibleToast.type === "error") {
        showToast({
          message: `Terjadi kesalahan : ${isVisibleToast.message}`,
          type: "error",
        });
      } else if (isVisibleToast.type === "success") {
        showToast({ message: `${isVisibleToast.message}`, type: "success" });
      }       
    }
  }, [isVisibleToast.visible]);

  return (
    <>
      {isVisibleToast.visible ? (
        <Toast
          message={toast.message}
          type={toast.type ? toast.type: undefined}
          onClose={handleCloseToast}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default ToastElement;
