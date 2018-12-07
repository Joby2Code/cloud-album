import apigClientFactory from "aws-api-gateway-client";
import { fileToBase64 } from "./util";

var awsConfig = {
  invokeUrl: "https://4sfad70fh6.execute-api.us-east-1.amazonaws.com/dev",
  apiKey: "57aJGBCTbx5yQOlR5CuKkqSkcAGP4ROwdlHhphc0",
  region: "us-east-1"
};
var apiClient = apigClientFactory.newClient(awsConfig);

export const queryImage = query => {
  const method = "GET";
  const pathTemplate = "/search";
  const additionalParams = {
    queryParams: {
      q: query
    }
  };
  return apiClient
    .invokeApi(null, pathTemplate, method, additionalParams)
    .then(res => res.data);
};

export const uploadImage = async file => {
  const method = "PUT";
  const pathTemplate = `/photos/${file.name}`;
  const additionalParams = {
    headers: {
      "Content-Type": file.type
    }
  };
  // const body = await fileToBase64(file)
  const body = { file };
  console.log(file);
  return apiClient.invokeApi(
    null,
    pathTemplate,
    method,
    additionalParams,
    body
  );
};

export const setApiKey = key => {
  awsConfig.apiKey = key;
  apiClient = apigClientFactory.newClient(awsConfig);
};
