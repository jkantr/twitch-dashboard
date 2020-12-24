import { useAtom } from 'jotai';
import { formatDistanceToNow } from 'date-fns';
import { Container, Text, Flex, Image } from 'bumbag';
import { liveStreamsAtom } from '../Atoms/all';

function LiveStreams() {
    const [liveStreams] = useAtom(liveStreamsAtom);

    return (
        <Flex flexWrap="wrap">
            {liveStreams.map(liveStream => {
                return (
                    <Container
                        key={liveStream.id}
                        padding="xs"
                        color="primary"
                        display="flex"
                        maxWidth="295px"
                        flexDirection="column"
                        justifyContent="space-around"
                        backgroundColor="primaryTint"
                    >
                        <Image width="295px" src={liveStream.thumbnail_url.replace('{width}x{height}', '295x170')}/>
                        <Text fontSize="150">{liveStream.user_name}</Text>
                        <Text fontSize="150">started {formatDistanceToNow(new Date(liveStream.started_at), { addSuffix: true })}</Text>
                        <Text maxHeight="1.5em" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" fontSize="150">{liveStream.title}</Text>
                        <Text fontSize="150">Playing {liveStream.game_name} for {liveStream.viewer_count} viewers</Text>
                    </Container>
                )
            })}
        </Flex>
    );
};

export default LiveStreams;