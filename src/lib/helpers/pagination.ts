export const ITEMS_PER_PAGE = 5;

export interface PaginationResult<T> {
	items: T[];
	totalItems: number;
	totalPages: number;
	currentPage: number;
}

export function paginate<T>(items: T[], page: number): PaginationResult<T> {
	const currentPage = Math.max(1, page);
	const totalItems = items.length;
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

	return {
		items: paginatedItems,
		totalItems,
		totalPages,
		currentPage,
	};
}

export function buildPaginationUrl(basePath: string, page: number, params: Record<string, string | undefined>): string {
	const urlParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value) urlParams.set(key, value);
	});

	urlParams.set("page", page.toString());
	return `${basePath}?${urlParams.toString()}`;
}
