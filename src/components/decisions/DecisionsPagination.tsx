import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface DecisionsPaginationProps {
	currentPage: number;
	totalPages: number;
	buildPageUrl: (page: number) => string;
}

export function DecisionsPagination({ currentPage, totalPages, buildPageUrl }: DecisionsPaginationProps) {
	if (totalPages <= 1) return null;

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={currentPage > 1 ? buildPageUrl(currentPage - 1) : undefined}
						aria-disabled={currentPage <= 1}
						className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
					/>
				</PaginationItem>

				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
					<PaginationItem key={page}>
						<PaginationLink href={buildPageUrl(page)} isActive={page === currentPage}>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						href={currentPage < totalPages ? buildPageUrl(currentPage + 1) : undefined}
						aria-disabled={currentPage >= totalPages}
						className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
