/** 천 단위 표기 함수 */
export const formatCountVal = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/** 날짜를 `YYYY년 MM월 DD일` 형식으로 변환하는 함수 */
export const formatDate = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
