import { memo } from 'react';
import { Flex, Text, Button } from 'bumbag';
import { useAtom } from 'jotai';
import { currentViewAtom } from '../Atoms/all';

function Nav() {
    const [view, setView] = useAtom(currentViewAtom);

    const NavButton = memo((props) => {
        const { viewName, text, ...restProps } = props;

        return (
            <Button
                variant="link"
                color="white"
                palette="primary"
                onClick={() => setView(viewName)}
                textDecoration={viewName === view ? "underline" : ""}
                {...restProps}
            > 
                {text}
            </Button>
        )
    }, [view]);

    return (
        <Flex
            altitude="100"
            padding="sm"
            flexGrow="1"
            alignItems="center"
            color="primaryTint"
            backgroundColor="primary300"
        >
            <Text.Block fontSize="150">
                <NavButton text="Live Grid" viewName="live-streams" />
                <NavButton text="Following" viewName="following" />
            </Text.Block>
        </Flex>
    );
};

export default Nav;