import { debounce } from '@patternfly/react-core'
import xl2Breakpoint from '@patternfly/react-tokens/dist/esm/global_breakpoint_2xl'
import lgBreakpoint from '@patternfly/react-tokens/dist/esm/global_breakpoint_lg'
import mdBreakpoint from '@patternfly/react-tokens/dist/esm/global_breakpoint_md'
import smBreakpoint from '@patternfly/react-tokens/dist/esm/global_breakpoint_sm'
import xlBreakpoint from '@patternfly/react-tokens/dist/esm/global_breakpoint_xl'
import xsBreakpoint from '@patternfly/react-tokens/dist/esm/global_breakpoint_xs'
import { useCallback, useEffect, useState } from 'react'

const breakpoints = {
    md: mdBreakpoint,
    lg: lgBreakpoint,
    xl: xlBreakpoint,
    '2xl': xl2Breakpoint,
    sm: smBreakpoint,
    xs: xsBreakpoint,
}

/** Window width is greater than or equal to the indicated breakpoint. */
export function useBreakPoint(breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', debounceParam?: number) {
    const [isAtBreakPoint, setIsAtBreakPoint] = useState(false)

    const handleResize = useCallback(() => {
        const breakpointPx = breakpoints[breakpoint]
        if (!breakpointPx) {
            // eslint-disable-next-line no-console
            console.error('OverflowMenu will not be visible without a valid breakpoint.')
            return
        }
        const breakpointWidth = Number(breakpointPx.value.replace('px', ''))
        setIsAtBreakPoint(window.innerWidth >= breakpointWidth)
    }, [breakpoint])

    useEffect(() => {
        let handler = handleResize
        if (debounceParam) {
            handler = debounce(handler, debounceParam)
        }
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [handleResize, debounceParam])

    useEffect(() => handleResize(), [handleResize])

    return isAtBreakPoint
}
