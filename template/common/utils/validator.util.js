/**
 * Utility to validate object based on the zod schema
 */
module.exports.zodValidator = (value, schema) => {
  const safeValue =
    value instanceof FormData || value instanceof URLSearchParams
      ? Object.fromEntries(value.entries())
      : value;
  const result = schema.safeParse(safeValue);
  if (result.success) return { data: result.data, errors: null, success: true };

  const validationErrors = result.error.issues.reduce((prevErrors, currentError) => {
    const { path, message } = currentError;
    const fieldName = path[0];
    return { ...prevErrors, [fieldName]: message };
  }, {});

  return { data: null, errors: validationErrors, success: false };
};
