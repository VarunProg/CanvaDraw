import ContainerLeft from "./ContainerLeft";
import ContainerRight from "./DrawAnnotations";

const Layout = () => {
  return (
    <>
      <div className="container" style={{ display: "flex", height: "100vh" }}>
        <ContainerLeft />
        <ContainerRight />
      </div>
    </>
  );
};

export default Layout;
