// 목록 요청 쿼리 작성
export const makeListQuery = payload => {
  const {
    type,
    lastId,
    limit,
    searchKeyword,
    searchType,
    startDate,
    endDate,
    sort,
    channel,
    programId
  } = payload;

  let result = `/${type}/list?req_type=list`;
  if (lastId) result += `&lastId=${lastId}`;
  if (limit) result += `&limit=${limit}`;
  if (searchKeyword) result += `&searchKeyword=${searchKeyword}`;
  if (searchType) result += `&searchType=${searchType.join(",")}`;
  if (startDate) result += `&startDate=${startDate} 00:00:00`;
  if (endDate) result += `&endDate=${endDate} 23:59:59`;
  if (sort) result += `&sort=${sort}`;
  if (channel) result += `&channel=${channel}`;
  if (programId) result += `&programId=${programId}`;
  return result;
};

// 정렬 설정
export const makeSortList = list => {
  let result = [];
  if (list.length > 0) {
    list.forEach(v => {
      let value = null;
      let isAsc = v.isAsc;
      let isPush = true;
      let isDate = false;

      switch (v.text) {
        case "등록일": {
          value = "createdAt";
          isDate = true;
          break;
        }
        case "수정일": {
          value = "updatedAt";
          isDate = true;
          break;
        }
        case "아이디명": {
          value = "userId";
          break;
        }
        default: {
          isPush = false;
          break;
        }
      }

      if (isPush) {
        result.push({
          text: `${v.text} 순`,
          value: `${value},${isDate ? "desc" : "asc"}`
        });

        if (isAsc) {
          result.push({
            text: `${v.text} 역순`,
            value: `${value},${isDate ? "asc" : "desc"}`
          });
        }
      }
    });
  }
  return result;
};
