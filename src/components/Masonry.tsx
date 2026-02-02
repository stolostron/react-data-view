import { Grid, GridItem, gridSpans, Stack } from '@patternfly/react-core'
import useResizeObserver from '@react-hook/resize-observer'
import { Children, Dispatch, ReactNode, SetStateAction, useMemo, useRef, useState } from 'react'

export function Masonry(props: { minSize: number; maxColumns?: number; children?: ReactNode }) {
    const target = useRef(null)
    const [columns, setColumns] = useState(1)
    useResizeObserver(target, (entry) => {
        setColumns(Math.min(props.maxColumns ?? 12, Math.max(Math.floor(entry.contentRect.width / props.minSize), 1)))
    })
    const span = useMemo<gridSpans>(() => {
        switch (columns) {
            case 1:
                return 12
            case 2:
                return 6
            case 3:
                return 4
            case 4:
                return 3
            case 5:
            case 6:
                return 2
            default:
                return 1
        }
    }, [columns])

    const [sizes, setSizes] = useState<Record<number, number>>({})

    const realColumns = 12 / span

    const itemColumns = useMemo(() => {
        const itemColumns: ReactNode[][] = new Array(realColumns).fill(0).map(() => [])
        const columnHeights: number[] = new Array(realColumns).fill(0)
        Children.forEach(props.children, (child, index) => {
            const smallest = Math.min(...columnHeights)
            const columnIndex = columnHeights.findIndex((column) => column === smallest)
            if (columnIndex !== undefined && columnIndex !== -1) {
                itemColumns[columnIndex].push(
                    <MasonryItem key={index} index={index} sizes={sizes} setSizes={setSizes}>
                        {child}
                    </MasonryItem>
                )
                const height = sizes[index]
                if (height !== undefined) {
                    columnHeights[columnIndex] += height + 16
                }
            }
        })
        return itemColumns
    }, [props.children, realColumns, sizes])

    return (
        <div ref={target}>
            <Grid hasGutter style={{ maxWidth: realColumns * props.minSize }}>
                {itemColumns.map((column, index) => (
                    <GridItem span={span} key={index}>
                        <Stack hasGutter>{column}</Stack>
                    </GridItem>
                ))}
            </Grid>
        </div>
    )
}

function MasonryItem(props: {
    children?: ReactNode
    index: number
    sizes: Record<number, number>
    setSizes: Dispatch<SetStateAction<Record<number, number>>>
}) {
    const target = useRef(null)
    useResizeObserver(target, (entry) => {
        props.setSizes((sizes) => {
            if (props.sizes[props.index] !== entry.contentRect.height) {
                sizes = { ...sizes }
                sizes[props.index] = entry.contentRect.height
            }
            return sizes
        })
    })
    return <div ref={target}>{props.children}</div>
}
