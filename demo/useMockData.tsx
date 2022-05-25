import { useCallback, useEffect, useRef, useState } from 'react'

export function useMockData<T>(defaultCount: number, createFn: (count: number) => T, updateFn: (item: T) => T) {
    const [items, setItems] = useState<T[]>([])
    const countRef = useRef({ count: 5 })

    const create = useCallback(() => {
        countRef.current.count++
        return createFn(countRef.current.count)
    }, [createFn])

    const [createInterval, setCreateInterval] = useState<number>()
    useEffect(() => {
        if (createInterval !== undefined) {
            const timer = setInterval(() => {
                setItems((items) => {
                    items = [...items]
                    items.push(create())
                    return items
                })
            }, createInterval)
            return () => clearInterval(timer)
        }
        return undefined
    }, [create, createInterval])

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
                    items.push(create())
                }
                items = items.slice(0, count)
                return items
            })
        },
        [create]
    )

    useEffect(() => {
        setCount(defaultCount)
    }, [defaultCount, setCount])

    const createItem = useCallback(() => {
        setItems((items) => {
            items = [...items]
            items.push(create())
            return items
        })
    }, [create])

    const deleteItems = useCallback((deleteItems: T[]) => {
        setItems((items) => {
            items = items.filter((item) => !deleteItems.includes(item))
            return items
        })
    }, [])

    return {
        items,
        createInterval,
        setCreateInterval,
        updateInterval,
        setUpdateInterval,
        deleteInterval,
        setDeleteInterval,
        setCount,
        createItem,
        deleteItems,
    }
}
