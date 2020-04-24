import React, { useCallback } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const HashTagComponent = ({ tags, setTags }) => {
  const onChange = useCallback(
    (newTags) => {
      setTags(
        newTags.map((v) => {
          if (v.includes("#")) return v;
          return `#${v}`;
        })
      );
    },
    [setTags]
  );

  return (
    <ReactTagInput
      tags={tags}
      onChange={onChange}
      placeholder="태그를 입력하세요."
      editable={true}
      readOnly={false}
      removeOnBackspace={true}
    />
  );
};

export default HashTagComponent;
/*
  editable : 수정 활성화
  removeOnBackspace: 백스페이스로 태그 지우기 활성화
  validator: 유효성 검사 추가
  ex)
  validator={(value) => {
    // Don't actually validate e-mails this way
    const isEmail = value.indexOf("@") !== -1;
    if (!isEmail) {
      alert("Please enter an e-mail address");
    }
    // Return boolean to indicate validity
    return isEmail;
  }}
*/
