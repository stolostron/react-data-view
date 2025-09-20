import t_global_breakpoint_2xl from '@patternfly/react-tokens/dist/esm/t_global_breakpoint_2xl'
import t_global_breakpoint_lg from '@patternfly/react-tokens/dist/esm/t_global_breakpoint_lg'
import t_global_breakpoint_md from '@patternfly/react-tokens/dist/esm/t_global_breakpoint_md'
import t_global_breakpoint_sm from '@patternfly/react-tokens/dist/esm/t_global_breakpoint_sm'
import t_global_breakpoint_xl from '@patternfly/react-tokens/dist/esm/t_global_breakpoint_xl'
import t_global_breakpoint_xs from '@patternfly/react-tokens/dist/esm/t_global_breakpoint_xs'
import { useCallback, useEffect, useState } from 'react'

export enum WindowSize {
    xs,
    sm,
    'md',
    'lg',
    'xl',
    '2xl',
}

// Helper function to convert rem to pixels (assumes 16px = 1rem)
const remToPixels = (remValue: string): number => {
    if (remValue.endsWith('rem')) {
        return Number(remValue.replace('rem', '')) * 16
    } else if (remValue.endsWith('px')) {
        // Fallback for backward compatibility
        return Number(remValue.replace('px', ''))
    } else {
        return Number(remValue)
    }
}

const breakpoints: Record<WindowSize, number> = {
    [WindowSize.xs]: remToPixels(t_global_breakpoint_xs.value),
    [WindowSize.sm]: remToPixels(t_global_breakpoint_sm.value),
    [WindowSize.md]: remToPixels(t_global_breakpoint_md.value),
    [WindowSize.lg]: remToPixels(t_global_breakpoint_lg.value),
    [WindowSize.xl]: remToPixels(t_global_breakpoint_xl.value),
    [WindowSize['2xl']]: remToPixels(t_global_breakpoint_2xl.value),
}

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>(WindowSize['2xl'])
    const handleResize = useCallback(() => {
        let size = WindowSize['2xl']
        for (; size >= WindowSize.sm; size--) {
            const breakpoint = breakpoints[size]
            if (window.innerWidth >= breakpoint) {
                break
            }
        }
        setWindowSize(size)
    }, [])

    useEffect(() => {
        const handler = handleResize
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [handleResize])

    useEffect(() => handleResize(), [handleResize])

    return windowSize
}

export function useWindowSizeOrLarger(size: WindowSize) {
    const windowSize = useWindowSize()
    return windowSize >= size
}

export function useWindowSizeOrSmaller(size: WindowSize) {
    const windowSize = useWindowSize()
    return windowSize <= size
}
