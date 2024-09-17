export default function useNumberPagination({ page, totalPage }: any) {
  // conditions pagination number
  // if lessthan 7
  const isLessThanSeven = () => totalPage <= 7
  // if page between eight to ten and active number at first
  const isPageBetweenEightToTenAndFirstActive = ({
    maxNumberRender,
    btnList,
  }: any) => totalPage <= 10 && page < maxNumberRender && btnList[1] !== "..."
  // if page between eight to ten and active number at last
  const isPageBetweenEightToTenAndLastActive = ({
    maxNumberRender,
    btnList,
  }: any) =>
    totalPage <= 10 &&
    page >= totalPage - maxNumberRender &&
    btnList[btnList.length - 2] !== "..."
  // if page between ten to more than ten and active number at first
  const isBetweenTenToMoreThanTenAndFirstActive = ({ maxNumberRender }: any) =>
    page < maxNumberRender + 1 &&
    totalPage > maxNumberRender + 2 &&
    totalPage > 10
  // if page between ten to more than ten and active number at last
  const isBetweenTenToMoreThanTenAndLastActive = ({ maxNumberRender }: any) =>
    page > totalPage - maxNumberRender - 1 &&
    totalPage > maxNumberRender + 2 &&
    totalPage > 10
  // if page between over number render & active number at middle of total
  const isAtMiddleActive = ({ maxNumberRender }: any) =>
    page > maxNumberRender && page <= totalPage - maxNumberRender

  // functions pagination number
  // add normal button
  const createNormalNo = () => {
    let result = []
    for (let i = 1; i <= totalPage; i++) {
      result.push(i)
    }
    return result
  }
  // add hide btn at last
  const createHideNoAtLast = ({ maxNumberRender }: any) => {
    let result = []
    for (let i = 1; i <= maxNumberRender; i++) {
      result.push(i)
    }
    result = [...result, "...", totalPage]
    return result
  }
  // add hide button at first
  const createHideNoAtFirst = ({ maxNumberRender, btnList }: any) => {
    let result = btnList
    for (let i = totalPage; i >= totalPage - maxNumberRender; i--) {
      result.unshift(i)
    }
    result.unshift("...")
    result.unshift(1)
    return result
  }
  // add hide button at first and last
  const createHideNoAtFirstAndLast = () => {
    return [1, 0, page - 1, page, page + 1, "...", totalPage]
  }

  return {
    isLessThanSeven,
    isPageBetweenEightToTenAndFirstActive,
    isPageBetweenEightToTenAndLastActive,
    isBetweenTenToMoreThanTenAndFirstActive,
    isBetweenTenToMoreThanTenAndLastActive,
    isAtMiddleActive,
    createNormalNo,
    createHideNoAtLast,
    createHideNoAtFirst,
    createHideNoAtFirstAndLast,
  }
}
