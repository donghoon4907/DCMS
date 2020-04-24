// 목록 요청 쿼리 작성
export const makeListQuery = (payload) => {
  const {
    type,
    lastId,
    limit,
    searchKeyword,
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
  if (startDate) result += `&startDate=${startDate} 00:00:00`;
  if (endDate) result += `&endDate=${endDate} 23:59:59`;
  if (sort) result += `&sort=${sort}`;
  if (channel) result += `&channel=${channel}`;
  if (programId) result += `&programId=${programId}`;
  return result;
};
