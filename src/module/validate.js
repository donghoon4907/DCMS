export const validateText = (text, options = {}) => {
  return Object.keys(options).some(option => {
    let result = false;
    if (option && option === "isNotAllowSpecial") {
      // eslint-disable-next-line
      result = /[\{\}\[\]\/?.,;:|\)*~`!^-_+<>@#$%&\\=\('"]/gi.test(text); // 특수문자 허용 X
    } else if (option && option === "isNotAllowBlank") {
      result = /[\s]/g.test(text); // 공백 허용 X
    } else if (option && option === "isEmail") {
      result = !/\S+@\S+\.\S+/.test(text); // 이메일 형식
    } else if (option && option === "isNotAllowKorean") {
      result = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi.test(text); // 한글 허용 X
    }
    return result;
  });
};
