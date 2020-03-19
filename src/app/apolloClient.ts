import Auth from '@aws-amplify/auth';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import awsconfig from '../aws-exports';

const linkOptions = {
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: awsconfig.aws_appsync_authenticationType,
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
};

// @ts-ignore
const link = ApolloLink.from([createAuthLink(linkOptions), createSubscriptionHandshakeLink(linkOptions)]);

export default new ApolloClient({
  link,
  cache: new InMemoryCache({
    cacheRedirects: {
      Query: {
        getLesson: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Lesson', id: args.id }),
      },
    },
  }),
});
