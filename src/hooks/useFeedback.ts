"use client";

import React, { useCallback } from "react";
import toast from "react-hot-toast";

interface FeedBackResult {
  success: boolean;
  message: string;
}

export default function useFeedback() {
  const showMessage = useCallback((result: FeedBackResult) => {
    if (!result?.message) return;
    result.success
      ? toast.success(result.message)
      : toast.error(result.message);
  }, []);
  return { showMessage };
}