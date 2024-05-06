const Content = ({ children, id }) => {
  return (
    <section className="content" id={id}>
      {children}
    </section>
  );
};

export default Content;
