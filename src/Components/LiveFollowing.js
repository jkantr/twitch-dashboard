import { useEffect, useState } from 'react';
import { Flex, Text, Spinner } from 'bumbag';
import { useAtom } from 'jotai';
import { userAtom, followingAtom, liveStreamsAtom } from '../Atoms/all';

function LiveFollowing({ twitch, children }) {
    const [user] = useAtom(userAtom);
    const [following] = useAtom(followingAtom);
    const [live, setLive] = useAtom(liveStreamsAtom);

    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (following.length > 0 && live.length <= 0) {
            setLoading(true);
            twitch.getFollowedStreams(following, user.id)
                .then((data) => setLive(data.sort((a, b) => {
                    return b.viewer_count - a.viewer_count
                })))
                .finally(() => setLoading(false));
        }
    }, [following, live, user.id, twitch, setLive]);

    return (
        <Flex
            altitude="100"
            padding="sm"
            color="primaryTint"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="primary300"
        >
            <Text.Block fontSize="150">
                {loading ? <Spinner padding="0 0.25em" size="small" display="inline-block" /> : live.length} streams you follow are live
                {console.log(live)}
                {/* {following.map((follow) => {
                    return (
                        <div>
                            {follow.to_name} - {new Date(follow.followed_at).toLocaleDateString()}
                        </div>
                    );
                })} */}
            </Text.Block>
            {children}
        </Flex>
    );
};

export default LiveFollowing;