import { Box, Button, HStack } from "@chakra-ui/react";
import { usePagination } from "@refinedev/chakra-ui";

interface PaginationProps {
  current: number;
  pageCount: number;
  setCurrent: (page: number) => void;
}

export function Pagination({ current, pageCount, setCurrent }: PaginationProps) {
  const pagination = usePagination({
    current,
    pageCount,
  });

  return (
    <Box display="flex" justifyContent="flex-end">
      <HStack my="3" spacing="1">
        {pagination?.prev && (
          <Button
            aria-label="previous page"
            onClick={() => setCurrent(current - 1)}
            disabled={!pagination?.prev}
            variant="outline"
          >
            Prev
          </Button>
        )}

        {pagination?.items.map((page) => {
          if (typeof page === "string") return <span key={page}>...</span>;

          return (
            <Button
              key={page}
              onClick={() => setCurrent(page)}
              variant={page === current ? "solid" : "outline"}
            >
              {page}
            </Button>
          );
        })}
        {pagination?.next && (
          <Button aria-label="next page" onClick={() => setCurrent(current + 1)} variant="outline">
            Next
          </Button>
        )}
      </HStack>
    </Box>
  );
}
