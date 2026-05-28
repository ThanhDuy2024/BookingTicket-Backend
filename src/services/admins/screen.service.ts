export const createScreenService = async () => {
  try {
    return {
      status: 200,
      code: "success",
      message: "Screen create successfully!"
    }    
  } catch (error) {
    console.log(error);
    return {
        status: 400,
        code: "error",
        message: "error screen service!"
      }
  }
}