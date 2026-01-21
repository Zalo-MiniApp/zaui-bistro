import {
  MutationCache,
  QueryCache,
  QueryClient,
  Query,
} from "@tanstack/react-query";
import { APIError } from "./api-error";

type QueryErrorHandler = (
  error: unknown,
  query: Query<unknown, unknown, unknown>
) => void;

type MutationErrorHandler = (error: unknown) => void;

const DEFAULT_STALE_TIME = 1 * 60 * 1000;
const DEFAULT_GC_TIME = 5 * 60 * 1000;
const MAX_RETRIES = 3;

class QueryClientProvider {
  private static instance: QueryClientProvider;
  public readonly client: QueryClient;

  private constructor(
    onQueryError?: QueryErrorHandler,
    onMutationError?: MutationErrorHandler
  ) {
    this.client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: DEFAULT_STALE_TIME,
          gcTime: DEFAULT_GC_TIME,
          refetchOnWindowFocus: false,
          maxPages: 6,
          retry: (count, error) => {
            if (error instanceof APIError && error.status === 401) return false;
            return count < MAX_RETRIES;
          },
        },
      },
      queryCache: new QueryCache({
        onError: (error, query) => {
          if (query.state.fetchFailureCount >= MAX_RETRIES) {
            onQueryError?.(error, query);
          }
        },
      }),
      mutationCache: new MutationCache({
        onError: onMutationError,
      }),
    });
  }

  public static getInstance(
    onQueryError?: QueryErrorHandler,
    onMutationError?: MutationErrorHandler
  ): QueryClient {
    if (!QueryClientProvider.instance) {
      QueryClientProvider.instance = new QueryClientProvider(
        onQueryError,
        onMutationError
      );
    }
    return QueryClientProvider.instance.client;
  }
}

export const queryClient = (
  onQueryError?: QueryErrorHandler,
  onMutationError?: MutationErrorHandler
) => QueryClientProvider.getInstance(onQueryError, onMutationError);

export { QueryClientProvider };
