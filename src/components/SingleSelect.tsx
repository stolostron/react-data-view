import { FormGroup } from '@patternfly/react-core'
import { Select, SelectOption, SelectOptionObject, SelectProps } from '@patternfly/react-core/deprecated'
import { useCallback, useState } from 'react'

export function SingleSelect(props: {
    options: string[]
    value?: string
    onChange: (value: string | SelectOptionObject) => void
    label?: string
}) {
    const [open, setOpen] = useState(false)
    const onToggle = useCallback(() => {
        setOpen((open) => !open)
    }, [])
    const onSelect = useCallback<Required<SelectProps>['onSelect']>(
        (_e, v) => {
            props.onChange(v)
            setOpen(false)
        },
        [props]
    )
    const id = '111'
    return (
        <FormGroup label={props.label} fieldId={id}>
            <Select id={id} selections={props.value} isOpen={open} onToggle={onToggle} onSelect={onSelect}>
                {props.options.map((option) => (
                    <SelectOption key={option} value={option}>
                        {option}
                    </SelectOption>
                ))}
            </Select>
        </FormGroup>
    )
}
