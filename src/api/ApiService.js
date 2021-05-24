import request from "./ApiCentral";
import Urls from "./Urls";

function getUserFiles() {
  return request({
    url: Urls.USER_FILE,
    method: "GET",
  });
}

function getUserFilesById(id) {
  return request({
    url: Urls.USER_FILE + "/" + id,
    method: "GET",
  });
}

function addUserFile(data) {
  return request({
    url: Urls.USER_FILE,
    method: "POST",
    data: data,
  });
}

function updateUserFile(id, file) {
  return request({
    url: Urls.USER_FILE + "/" + id,
    method: "PUT",
    data: file,
  });
}

function deleteUserFileById(id) {
  return request({
    url: Urls.USER_FILE + "/" + id,
    method: "DELETE",
  });
}

const ApiService = {
  getUserFiles,
  getUserFilesById,
  addUserFile,
  updateUserFile,
  deleteUserFileById,
};

export default ApiService;
