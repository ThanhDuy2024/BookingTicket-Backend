export const paginationHelper = (page: number, totalItem: number, skip: number, limit: number) => {
  const totalPage = Math.ceil(totalItem / limit);
  if(page < 1 || page > totalPage) {
    return {
      skip: 0,
      totalPage: totalPage
    }
  }

  skip = (page - 1) * limit;
  
  return {
    skip: skip,
    totalPage: totalPage
  }
}