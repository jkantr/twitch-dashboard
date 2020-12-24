import qs from 'qs';
import { useAtom } from 'jotai';
import { userAtom, isDevAtom } from '../Atoms/all';
import { Button, Flex } from 'bumbag';
import config from '../config';
import './Dashboard.css';
import FloatyDev from './FloatyDev';
import TopHeader from './TopHeader';
import ViewContainer from './ViewContainer';

const twitchScopes = [
    'user:read:email'
]

const twitchOAUthSettings = {
    client_id: config.clientId,
    redirect_uri: config.hostname,
    response_type: 'token',
    scope: twitchScopes.join(' '),
}

const twitchOAuthURL = `https://id.twitch.tv/oauth2/authorize?${qs.stringify(twitchOAUthSettings)}`

function Dashboard(props) {
    const [isDev] = useAtom(isDevAtom);
    const [user] = useAtom(userAtom);

    return (
        <Flex className="dashboard-container" alignItems="center" backgroundColor="primaryTint" flexDirection="column">
            {user.id
                ? 
                    <>
                        { isDev ? <FloatyDev/> : <></> }
                        <TopHeader />
                        <ViewContainer />
                    </>
                :
                <Flex height="100vh" width="100vw" justifyContent="center" alignItems="center">
                    <a href={twitchOAuthURL}>
                        <Button className="login-button" palette="primary">Log In</Button>
                    </a>
                </Flex>}
        </Flex>
    );
}

export default Dashboard;