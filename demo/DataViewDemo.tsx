import { Split, SplitItem } from '@patternfly/react-core'
import { CheckIcon } from '@patternfly/react-icons'
import { IAction } from '@patternfly/react-table'
import { useCallback, useMemo } from 'react'
import { CatalogCardItemType, DataView, DateCell, ICatalogCard, IDataFilter, ITableColumn, Labels, useDataFilter } from '../src'
import { IconWrapper } from '../src/components/IconWrapper'
import { getPatternflyColor, PatternFlyColor } from '../src/components/patternfly-colors'
import { colors } from './mock'
import { getTaskStatus, IMockTask, useMockTasks } from './useTasks'

export function DataViewDemo() {
    const tasks = useMockTasks(1000)

    const keyFn = useCallback((task: IMockTask) => task.id, [])

    const columns: ITableColumn<IMockTask>[] = useMemo(
        () => [
            {
                header: 'Name',
                cell: (task) => {
                    return (
                        <Split hasGutter>
                            <SplitItem>
                                <IconWrapper size="md">{task.icon}</IconWrapper>
                            </SplitItem>
                            <SplitItem>{task.name}</SplitItem>
                        </Split>
                    )
                },
                sortFn: (l, r) => l.name.localeCompare(r.name),
            },
            {
                header: 'Status',
                cell: (task) => {
                    const status = getTaskStatus(task)
                    return (
                        <Split>
                            <SplitItem style={{ paddingRight: 8 }}>
                                <IconWrapper size="sm">{status.icon}</IconWrapper>
                            </SplitItem>
                            <SplitItem>{status.text}</SplitItem>
                        </Split>
                    )
                },
                sortFn: (l, r) => l.status.localeCompare(r.status),
            },
            { header: 'Description', cell: (task) => task.description },
            { header: 'Colors', cell: (task) => <Labels labels={task.colors} />, minWidth: 320 },
            { header: 'Labels', cell: (task) => <Labels labels={task.labels} />, minWidth: 320 },
            { header: 'Created', cell: (task) => <DateCell value={task.created} /> },
            { header: 'Modified', cell: (task) => <DateCell value={task.modified} /> },
        ],
        []
    )

    const actions: IAction[] = [
        { title: 'Some action', onClick: () => null },
        { title: <div>Another action</div>, onClick: () => null },
        { isSeparator: true },
        { title: 'Third action', onClick: () => null },
    ]

    const statusFilter = useMemo<IDataFilter<IMockTask>>(
        () => ({
            label: 'Status',
            options: [
                { label: 'Online', value: 'online' },
                { label: 'Offline', value: 'offline' },
            ],
            filter: (item: IMockTask, values: string[]) => values.includes(item.status),
        }),
        []
    )
    const colorsFilter = useMemo<IDataFilter<IMockTask>>(
        () => ({
            label: 'Colors',
            options: colors.map((color) => ({ label: color, value: color })),
            filter: (item: IMockTask, values: string[]) => {
                // TODO values as Record<string,boolean> for performance
                for (const value of values) {
                    if (item.colors.includes(value)) {
                        return true
                    }
                }
                return false
            },
        }),
        []
    )

    const labelFilter = useDataFilter(tasks, 'Labels', (task) => task.labels)
    const filters = useMemo(() => [statusFilter, colorsFilter, labelFilter], [labelFilter, colorsFilter, statusFilter])

    const taskToCardFn = useCallback<(task: IMockTask) => ICatalogCard>((task) => {
        const card: ICatalogCard = {
            icon: task.icon,
            id: task.id,
            title: task.name,
            labels: task.labels,
            onClick: () => null,
        }
        if (task.description) {
            if (!card.items) card.items = []
            card.items.push({
                type: CatalogCardItemType.Description,
                description: task.description,
            })
        }
        if (task.status) {
            if (!card.items) card.items = []
            card.items.push({
                type: CatalogCardItemType.List,
                title: 'Status',
                items: [getTaskStatus(task)],
                icon: <CheckIcon />,
            })
        }
        if (task.colors.length) {
            if (!card.items) card.items = []
            card.items.push({
                type: CatalogCardItemType.List,
                title: 'Colors',
                items: task.colors.map((color) => ({ text: color })),
                icon: <CheckIcon color={getPatternflyColor(PatternFlyColor.Green)} />,
            })
        }
        return card
    }, [])

    return (
        <DataView
            title="Data View"
            breadcrumbs={[
                { label: 'Stolostron', to: 'https://github.com/stolostron', target: '_blank' },
                { label: 'Data View', to: 'https://github.com/stolostron/react-data-view', target: '_blank' },
                { label: 'Demo' },
            ]}
            items={tasks}
            columns={columns}
            itemKeyFn={keyFn}
            itemActions={actions}
            filters={filters}
            itemToCardFn={taskToCardFn}
            searchKeys={[{ name: 'name' }]}
        />
    )
}
