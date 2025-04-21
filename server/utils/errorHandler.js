//? Required Field
export const validateFields = (fields, requiredFields) => {
  const errors = [];
  requiredFields.forEach((field) => {
    if (!fields[field] || fields[field].toString().trim() === "") {
      errors.push(`${field} is required`);
    }
  });

  return errors;
};

//! Error Response 
export const sendErrorResponse = (res, statusCode, message, errors = []) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors: errors.length > 0 ? errors : undefined,
  });
};

//TODO:- Sucess Response 
export const sendSuccessResponse = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data,
  });
};
