import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export function useTableItems<T extends object>(items: T[], keyFn: (item: T) => string | number) {
    const { selected, selectItem, unselectItem, isSelected, selectItems, unselectAll, allSelected } = useSelected(items, keyFn)
    const { sorted, sort, setSort } = useSorted(items)
    const { filtered, setFilterFn } = useFiltered(sorted, keyFn)
    const { searched, search, setSearch, setSearchFn } = useSearched(filtered, keyFn)
    const { paged, page, setPage, perPage, setPerPage } = usePaged(searched)
    const selectPage = useCallback(() => selectItems(paged), [paged, selectItems])
    const selectAll = useCallback(() => selectItems(searched), [searched, selectItems])
    return useMemo(
        () => ({
            allSelected,
            filtered,
            isSelected,
            page,
            paged,
            perPage,
            search,
            searched,
            selectAll,
            selectItem,
            selectPage,
            selected,
            setFilterFn,
            setPage,
            setPerPage,
            setSearch,
            setSearchFn,
            setSort,
            sort,
            sorted,
            unselectAll,
            unselectItem,
        }),
        [
            allSelected,
            filtered,
            isSelected,
            page,
            paged,
            perPage,
            search,
            searched,
            selectAll,
            selectItem,
            selectPage,
            selected,
            setFilterFn,
            setPage,
            setPerPage,
            setSearch,
            setSearchFn,
            setSort,
            sort,
            sorted,
            unselectAll,
            unselectItem,
        ]
    )
}

export function useSelected<T extends object>(items: T[], keyFn: (item: T) => string | number) {
    const [selectedMap, setSelectedMap] = useState<Record<string | number, T>>({})

    // TODO prune items?

    const selectItem = useCallback(
        (item: T) => {
            setSelectedMap((selectedMap) => {
                const itemKey = keyFn(item)
                const existing = selectedMap[itemKey]
                if (existing !== item) {
                    selectedMap = { ...selectedMap }
                    selectedMap[itemKey] = item
                }
                return selectedMap
            })
        },
        [keyFn]
    )

    const unselectItem = useCallback(
        (item: T) => {
            setSelectedMap((selectedMap) => {
                const itemKey = keyFn(item)
                const existing = selectedMap[itemKey]
                if (existing) {
                    selectedMap = { ...selectedMap }
                    delete selectedMap[itemKey]
                }
                return selectedMap
            })
        },
        [keyFn]
    )

    const isSelected = useCallback(
        (item: T) => {
            const itemKey = keyFn(item)
            return selectedMap[itemKey] !== undefined
        },
        [keyFn, selectedMap]
    )

    const selectItems = useCallback(
        (items: T[]) => {
            setSelectedMap((selectedMap) => {
                selectedMap = { ...selectedMap }
                for (const item of items) {
                    const itemKey = keyFn(item)
                    selectedMap[itemKey] = item
                }
                return selectedMap
            })
        },
        [keyFn]
    )

    const selectAll = useCallback(() => {
        selectItems(items)
    }, [items, selectItems])

    const unselectAll = useCallback(() => setSelectedMap({}), [])

    const selected = useMemo(() => Object.values(selectedMap), [selectedMap])
    const allSelected = useMemo(() => selected.length === items.length, [items.length, selected.length])
    return useMemo(
        () => ({
            selected,
            selectItem,
            unselectItem,
            isSelected,
            selectItems,
            selectAll,
            unselectAll,
            allSelected,
        }),
        [allSelected, isSelected, selectAll, selectItem, selectItems, selected, unselectAll, unselectItem]
    )
}

interface ISort<T extends object> {
    id: string
    sortFn: (l: T, r: T) => number
    direction: 'asc' | 'desc'
}
function useSorted<T extends object>(items: T[]) {
    const [sort, setSort] = useState<ISort<T>>()

    const { direction, sortFn } = sort ?? {}

    const sorted = useMemo(() => {
        if (sortFn) {
            if (direction === 'asc') {
                return items.sort(sortFn)
            } else {
                return items.sort(sortFn).reverse()
            }
        } else {
            return items
        }
    }, [direction, items, sortFn])

    return useMemo(() => ({ sorted, sort, setSort }), [sort, sorted])
}

function useFiltered<T extends object>(items: T[], keyFn: (item: T) => string | number) {
    const filterMapRef = useRef<{ map: Record<string | number, { item: T; passes: boolean }> }>({ map: {} })
    const [filterFn, setFilterFnState] = useState<(item: T) => boolean>()
    const setFilterFn = useCallback((filterFn: (item: T) => boolean) => setFilterFnState(() => filterFn), [])
    const [filtered, setFiltered] = useState<T[]>([])

    useEffect(() => {
        filterMapRef.current.map = {}
    }, [filterFn])

    const cachedFilterFn = useCallback(
        (item: T) => {
            const key = keyFn(item)
            let cached = filterMapRef.current.map[key]
            if (!cached) {
                cached = { item, passes: filterFn ? filterFn(item) : true }
                filterMapRef.current.map[key] = cached
            } else if (cached.item !== item) {
                cached.item = item
                cached.passes = filterFn ? filterFn(item) : true
            }
            return cached.passes
        },
        [filterFn, keyFn]
    )

    useEffect(() => {
        if (filterFn) {
            setFiltered(items.filter(cachedFilterFn))
        } else {
            setFiltered(items)
        }
    }, [items, filterFn, cachedFilterFn])

    return useMemo(
        function memoFiltered() {
            return { filtered, setFilterFn }
        },
        [filtered, setFilterFn]
    )
}

function useSearched<T extends object>(items: T[], keyFn: (item: T) => string | number) {
    const searchMapRef = useRef<{ map: Record<string | number, { item: T; score: number }> }>({ map: {} })
    const [searchFn, setSearchFnState] = useState<(item: T, search: string) => number>()
    const setSearchFn = useCallback((searchFn: (item: T, search: string) => number) => setSearchFnState(() => searchFn), [])
    const [searched, setSearched] = useState<T[]>([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        searchMapRef.current.map = {}
    }, [search, searchFn])

    const cachedSearchFn = useCallback(
        (item: T) => {
            const key = keyFn(item)
            let cached = searchMapRef.current.map[key]
            if (!cached) {
                cached = { item, score: searchFn ? searchFn(item, search) : 0 }
                searchMapRef.current.map[key] = cached
            } else if (cached.item !== item) {
                cached.item = item
                cached.score = searchFn ? searchFn(item, search) : 0
            }
            return cached
        },
        [keyFn, searchFn, search]
    )

    useEffect(() => {
        if (searchFn && search) {
            setSearched(
                items
                    .map(cachedSearchFn)
                    .filter((cached) => cached.score < 0.5)
                    .sort((l, r) => l.score - r.score)
                    .map((cached) => cached.item)
            )
        } else {
            setSearched(items)
        }
    }, [search, items, searchFn, cachedSearchFn])

    return useMemo(
        function memoFiltered() {
            return { searched, search, setSearch, setSearchFn }
        },
        [searched, search, setSearch, setSearchFn]
    )
}

export function usePaged<T extends object>(source: T[]) {
    const [paged, setPaged] = useState<T[]>([])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    useEffect(() => {
        setPaged((paged) => {
            const newPaged = source.slice((page - 1) * perPage, page * perPage)
            if (paged.length !== newPaged.length) {
                return newPaged
            }
            let index = 0
            for (const item of newPaged) {
                if (paged[index++] !== item) {
                    return newPaged
                }
            }
            return paged
        })
    }, [page, perPage, source])
    useEffect(() => {
        if (page > Math.ceil(source.length / perPage)) {
            setPage(1)
        }
    }, [page, perPage, source.length])

    return useMemo(() => ({ paged, page, setPage, perPage, setPerPage }), [page, paged, perPage])
}
