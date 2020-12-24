import { useAtom } from 'jotai';
import { Spinner } from 'bumbag';
import LiveStreams from './LiveStreams';
import FollowingView from './FollowingView';
import { currentViewAtom } from '../Atoms/all';

function ViewContainer() {
    const [viewName] = useAtom(currentViewAtom);

    switch(viewName) {
        case 'live-streams': {
            return <LiveStreams />;
        }
        case 'following': {
            return <FollowingView />
        }
        default: {
            return <Spinner margin="auto 0" />
        }
    }
};

export default ViewContainer;