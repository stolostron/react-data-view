export interface ITruncate {
    content: string
}

export function Truncate(props: ITruncate) {
    return (
        <span
            style={{
                display: 'inline-grid',
                gridAutoFlow: 'column',
                alignItems: 'baseline',
            }}
        >
            <span
                style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {props.content}
            </span>
        </span>
    )
}
