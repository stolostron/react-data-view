import { createContext, useContext } from 'react'

export interface DataViewStrings {
    backLabel: string
    cancelLabel: string
    noItemsString: string
    getStartedMessage: string
    createItemString: string
}

export const defaultStrings: DataViewStrings = {
    backLabel: 'Back',
    cancelLabel: 'Cancel',
    noItemsString: 'No items yet',
    getStartedMessage: 'To get started, create an item',
    createItemString: 'Create item',
}

export const DataViewStringContext = createContext<DataViewStrings>(defaultStrings)

export function useStringContext() {
    return useContext(DataViewStringContext)
}
