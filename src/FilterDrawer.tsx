/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Checkbox, Stack, StackItem, Title, DrawerPanelBody, DrawerSection } from '@patternfly/react-core'
import { useCallback } from 'react'
import { IFilterState, IItemFilter, SetFilterValues } from './ItemFilter'

export function FilterDrawer<T extends object>(props: {
    filters?: IItemFilter<T>[]
    filterState: IFilterState
    setFilterValues: SetFilterValues<T>
}) {
    const { filters, filterState, setFilterValues } = props
    const toggleFilterValue = useCallback(
        (filter: IItemFilter<T>, filterValues: string[] | undefined, option: string) => {
            if (filterValues?.includes(option)) {
                setFilterValues(
                    filter,
                    filterValues.filter((o) => o !== option)
                )
            } else {
                setFilterValues(filter, [...(filterValues ?? []), option])
            }
        },
        [setFilterValues]
    )

    if (!filters || filters.length === 0) {
        return null
    }

    return (
        <DrawerPanelBody>
            <Title headingLevel="h2" size="lg" className="pf-v6-u-mb-lg">
                Filters
            </Title>

            {filters?.map((filter) => {
                const filterValues = filterState[filter.label]
                return (
                    <DrawerSection key={filter.label} className="pf-v6-u-mb-lg">
                        <Title headingLevel="h4" className="pf-v6-u-mb-md">
                            {filter.label}
                        </Title>
                        <Stack hasGutter>
                            {filter.options.map((option) => (
                                <StackItem key={option.value}>
                                    <Checkbox
                                        id={`filter-${filter.label}-${option.value}`}
                                        label={option.label}
                                        isChecked={filterValues?.includes(option.value)}
                                        onChange={() => toggleFilterValue(filter, filterValues, option.value)}
                                    />
                                </StackItem>
                            ))}
                        </Stack>
                    </DrawerSection>
                )
            })}
        </DrawerPanelBody>
    )
}
