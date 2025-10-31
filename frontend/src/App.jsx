import Router from "./routes/RouterApp.jsx";
import NavMenu from "./components/NavMenu.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <>
      <NavMenu />
      <Router />
      <Footer />
    </>
  );
}
export default App;