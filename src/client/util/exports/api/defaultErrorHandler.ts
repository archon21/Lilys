const defaultErrorHandler = ({ err }) => {
  console.error(err);
  return { isServerError: true };
};

export default defaultErrorHandler;
