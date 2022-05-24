/* eslint-disable react/jsx-key */
import faker from '@faker-js/faker'
import { capitalize } from '@patternfly/react-core'
import { CheckCircleIcon, CircleNotchIcon, ExclamationCircleIcon } from '@patternfly/react-icons'
import { ReactNode, useMemo } from 'react'
import { CatalogCardBadgeColor } from '../src'
import { getPatternflyColor, PatternFlyColor } from '../src/patternfly-colors'
import { colors, getRandomAnimalNames, icons, randomArray, randomValue, randomValues } from './mock'

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
function createMockTask(name: string): IMockTask {
    const badge: {
        name?: string
        color?: CatalogCardBadgeColor
    } = {}

    switch (Math.floor(Math.random() * 4)) {
        case 1:
            badge.name = 'Tech Preview'
            badge.color = 'blue'
            break
        case 2:
            badge.name = 'Deprecated'
            badge.color = 'orange'
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
        name,
        labels: randomValues(0, 4, randomArray(4, () => faker.vehicle.fuel()).map(capitalize)),
        description: faker.lorem.paragraph(),
        colors: randomValues(0, 4, colors),
        badge: badge.name,
        status,
        created: now,
        modified: now,
    }
}

export function useMockTasks(count: number): IMockTask[] {
    return useMemo(() => {
        const animalNames = getRandomAnimalNames(count)
        return animalNames.map((name) => createMockTask(name))
    }, [count])
}

export function getTaskStatus(task: IMockTask) {
    switch (task.status) {
        case 'online':
            return {
                text: 'Online',
                icon: <CheckCircleIcon color={getPatternflyColor(PatternFlyColor.Green)} />,
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

// const statuses = [
//     { text: 'Online', icon: CatalogCardListItemIcon.CheckCircle, iconColor: CatalogIconColor.green },
//     { text: 'Offline', icon: CatalogCardListItemIcon.ExclamationCircle, iconColor: CatalogIconColor.red },
// ]
