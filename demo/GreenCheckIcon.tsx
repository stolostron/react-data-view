import { CheckIcon } from '@patternfly/react-icons'
import { getPatternflyColor, PatternFlyColor } from '../src/components/patternfly-colors'
import { Icon } from '@patternfly/react-core'

export const GreenCheckIcon = () => (
    <Icon color={getPatternflyColor(PatternFlyColor.Green)}>
        <CheckIcon />
    </Icon>
)
