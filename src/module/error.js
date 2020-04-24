// api 에러 처리
export const axiosErrorHandle = (error) => {
  let message,
    type,
    isExpired = false;
  if (error.request.status === 0) {
    type = "warn";
    message = "서버 점검 중입니다. 잠시후 시도하세요.";
  } else if (error.request.status === 301) {
    type = "info";
    message = JSON.parse(error.request.response).message;
    isExpired = true;
  } else if (error.request.status === 404) {
    type = "warn";
    message = "잘못된 경로로 접근했습니다. 담당자에게 문의하세요.";
  } else if (error.request.status === 408) {
    type = "warn";
    message = "잠시 후 다시 시도하세요.";
  } else if (error.request.status === 500) {
    type = "warn";
    message = "서버에서 오류가 발생했습니다. 담당자에게 문의하세요.";
  } else {
    type = "error";
    message = JSON.parse(error.request.response).message;
  }
  return { type, message, isExpired };
};
