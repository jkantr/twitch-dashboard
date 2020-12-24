import { atom } from 'jotai';
export { default as userAtom } from './user';

export const isDevAtom = atom(false);
export const twitchAtom = atom(null);
export const followingAtom = atom([]);
export const liveStreamsAtom = atom([]);
export const currentViewAtom = atom(null);

export const followingLiveAtom = atom((get) => {
    let following = get(followingAtom)
    let liveStreams = get(liveStreamsAtom);

    return following.map((follow) => {
        let live = liveStreams.find(ls => ls.user_id === follow.to_id);

        if (live) {
            return {
                ...follow,
                ...live,
            }
        } else {
            return follow;
        }
    });
});