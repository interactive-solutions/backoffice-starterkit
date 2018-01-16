/**
 * Returns default error messages for api exceptions.
 * If a component needs to respond to other
 * exceptions/status codes or wants to display
 * other messages one way is to override this
 * for specific exceptions/status codes and then let
 * this handle all unspecific cases.
 *
 * @param {*} exception Exception raised by axios.
 */
export function getDefaultErrorMessage(exception) {
  const { response } = exception;
  /**
   * If the client is not connected to the internet,
   * it can't get a response from the server.
   */
  if (!response) {
    return 'No response from server';
  }

  const { status } = response;
  switch (status) {
    case 404: /** Page not found */
      return 'Page not found'; // todo. redirect to 404 here?
    default:
      return 'Unknown error occurred';
  }
};
