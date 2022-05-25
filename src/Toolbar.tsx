import {
    Button,
    ButtonVariant,
    DropdownItem,
    DropdownSeparator,
    OnPerPageSelect,
    OnSetPage,
    OverflowMenu,
    OverflowMenuContent,
    OverflowMenuControl,
    OverflowMenuGroup,
    OverflowMenuItem,
    Pagination,
    PaginationVariant,
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
import { useCallback, useMemo, useState } from 'react'
import { BulkSelector } from './components/BulkSelector'
import { DropdownControlled } from './components/DropdownControlled'
import { useWindowSizeOrLarger, WindowSize } from './components/useBreakPoint'
import { IDataFilter, IFilterState, SetFilterValues } from './DataFilter'
import { DataViewTypeE } from './DataView'

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
    view: DataViewTypeE
    setView: (view: DataViewTypeE) => void
    filters: IDataFilter<T>[]
    filterState: IFilterState
    setFilterValues: SetFilterValues<T>
    clearAllFilters: () => void
    openColumnModal: () => void
}) {
    const {
        searched,
        selected,
        perPage,
        unselectAll,
        selectAll,
        selectPage,
        search,
        setSearch,
        page,
        onSetPage,
        onPerPageSelect,
        filters,
        filterState,
        setFilterValues,
        view,
        clearAllFilters,
        openColumnModal,
    } = props
    const clearSearch = useCallback(() => setSearch(''), [setSearch])
    const isSmallOrLarger = useWindowSizeOrLarger(WindowSize.sm)
    const isXS = !isSmallOrLarger
    return (
        <Toolbar style={{ borderBottom: 'thin solid var(--pf-global--BorderColor--100)' }} clearAllFilters={clearAllFilters}>
            <ToolbarContent>
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
                <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
                    <ToolbarItem variant="search-filter">
                        <SearchInput
                            aria-label="search"
                            placeholder="Search"
                            value={search}
                            onChange={setSearch}
                            onClear={clearSearch}
                            resultsCount={searched.length !== 0 ? searched.length : undefined}
                        />
                    </ToolbarItem>
                    {(view === DataViewTypeE.Table || isXS) && (
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

                {/* <ToolbarGroup variant="icon-button-group">
                        <ToolbarItem>
                            <Button variant="plain" aria-label="edit">
                                <EditIcon />
                            </Button>
                        </ToolbarItem>
                        <ToolbarItem>
                            <Button variant="plain" aria-label="clone">
                                <CloneIcon />
                            </Button>
                        </ToolbarItem>
                        <ToolbarItem>
                            <Button variant="plain" aria-label="sync">
                                <SyncIcon />
                            </Button>
                        </ToolbarItem>
                    </ToolbarGroup> */}

                <ToolbarGroup variant="button-group">
                    <ToolbarItem>
                        <OverflowMenu breakpoint="2xl">
                            <OverflowMenuContent>
                                <OverflowMenuGroup groupType="button">
                                    <OverflowMenuItem>
                                        <Button variant={ButtonVariant.primary}>Primary</Button>
                                    </OverflowMenuItem>
                                    <OverflowMenuItem>
                                        <Button variant={ButtonVariant.secondary}>Secondary</Button>
                                    </OverflowMenuItem>
                                </OverflowMenuGroup>
                            </OverflowMenuContent>
                            <OverflowMenuControl hasAdditionalOptions>
                                <DropdownControlled
                                    items={[
                                        <DropdownItem key="link">Link</DropdownItem>,
                                        <DropdownItem key="action" component="button">
                                            Action
                                        </DropdownItem>,
                                        <DropdownItem key="disabled link" isDisabled>
                                            Disabled Link
                                        </DropdownItem>,
                                        <DropdownItem key="disabled action" isDisabled component="button">
                                            Disabled Action
                                        </DropdownItem>,
                                        <DropdownSeparator key="separator" />,
                                        <DropdownItem key="separated link">Separated Link</DropdownItem>,
                                        <DropdownItem key="separated action" component="button">
                                            Separated Action
                                        </DropdownItem>,
                                    ]}
                                />
                            </OverflowMenuControl>
                        </OverflowMenu>
                    </ToolbarItem>
                </ToolbarGroup>
                <ToolbarGroup variant="button-group">
                    <ToolbarItem>
                        <Button variant="plain" icon={<ColumnsIcon />} onClick={openColumnModal} />
                    </ToolbarItem>
                </ToolbarGroup>

                <ToolbarItem variant="pagination">
                    <ToggleGroup>
                        <ToggleGroupItem
                            aria-label="list"
                            icon={<ListIcon />}
                            isSelected={props.view === DataViewTypeE.Table}
                            onClick={() => props.setView(DataViewTypeE.Table)}
                        />
                        <ToggleGroupItem
                            aria-label="catalog"
                            icon={<ThIcon />}
                            isSelected={props.view === DataViewTypeE.Catalog}
                            onClick={() => props.setView(DataViewTypeE.Catalog)}
                        />
                    </ToggleGroup>
                </ToolbarItem>
                {isSmallOrLarger && (
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
                )}
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
