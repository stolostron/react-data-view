/* eslint-disable react/jsx-key */
import { faker } from '@faker-js/faker'
import { Icon } from '@patternfly/react-core'
import {
    FishIcon,
    FlyIcon,
    GhostIcon,
    HippoIcon,
    LeafIcon,
    MoonIcon,
    MusicIcon,
    OtterIcon,
    PizzaSliceIcon,
    RadiationIcon,
    RobotIcon,
    RocketIcon,
    SeedlingIcon,
    SkullIcon,
    SnowflakeIcon,
    SpaceShuttleIcon,
    SpiderIcon,
    StarIcon,
    WineGlassIcon,
} from '@patternfly/react-icons'
import { PropsWithChildren } from 'react'

const LargeIcon = ({ children }: PropsWithChildren) => <Icon size="lg">{children}</Icon>

export const icons = [
    <LargeIcon>
        <SnowflakeIcon />
    </LargeIcon>,
    <LargeIcon>
        <SpiderIcon />
    </LargeIcon>,
    <LargeIcon>
        <StarIcon />
    </LargeIcon>,
    <LargeIcon>
        <SpaceShuttleIcon />
    </LargeIcon>,
    <LargeIcon>
        <WineGlassIcon />
    </LargeIcon>,
    <LargeIcon>
        <RobotIcon />
    </LargeIcon>,
    <LargeIcon>
        <RocketIcon />
    </LargeIcon>,
    <LargeIcon>
        <SkullIcon />
    </LargeIcon>,
    <LargeIcon>
        <SeedlingIcon />
    </LargeIcon>,
    <LargeIcon>
        <RadiationIcon />
    </LargeIcon>,
    <LargeIcon>
        <PizzaSliceIcon />
    </LargeIcon>,
    <LargeIcon>
        <OtterIcon />
    </LargeIcon>,
    <LargeIcon>
        <HippoIcon />
    </LargeIcon>,
    <LargeIcon>
        <MusicIcon />
    </LargeIcon>,
    <LargeIcon>
        <MoonIcon />
    </LargeIcon>,
    <LargeIcon>
        <LeafIcon />
    </LargeIcon>,
    <LargeIcon>
        <GhostIcon />
    </LargeIcon>,
    <LargeIcon>
        <FlyIcon />
    </LargeIcon>,
    <LargeIcon>
        <FishIcon />
    </LargeIcon>,
]

export const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange', 'Aqua']

export function getRandomAnimalName() {
    const f = (faker.animal as any)[faker.animal.type()] as () => string
    return f()
}

export function getRandomAnimalNames(count: number) {
    return randomArray(count, getRandomAnimalName)
}

export function randomArray(count: number, createFn: () => string) {
    const values: Record<string, string> = {}
    let c = 0
    while (Object.keys(values).length < count) {
        const value = createFn()
        values[value] = value
        if (c++ === count * 10) break
    }
    return Object.values(values).sort()
}

export function randomValue<T>(values: T[]) {
    return values[Math.floor(Math.random() * values.length)]
}

export function randomValues<T>(min: number, max: number, values: T[]) {
    return new Array(min + Math.floor(Math.random() * (max - min + 1)))
        .fill(0)
        .map(() => randomValue(values))
        .filter(unique)
}

export function unique<T>(value: T, index: number, self: T[]) {
    return self.indexOf(value) === index
}

export function capitalize(value: string) {
    return value[0].toUpperCase() + value.substring(1)
}
