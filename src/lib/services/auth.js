import { createAuth0Client } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen } from '$lib/stores/auth';
import { config } from '$lib/config/auth_config';
import { fullUser } from '$lib/stores/profile';
const  { domain, clientId} = config;

async function createClient() {
    let auth0Client = await createAuth0Client({
        domain,
        clientId
    });

    return auth0Client;
}

async function loginWithPopup(client, options) {
    popupOpen.set(true);
    try {
        await client.loginWithPopup(options);
        const u = await client.getUser();
        user.set(u);
        fullUser.set(u);
        isAuthenticated.set(true);

    } catch (e) {
        // eslint-disable-next-line
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logout(client) {
    return client.logout();
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;