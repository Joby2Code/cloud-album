import apigClientFactory from "aws-api-gateway-client";
import { fileToBase64 } from "./util";

var awsConfig = {
  invokeUrl: "https://4sfad70fh6.execute-api.us-east-1.amazonaws.com/qa",
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
      "Content-Type": "text/plain"
    }
  };
  const encodedFile = await fileToBase64(file);
  var encodedImage;
  if (file.type === "image/jpeg") {
    encodedImage = encodedFile.substring(23);
  } else {
    encodedImage = encodedFile.substring(22);
  }
  console.log(file.type);
  console.log(encodedFile);
  console.log(encodedImage);
  return apiClient.invokeApi(
    null,
    pathTemplate,
    method,
    additionalParams,
    encodedImage
  );
};

export const setApiKey = key => {
  awsConfig.apiKey = key;
  apiClient = apigClientFactory.newClient(awsConfig);
};
