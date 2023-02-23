import { createContext, useContext } from 'react'

export interface DataViewStrings {
    backLabel: string
    cancelLabel: string
    noItemsString: (plural: string) => string
    getStartedMessage: (article: string, singular: string) => string
    createItemString: string
}

export const defaultStrings: DataViewStrings = {
    backLabel: 'Back',
    cancelLabel: 'Cancel',
    noItemsString: (plural) => `No ${plural} yet`,
    getStartedMessage: (article, singular) => `To get started, create ${article} ${singular}.`,
    createItemString: 'Create item',
}

export const StringContext = createContext<DataViewStrings>(defaultStrings)

export function useStringContext() {
    return useContext(StringContext)
}
