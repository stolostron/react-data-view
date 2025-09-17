import { Button, Modal, ModalBody, ModalFooter, Checkbox, Content, ActionGroup } from '@patternfly/react-core'
import { useCallback, useState } from 'react'
import { ITableColumn } from './TableColumn'
// DragDropSort removed due to PatternFly 6 compatibility issues

export function useColumnModal<T extends object>(columns: ITableColumn<T>[]) {
    const [columnModalOpen, setColumnModalOpen] = useState(false)
    const openColumnModal = useCallback(() => {
        setColumnModalOpen(true)
    }, [])
    const [managedColumns, setManagedColumns] = useState(() => columns)
    const onClose = useCallback(() => {
        setColumnModalOpen(false)
    }, [])
    const allSelected = managedColumns.every((column) => column.enabled !== false)
    const selectedCount = managedColumns.filter((column) => column.enabled !== false).length

    const toggleSelectAll = useCallback(() => {
        setManagedColumns((managedColumns) => {
            return managedColumns.map((column, index) => ({
                ...column,
                // if unselecting all, keep the first column usually "Name" as selected
                enabled: allSelected ? index === 0 : true,
            }))
        })
    }, [allSelected])
    const handleChange = useCallback(
        (columnHeader: string, checked: boolean) => {
            setManagedColumns((managedColumns) => {
                const currentColumn = managedColumns.find((col) => col.header === columnHeader)
                const isLastSelected = selectedCount === 1 && currentColumn?.enabled !== false

                // prevent unchecking the last remaining column
                if (!checked && isLastSelected) {
                    return managedColumns
                }

                return managedColumns.map((column) => (column.header === columnHeader ? { ...column, enabled: checked } : column))
            })
        },
        [selectedCount]
    )
    const columnModal = (
        <Modal title="Manage columns" isOpen={columnModalOpen} onClose={onClose} width="500px">
            <ModalBody>
                <Content className="pf-v6-u-mb-lg">
                    <p>Selected categories will be displayed in the table.</p>
                </Content>

                <div className="pf-v6-u-mb-lg">
                    <Button variant="link" isInline onClick={toggleSelectAll} className="pf-v6-u-p-0 pf-v6-u-mb-sm">
                        {allSelected ? 'Unselect all' : 'Select all'}
                    </Button>

                    {selectedCount === 1 && (
                        <div className="pf-v6-u-color-subtle pf-v6-u-font-size-sm pf-v6-u-font-style-italic pf-v6-u-mt-xs">
                            At least one column must remain selected
                        </div>
                    )}
                </div>

                <div
                    className="pf-v6-u-display-grid pf-v6-u-column-gap-lg pf-v6-u-row-gap-md"
                    style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
                >
                    {managedColumns.map((column) => (
                        <Checkbox
                            key={column.header}
                            id={`column-${column.header}`}
                            label={column.header}
                            isChecked={column.enabled !== false}
                            onChange={(_event, checked) => handleChange(column.header, checked)}
                        />
                    ))}
                </div>
            </ModalBody>

            <ModalFooter>
                <ActionGroup>
                    <Button variant="primary" onClick={onClose}>
                        Save
                    </Button>
                    <Button variant="link" onClick={onClose}>
                        Cancel
                    </Button>
                </ActionGroup>
            </ModalFooter>
        </Modal>
    )
    return { openColumnModal, columnModal, managedColumns }
}
