import { useCallback, useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SearchPanel from "./components/ui/SearchPanel";
import CartToast, { type CartToastData } from "./components/ui/CartToast";
import AsyncStatusBanner from "./components/ui/AsyncStatusBanner";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetailsPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import {
  loadViewedHistory,
  reconcileViewedHistoryWithCatalog,
  recordProductInHistory,
  saveViewedHistory,
  clearViewedHistory,
} from "./data/historyStorage";
import {
  parseCurrentUrl,
  getProductUrl,
  getTabUrl,
  cacheDynamicProduct,
  reconcileDynamicProductCache,
} from "./data/urlRouter";
import {
  fetchHomeStorefront,
  fetchProductsList,
  toggleProductFavorite,
} from "./services";
import type { HomeStorefrontResponse } from "./models/storefront";
import type { ProductCardItem, ProductDetailsModel } from "./models/product";
import type { CategoryProductItem } from "./models/categoryPage";
import type { CartItem } from "./models/cart";
import "./App.css";

function updateProductFavoriteState(
  storefront: HomeStorefrontResponse | null,
  productId: string,
  isFavorite: boolean,
  favoriteCount: number,
): HomeStorefrontResponse | null {
  if (!storefront) return null;

  const patchCard = (p: ProductCardItem): ProductCardItem =>
    String(p.id) === productId
      ? { ...p, isFavorite, favoriteCount }
      : p;

  return {
    ...storefront,
    curatedSections: storefront.curatedSections.map((sec) => ({
      ...sec,
      products: sec.products.map(patchCard),
      entries: sec.entries.map((entry) => ({
        ...entry,
        product: patchCard(entry.product),
      })),
    })),
    categorySliders: storefront.categorySliders.map((slider) => ({
      ...slider,
      products: slider.products.map(patchCard),
    })),
  };
}

function collectStorefrontProducts(
  data: HomeStorefrontResponse,
): ProductCardItem[] {
  const byId = new Map<string, ProductCardItem>();
  for (const sec of data.curatedSections) {
    for (const p of sec.products) {
      byId.set(String(p.id), p);
    }
  }
  for (const slider of data.categorySliders) {
    for (const p of slider.products) {
      byId.set(String(p.id), p);
    }
  }
  return Array.from(byId.values());
}

function mergeCatalogProducts(
  data: HomeStorefrontResponse,
  listProducts: ProductCardItem[],
): ProductCardItem[] {
  const byId = new Map<string, ProductCardItem>();
  for (const p of collectStorefrontProducts(data)) {
    byId.set(String(p.id), p);
  }
  for (const p of listProducts) {
    byId.set(String(p.id), p);
  }
  return Array.from(byId.values());
}

function App() {
  const initialRoute = parseCurrentUrl();

  const [currentTab, setCurrentTab] = useState(initialRoute.tab);
  const [routeProductId, setRouteProductId] = useState<string | null>(
    initialRoute.productId ||
      (initialRoute.product ? String(initialRoute.product.id) : null),
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartToast, setCartToast] = useState<CartToastData | null>(null);
  const [storefront, setStorefront] = useState<HomeStorefrontResponse | null>(null);
  const [catalogProducts, setCatalogProducts] = useState<ProductCardItem[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
  const [catalogError, setCatalogError] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("gamalion_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [historyProducts, setHistoryProducts] = useState<ProductCardItem[]>(() =>
    loadViewedHistory(),
  );
  const [selectedProduct, setSelectedProduct] = useState<
    ProductCardItem | CategoryProductItem | null
  >(() => {
    if (initialRoute.product) return initialRoute.product;
    try {
      const saved = localStorage.getItem("gamalion_selected_product");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const applyCatalogSnapshot = useCallback(
    (data: HomeStorefrontResponse, listProducts: ProductCardItem[]) => {
      const merged = mergeCatalogProducts(data, listProducts);
      reconcileDynamicProductCache(merged);
      setStorefront(data);
      setCatalogProducts(merged);
      setHistoryProducts(
        reconcileViewedHistoryWithCatalog(merged, Boolean(data.catalogEmpty)),
      );
      setCatalogError(null);
    },
    [],
  );

  const handleLoadCatalog = useCallback(async () => {
    setIsLoadingCatalog(true);
    setCatalogError(null);
    try {
      const [sf, prods] = await Promise.all([
        fetchHomeStorefront(),
        fetchProductsList(),
      ]);
      applyCatalogSnapshot(sf, prods.products);
    } catch (err) {
      setCatalogError(
        err instanceof Error
          ? err.message
          : "No se pudo conectar con el servidor de productos.",
      );
    } finally {
      setIsLoadingCatalog(false);
    }
  }, [applyCatalogSnapshot]);

  useEffect(() => {
    let cancelled = false;
    setIsLoadingCatalog(true);
    Promise.all([fetchHomeStorefront(), fetchProductsList()])
      .then(([sf, prods]) => {
        if (cancelled) return;
        applyCatalogSnapshot(sf, prods.products);
      })
      .catch((err) => {
        if (cancelled) return;
        setCatalogError(
          err instanceof Error
            ? err.message
            : "No se pudo conectar con el servidor de productos.",
        );
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoadingCatalog(false);
        }
      });

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
      if (nextRoute.productId) {
        setRouteProductId(nextRoute.productId);
      }
      if (nextRoute.product) {
        setSelectedProduct(nextRoute.product);
      }
      setIsSearchOpen(false);
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", handleRouteSync);
    window.addEventListener("hashchange", handleRouteSync);
    return () => {
      cancelled = true;
      window.removeEventListener("popstate", handleRouteSync);
      window.removeEventListener("hashchange", handleRouteSync);
    };
  }, [applyCatalogSnapshot]);

  useEffect(() => {
    localStorage.setItem("gamalion_tab", currentTab);
    if (currentTab === "detalles" && selectedProduct) {
      document.title = `${selectedProduct.title} | Gamalion Digital`;
    } else if (currentTab === "carrito") {
      document.title = "Carrito de compras | Gamalion Digital";
    } else if (currentTab !== "inicio") {
      document.title = `${currentTab.charAt(0).toUpperCase() + currentTab.slice(1)} | Gamalion Digital`;
    } else {
      document.title = "Gamalion Digital México | Electrónica a tu alcance";
    }
  }, [currentTab, selectedProduct]);

  useEffect(() => {
    if (selectedProduct) {
      localStorage.setItem("gamalion_selected_product", JSON.stringify(selectedProduct));
      cacheDynamicProduct(selectedProduct);
    } else {
      localStorage.removeItem("gamalion_selected_product");
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
    product: ProductCardItem | CategoryProductItem | CartItem,
  ) => {
    const normalizedProduct: ProductCardItem = {
      id: product.id,
      slug: "slug" in product ? product.slug : undefined,
      sku: "sku" in product ? product.sku : undefined,
      model: "model" in product ? product.model : undefined,
      title: product.title,
      brand: product.brand,
      description: "description" in product ? product.description : undefined,
      specs: "specs" in product ? product.specs : undefined,
      price: product.price,
      originalPrice: product.originalPrice,
      currency: "currency" in product ? product.currency : "MXN",
      stock: "stock" in product ? product.stock : undefined,
      inStock: "stock" in product && typeof product.stock === "number" ? product.stock > 0 : true,
      imageUrl: product.imageUrl,
      category: product.category,
      rating: "rating" in product && typeof product.rating === "number" ? product.rating : 0,
      reviewCount: "reviewCount" in product && typeof product.reviewCount === "number" ? product.reviewCount : 0,
      isFavorite: "isFavorite" in product ? product.isFavorite : false,
    };

    cacheDynamicProduct(normalizedProduct);
    setSelectedProduct(normalizedProduct);
    setRouteProductId(String(normalizedProduct.id));
    setCurrentTab("detalles");
    setIsSearchOpen(false);
    window.scrollTo(0, 0);

    const productUrl = getProductUrl(normalizedProduct);
    if (window.location.pathname !== productUrl) {
      window.history.pushState(null, "", productUrl);
    }

    setHistoryProducts((prev) => recordProductInHistory(prev, normalizedProduct));
  };

  const handleClearHistory = () => {
    setHistoryProducts(clearViewedHistory());
  };

  const handleIncreaseCart = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const maxQty =
          typeof item.stock === "number" && item.stock > 0 ? item.stock : Infinity;
        return item.quantity < maxQty
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      }),
    );
  };

  const handleDecreaseCart = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const handleRemoveCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddProductToCart = (
    product: ProductCardItem | ProductDetailsModel,
    quantity = 1,
    selectedColor?: string,
  ) => {
    const productStock =
      typeof product.stock === "number" ? product.stock : undefined;
    if (productStock !== undefined && productStock <= 0) {
      return;
    }

    const activeId = String(product.id);
    const resolvedImage =
      "imageUrl" in product
        ? product.imageUrl
        : product.images[0] || "";
    const resolvedSpecs =
      "specs" in product && Array.isArray(product.specs)
        ? product.specs
        : "bulletSpecs" in product && Array.isArray(product.bulletSpecs)
          ? product.bulletSpecs
          : [];

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === activeId);
      if (existing) {
        return prev.map((item) => {
          if (item.id !== activeId) return item;
          const nextQty = item.quantity + quantity;
          const clampedQty =
            productStock !== undefined ? Math.min(nextQty, productStock) : nextQty;
          return {
            ...item,
            quantity: clampedQty,
            stock: productStock ?? item.stock,
            selectedColor: selectedColor || item.selectedColor,
          };
        });
      }

      const clampedInitialQty =
        productStock !== undefined ? Math.min(quantity, productStock) : quantity;

      const newItem: CartItem = {
        id: activeId,
        sku: product.sku || activeId,
        model: product.model || "GML",
        brand: product.brand,
        title: product.title,
        description:
          resolvedSpecs.length > 0
            ? `${product.title} — ${resolvedSpecs.slice(0, 2).join(" · ")}`
            : product.description || product.title,
        imageUrl: resolvedImage,
        price: product.price,
        originalPrice: product.originalPrice,
        currency: product.currency || "MXN",
        selectedColor,
        stock: productStock,
        quantity: Math.max(1, clampedInitialQty),
        category: product.category,
      };
      return [...prev, newItem];
    });

    setCartToast({
      title: product.title,
      imageUrl: resolvedImage,
      quantity,
      price: product.price,
    });
  };

  const applyFavoriteState = (
    productId: string,
    isFavorite: boolean,
    favoriteCount: number,
  ) => {
    setStorefront((prev) =>
      updateProductFavoriteState(prev, productId, isFavorite, favoriteCount),
    );
    setCatalogProducts((prev) =>
      prev.map((item) =>
        String(item.id) === productId
          ? { ...item, isFavorite, favoriteCount }
          : item,
      ),
    );
    setHistoryProducts((prev) =>
      prev.map((item) =>
        String(item.id) === productId
          ? {
              ...item,
              isFavorite,
              favoriteCount,
            }
          : item,
      ),
    );
  };

  const handleFavoriteToggle = async (product: {
    id: string | number;
    isFavorite?: boolean;
  }) => {
    const targetFav =
      typeof product.isFavorite === "boolean" ? product.isFavorite : true;
    try {
      const res = await toggleProductFavorite(String(product.id), targetFav);
      applyFavoriteState(res.productId, res.isFavorite, res.favoriteCount);
    } catch {
      // Silenciar fallo puntual y restaurar estado al recargar
    }
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f2f6fb" }}>
      <Header
        initialTab={currentTab}
        categories={storefront?.categories || []}
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
        onRetry={() => void handleLoadCatalog()}
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
        categories={storefront?.categories || []}
        catalogEmpty={storefront?.catalogEmpty ?? false}
        onClose={() => setIsSearchOpen(false)}
        onProductClick={handleOpenProduct}
        onSelectCategory={handleTabChange}
        onFavoriteToggle={(prod) => void handleFavoriteToggle(prod)}
      />

      {currentTab === "inicio" ? (
        <HomePage
          storefront={storefront}
          catalogProducts={catalogProducts}
          isLoadingCatalog={isLoadingCatalog}
          catalogError={catalogError}
          historyProducts={historyProducts}
          onNavigate={handleTabChange}
          onProductClick={handleOpenProduct}
          onAddToCart={(prod) => handleAddProductToCart(prod, 1)}
          onFavoriteToggle={(prod) => void handleFavoriteToggle(prod)}
          onOpenSearchHistory={() => {
            setIsSearchOpen(true);
            window.scrollTo(0, 0);
          }}
          onClearHistory={handleClearHistory}
          onRetryCatalog={() => void handleLoadCatalog()}
        />
      ) : currentTab === "detalles" ? (
        <ProductDetails
          key={routeProductId || (selectedProduct ? String(selectedProduct.id) : "default")}
          productIdOrSlug={routeProductId || (selectedProduct ? String(selectedProduct.id) : null)}
          selectedProduct={selectedProduct}
          onAddToCart={(prod, qty, color) => handleAddProductToCart(prod, qty, color)}
          onFavoriteToggle={(prod) => void handleFavoriteToggle(prod)}
          onFavoriteSynced={applyFavoriteState}
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
          onOrderCreated={() => void handleLoadCatalog()}
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
