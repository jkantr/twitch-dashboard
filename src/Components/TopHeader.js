import { useAtom } from 'jotai';
import { useState } from 'react';
import { userAtom, twitchAtom } from '../Atoms/all';
import { Button, Flex } from 'bumbag';
import config from '../config';
import Nav from './Nav';
import Following from './Following';
import LiveFollowing from './LiveFollowing';

function TopHeader(props) {
    const [user, setUser] = useAtom(userAtom);
    const [twitch, setClient] = useAtom(twitchAtom);

    const [isLoading, setLoading] = useState(false);

    function doLogout() {
        setLoading(true);

        twitch.revokeToken(user.token, config.clientId)
            .catch((e) => console.warn(e.message))
            .finally(() => {
                setLoading(false);
                setUser({});
                setClient(null);
            });

    }

    return (
        <Flex width="100%">
            <Nav />
            <Following twitch={twitch} />
            <LiveFollowing twitch={twitch}>
                <Button
                    isLoading={isLoading}
                    onClick={doLogout}
                    size="small"
                    variant="outlined"
                    palette="primary"
                    marginLeft="1rem"
                    justifySelf="flex-end"
                >
                    Log Out
                </Button>
            </LiveFollowing>
        </Flex>
    );
}

export default TopHeader;