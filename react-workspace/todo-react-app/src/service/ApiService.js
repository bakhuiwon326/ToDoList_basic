import { API_BASE_URL } from "../app-config";

export function call(api, method, request) {
  let options = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    // GET method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) => {
      if (!response.ok) {
        // 오류 응답 처리
        throw new Error(response.status);
      }
      // 정상적인 응답 처리
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.log(error);
      if (error.message === "403") {
        window.location.href = "/login"; // 403 에러 시 로그인 페이지로 리디렉션
      }
      return Promise.reject(error);
    });
}

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then((response) => {
    if (response.token) {
      // token이 존재하는 경우 Todo 화면으로 리디렉트
      window.location.href = "/";
    }
  });
}