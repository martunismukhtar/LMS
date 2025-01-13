"use client";

import Toast from "@/app/components/Elements/Toast/Index";
import { returnMessageState } from "@/app/Jotai/atom";
import { useAtom } from "jotai";
import { useEffect, useState, useCallback } from "react";

type StatusType = "success" | "error" | "info" | undefined;

interface ToastType {
  message: string;
  type?: StatusType;
  visible: boolean;
}

const ToastElement = () => {
  const [isVisibleToast, setReturnMessage] = useAtom(returnMessageState);

  const [toast, setToast] = useState<ToastType>({
    visible: false,
    message: "testing",
    type: undefined,
  });

  const showToast = useCallback(
    ({
      message,
      type,
    }: {
      message: string;
      type?: "success" | "error" | "info";
    }) => {
      setToast({ visible: true, message, type });
      setTimeout(() => {
        setToast({ visible: false, message: "", type: undefined });
        setReturnMessage({ visible: false, message: "" });
      }, 3000); // Toast akan hilang setelah 3 detik
    },
    [setReturnMessage]
  );

  const handleCloseToast = useCallback(() => {
    setReturnMessage({
      visible: false,
      message: "",
    });
  }, [setReturnMessage]);

  useEffect(() => {
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
  }, [isVisibleToast, showToast]);

  return (
    <>
      {isVisibleToast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
    </>
  );
};

export default ToastElement;
