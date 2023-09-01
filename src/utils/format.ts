/** 천 단위 표기 함수 */
export function formatCountVal(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
