const PaginationComponent = (props: any) => {
  const getCurrentPage = () => {
    return props.paginationState?.state?.current_page;
  };

  const getPreviousPage = () => {
    if (props.paginationState?.state?.prev_page_url !== null) {
      props.serverLink.setState(props.paginationState?.state?.prev_page_url);
    }
  };

  const getNextPage = () => {
    if (props.paginationState?.state?.next_page_url !== null) {
      props.serverLink.setState(props.paginationState?.state?.next_page_url);
    }
  };

  return (
    <>
      <div className="pagination-component">
        <button onClick={getPreviousPage}>Previous page</button>
        <p>{getCurrentPage()}</p>
        <button onClick={getNextPage}>Next page</button>
      </div>
    </>
  );
};

export default PaginationComponent;
