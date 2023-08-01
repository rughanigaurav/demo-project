const Container = (props) => {
  const { children, className = "" } = props;
  return (
    <div className={`content-container ${className}`}>
      {children}
    </div>
  );
};

export default Container;
