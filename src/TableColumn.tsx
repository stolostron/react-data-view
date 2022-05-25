import { Label, LabelGroup, Split, SplitItem } from '@patternfly/react-core'
import { ReactNode } from 'react'

type CellFn<T extends object> = (item: T) => ReactNode

export interface ITableColumn<T extends object> {
    header: string
    cell: CellFn<T>
    minWidth?: number
    type?: 'labels' | 'progress' | 'date'
    enabled?: boolean
}

export function Labels(props: { labels: string[] }) {
    return (
        <LabelGroup numLabels={999} isCompact>
            {props.labels.map((label) => (
                <Label isCompact key={label}>
                    {label}
                </Label>
            ))}
        </LabelGroup>
    )
}

export function DateCell(props: { value: number | string }) {
    const date = new Date(props.value)
    return (
        <Split hasGutter>
            <SplitItem>{date.toLocaleDateString()}</SplitItem>
            <SplitItem>{date.toLocaleTimeString()}</SplitItem>
        </Split>
    )
}
