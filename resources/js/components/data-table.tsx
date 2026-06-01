import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey?: string;
    searchPlaceholder?: string;
    searchNumeric?: boolean;
    total: number;
    from: number;
    to: number;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    lastPage?: number;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    searchPlaceholder = 'Cari...',
    searchNumeric = false,
    total,
    from,
    to,
    onPageChange,
    currentPage = 1,
    lastPage = 1,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = searchNumeric ? e.target.value.replace(/\D/g, '') : e.target.value;
        table.getColumn(searchKey ?? '')?.setFilterValue(value);
    }

    function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (!searchNumeric) return;
        if (
            !/^\d$/.test(e.key) &&
            !['Backspace','Delete','Tab','ArrowLeft','ArrowRight','Home','End'].includes(e.key) &&
            !e.ctrlKey && !e.metaKey
        ) {
            e.preventDefault();
        }
    }

    return (
        <div>
            {searchKey && (
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder={searchPlaceholder}
                        inputMode={searchNumeric ? 'numeric' : undefined}
                        value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchKeyDown}
                        className="h-10 max-w-xs pl-9"
                    />
                </div>
            )}

            <div className="rounded-md border overflow-x-auto w-full">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className={
                                            header.column.getCanSort()
                                                ? 'cursor-pointer select-none'
                                                : ''
                                        }
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                        {{
                                            asc: ' ↑',
                                            desc: ' ↓',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    Tidak ada data.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground text-center sm:text-left">
                    {total > 0 ? `Menampilkan ${from}–${to} dari ${total}` : '0 hasil'}
                </p>
                {lastPage > 1 && onPageChange && (
                    <div className="flex items-center justify-center gap-2 flex-wrap sm:flex-nowrap">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage <= 1}
                            onClick={() => onPageChange(currentPage - 1)}
                            className="h-9 px-3"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Sebelumnya
                        </Button>
                        <span className="text-xs text-muted-foreground min-w-[3rem] text-center font-medium">
                            {currentPage} / {lastPage}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage >= lastPage}
                            onClick={() => onPageChange(currentPage + 1)}
                            className="h-9 px-3"
                        >
                            Selanjutnya
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
