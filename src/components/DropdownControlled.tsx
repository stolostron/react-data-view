import { Dropdown, DropdownList, MenuToggle, MenuToggleElement } from '@patternfly/react-core'
import { EllipsisVIcon } from '@patternfly/react-icons'
import { ReactNode, useCallback, useState } from 'react'

export function DropdownControlled(props: { items: ReactNode[] }) {
    const [open, setOpen] = useState(false)
    const onToggle = useCallback(() => setOpen((open) => !open), [])
    return (
        <Dropdown
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                <MenuToggle ref={toggleRef} onClick={onToggle} isExpanded={open} variant="plain">
                    <EllipsisVIcon />
                </MenuToggle>
            )}
            isOpen={open}
            onOpenChange={setOpen}
        >
            <DropdownList>{props.items}</DropdownList>
        </Dropdown>
    )
}
