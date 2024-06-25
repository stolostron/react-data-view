import { Dropdown, DropdownItem, DropdownToggle, DropdownToggleCheckbox } from '@patternfly/react-core/deprecated'
import { useCallback, useMemo, useState } from 'react'
import { useWindowSizeOrLarger, WindowSize } from './useBreakPoint'

export interface BulkSelectorProps {
    itemCount: number
    selectedCount: number
    perPage: number
    onSelectNone: () => void
    onSelectPage: () => void
    onSelectAll: () => void
}

export function BulkSelector(props: BulkSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const isSmallOrLarger = useWindowSizeOrLarger(WindowSize.sm)

    const { itemCount, selectedCount, perPage, onSelectNone, onSelectPage, onSelectAll } = props

    const onToggleCheckbox = useCallback(
        () => (selectedCount > 0 ? onSelectNone() : onSelectAll()),
        [selectedCount, onSelectNone, onSelectAll]
    )

    const toggleText = useMemo(() => {
        if (isSmallOrLarger) return selectedCount > 0 ? `${selectedCount} selected` : ''
        else return selectedCount > 0 ? `${selectedCount}` : ''
    }, [isSmallOrLarger, selectedCount])

    const toggle = useMemo(() => {
        return (
            <DropdownToggle
                splitButtonItems={[
                    <DropdownToggleCheckbox
                        id="select-all"
                        key="select-all"
                        aria-label="Select all"
                        isChecked={selectedCount > 0}
                        onChange={onToggleCheckbox}
                    >
                        {toggleText}
                    </DropdownToggleCheckbox>,
                ]}
                onToggle={(_event, isOpen) => setIsOpen(isOpen)}
            />
        )
    }, [selectedCount, toggleText, onToggleCheckbox])

    const selectNoneDropdownItem = useMemo(() => {
        return (
            <DropdownItem
                id="select-none"
                key="select-none"
                onClick={() => {
                    onSelectNone()
                    setIsOpen(false)
                }}
            >
                Select none
            </DropdownItem>
        )
    }, [onSelectNone])

    const selectPageDropdownItem = useMemo(() => {
        return (
            <DropdownItem
                id="select-page"
                key="select-page"
                onClick={() => {
                    onSelectPage()
                    setIsOpen(false)
                }}
            >
                {`Select ${Math.min(perPage, itemCount)} page items`}
            </DropdownItem>
        )
    }, [onSelectPage, perPage, itemCount])

    const selectAllDropdownItem = useMemo(() => {
        return (
            <DropdownItem
                id="select-all"
                key="select-all"
                onClick={() => {
                    onSelectAll()
                    setIsOpen(false)
                }}
            >
                {`Select all ${itemCount} items`}
            </DropdownItem>
        )
    }, [onSelectAll, itemCount])

    const dropdownItems = useMemo(
        () => [selectNoneDropdownItem, selectPageDropdownItem, selectAllDropdownItem],
        [selectNoneDropdownItem, selectPageDropdownItem, selectAllDropdownItem]
    )

    return <Dropdown isOpen={isOpen} toggle={toggle} dropdownItems={dropdownItems} style={{ zIndex: 302 }} />
}
