import { API_BASE_URL } from "../app-config";

const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {

  let headers = new Headers({
    "Content-Type": "application/json"
  })

  // 로컬 스토리지에서 ACCESS_TOKEN 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if(accessToken && accessToken !== null){
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
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

export function signin(useDTO) {
  return call("/auth/signin", "POST", userDTO).then((response) => {
    if (response.token) {
      // 로컬 스토리지에 토큰을 저장한다.
      localStorage.setItem("ACCESS_TOKEN", response.token);
      // token이 존재하는 경우 Todo 화면으로 리디렉트
      window.location.href = "/";
    }
  });
}

export function signout(){
  localStorage.setItem(ACCESS_TOKEN, null);
  window.location.href="/login";
}