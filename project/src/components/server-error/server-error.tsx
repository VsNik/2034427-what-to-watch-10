function ServerError(): JSX.Element {
  return (
    <div className="user-page">
      <div className="error-page__content">
        <h1>Sorry!</h1>
        <h3>server is not available</h3>
        <h5>try to come back later</h5>
      </div>
    </div>
  );
}

export default ServerError;
