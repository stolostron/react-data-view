export enum PatternFlyColor {
    Green = 'green',
    Blue = 'blue',
    Red = 'red',
    Yellow = 'yellow',
    Grey = 'grey',
}

export function getPatternflyColor(color: PatternFlyColor) {
    switch (color) {
        case 'green':
            return 'var(--pf-v5-global--success-color--100)'
        case 'red':
            return 'var(--pf-v5-global--danger-color--100)'
        case 'yellow':
            return 'var(--pf-v5-global--warning-color--100)'
        case 'blue':
            return 'var(--pf-v5-global--info-color--100)'
    }
    return undefined
}
