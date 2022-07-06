/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
    Button,
    Drawer,
    DrawerContent,
    DrawerContentBody,
    PageSection,
    Pagination,
    PaginationVariant,
    Split,
    SplitItem,
    Toolbar,
    ToolbarContent,
} from '@patternfly/react-core'
import Fuse from 'fuse.js'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { Catalog } from './Catalog'
import { ICatalogCard } from './CatalogCard'
import { useColumnModal } from './ColumnModal'
import { Scrollable } from './components/Scrollable'
import { useWindowSizeOrLarger, useWindowSizeOrSmaller, WindowSize } from './components/useBreakPoint'
import { useSearchParams } from './components/useWindowLocation'
import { FilterDrawer } from './FilterDrawer'
import { IItemAction } from './ItemActions'
import { IFilterState, IItemFilter } from './ItemFilter'
import { ItemTable } from './ItemTable'
import { ITableColumn } from './TableColumn'
import { IToolbarAction, PageToolbar, toolbarActionsHaveBulkActions } from './Toolbar'
import { useTableItems } from './useTableItems'

export enum ItemViewTypeE {
    Table = 'table',
    Catalog = 'catalog',
}

export function ItemView<T extends object>(props: {
    items?: T[]
    onBack?: () => void
    columns?: ITableColumn<T>[]
    itemActions?: IItemAction<T>[]
    itemKeyFn: (item: T) => string
    toolbarActions?: IToolbarAction<T>[]
    filters?: IItemFilter<T>[]
    itemToCardFn?: (item: T) => ICatalogCard
    searchKeys?: { name: string; weight?: number }[]
    localKey?: string
    singular?: string
    plural?: string
}) {
    const { filters, itemKeyFn, itemToCardFn, searchKeys, columns, toolbarActions, singular, plural } = props

    const [searchParams, setSearchParams] = useSearchParams()

    const [viewType, setViewType] = useState<ItemViewTypeE>(() => {
        if (!props.columns) return ItemViewTypeE.Catalog
        if (!props.itemToCardFn) return ItemViewTypeE.Table
        switch (searchParams.get('view')) {
            case ItemViewTypeE.Catalog:
                return ItemViewTypeE.Catalog
            default:
                return ItemViewTypeE.Table
        }
    })

    const showViewToggle = props.columns !== undefined && props.itemToCardFn !== undefined
    const {
        // allSelected,
        filtered,
        isSelected,
        page,
        paged,
        perPage,
        search,
        searched,
        selectAll,
        selectItem,
        selectPage,
        selected,
        setFilterFn,
        setPage,
        setPerPage,
        setSearch,
        setSearchFn,
        setSort,
        sort,
        // sorted,
        unselectAll,
        unselectItem,
    } = useTableItems(props.items ?? [], itemKeyFn, { search: searchParams.get('search') })
    const onSetPage = useCallback((_event, page) => setPage(page), [setPage])
    const onPerPageSelect = useCallback((_event, perPage) => setPerPage(perPage), [setPerPage])

    useEffect(() => {
        if (searchKeys) {
            const fuseOptions: Fuse.IFuseOptions<T> = { includeScore: true, keys: searchKeys }
            const fuse = new Fuse([], fuseOptions)
            setSearchFn((item: T, search: string) => {
                // TODO try to reuse search collection
                fuse.setCollection([item])
                const result = fuse.search(search)
                if (result.length) {
                    return result[0].score!
                }
                return 1
            })
        }
    }, [searchKeys, setSearchFn])

    const [filterState, setFilterState] = useState<IFilterState>(() => {
        const filterState: IFilterState = {}
        searchParams.forEach((key, value) => {
            switch (key) {
                case 'view':
                case 'route':
                case 'search':
                    break
                default:
                    filterState[key] = value.split(',')
            }
        })
        return filterState
    })
    const setFilterValues = useCallback((filter: IItemFilter<T>, values: string[]) => {
        setFilterState((filtersState) => ({ ...filtersState, ...{ [filter.label]: values } }))
    }, [])
    const clearAllFilters = useCallback(() => {
        setFilterState({})
    }, [])

    useEffect(() => {
        setFilterFn((item: T) => {
            for (const filter of filters ?? []) {
                const values = filterState[filter.label]
                if (values?.length) {
                    if (!filter.filter(item, values)) return false
                }
            }
            return true
        })
    }, [filterState, filters, setFilterFn])

    // View QueryString support
    useEffect(() => {
        if (!itemToCardFn || !columns) {
            if (searchParams.get('view') !== undefined) {
                searchParams.delete('view')
                setSearchParams(searchParams)
            }
        } else {
            if (searchParams.get('view') !== viewType.toString()) {
                searchParams.set('view', viewType.toString())
                setSearchParams(searchParams)
            }
        }
    }, [columns, viewType, itemToCardFn, searchParams, setSearchParams])

    // Search QueryString support
    useEffect(() => {
        if (!search) {
            if (searchParams.get('search') !== undefined) {
                searchParams.delete('search')
                setSearchParams(searchParams)
            }
        } else {
            if (searchParams.get('search') !== search) {
                searchParams.set('search', search)
                setSearchParams(searchParams)
            }
        }
    }, [search, searchParams, setSearchParams])

    // Filters QueryString support
    useEffect(() => {
        let change = false
        for (const key in filterState) {
            const values = filterState[key]
            if (values) {
                const value = values.join(',')
                if (searchParams.get(key) !== value) {
                    searchParams.set(key, value)
                    change = true
                }
            } else {
                if (searchParams.get(key) !== undefined) {
                    searchParams.delete(key)
                    change = true
                }
            }
        }
        searchParams.forEach((key) => {
            switch (key) {
                case 'route':
                case 'search':
                case 'view':
                    break
                default:
                    if (!filterState[key] || filterState[key]?.length === 0) {
                        searchParams.delete(key)
                        change = true
                    }
            }
        })
        if (change) {
            setSearchParams(searchParams)
        }
    }, [filterState, searchParams, setSearchParams])

    const { openColumnModal, columnModal, managedColumns } = useColumnModal(columns ?? [])
    const showBackButton = props.onBack !== undefined
    const showPagination = filtered.length > perPage
    const showBottomToolbarBorder = useWindowSizeOrLarger(WindowSize.md)
    const showBottomToolbar = viewType === ItemViewTypeE.Catalog && (showBackButton || showPagination)
    const hideFilters = useWindowSizeOrSmaller(WindowSize.lg)

    const showSelect = toolbarActionsHaveBulkActions(toolbarActions)

    return (
        <Fragment>
            {columnModal}
            {/* <Alert title="Alert" isInline variant="warning">
                Alert content
            </Alert> */}
            <PageToolbar
                items={props.items ?? []}
                searched={searched}
                selected={selected}
                selectAll={selectAll}
                unselectAll={unselectAll}
                search={search}
                setSearch={setSearch}
                page={page}
                perPage={perPage}
                selectPage={selectPage}
                onSetPage={onSetPage}
                onPerPageSelect={onPerPageSelect}
                view={viewType}
                setView={setViewType}
                filters={filters}
                filterState={filterState}
                setFilterValues={setFilterValues}
                clearAllFilters={clearAllFilters}
                openColumnModal={openColumnModal}
                toolbarActions={toolbarActions}
                showSearch={searchKeys !== undefined}
                showViewToggle={showViewToggle}
                singular={singular}
                plural={plural}
                showSelect={showSelect}
            />
            <Drawer position="right" isStatic>
                <DrawerContent panelContent={<Fragment />}>
                    <DrawerContentBody>
                        <Drawer position="left" isStatic>
                            <DrawerContent
                                panelContent={
                                    viewType === ItemViewTypeE.Catalog ? (
                                        <FilterDrawer
                                            filters={hideFilters ? undefined : filters}
                                            filterState={filterState}
                                            setFilterValues={setFilterValues}
                                        />
                                    ) : (
                                        <Fragment />
                                    )
                                }
                            >
                                <DrawerContentBody>
                                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                        <Scrollable>
                                            {viewType === ItemViewTypeE.Catalog ? (
                                                <Catalog
                                                    keyFn={props.itemKeyFn}
                                                    items={paged}
                                                    itemToCardFn={itemToCardFn!}
                                                    selectItem={selectItem}
                                                    unselectItem={unselectItem}
                                                    isSelected={isSelected}
                                                    itemActions={props.itemActions}
                                                    showSelect={showSelect}
                                                />
                                            ) : (
                                                <ItemTable
                                                    columns={managedColumns}
                                                    items={searched}
                                                    rowActions={props.itemActions}
                                                    keyFn={props.itemKeyFn}
                                                    selectItem={selectItem}
                                                    unselectItem={unselectItem}
                                                    isSelected={isSelected}
                                                    sort={sort}
                                                    setSort={setSort}
                                                    showSelect={showSelect}
                                                />
                                            )}
                                        </Scrollable>
                                        {showBottomToolbar &&
                                            (showBackButton || showBottomToolbarBorder ? (
                                                <PageSection
                                                    variant="light"
                                                    padding={{ default: 'noPadding' }}
                                                    style={{ borderTop: 'thin solid var(--pf-global--BorderColor--100)', flexGrow: 0 }}
                                                >
                                                    <Split>
                                                        {showBackButton && (
                                                            <Toolbar>
                                                                <ToolbarContent>
                                                                    {props.onBack && <Button onClick={props.onBack}>Back</Button>}
                                                                </ToolbarContent>
                                                            </Toolbar>
                                                        )}
                                                        {showPagination && (
                                                            <SplitItem isFilled>
                                                                <Pagination
                                                                    variant={PaginationVariant.bottom}
                                                                    itemCount={searched.length}
                                                                    perPage={perPage}
                                                                    page={page}
                                                                    onSetPage={onSetPage}
                                                                    onPerPageSelect={onPerPageSelect}
                                                                />
                                                            </SplitItem>
                                                        )}
                                                    </Split>
                                                </PageSection>
                                            ) : (
                                                <Pagination
                                                    variant={PaginationVariant.bottom}
                                                    itemCount={searched.length}
                                                    perPage={perPage}
                                                    page={page}
                                                    onSetPage={onSetPage}
                                                    onPerPageSelect={onPerPageSelect}
                                                />
                                            ))}
                                    </div>
                                </DrawerContentBody>
                            </DrawerContent>
                        </Drawer>
                    </DrawerContentBody>
                </DrawerContent>
            </Drawer>
        </Fragment>
    )
}
