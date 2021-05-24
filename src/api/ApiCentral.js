import axios from "axios";
import Urls from "./Urls";

/**
 * Request Wrapper with default success/error actions
 */

const request = async function (options, isHeader = false) {
  const client = axios.create({
    baseURL: Urls.BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  const onSuccess = function (response) {
    return response.data;
  };

  return client(options).then(onSuccess);
};

export default request;
