import { useState } from "react";
import Header from "./components/layout/Header";
import SearchPanel from "./components/ui/SearchPanel";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetailsPage";
import CategoryPage from "./pages/CategoryPage";
import { allProducts } from "./data/productsData";
import type { ProductCardItem } from "./models/product";
import type { CategoryProductItem } from "./models/categoryPage";
import "./App.css";

function App() {
  const [currentTab, setCurrentTab] = useState("inicio");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [historyProducts, setHistoryProducts] = useState<ProductCardItem[]>(
    allProducts.slice(0, 5)
  );
  const [selectedProduct, setSelectedProduct] = useState<
    ProductCardItem | CategoryProductItem | null
  >(null);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setIsSearchOpen(false);
    window.scrollTo(0, 0);
  };

  const handleToggleSearch = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setSearchQuery("");
    } else {
      setIsSearchOpen(true);
    }
  };

  const handleOpenProduct = (product: ProductCardItem | CategoryProductItem) => {
    setSelectedProduct(product);
    setCurrentTab("detalles");
    setIsSearchOpen(false);
    window.scrollTo(0, 0);

    const asCardItem: ProductCardItem = {
      id: product.id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      originalPrice: product.originalPrice,
      imageUrl: product.imageUrl,
      category: product.category,
      rating: "rating" in product ? product.rating : 4.8,
      reviewCount: "reviewCount" in product ? product.reviewCount : 120,
    };

    setHistoryProducts(prev => [
      asCardItem,
      ...prev.filter(item => item.id !== asCardItem.id),
    ].slice(0, 8));
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header
        initialTab={currentTab}
        isSearchOpen={isSearchOpen}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onTabChange={handleTabChange}
        onSearchClick={handleToggleSearch}
      />

      <SearchPanel
        isOpen={isSearchOpen}
        query={searchQuery}
        historyProducts={historyProducts}
        onClose={() => setIsSearchOpen(false)}
        onProductClick={handleOpenProduct}
        onSelectCategory={handleTabChange}
      />

      {currentTab === "inicio" ? (
        <HomePage
          onNavigate={handleTabChange}
          onProductClick={handleOpenProduct}
        />
      ) : currentTab === "detalles" ? (
        <ProductDetails
          key={selectedProduct ? String(selectedProduct.id) : "default"}
          selectedProduct={selectedProduct}
        />
      ) : (
        <CategoryPage
          key={currentTab}
          category={currentTab}
          onProductClick={handleOpenProduct}
        />
      )}
    </div>
  );
}

export default App;