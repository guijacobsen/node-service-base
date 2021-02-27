export const successMessage = (data, object) => {
  return {
    statusCode: 200,
    success: true,
    errorMessage: undefined,
    requestTime: new Date(),
    data,
    object: object
      ? {
          id: object.id
        }
      : undefined
  };
};

export const errorMessage = (statusCode, errorMessage) => {
  return {
    statusCode,
    data: undefined,
    success: false,
    errorMessage: errorMessage,
    requestTime: new Date()
  };
};
