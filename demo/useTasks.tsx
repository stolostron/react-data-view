/* eslint-disable react/jsx-key */
import { faker } from '@faker-js/faker'
import { Icon, capitalize } from '@patternfly/react-core'
import { CheckCircleIcon, CircleNotchIcon, ExclamationCircleIcon } from '@patternfly/react-icons'
import { ReactNode } from 'react'
import { CatalogColor } from '../src'
import { getPatternflyColor, PatternFlyColor } from '../src/components/patternfly-colors'
import { colors, getRandomAnimalName, icons, randomArray, randomValue, randomValues } from './mock'
import { useMockData } from './useMockData'

export interface IMockTask {
    id: string
    icon: ReactNode
    name: string
    description: string
    status: string
    labels: string[]
    colors: string[]
    badge?: string
    created: number
    modified: number
}

export function mockTaskKey(mockTask: IMockTask) {
    return mockTask.id
}

let id = 0
function createMockTask(index: number): IMockTask {
    const badge: {
        name?: string
        color?: CatalogColor
    } = {}

    switch (Math.floor(Math.random() * 4)) {
        case 1:
            badge.name = 'Technology preview'
            badge.color = CatalogColor.blue
            break
        case 2:
            badge.name = 'Deprecated'
            badge.color = CatalogColor.orange
            break
    }
    let status = 'online'
    switch (Math.floor(Math.random() * 2)) {
        case 1:
            status = 'offline'
            break
    }
    const now = Date.now()
    return {
        id: (++id).toString(),
        icon: randomValue(icons),
        name: getRandomAnimalName() + ` ${index}`,
        labels: randomValues(0, 4, mockLabels),
        description: faker.lorem.paragraph(),
        colors: randomValues(0, 4, colors),
        badge: badge.name,
        status,
        created: now,
        modified: now,
    }
}

function updateMockTask(task: IMockTask): IMockTask {
    return task
}

export function useMockTasks(count: number) {
    return useMockData(count, createMockTask, updateMockTask)
}

export function getTaskStatus(task: IMockTask) {
    switch (task.status) {
        case 'online':
            return {
                text: 'Online',
                icon: (
                    <Icon color={getPatternflyColor(PatternFlyColor.Green)}>
                        <CheckCircleIcon />
                    </Icon>
                ),
            }
        case 'offline':
            return {
                text: 'Offline',
                icon: <ExclamationCircleIcon color={getPatternflyColor(PatternFlyColor.Red)} />,
            }
        default:
            return {
                text: 'Unknown',
                icon: <CircleNotchIcon color={getPatternflyColor(PatternFlyColor.Grey)} />,
            }
    }
}

export const mockLabels = randomArray(4, () => faker.vehicle.fuel()).map(capitalize)

// const statuses = [
//     { text: 'Online', icon: CatalogCardListItemIcon.CheckCircle, iconColor: CatalogIconColor.green },
//     { text: 'Offline', icon: CatalogCardListItemIcon.ExclamationCircle, iconColor: CatalogIconColor.red },
// ]
