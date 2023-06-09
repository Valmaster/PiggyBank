
export const environment = {
  production: true,
  host: '',
  graphql: 'graphql',
  subscription: window.location.origin.replace(/^http/, 'ws') + '/graphql',
};
