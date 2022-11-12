// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'js1v1sbl1b'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-1nmqyz41ff0px2nb.us.auth0.com',            // Auth0 domain
  clientId: 'BkdrGIyBeIUyM27HgeU04nJ27jtCdXRe',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
