import apigClientFactory from 'aws-api-gateway-client'

var awsConfig = {
  invokeUrl: 'https://4sfad70fh6.execute-api.us-east-1.amazonaws.com/dev',
  apiKey: '',
  region: 'us-east-1',
}
var apiClient = apigClientFactory.newClient(awsConfig)

export const queryImage = (query) => {
  const method = 'GET';
  const pathTemplate = `/search`;
  const additionalParams = {
    queryParams: {
      'q': query
    }
  };
  return apiClient.invokeApi(null, pathTemplate, method, additionalParams)
    .then(res => res.data)
}

export const setApiKey = (key) => {
  awsConfig.apiKey = key
  apiClient = apigClientFactory.newClient(awsConfig)
}