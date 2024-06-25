import {
    Button,
    EmptyState,
    EmptyStateBody,
    EmptyStateIcon,
    EmptyStateActions,
    EmptyStateHeader,
    EmptyStateFooter,
} from '@patternfly/react-core'
import { SearchIcon } from '@patternfly/react-icons'
import {
    ActionsColumn,
    IAction,
    ISortBy,
    SortByDirection,
    Table /* data-codemods */,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@patternfly/react-table'
import { ThSortType } from '@patternfly/react-table/dist/esm/components/Table/base'
import useResizeObserver from '@react-hook/resize-observer'
import { Fragment, MouseEvent, UIEvent, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { IItemAction, isItemActionClick } from './ItemActions'
import { ITableColumn } from './TableColumn'
import { ISort } from './useTableItems'
import './virtual-table.css'

interface IScroll {
    top: number
    bottom: number
    left: number
    right: number
}
// const TableScrollContext = createContext<{
//     scroll: IScroll
//     setScroll: Dispatch<SetStateAction<IScroll>>
// }>({
//     scroll: { top: 0, bottom: 0, left: 0, right: 0 },
//     setScroll: () => null,
// })

export function ItemTable<T extends object>(props: {
    columns: ITableColumn<T>[]
    items: T[]
    selectItem: (item: T) => void
    unselectItem: (item: T) => void
    isSelected: (item: T) => boolean
    keyFn: (item: T) => string
    rowActions?: IItemAction<T>[]
    sort: ISort<T> | undefined
    setSort: (sort: ISort<T>) => void
    showSelect: boolean
    clearAllFilters: () => void
}) {
    const { columns, items, selectItem, unselectItem, isSelected, keyFn, rowActions, sort, setSort, showSelect, clearAllFilters } = props
    const sizeRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
    const resize = useCallback(() => setSize({ width: sizeRef.current?.clientWidth ?? 0, height: sizeRef.current?.clientHeight ?? 0 }), [])
    useResizeObserver(sizeRef, () => {
        resize()
        updateScroll(scrollRef.current)
    })
    useLayoutEffect(() => resize(), [resize])

    const [scroll, setScroll] = useState<IScroll>({ top: 0, bottom: 0, left: 0, right: 0 })

    const headerHeight = 53.5
    const rowHeight = 75
    const visibleRowCount = Math.ceil(size.height / rowHeight) + 1
    const visibleRowsHeight = visibleRowCount * rowHeight
    const totalHeight = items.length * rowHeight + headerHeight - 1
    const firstRow = Math.min(Math.max(Math.floor(scroll.top / rowHeight) - 1, 0), items.length - 1)
    const beforeHeight = Math.max(firstRow * rowHeight, 0)
    const afterHeight = Math.max(totalHeight - visibleRowsHeight - beforeHeight, 0)

    const updateScroll = useCallback((div: HTMLDivElement | null) => {
        if (!div) return
        setScroll((scroll) => {
            const newScroll: IScroll = {
                top: div.scrollTop,
                bottom: div.scrollHeight - div.clientHeight - div.scrollTop,
                left: div.scrollLeft,
                right: div.scrollWidth - div.clientWidth - div.scrollLeft,
            }
            if (
                newScroll.top !== scroll.top ||
                newScroll.bottom !== scroll.bottom ||
                newScroll.left !== scroll.left ||
                newScroll.right !== scroll.right
            ) {
                return newScroll
            }
            return scroll
        })
    }, [])
    const onScroll = useCallback((event: UIEvent<HTMLDivElement>) => updateScroll(event.currentTarget), [updateScroll])

    const className = useMemo(() => {
        // let className = 'pf-c-table '
        let className = ''
        if (scroll.top > 1) className += 'scroll-top '
        if (scroll.bottom > 1) className += 'scroll-bottom '
        if (scroll.left > 1) className += 'scroll-left '
        if (scroll.right > 1) className += 'scroll-right '
        return className.trim()
    }, [scroll])

    return useMemo(
        () => (
            <div style={{ overflow: 'hidden', height: '100%' }} className="vtable" ref={sizeRef}>
                <div onScroll={onScroll} style={{ height: '100%', overflow: 'auto' }} ref={scrollRef}>
                    <Table
                        aria-label="Simple table"
                        // variant="compact"
                        // variant={exampleChoice !== 'default' ? 'compact' : undefined}
                        // borders={exampleChoice !== 'compactBorderless'}
                        gridBreakPoint=""
                        className={className}
                    >
                        <TableHead columns={columns} rowActions={rowActions} sort={sort} setSort={setSort} showSelect={showSelect} />
                        <Tbody>
                            {beforeHeight !== 0 && <Tr style={{ height: beforeHeight, border: 0 }} />}
                            {items.slice(firstRow, firstRow + visibleRowCount).map((item, rowIndex) => (
                                <TableRow<T>
                                    key={keyFn(item)}
                                    columns={columns}
                                    item={item}
                                    isItemSelected={isSelected(item)}
                                    selectItem={selectItem}
                                    unselectItem={unselectItem}
                                    rowActions={rowActions}
                                    rowIndex={rowIndex + firstRow}
                                    showSelect={showSelect}
                                />
                            ))}
                            {afterHeight !== 0 && <Tr style={{ height: afterHeight, border: 0 }} />}
                        </Tbody>
                    </Table>
                    {items.length === 0 && (
                        <div style={{ paddingTop: 16 }}>
                            <EmptyState>
                                <EmptyStateHeader
                                    titleText="No results found"
                                    icon={<EmptyStateIcon icon={SearchIcon} />}
                                    headingLevel="h2"
                                />
                                <EmptyStateBody>No results match this filter criteria. Adjust your filters and try again.</EmptyStateBody>
                                <EmptyStateFooter>
                                    <EmptyStateActions>
                                        <Button variant="link" onClick={clearAllFilters}>
                                            Clear all filters
                                        </Button>
                                    </EmptyStateActions>
                                </EmptyStateFooter>
                            </EmptyState>
                        </div>
                    )}
                </div>
            </div>
        ),
        [
            onScroll,
            className,
            columns,
            rowActions,
            sort,
            setSort,
            showSelect,
            beforeHeight,
            items,
            firstRow,
            visibleRowCount,
            afterHeight,
            clearAllFilters,
            keyFn,
            isSelected,
            selectItem,
            unselectItem,
        ]
    )
}

function TableHead<T extends object>(props: {
    columns: ITableColumn<T>[]
    rowActions?: IItemAction<T>[]
    sort: ISort<T> | undefined
    setSort: (sort: ISort<T>) => void
    showSelect: boolean
}) {
    const { columns, rowActions, sort, setSort, showSelect } = props

    const sortBy = useMemo<ISortBy>(() => {
        let index: number | undefined = columns.findIndex((column) => column.header === sort?.id)
        if (index === -1) index = undefined
        return { index, direction: sort?.direction }
    }, [columns, sort])

    const getColumnSort = useCallback<(columnIndex: number, column: ITableColumn<T>) => ThSortType | undefined>(
        (columnIndex: number, column: ITableColumn<T>) => {
            if (!column.sortFn) return undefined
            return {
                onSort: (_event: MouseEvent, _columnIndex: number, sortByDirection: SortByDirection) => {
                    if (column.sortFn) {
                        setSort({
                            id: column.header,
                            sortFn: column.sortFn,
                            direction: sortByDirection,
                        })
                    }
                },
                sortBy,
                columnIndex,
            }
        },
        [setSort, sortBy]
    )

    //   /** Provide the currently active column's index and direction */
    //   sortBy: ISortBy;
    //   /** The column index */
    //   columnIndex: number;
    //   /** True to make this a favoritable sorting cell */
    //   isFavorites?: boolean;

    // sortBy: {
    //     index: activeSortIndex,
    //     direction: activeSortDirection,
    //     defaultDirection: 'asc' // starting sort direction when first sorting a column. Defaults to 'asc'
    //   },
    //   onSort: (_event, index, direction) => {
    //     setActiveSortIndex(index);
    //     setActiveSortDirection(direction);
    //   },
    //   columnIndex

    return useMemo(
        () => (
            <Thead>
                <Tr>
                    {showSelect && <Th />}
                    {columns
                        .filter((column) => column.enabled !== false)
                        .map((column, index) => {
                            return (
                                <Th
                                    modifier="fitContent"
                                    key={column.header}
                                    style={{ minWidth: column.minWidth }}
                                    sort={getColumnSort(index, column)}
                                >
                                    {column.header}
                                </Th>
                            )
                        })}
                    {rowActions !== undefined && <Th></Th>}
                </Tr>
            </Thead>
        ),
        [columns, getColumnSort, rowActions, showSelect]
    )
}

function TableRow<T extends object>(props: {
    columns: ITableColumn<T>[]
    item: T
    isItemSelected: boolean
    selectItem: (item: T) => void
    unselectItem: (item: T) => void
    rowActions?: IItemAction<T>[]
    rowIndex: number
    showSelect: boolean
}) {
    const { columns, selectItem, unselectItem, isItemSelected, item, rowActions, rowIndex, showSelect } = props
    return useMemo(
        () => (
            <Tr className={isItemSelected ? 'selected' : undefined}>
                {showSelect && (
                    <Th
                        select={{
                            onSelect: (_event, isSelecting) => {
                                if (isSelecting) {
                                    selectItem(item)
                                } else {
                                    unselectItem(item)
                                }
                            },
                            isSelected: isItemSelected,
                        }}
                        style={{ width: '0%' }}
                    />
                )}
                <TableCells rowIndex={rowIndex} columns={columns} item={item} rowActions={rowActions} />
            </Tr>
        ),
        [columns, isItemSelected, item, rowActions, rowIndex, selectItem, showSelect, unselectItem]
    )
}

function TableCells<T extends object>(props: { rowIndex: number; columns: ITableColumn<T>[]; item: T; rowActions?: IItemAction<T>[] }) {
    const { columns, item, rowActions, rowIndex } = props
    const actions: IAction[] | undefined = useMemo(
        () =>
            rowActions?.map((rowAction) => {
                if (isItemActionClick(rowAction)) {
                    return {
                        title: rowAction.label,
                        onClick: () => {
                            rowAction.onClick(item)
                        },
                    }
                }
                return { isSeparator: true }
            }),
        [item, rowActions]
    )
    return useMemo(
        () => (
            <Fragment>
                {columns
                    .filter((column) => column.enabled !== false)
                    .map((column) => {
                        return (
                            <Td key={column.header} dataLabel={column.header} modifier="nowrap">
                                {column.cell(item)}
                            </Td>
                        )
                    })}
                {actions !== undefined && (
                    <Td isActionCell style={{ zIndex: 100000 - rowIndex, paddingRight: 8, width: '0%' }}>
                        <ActionsColumn
                            // dropdownDirection="up" // TODO handle....
                            items={actions}
                            // isDisabled={repo.name === '4'} // Also arbitrary for the example
                            // actionsToggle={exampleChoice === 'customToggle' ? customActionsToggle : undefined}
                        />
                    </Td>
                )}
            </Fragment>
        ),
        [actions, columns, item, rowIndex]
    )
}

// function TablePagination(props: {
//     itemCount: number
//     page: number
//     perPage: number
//     onSetPage: (event: unknown, page: number) => void
//     onPerPageSelect: (event: unknown, perPage: number) => void
// }) {
//     const { itemCount, page, perPage, onSetPage, onPerPageSelect } = props
//     return useMemo(
//         () => (
//             <Pagination
//                 itemCount={itemCount}
//                 widgetId="pagination-options-menu-bottom"
//                 perPage={perPage}
//                 page={page}
//                 variant={PaginationVariant.bottom}
//                 onSetPage={onSetPage}
//                 onPerPageSelect={onPerPageSelect}
//                 // perPage={this.state.perPage}
//                 // page={this.state.page}
//                 // variant={PaginationVariant.bottom}
//                 // onSetPage={this.onSetPage}
//                 // onPerPageSelect={this.onPerPageSelect}
//                 style={{ borderTop: '1px solid var(--pf-global--BorderColor--dark-100)', marginTop: -1, zIndex: 300 }}
//             />
//         ),
//         [itemCount, onPerPageSelect, onSetPage, page, perPage]
//     )
// }
