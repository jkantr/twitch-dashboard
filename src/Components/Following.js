import { useEffect } from 'react';
import { Flex, Text, Spinner } from 'bumbag';
import { useAtom } from 'jotai';
import { userAtom, followingAtom } from '../Atoms/all';

function Following({ twitch }) {
    const [user] = useAtom(userAtom);
    const [following, setFollowing] = useAtom(followingAtom);

    useEffect(() => {
        if (twitch && following.length <= 0) {
            twitch.getUserFollows(user.id)
                .then(({ data }) => setFollowing(data));
        }
    }, [user.id, twitch, following, setFollowing]);

    return (
        <Flex
            altitude="100"
            padding="sm"
            flexShrink="1"
            alignItems="center"
            justifyContent="flex-end"
            color="primaryTint"
            backgroundColor="primary300"
        >
            <Text.Block fontSize="150">
                You follow {following.length > 0 ? following.length : <Spinner padding="0 0.5em" size="small" display="inline-block" />} broadcasters
                {/* {following.map((follow) => {
                    return (
                        <div>
                            {follow.to_name} - {new Date(follow.followed_at).toLocaleDateString()}
                        </div>
                    );
                })} */}
            </Text.Block>
        </Flex>
    );
};

export default Following;