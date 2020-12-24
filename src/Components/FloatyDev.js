import { Box, Flex, Text, Image, Disclosure } from 'bumbag';
import { useAtom } from 'jotai';
import { userAtom } from '../Atoms/all';

function FloatyDev(props) {
    const [user] = useAtom(userAtom);

    const { profileImageUrl, ...restUser } = user;

    return (
        <Disclosure.State>
            <Disclosure>
                <Flex
                    altitude="300"
                    position="fixed"
                    alignItems="center"
                    justifyContent="center"
                    color="primaryTint"
                    bottom="0" right="5px"
                    width="20em" height="1em"
                    backgroundColor="primary"
                >
                    <Text.Block fontSize="100" verticalAlign="middle">TOGGLE DEBUG WINDOW</Text.Block>
                </Flex>
            </Disclosure>
            <Disclosure.Content>
                <Box
                    altitude="300"
                    position="fixed"
                    padding="xs"
                    color="primaryTint"
                    border="1px solid primary"
                    bottom="1em" right="5px"
                    width="20em" height="20em"
                    backgroundColor="primary300"
                >
                    
                    <Image src={user.profileImageUrl} width="32px" float="right" />
                    <Text.Block whiteSpace="pre" fontSize="150">
                        {JSON.stringify(restUser, null, 2)}
                    </Text.Block>
                </Box>
            </Disclosure.Content>
        </Disclosure.State>
    );
};

export default FloatyDev;