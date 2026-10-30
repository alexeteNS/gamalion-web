import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SearchPanel from "./components/ui/SearchPanel";
import CartToast, { type CartToastData } from "./components/ui/CartToast";
import AsyncStatusBanner from "./components/ui/AsyncStatusBanner";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetailsPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { productData } from "./data/productBackend";
import {
  loadViewedHistory,
  recordProductInHistory,
  saveViewedHistory,
  clearViewedHistory,
} from "./data/historyStorage";
import {
  parseCurrentUrl,
  getProductUrl,
  getTabUrl,
  cacheDynamicProduct,
} from "./data/urlRouter";
import { fetchProductsCatalog, isBackendConfigured } from "./services";
import type { ProductCardItem } from "./models/product";
import type { CategoryProductItem } from "./models/categoryPage";
import type { CartItem } from "./models/cart";
import "./App.css";

function App() {
  const initialRoute = parseCurrentUrl();

  const [currentTab, setCurrentTab] = useState(initialRoute.tab);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartToast, setCartToast] = useState<CartToastData | null>(null);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(isBackendConfigured());
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("gamalion_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [historyProducts, setHistoryProducts] = useState<ProductCardItem[]>(() => {
    return loadViewedHistory();
  });
  const [selectedProduct, setSelectedProduct] = useState<
    ProductCardItem | CategoryProductItem | null
  >(() => {
    if (initialRoute.product) return initialRoute.product;
    const saved = localStorage.getItem("gamalion_selected_product");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLoadCatalog = async () => {
    if (!isBackendConfigured()) return;
    setIsLoadingCatalog(true);
    setCatalogError(null);
    try {
      await fetchProductsCatalog();
      const refreshedRoute = parseCurrentUrl();
      if (refreshedRoute.product) {
        setSelectedProduct(refreshedRoute.product);
      }
    } catch (err) {
      setCatalogError(
        err instanceof Error
          ? err.message
          : "No se pudo conectar con el servidor de productos."
      );
    } finally {
      setIsLoadingCatalog(false);
    }
  };

  useEffect(() => {
    if (isBackendConfigured()) {
      fetchProductsCatalog()
        .then(() => {
          const refreshedRoute = parseCurrentUrl();
          if (refreshedRoute.product) {
            setSelectedProduct(refreshedRoute.product);
          }
        })
        .catch(err => {
          setCatalogError(
            err instanceof Error
              ? err.message
              : "No se pudo conectar con el servidor de productos."
          );
        })
        .finally(() => {
          setIsLoadingCatalog(false);
        });
    }

    if (window.location.hash) {
      const parsed = parseCurrentUrl();
      const targetUrl =
        parsed.tab === "detalles" && parsed.product
          ? getProductUrl(parsed.product)
          : getTabUrl(parsed.tab);
      window.history.replaceState(null, "", targetUrl);
    }

    const handleRouteSync = () => {
      const nextRoute = parseCurrentUrl();
      setCurrentTab(nextRoute.tab);
      if (nextRoute.product) {
        setSelectedProduct(nextRoute.product);
      }
      setIsSearchOpen(false);
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", handleRouteSync);
    window.addEventListener("hashchange", handleRouteSync);
    return () => {
      window.removeEventListener("popstate", handleRouteSync);
      window.removeEventListener("hashchange", handleRouteSync);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("gamalion_tab", currentTab);
    if (currentTab === "detalles" && selectedProduct) {
      document.title = `${selectedProduct.title} | Gamalion Digital`;
    } else if (currentTab === "carrito") {
      document.title = "Carrito de compras | Gamalion Digital";
    } else if (currentTab !== "inicio") {
      document.title = `${currentTab.charAt(0).toUpperCase() + currentTab.slice(1)} | Gamalion Digital`;
    } else {
      document.title = "Gamalion Digital Mèxico | Electronica a tu alcance";
    }
  }, [currentTab, selectedProduct]);

  useEffect(() => {
    if (selectedProduct) {
      localStorage.setItem("gamalion_selected_product", JSON.stringify(selectedProduct));
      cacheDynamicProduct(selectedProduct);
    }
  }, [selectedProduct]);

  useEffect(() => {
    localStorage.setItem("gamalion_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    saveViewedHistory(historyProducts);
  }, [historyProducts]);

  useEffect(() => {
    if (!cartToast) return;
    const timer = window.setTimeout(() => {
      setCartToast(null);
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [cartToast]);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setIsSearchOpen(false);
    setCartToast(null);
    window.scrollTo(0, 0);

    const nextUrl =
      tab === "detalles" && selectedProduct
        ? getProductUrl(selectedProduct)
        : getTabUrl(tab);

    if (window.location.pathname !== nextUrl) {
      window.history.pushState(null, "", nextUrl);
    }
  };

  const handleToggleSearch = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setSearchQuery("");
    } else {
      setIsSearchOpen(true);
    }
  };

  const handleOpenProduct = (
    product: ProductCardItem | CategoryProductItem | CartItem
  ) => {
    const normalizedProduct: ProductCardItem = {
      id: product.id,
      sku: "sku" in product ? product.sku : undefined,
      model: "model" in product ? product.model : undefined,
      title: product.title,
      brand: product.brand,
      description: "description" in product ? product.description : undefined,
      specs: "specs" in product ? product.specs : undefined,
      price: product.price,
      originalPrice: product.originalPrice,
      imageUrl: product.imageUrl,
      category: product.category,
      rating: "rating" in product ? product.rating : 4.8,
      reviewCount: "reviewCount" in product ? product.reviewCount : 120,
    };

    cacheDynamicProduct(normalizedProduct);
    setSelectedProduct(normalizedProduct);
    setCurrentTab("detalles");
    setIsSearchOpen(false);
    window.scrollTo(0, 0);

    const productUrl = getProductUrl(normalizedProduct);
    if (window.location.pathname !== productUrl) {
      window.history.pushState(null, "", productUrl);
    }

    setHistoryProducts(prev => recordProductInHistory(prev, normalizedProduct));
  };

  const handleClearHistory = () => {
    setHistoryProducts(clearViewedHistory());
  };

  const handleIncreaseCart = (id: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseCart = (id: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddCurrentToCart = (quantity: number) => {
    const active = selectedProduct || {
      id: productData.id,
      sku: productData.sku,
      model: productData.model,
      title: productData.title,
      brand: productData.brand,
      price: productData.price,
      originalPrice: productData.originalPrice,
      imageUrl: productData.images[0],
      category: productData.category,
    };

    const activeId = String(active.id);
    const existing = cartItems.find(item => item.id === activeId);

    if (existing) {
      setCartItems(prev =>
        prev.map(item =>
          item.id === activeId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: activeId,
        sku: "sku" in active && active.sku ? active.sku : "588117",
        model: "model" in active && active.model ? active.model : "GML-2026",
        brand: active.brand,
        title: active.title,
        description:
          "specs" in active && Array.isArray(active.specs)
            ? `${active.title} ${active.specs.join(" ")}`
            : active.title,
        imageUrl: active.imageUrl,
        price: active.price,
        originalPrice: active.originalPrice,
        quantity,
        category: active.category,
      };
      setCartItems(prev => [...prev, newItem]);
    }

    setCartToast({
      title: active.title,
      imageUrl: active.imageUrl,
      quantity,
      price: active.price,
    });
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f2f6fb" }}>
      <Header
        initialTab={currentTab}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        isSearchOpen={isSearchOpen}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onTabChange={handleTabChange}
        onSearchClick={handleToggleSearch}
        onCartClick={() => handleTabChange("carrito")}
      />

      <AsyncStatusBanner
        isLoading={isLoadingCatalog}
        error={catalogError}
        onRetry={handleLoadCatalog}
      />

      <CartToast
        toast={cartToast}
        onClose={() => setCartToast(null)}
        onViewCart={() => handleTabChange("carrito")}
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
          historyProducts={historyProducts}
          onNavigate={handleTabChange}
          onProductClick={handleOpenProduct}
          onOpenSearchHistory={() => {
            setIsSearchOpen(true);
            window.scrollTo(0, 0);
          }}
          onClearHistory={handleClearHistory}
        />
      ) : currentTab === "detalles" ? (
        <ProductDetails
          key={selectedProduct ? String(selectedProduct.id) : "default"}
          selectedProduct={selectedProduct}
          onAddToCart={handleAddCurrentToCart}
          onNavigate={handleTabChange}
          onProductClick={handleOpenProduct}
        />
      ) : currentTab === "carrito" ? (
        <CartPage
          items={cartItems}
          onIncrease={handleIncreaseCart}
          onDecrease={handleDecreaseCart}
          onRemove={handleRemoveCart}
          onClearCart={() => setCartItems([])}
          onViewDetails={handleOpenProduct}
          onContinueShopping={() => handleTabChange("inicio")}
        />
      ) : (
        <CategoryPage
          key={currentTab}
          category={currentTab}
          onProductClick={handleOpenProduct}
          onNavigateHome={() => handleTabChange("inicio")}
        />
      )}

      <Footer onNavigateHome={() => handleTabChange("inicio")} />
    </div>
  );
}

export default App;