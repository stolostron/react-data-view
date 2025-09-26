import { ColumnManagementModal, type ColumnManagementModalColumn } from '@patternfly/react-component-groups'
import { useCallback, useState } from 'react'
import { ITableColumn } from './TableColumn'

// prep our columns for the modal component
function prepareColumnsForModal<T extends object>(columns: ITableColumn<T>[]): ColumnManagementModalColumn[] {
    return columns.map((column, index) => ({
        // patternfly wants key/title instead of our header field
        key: column.header,
        title: column.header,
        isShownByDefault: column.enabled !== false,
        // keep first column always toggleable so user can't hide everything
        isUntoggleable: index === 0,
    }))
}

// take the modal results and update our column state
function applyModalChanges<T extends object>(
    modalColumns: ColumnManagementModalColumn[],
    originalColumns: ITableColumn<T>[]
): ITableColumn<T>[] {
    return originalColumns.map((originalColumn) => {
        const modalColumn = modalColumns.find((mc) => mc.key === originalColumn.header)
        return {
            ...originalColumn,
            enabled: modalColumn ? modalColumn.isShown ?? modalColumn.isShownByDefault : originalColumn.enabled !== false,
        }
    })
}

export function useColumnModal<T extends object>(columns: ITableColumn<T>[]) {
    const [columnModalOpen, setColumnModalOpen] = useState(false)
    const [managedColumns, setManagedColumns] = useState(() => columns)

    const openColumnModal = useCallback(() => {
        setColumnModalOpen(true)
    }, [])

    const onClose = useCallback(() => {
        setColumnModalOpen(false)
    }, [])

    const applyColumns = useCallback(
        (newColumns: ColumnManagementModalColumn[]) => {
            const updatedColumns = applyModalChanges(newColumns, managedColumns)
            setManagedColumns(updatedColumns)
            setColumnModalOpen(false)
        },
        [managedColumns]
    )

    const columnModal = (
        <ColumnManagementModal
            isOpen={columnModalOpen}
            onClose={onClose}
            appliedColumns={prepareColumnsForModal(managedColumns)}
            applyColumns={applyColumns}
            title="Manage columns"
            description="Select which columns to display in the table."
        />
    )

    return { openColumnModal, columnModal, managedColumns }
}
