"use client";

import { FormState } from "@/types/formState";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

export default function useFeedback() {
  const showMessage = useCallback((result: FormState) => {
    if (!result?.message) return;
    result.success
      ? toast.success(result.message)
      : toast.error(result.message);
  }, []);
  return { showMessage };
}