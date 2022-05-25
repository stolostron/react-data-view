import { useCallback, useEffect, useState } from 'react'

export function useMockData<T>(defaultCount: number, createFn: () => T, updateFn: (item: T) => T) {
    const [items, setItems] = useState<T[]>(() => new Array(defaultCount).fill(0).map(createFn))

    const [createInterval, setCreateInterval] = useState<number>()
    useEffect(() => {
        if (createInterval !== undefined) {
            const timer = setInterval(() => {
                setItems((items) => {
                    items = [...items]
                    items.push(createFn())
                    return items
                })
            }, createInterval)
            return () => clearInterval(timer)
        }
        return undefined
    }, [createFn, createInterval])

    const [updateInterval, setUpdateInterval] = useState<number>()
    useEffect(() => {
        if (updateInterval !== undefined) {
            const timer = setInterval(() => {
                setItems((items) => {
                    if (items.length === 0) return items
                    items = [...items]
                    const index = Math.floor(Math.random() * items.length)
                    items[index] = updateFn(items[index])
                    return items
                })
            }, updateInterval)
            return () => clearInterval(timer)
        }
        return undefined
    }, [updateFn, updateInterval])

    const [deleteInterval, setDeleteInterval] = useState<number>()
    useEffect(() => {
        if (deleteInterval !== undefined) {
            const timer = setInterval(() => {
                setItems((items) => {
                    if (items.length === 0) return items
                    items = [...items]
                    const index = Math.floor(Math.random() * items.length)
                    items.splice(index, 1)
                    return items
                })
            }, deleteInterval)
            return () => clearInterval(timer)
        }
        return undefined
    }, [deleteInterval])

    const setCount = useCallback(
        (count: number) => {
            setItems((items) => {
                items = [...items]
                while (items.length < count) {
                    items.push(createFn())
                }
                items = items.slice(0, count)
                return items
            })
        },
        [createFn]
    )

    return { items, createInterval, setCreateInterval, updateInterval, setUpdateInterval, deleteInterval, setDeleteInterval, setCount }
}
