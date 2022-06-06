import {
    ActionsColumn,
    IAction,
    InnerScrollContainer,
    ISortBy,
    OuterScrollContainer,
    SortByDirection,
    TableComposable,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@patternfly/react-table'
import { ThSortType } from '@patternfly/react-table/dist/esm/components/Table/base'
import useResizeObserver from '@react-hook/resize-observer'
import { Fragment, MouseEvent, UIEvent, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useWindowSizeOrLarger, useWindowSizeOrSmaller, WindowSize } from './components/useBreakPoint'
import { ITableColumn } from './TableColumn'
import { ISort } from './useTableItems'

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

export function DataTable<T extends object>(props: {
    columns: ITableColumn<T>[]
    items: T[]
    selectItem: (item: T) => void
    unselectItem: (item: T) => void
    isSelected: (item: T) => boolean
    keyFn: (item: T) => string
    rowActions?: IAction[]
    sort: ISort<T> | undefined
    setSort: (sort: ISort<T>) => void
}) {
    const isStickyColumn = useWindowSizeOrLarger(WindowSize.sm)
    const { columns, items, selectItem, unselectItem, isSelected, keyFn, rowActions, sort, setSort } = props
    const [scrollLeft, setScrollLeft] = useState(0)
    const ref = useRef<HTMLDivElement>(null)

    const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
    const resize = useCallback(() => setSize({ width: ref.current?.clientWidth ?? 0, height: ref.current?.clientHeight ?? 0 }), [])
    useResizeObserver(ref, () => resize())
    useLayoutEffect(() => resize(), [resize])

    const [scroll, setScroll] = useState<IScroll>({ top: 0, bottom: 0, left: 0, right: 0 })

    const headerHeight = 53
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
    const onScroll = useCallback(
        (event: UIEvent<HTMLDivElement>) => {
            updateScroll(event.currentTarget)
            // props.onScroll?.(event)
        },
        [updateScroll]
    )

    return useMemo(
        () => (
            <div style={{ overflow: 'hidden', height: '100%' }} ref={ref}>
                <OuterScrollContainer style={{ height: '100%' }} onScroll={onScroll}>
                    <InnerScrollContainer
                        onScroll={(div) => {
                            // console.log((div.target as HTMLDivElement).scrollLeft)
                            setScrollLeft((div.target as HTMLDivElement).scrollLeft)
                            onScroll(div)
                        }}
                        style={{ height: '100%' }}
                    >
                        <TableComposable
                            aria-label="Simple table"
                            // variant="compact"
                            // variant={exampleChoice !== 'default' ? 'compact' : undefined}
                            // borders={exampleChoice !== 'compactBorderless'}
                            isStickyHeader
                            gridBreakPoint=""
                        >
                            <TableHead
                                columns={columns}
                                isStickyColumn={isStickyColumn}
                                scrollLeft={scrollLeft}
                                rowActions={rowActions}
                                sort={sort}
                                setSort={setSort}
                            />
                            <Tbody>
                                {beforeHeight !== 0 && <Tr style={{ height: beforeHeight, border: 0 }} />}
                                {items.slice(firstRow, firstRow + visibleRowCount).map((item) => (
                                    <TableRow<T>
                                        key={keyFn(item)}
                                        columns={columns}
                                        item={item}
                                        isItemSelected={isSelected(item)}
                                        isStickyColumn={isStickyColumn}
                                        scrollLeft={scrollLeft}
                                        selectItem={selectItem}
                                        unselectItem={unselectItem}
                                        rowActions={rowActions}
                                    />
                                ))}
                                {afterHeight !== 0 && <Tr style={{ height: afterHeight, border: 0 }} />}
                            </Tbody>
                        </TableComposable>
                    </InnerScrollContainer>
                </OuterScrollContainer>
            </div>
        ),
        [
            onScroll,
            columns,
            isStickyColumn,
            scrollLeft,
            rowActions,
            sort,
            setSort,
            beforeHeight,
            items,
            firstRow,
            visibleRowCount,
            afterHeight,
            keyFn,
            isSelected,
            selectItem,
            unselectItem,
        ]
    )
}

function TableHead<T extends object>(props: {
    columns: ITableColumn<T>[]
    isStickyColumn: boolean
    scrollLeft: number
    rowActions?: IAction[]
    sort: ISort<T> | undefined
    setSort: (sort: ISort<T>) => void
}) {
    const { columns, isStickyColumn, scrollLeft, rowActions, sort, setSort } = props
    let stickyLeftOffset = '53px'
    if (useWindowSizeOrSmaller(WindowSize.md)) {
        stickyLeftOffset = '45px'
    }

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
                    <Th hasRightBorder={!isStickyColumn && scrollLeft > 0} isStickyColumn={true} stickyMinWidth="0" />
                    {columns
                        .filter((column) => column.enabled !== false)
                        .map((column, index) => {
                            if (index === 0) {
                                return (
                                    <Th
                                        key={column.header}
                                        // modifier="wrap"
                                        style={{ minWidth: column.minWidth }}
                                        isStickyColumn={isStickyColumn}
                                        // hasRightBorder={isStickyColumn}
                                        hasRightBorder={isStickyColumn && scrollLeft > 0}
                                        stickyMinWidth={column.minWidth ? `${column.minWidth}px` : undefined}
                                        stickyLeftOffset={stickyLeftOffset}
                                        sort={getColumnSort(index, column)}
                                    >
                                        {column.header}
                                    </Th>
                                )
                            }
                            return (
                                <Th
                                    key={column.header}
                                    // modifier="wrap"
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
        [columns, getColumnSort, isStickyColumn, rowActions, scrollLeft, stickyLeftOffset]
    )
}

function TableRow<T extends object>(props: {
    columns: ITableColumn<T>[]
    isStickyColumn: boolean
    scrollLeft: number
    item: T
    isItemSelected: boolean
    selectItem: (item: T) => void
    unselectItem: (item: T) => void
    rowActions?: IAction[]
}) {
    const { columns, isStickyColumn, scrollLeft, selectItem, unselectItem, isItemSelected, item, rowActions } = props
    return useMemo(
        () => (
            <Tr>
                <Th
                    select={{
                        // rowIndex,
                        onSelect: (_event, isSelecting) => {
                            if (isSelecting) {
                                selectItem(item)
                            } else {
                                unselectItem(item)
                            }
                        },
                        isSelected: isItemSelected,
                        // disable: !isRepoSelectable(repo),
                    }}
                    hasRightBorder={!isStickyColumn && scrollLeft > 0}
                    isStickyColumn={true}
                    stickyMinWidth="0"
                />
                <TableCells columns={columns} isStickyColumn={isStickyColumn} scrollLeft={scrollLeft} item={item} rowActions={rowActions} />
            </Tr>
        ),
        [columns, isItemSelected, isStickyColumn, item, rowActions, scrollLeft, selectItem, unselectItem]
    )
}

function TableCells<T extends object>(props: {
    columns: ITableColumn<T>[]
    isStickyColumn: boolean
    scrollLeft: number
    item: T
    rowActions?: IAction[]
}) {
    const { columns, isStickyColumn, scrollLeft, item, rowActions } = props

    let stickyLeftOffset = '53px'
    if (useWindowSizeOrSmaller(WindowSize.md)) {
        stickyLeftOffset = '45px'
    }

    return useMemo(
        () => (
            <Fragment>
                {columns
                    .filter((column) => column.enabled !== false)
                    .map((column, columnIndex) => {
                        if (columnIndex === 0 && isStickyColumn) {
                            return (
                                <Th
                                    key={column.header}
                                    dataLabel={column.header}
                                    isStickyColumn={isStickyColumn}
                                    hasRightBorder={scrollLeft > 0}
                                    stickyMinWidth="0"
                                    stickyLeftOffset={stickyLeftOffset}
                                    modifier="nowrap"
                                >
                                    {column.cell(item)}
                                </Th>
                            )
                        }
                        return (
                            <Td key={column.header} dataLabel={column.header} modifier="nowrap">
                                {column.cell(item)}
                            </Td>
                        )
                    })}
                {rowActions !== undefined && (
                    <Td isActionCell>
                        <ActionsColumn
                            // dropdownDirection="up" // TODO handle....
                            items={rowActions}
                            // isDisabled={repo.name === '4'} // Also arbitrary for the example
                            // actionsToggle={exampleChoice === 'customToggle' ? customActionsToggle : undefined}
                        />
                    </Td>
                )}
            </Fragment>
        ),
        [columns, isStickyColumn, item, rowActions, scrollLeft, stickyLeftOffset]
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
