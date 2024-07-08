import {
    Button,
    DataList,
    DataListCell,
    DataListCheck,
    DataListControl,
    DataListItemCells,
    Modal,
    ModalVariant,
    Text,
    TextContent,
    TextVariants,
} from '@patternfly/react-core'
import { FormEvent, useCallback, useMemo, useState } from 'react'
import { ITableColumn } from './TableColumn'
import { DragDropSort, DragDropSortDragEndEvent, DraggableObject } from '@patternfly/react-drag-drop'

export function useColumnModal<T extends object>(columns: ITableColumn<T>[]) {
    const [columnModalOpen, setColumnModalOpen] = useState(false)
    const openColumnModal = useCallback(() => {
        setColumnModalOpen(true)
    }, [])
    const [managedColumns, setManagedColumns] = useState(() => columns)
    const onClose = useCallback(() => {
        setColumnModalOpen(false)
    }, [])
    const selectAllColumns = useCallback(() => {
        setManagedColumns((managedColumns) => {
            for (const column of managedColumns) {
                column.enabled = true
            }
            return [...managedColumns]
        })
    }, [])
    const onDragFinish = useCallback((_: DragDropSortDragEndEvent, itemOrder: DraggableObject[]) => {
        setManagedColumns((managedColumns) => {
            return itemOrder.map(({ id }) => managedColumns.find((column) => column.header === id)) as ITableColumn<T>[]
        })
    }, [])
    const handleChange = useCallback((event: FormEvent<HTMLInputElement>, checked: boolean) => {
        const columnHeader = (event.target as unknown as { name?: string }).name
        if (columnHeader) {
            setManagedColumns((managedColumns) => {
                for (const column of managedColumns) {
                    if (column.header !== columnHeader) continue
                    column.enabled = checked
                }
                return [...managedColumns]
            })
        }
    }, [])
    const items = useMemo<DraggableObject[]>(
        () =>
            managedColumns.map((column) => ({
                id: column.header,
                content: (
                    <>
                        <DataListControl>
                            <DataListCheck
                                aria-labelledby={column.header}
                                checked={column.enabled !== false}
                                name={column.header}
                                id={column.header}
                                onChange={handleChange}
                                otherControls
                            />
                        </DataListControl>
                        <DataListItemCells
                            dataListCells={[
                                <DataListCell id={column.header} key={column.header}>
                                    <label htmlFor={column.header}>{column.header}</label>
                                </DataListCell>,
                            ]}
                        />
                    </>
                ),
            })),
        [handleChange, managedColumns]
    )
    const columnModal = (
        <Modal
            variant={ModalVariant.medium}
            title="Manage columns"
            description={
                <TextContent>
                    <Text component={TextVariants.p}>Selected categories will be displayed in the table.</Text>
                    <Button isInline onClick={selectAllColumns} variant="link">
                        Select all
                    </Button>
                </TextContent>
            }
            isOpen={columnModalOpen}
            onClose={onClose}
            actions={[
                <Button key="save" variant="primary" onClick={onClose}>
                    Save
                </Button>,
                <Button key="cancel" variant="link" onClick={onClose}>
                    Cancel
                </Button>,
            ]}
        >
            <DragDropSort items={items} onDrop={onDragFinish} variant="DataList">
                <DataList aria-label="Table column management" id="table-column-management" isCompact />
            </DragDropSort>
        </Modal>
    )
    return { openColumnModal, columnModal, managedColumns }
}
