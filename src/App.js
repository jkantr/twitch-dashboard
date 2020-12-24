import qs from 'qs';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import camelcaseKeys from 'camelcase-keys';
import { Provider as BumbagProvider } from 'bumbag';
import { userAtom, isDevAtom, twitchAtom } from './Atoms/all';
import Dashboard from './Components/Dashboard';
import createClient from './Transport/twitch';
import config from './config';

function App() {
  const [, setIsDev] = useAtom(isDevAtom);
  const [user, setUser] = useAtom(userAtom);
  const [twitch, setTwitch] = useAtom(twitchAtom);

  let hash = qs.parse(document.location.hash.replace('#', ''));

  useEffect(() => {
      setIsDev(true);
  }, [setIsDev]);

  useEffect(() => {
    /*
     * OAuth2 implicit response case -
     * creates API client AND retrieves and sets user
     */
    if (hash.access_token) {
        setTwitch(createClient(config.clientId, hash.access_token));
        setUser({ token: hash.access_token });
        document.location.hash = '';
    }

    /*
     * User was pulled from localStorage but no api client (page reload) -
     * only creates API client as we have the user already
     */
    if (!twitch && user.id) {
      setTwitch(createClient(config.clientId, user.token));
    }

    if (twitch && !user.id) {
      twitch.getMe().then(({ data: [ me ] }) => {
        setUser({
          ...user,
          ...camelcaseKeys(me),
        });
      });
    }
  }, [hash, user, twitch, setTwitch, setUser]);

  return (
    <BumbagProvider>
      <Dashboard />
    </BumbagProvider>
  );
}

export default App;
