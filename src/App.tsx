import styled from "@emotion/styled";
import Sidebar from "./Sidebar";
import Viewport from "./Viewport";

function App() {
  return (
    <Container>
      <Sidebar />
      <Viewport />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export default App;
