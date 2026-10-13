import { useState } from "react";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetailsPage";
import "./App.css";

function App() {
  const [currentTab, setCurrentTab] = useState("inicio");

  return (
    <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header initialTab={currentTab} onTabChange={setCurrentTab} />
      {currentTab === "inicio" ? (
        <HomePage onNavigate={setCurrentTab} />
      ) : (
        <ProductDetails />
      )}
    </div>
  );
}

export default App;