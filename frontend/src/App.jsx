import Router from "./routes/RouterApp.jsx";
import NavMenu from "./components/NavMenu.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavMenu />
      <main className="flex-grow">
        <Router />
      </main>
      <Footer />
    </div>
  );
}
export default App;