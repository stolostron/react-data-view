/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
    Button,
    Card,
    CardActions,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Checkbox,
    Dropdown,
    DropdownItem,
    DropdownSeparator,
    KebabToggle,
    Label,
    LabelGroup,
    List,
    ListItem,
    Split,
    SplitItem,
    Stack,
    StackItem,
    Title,
    Truncate,
} from '@patternfly/react-core'
import { ExternalLinkAltIcon } from '@patternfly/react-icons'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { IconWrapper } from './components/IconWrapper'
import { Scrollable } from './components/Scrollable'
import { IItemAction, isItemActionClick } from './ItemActions'

export enum CatalogIconColor {
    'red' = 'red',
    'green' = 'green',
    'blue' = 'blue',
    'yellow' = 'yellow',
}

export enum CatalogColor {
    blue = 'blue',
    cyan = 'cyan',
    green = 'green',
    orange = 'orange',
    purple = 'purple',
    red = 'red',
    grey = 'grey',
}

export interface ICatalogCard {
    id: string
    icon?: ReactNode
    title: string
    items?: CatalogCardItem[]
    labels?: { label: string; color?: CatalogColor }[] // TODO - disable/enable auto generated filters
    learnMore?: string
    badge?: string
    badgeColor?: CatalogColor
    onClick?: () => void
    additionalContent?: React.ReactNode
}

export interface ICatalogCardFeatureGroup {
    title: string
    features: string[] // TODO - allow features to specify an optional icon
    // TODO - disable/enable auto generated filters
}

export enum CatalogCardItemType {
    Description = 'description',
    List = 'list',
}

export interface ICatalogCardDescription {
    type: CatalogCardItemType.Description
    title?: string
    description: string
}

export interface ICatalogCardList {
    type: CatalogCardItemType.List
    title: string
    items: ICatalogCardListItem[]
    icon?: ReactNode
}

export enum CatalogCardListItemIcon {
    Checkmark = 'checkmark',
    Plus = 'plus',
    CheckCircle = 'check-circle',
    ExclamationCircle = 'exclamation-circle',
}

export interface ICatalogCardListItem {
    icon?: ReactNode
    text: string
}

export type CatalogCardItem = ICatalogCardDescription | ICatalogCardList

export function CatalogCard<T extends object>(props: {
    item: T
    itemToCardFn: (item: T) => ICatalogCard
    isSelected: (item: T) => boolean
    selectItem: (item: T) => void
    unselectItem: (item: T) => void
    itemActions?: IItemAction<T>[]
    showSelect: boolean
}) {
    const { item, itemToCardFn, isSelected, selectItem, unselectItem, itemActions, showSelect } = props

    const card = useMemo(() => itemToCardFn(item), [item, itemToCardFn])

    const [isOpen, setIsOpen] = useState(false)
    const onSelect = useCallback(() => {}, [])
    const onClick = useCallback(() => {
        if (isSelected(item)) {
            unselectItem(item)
        } else {
            selectItem(item)
        }
    }, [isSelected, item, selectItem, unselectItem])

    const showDropdown = itemActions !== undefined && itemActions.length > 0
    const showActions = showSelect || showDropdown

    const dropdownItems = useMemo(
        () =>
            itemActions?.map((itemAction, index) => {
                if (isItemActionClick(itemAction)) {
                    return (
                        <DropdownItem
                            key={itemAction.label}
                            onClick={() => {
                                itemAction.onClick(item)
                                setIsOpen(false)
                            }}
                        >
                            {itemAction.label}
                        </DropdownItem>
                    )
                }
                return <DropdownSeparator key={index} />
            }),
        [item, itemActions]
    )

    return (
        <Card
            id={card.id}
            key={card.id ?? card.title}
            onClick={card.onClick}
            isFlat
            isLarge
            isSelectable={card.onClick !== undefined}
            isRounded
            style={{
                transition: 'box-shadow 0.25s',
                cursor: card.onClick ? 'pointer' : undefined,
            }}
            isDisabledRaised={!card.onClick}
        >
            <CardHeader>
                <Split hasGutter style={{ width: '100%' }}>
                    <SplitItem isFilled>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {card.icon && (
                                <div
                                    style={{
                                        display: 'flex',
                                        height: 40,
                                        width: 40,
                                        marginTop: -20,
                                        marginBottom: -20,
                                        marginRight: 12,
                                        alignItems: 'center',
                                        justifyItems: 'stretch',
                                    }}
                                >
                                    <IconWrapper size="lg">{card.icon}</IconWrapper>
                                </div>
                            )}
                            <CardTitle>{card.title}</CardTitle>
                        </div>
                    </SplitItem>
                    {card.badge && (
                        <SplitItem>
                            <Label isCompact color={card.badgeColor}>
                                {card.badge}
                            </Label>
                        </SplitItem>
                    )}
                </Split>
                {showActions && (
                    <CardActions hasNoOffset>
                        {showDropdown && (
                            <Dropdown
                                onSelect={onSelect}
                                toggle={<KebabToggle onToggle={setIsOpen} />}
                                isOpen={isOpen}
                                isPlain
                                dropdownItems={dropdownItems}
                                position="right"
                            />
                        )}
                        {showSelect && (
                            <Checkbox
                                isChecked={isSelected(item)}
                                onChange={onClick}
                                aria-label="card checkbox example"
                                id="check-1"
                                name="check1"
                            />
                        )}
                    </CardActions>
                )}
            </CardHeader>
            {card.items && (
                <Scrollable>
                    <CardBody style={{ paddingTop: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            {card.items &&
                                card.items.map((item, index) => {
                                    switch (item.type) {
                                        case CatalogCardItemType.Description:
                                            return (
                                                <CardSection key={index} title={item.title}>
                                                    <span style={{ opacity: 9 }}>{item.description}</span>
                                                </CardSection>
                                            )
                                        case CatalogCardItemType.List:
                                            return <CardList title={item.title} icon={item.icon} items={item.items} />
                                    }
                                })}
                        </div>
                    </CardBody>
                </Scrollable>
            )}
            {(card.labels || card.learnMore) && (
                <CardFooter>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end', gap: 16 }}>
                        <div style={{ flexGrow: 1 }}>
                            {card.labels && (
                                <LabelGroup>
                                    {card.labels.map((item) => (
                                        <Label key={item.label} color={item.color}>
                                            <Truncate content={item.label} style={{ minWidth: 0 }} />
                                        </Label>
                                    ))}
                                </LabelGroup>
                            )}
                        </div>
                        {card.learnMore && (
                            <Button
                                variant="link"
                                icon={<ExternalLinkAltIcon />}
                                isInline
                                onClick={() => window.open(card.learnMore, '_blank')}
                            >
                                &nbsp;Learn more
                            </Button>
                        )}
                    </div>
                </CardFooter>
            )}
            {card.additionalContent}
        </Card>
    )
}

export function CardSection(props: { title?: string; children: ReactNode }) {
    return (
        <Stack>
            {props.title && (
                <StackItem>
                    <Title headingLevel="h6" style={{ paddingBottom: 8 }}>
                        {props.title}
                    </Title>
                </StackItem>
            )}
            {props.children}
        </Stack>
    )
}

export function CardList(props: { title: string; icon?: ReactNode; items: ICatalogCardListItem[] }) {
    const { title, items, icon } = props
    return (
        <CardSection title={title}>
            <List isPlain>
                {items?.map((listItem, index) => {
                    let itemIcon: ReactNode
                    if (listItem.icon) {
                        itemIcon = (
                            <IconWrapper size="md" noPadding>
                                {listItem.icon}
                            </IconWrapper>
                        )
                    } else if (icon) {
                        itemIcon = (
                            <IconWrapper size="md" noPadding>
                                {icon}
                            </IconWrapper>
                        )
                    }
                    return (
                        <ListItem key={index} icon={itemIcon} style={{ opacity: 0.85 }}>
                            {listItem.text}
                        </ListItem>
                    )
                })}
            </List>
        </CardSection>
    )
}
