/* eslint-disable react/jsx-key */
import { faker } from '@faker-js/faker'
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

export const icons = [
    <SnowflakeIcon size="lg" />,
    <SpiderIcon size="lg" />,
    <StarIcon size="lg" />,
    <SpaceShuttleIcon size="lg" />,
    <WineGlassIcon size="lg" />,
    <RobotIcon size="lg" />,
    <RocketIcon size="lg" />,
    <SkullIcon size="lg" />,
    <SeedlingIcon size="lg" />,
    <RadiationIcon size="lg" />,
    <PizzaSliceIcon size="lg" />,
    <OtterIcon size="lg" />,
    <HippoIcon size="lg" />,
    <MusicIcon size="lg" />,
    <MoonIcon size="lg" />,
    <LeafIcon size="lg" />,
    <GhostIcon size="lg" />,
    <FlyIcon size="lg" />,
    <FishIcon size="lg" />,
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
