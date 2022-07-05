import {
    Button,
    ButtonVariant,
    DropdownSeparator,
    OnPerPageSelect,
    OnSetPage,
    OverflowMenu,
    OverflowMenuContent,
    OverflowMenuControl,
    OverflowMenuDropdownItem,
    OverflowMenuGroup,
    OverflowMenuItem,
    SearchInput,
    Select,
    SelectOption,
    SelectOptionObject,
    SelectVariant,
    ToggleGroup,
    ToggleGroupItem,
    Toolbar,
    ToolbarContent,
    ToolbarFilter,
    ToolbarGroup,
    ToolbarItem,
    ToolbarToggleGroup,
} from '@patternfly/react-core'
import { ColumnsIcon, FilterIcon, ListIcon, ThIcon } from '@patternfly/react-icons'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { BulkSelector } from './components/BulkSelector'
import { DropdownControlled } from './components/DropdownControlled'
import { useWindowSizeOrSmaller, WindowSize } from './components/useBreakPoint'
import { IDataFilter, IFilterState, SetFilterValues } from './DataFilter'
import { ItemViewTypeE } from './ItemView'

export interface IToolbarActionPrimary<T extends object> {
    type: 'primary'
    label: string
    onClick: (selectedItems: T[]) => void
}

export interface IToolbarActionSecondary<T extends object> {
    type: 'secondary'
    label: string
    onClick: (selectedItems: T[]) => void
}

export interface IToolbarActionSeperator {
    type: 'seperator'
}

export interface IToolbarActionButton<T extends object> {
    type: 'button'
    label: string
    onClick: (selectedItems: T[]) => void
}

export interface IToolbarActionBulk<T extends object> {
    type: 'bulk'
    label: string
    onClick: (selectedItems: T[]) => void
}

export type IToolbarAction<T extends object> =
    | IToolbarActionPrimary<T>
    | IToolbarActionSecondary<T>
    | IToolbarActionSeperator
    | IToolbarActionButton<T>
    | IToolbarActionBulk<T>

export function PageToolbar<T extends object>(props: {
    items: T[]
    searched: T[]
    selected: T[]
    perPage: number
    unselectAll: () => void
    selectAll: () => void
    selectPage: () => void
    search: string
    setSearch: (search: string) => void
    page: number
    onSetPage: OnSetPage
    onPerPageSelect: OnPerPageSelect
    view: ItemViewTypeE
    setView: (view: ItemViewTypeE) => void
    filters?: IDataFilter<T>[]
    filterState: IFilterState
    setFilterValues: SetFilterValues<T>
    clearAllFilters: () => void
    openColumnModal: () => void
    toolbarActions?: IToolbarAction<T>[]
    showSearch: boolean
    showViewToggle: boolean
    singular?: string
    plural?: string
}) {
    const {
        items,
        searched,
        selected,
        perPage,
        unselectAll,
        selectAll,
        selectPage,
        search,
        setSearch,
        // page,
        // onSetPage,
        // onPerPageSelect,
        filters,
        filterState,
        setFilterValues,
        view,
        clearAllFilters,
        openColumnModal,
        toolbarActions,
        showSearch,
        showViewToggle,
        singular,
        plural,
    } = props
    const clearSearch = useCallback(() => setSearch(''), [setSearch])
    const hideFilters = useWindowSizeOrSmaller(WindowSize.lg)

    const toolbarActionButtons = useMemo(
        () => (
            <Fragment>
                {toolbarActions?.map((action) => {
                    switch (action.type) {
                        case ButtonVariant.primary:
                        case ButtonVariant.secondary:
                            return (
                                <OverflowMenuItem key={action.label}>
                                    <Button variant={action.type} onClick={() => action.onClick(selected)}>
                                        {action.label}
                                    </Button>
                                </OverflowMenuItem>
                            )
                        default:
                            return <Fragment />
                    }
                })}
            </Fragment>
        ),
        [selected, toolbarActions]
    )

    const toolbarActionDropDownItems = useMemo(
        () =>
            toolbarActions?.map((action) => {
                switch (action.type) {
                    case ButtonVariant.primary:
                    case ButtonVariant.secondary:
                        return (
                            <OverflowMenuDropdownItem key={action.label} isShared onClick={() => action.onClick(selected)}>
                                {action.label}
                            </OverflowMenuDropdownItem>
                        )
                    case 'seperator':
                        return <DropdownSeparator key="separator" />
                    case 'bulk':
                        return (
                            <OverflowMenuDropdownItem
                                key={action.label}
                                onClick={() => action.onClick(selected)}
                                isDisabled={selected.length === 0}
                            >
                                {action.label}
                            </OverflowMenuDropdownItem>
                        )
                    default:
                        return (
                            <OverflowMenuDropdownItem key={action.label} onClick={() => action.onClick(selected)}>
                                {action.label}
                            </OverflowMenuDropdownItem>
                        )
                }
            }),
        [selected, toolbarActions]
    )

    const showBulkSelector = toolbarActions !== undefined
    const showSearchAndFilters = showSearch || filters !== undefined
    const showToolbarActions = toolbarActions !== undefined
    const showToolbar = showBulkSelector || showSearchAndFilters || showToolbarActions || showViewToggle

    // const isXlOrLarger = useWindowSizeOrLarger(WindowSize.xl)

    if (!showToolbar) {
        return <Fragment />
    }

    return (
        <Toolbar style={{ borderBottom: 'thin solid var(--pf-global--BorderColor--100)' }} clearAllFilters={clearAllFilters}>
            <ToolbarContent>
                {showBulkSelector && (
                    <ToolbarGroup>
                        <ToolbarItem variant="bulk-select">
                            <BulkSelector
                                itemCount={searched.length}
                                selectedCount={selected.length}
                                perPage={perPage}
                                onSelectNone={unselectAll}
                                onSelectAll={selectAll}
                                onSelectPage={selectPage}
                            />
                        </ToolbarItem>
                    </ToolbarGroup>
                )}
                {showSearchAndFilters && (
                    <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
                        <ToolbarItem variant="search-filter">
                            <SearchInput
                                aria-label="search"
                                placeholder="Search"
                                value={search}
                                onChange={setSearch}
                                onClear={clearSearch}
                                // resultsCount={searched.length !== 0 ? searched.length : undefined}
                            />
                        </ToolbarItem>
                        {(view === ItemViewTypeE.Table || hideFilters) && (
                            <ToolbarGroup variant="filter-group">
                                {filters &&
                                    filters.map((filter) => {
                                        const values = filterState[filter.label] ?? []
                                        return (
                                            <ToolbarFilter
                                                key={filter.label}
                                                chips={values.map((value) => ({
                                                    key: value,
                                                    node: filter.options.find((option) => option.value === value)?.label ?? value,
                                                }))}
                                                deleteChip={(_group, value) => {
                                                    value = typeof value === 'string' ? value : value.key
                                                    setFilterValues(
                                                        filter,
                                                        values.filter((v) => v != value)
                                                    )
                                                }}
                                                deleteChipGroup={() => setFilterValues(filter, [])}
                                                categoryName={filter.label}
                                            >
                                                <SelectFilter
                                                    label={filter.label}
                                                    values={values}
                                                    setValues={(values) => setFilterValues(filter, values)}
                                                    options={filter.options}
                                                />
                                            </ToolbarFilter>
                                        )
                                    })}
                            </ToolbarGroup>
                        )}
                    </ToolbarToggleGroup>
                )}
                {showToolbarActions && (
                    <ToolbarGroup variant="button-group">
                        <ToolbarItem>
                            <OverflowMenu breakpoint="2xl">
                                {toolbarActionButtons && (
                                    <OverflowMenuContent>
                                        <OverflowMenuGroup groupType="button">{toolbarActionButtons}</OverflowMenuGroup>
                                    </OverflowMenuContent>
                                )}
                                <OverflowMenuControl hasAdditionalOptions>
                                    <DropdownControlled items={toolbarActionDropDownItems ?? []} />
                                </OverflowMenuControl>
                            </OverflowMenu>
                        </ToolbarItem>
                    </ToolbarGroup>
                )}
                {view === ItemViewTypeE.Table && (
                    <ToolbarGroup variant="button-group">
                        <ToolbarItem>
                            <Button variant="plain" icon={<ColumnsIcon />} onClick={openColumnModal} />
                        </ToolbarItem>
                    </ToolbarGroup>
                )}
                <ToolbarItem variant="pagination" />
                <ToolbarItem>
                    {searched.length < items.length ? (
                        <span>
                            {searched.length} of {items.length}
                        </span>
                    ) : (
                        <span>{items.length}</span>
                    )}
                    {items.length == 1 ? singular && ' ' + singular : plural && ' ' + plural}
                </ToolbarItem>
                {showViewToggle !== false && (
                    <ToolbarItem>
                        <ToggleGroup>
                            <ToggleGroupItem
                                aria-label="list"
                                icon={<ListIcon />}
                                isSelected={props.view === ItemViewTypeE.Table}
                                onClick={() => props.setView(ItemViewTypeE.Table)}
                            />
                            <ToggleGroupItem
                                aria-label="catalog"
                                icon={<ThIcon />}
                                isSelected={props.view === ItemViewTypeE.Catalog}
                                onClick={() => props.setView(ItemViewTypeE.Catalog)}
                            />
                        </ToggleGroup>
                    </ToolbarItem>
                )}
                {/* {view === ItemViewTypeE.Catalog && (
                    <ToolbarItem>
                        <Pagination
                            variant={PaginationVariant.top}
                            isCompact
                            itemCount={searched.length}
                            perPage={perPage}
                            page={page}
                            onSetPage={onSetPage}
                            onPerPageSelect={onPerPageSelect}
                        />
                    </ToolbarItem>
                )} */}
            </ToolbarContent>
        </Toolbar>
    )
}

function SelectFilter(props: {
    label: string
    values: string[]
    setValues: (values: string[]) => void
    options: { label: string; value: string }[]
}) {
    const [open, setOpen] = useState(false)
    const onToggle = useCallback(() => setOpen((open) => !open), [])
    const onSelect = useCallback(
        (event: React.MouseEvent | React.ChangeEvent, value: string | SelectOptionObject, isPlaceholder?: boolean) => {
            event.preventDefault()
            if (isPlaceholder) {
                props.setValues([])
            } else {
                if (props.values.includes(value.toString())) {
                    const newValues = [...props.values]
                    newValues.splice(props.values.indexOf(value.toString()), 1)
                    props.setValues(newValues)
                } else {
                    props.setValues([...props.values, value.toString()])
                }
            }
        },
        [props]
    )
    const options = useMemo(
        () =>
            props.options.map((option) => (
                <SelectOption key={option.label} value={option.value}>
                    {option.label}
                </SelectOption>
            )),
        [props.options]
    )
    return (
        <Select
            variant={SelectVariant.checkbox}
            aria-label="Status"
            onToggle={onToggle}
            onSelect={onSelect}
            selections={props.values}
            isOpen={open}
            placeholderText={props.label}
        >
            {options}
        </Select>
    )
}
