import { ButtonVariant, MenuToggle, MenuToggleElement, Tab, Tabs, Select, SelectList, SelectOption } from '@patternfly/react-core'
import { CheckIcon } from '@patternfly/react-icons'
import { Fragment, useCallback, useMemo, useState } from 'react'
import {
    CatalogCardItemType,
    DateCell,
    ICatalogCard,
    IItemFilter,
    ITableColumn,
    ItemView,
    IToolbarAction,
    Labels,
    TextCell,
    ToolbarActionType,
} from '../src'
import { IItemAction } from '../src/ItemActions'
import { PageHeader } from '../src/PageHeader'
import { colors } from './mock'
import { RouteE } from './route'
import { getTaskStatus, IMockTask, mockLabels, useMockTasks } from './useTasks'
import { GreenCheckIcon } from './GreenCheckIcon'

export function ItemViewDemo() {
    // With PF4, performance was good with 100,000 items
    const { items: tasks, createItem, deleteItems } = useMockTasks(1000)

    const [actionsOpen, setActionsOpen] = useState(false)

    const keyFn = useCallback((task: IMockTask) => task.id, [])

    const columns: ITableColumn<IMockTask>[] = useMemo(
        () => [
            {
                header: 'Name',
                cell: (task) => <TextCell icon={task.icon} text={task.name} />,
                sortFn: (l, r) => l.name.localeCompare(r.name),
            },
            {
                header: 'Status',
                cell: (task) => {
                    const status = getTaskStatus(task)
                    return <TextCell icon={status.icon} text={status.text} iconSize="sm" />
                },
                sortFn: (l, r) => l.status.localeCompare(r.status),
            },
            { header: 'Description', cell: (task) => task.description },
            { header: 'Colors', cell: (task) => <Labels labels={task.colors} />, minWidth: 320 },
            { header: 'Labels', cell: (task) => <Labels labels={task.labels} />, minWidth: 320 },
            { header: 'Created', cell: (task) => <DateCell value={task.created} />, sortFn: (l, r) => l.created - r.created },
            { header: 'Modified', cell: (task) => <DateCell value={task.modified} />, sortFn: (l, r) => l.modified - r.modified },
        ],
        []
    )

    const [useBulkActions, setUseBulkActions] = useState(true)
    const toolbarActions = useMemo(() => {
        const newToolbarActions: IToolbarAction<IMockTask>[] = [
            {
                type: ToolbarActionType.button,
                variant: ButtonVariant.primary,
                label: 'Create',
                onClick: createItem,
            },
        ]
        if (useBulkActions) {
            newToolbarActions.push({
                type: ToolbarActionType.bulk,
                variant: ButtonVariant.secondary,
                label: 'Delete',
                onClick: deleteItems,
            })
        }
        return newToolbarActions
    }, [createItem, deleteItems, useBulkActions])

    const [useItemActions, setUseItemActions] = useState(true)
    const actions: IItemAction<IMockTask>[] | undefined = useMemo(
        () => (useItemActions ? [{ label: 'Delete', onClick: (item) => deleteItems([item]) }] : undefined),
        [deleteItems, useItemActions]
    )

    const statusFilter = useMemo<IItemFilter<IMockTask>>(
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
    const colorsFilter = useMemo<IItemFilter<IMockTask>>(
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

    const labelFilter = useMemo<IItemFilter<IMockTask>>(
        () => ({
            label: 'Labels',
            options: mockLabels.map((label) => ({ label: label, value: label })),
            filter: (item: IMockTask, values: string[]) => {
                // TODO values as Record<string,boolean> for performance
                for (const value of values) {
                    if (item.labels.includes(value)) {
                        return true
                    }
                }
                return false
            },
        }),
        []
    )

    const filters = useMemo(() => [statusFilter, colorsFilter, labelFilter], [labelFilter, colorsFilter, statusFilter])

    const taskToCardFn = useCallback<(task: IMockTask) => ICatalogCard>((task) => {
        const card: ICatalogCard = {
            icon: task.icon,
            id: task.id,
            title: task.name,
            labels: task.labels.map((label) => ({ label })),
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
                icon: <GreenCheckIcon />,
            })
        }
        return card
    }, [])

    const [useSearch, setUseSearch] = useState(true)
    const searchKeys = useMemo(() => (useSearch ? [{ name: 'name' }] : undefined), [useSearch])

    const breadcrumbs = useMemo(() => [{ label: 'Home', to: RouteE.Home }, { label: 'Demo' }], [])

    return (
        <Fragment>
            <PageHeader
                title="Item View"
                breadcrumbs={breadcrumbs}
                navigation={
                    <Tabs hasNoBorderBottom>
                        <Tab title="Item demo" eventKey={0}></Tab>
                    </Tabs>
                }
                actions={
                    <Select
                        role="menu"
                        popperProps={{ position: 'right' }}
                        toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                            <MenuToggle
                                ref={toggleRef}
                                variant="primary"
                                id="toggle-position-right"
                                onClick={() => setActionsOpen((open) => !open)}
                                isExpanded={actionsOpen}
                            >
                                Options
                            </MenuToggle>
                        )}
                        isOpen={actionsOpen}
                        onOpenChange={setActionsOpen}
                    >
                        <SelectList>
                            <SelectOption
                                key="useBulkActions"
                                hasCheckbox
                                isSelected={useBulkActions}
                                onClick={() => setUseBulkActions((useBulkActions) => !useBulkActions)}
                            >
                                Use bulk actions
                            </SelectOption>
                            <SelectOption
                                key="useSearch"
                                hasCheckbox
                                isSelected={useSearch}
                                onClick={() => setUseSearch((useSearch) => !useSearch)}
                            >
                                Use search
                            </SelectOption>
                            <SelectOption
                                key="useItemActions"
                                hasCheckbox
                                isSelected={useItemActions}
                                onClick={() => setUseItemActions((useItemActions) => !useItemActions)}
                            >
                                Use item actions
                            </SelectOption>
                        </SelectList>
                    </Select>
                }
            />
            <ItemView
                items={tasks}
                columns={columns}
                itemKeyFn={keyFn}
                itemActions={actions}
                toolbarActions={toolbarActions}
                filters={filters}
                itemToCardFn={taskToCardFn}
                searchKeys={searchKeys}
                createItem={createItem}
            />
        </Fragment>
    )
}
