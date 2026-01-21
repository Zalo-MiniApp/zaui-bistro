import { QueryClientProvider } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { useSnackbar } from "zmp-ui";
import { APIError } from "./api-error";
import { queryClient } from "./query-client";
import { copy } from "@/constants/copy";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openSnackbar } = useSnackbar();
  const notifyError = useCallback(
    (message: string, type: "warning" | "error") => {
      openSnackbar({ text: message, type });
    },
    [openSnackbar]
  );

  const handleQueryError = useCallback(
    (error: unknown, _query?: unknown) => {
      if (!navigator?.onLine) {
        notifyError(copy.common.networkError, "warning");
        return;
      }
      if (error instanceof APIError) {
        notifyError(error?.message ?? copy.common.error, "error");
      }
    },
    [notifyError]
  );

  const handleMutationError = useCallback(
    (error: unknown) => {
      if (!navigator?.onLine) {
        notifyError(copy.common.networkError, "warning");
        return;
      }
      if (error instanceof APIError) {
        notifyError(error?.message ?? copy.common.error, "error");
      }
    },
    [notifyError]
  );

  return (
    <QueryClientProvider
      client={queryClient(handleQueryError, handleMutationError)}
    >
      {children}
    </QueryClientProvider>
  );
}
