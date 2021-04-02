export const handleValueChange = (context, name, value) => {
  context.setState({[name]: value});
};

/**
 * Get error text message from error server response
 *
 * @param error - server error response
 * @returns {string|*} - error message
 */
export const getError = (error) => {
  let errorText = 'Something went wrong!'; // default error message

  if (!error) return errorText;
  if (!error.response) return errorText;
  if (!error.response.data) return errorText;

  if (error.response.data.error) return error.response.data.error;

  const keysArray = Object.keys(error.response.data);

  if (!keysArray) return errorText;
  if (!keysArray.length) return errorText;
  if (!error.response.data[keysArray[0]]) return errorText;
  if (!Array.isArray(error.response.data[keysArray[0]])) return errorText;
  if (!error.response.data[keysArray[0]][0]) return errorText;

  errorText = error.response.data[keysArray[0]][0];

  return errorText;
};

export const getOrderStateName = (state) => {
  if (state === undefined) return '';

  switch(state) {
    case 0:
      return "In progress";
    case 1:
      return "Finished";
  }
}
