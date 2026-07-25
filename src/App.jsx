import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Application from "./pages/Application";
import Technology from "./pages/Technology";
import Compounding from "./pages/Compounding";
import Investors from "./pages/Investors";
import WhoWeAre from "./pages/WhoWeAre";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import Collaboration from "./pages/Collaboration";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import LegacyRedirect from "./pages/LegacyRedirect";

/* /product/{slug}/ is WooCommerce's singular URL; ours is /products/{slug}. */
function LegacyProduct() {
  const { slug } = useParams();
  return <Navigate to={`/products/${slug}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="application" element={<Application />} />
          <Route path="technology" element={<Technology />} />
          <Route path="compounding" element={<Compounding />} />
          <Route path="investors" element={<Investors />} />
          <Route path="who-we-are" element={<WhoWeAre />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:slug" element={<BlogPost />} />
          <Route path="collaboration" element={<Collaboration />} />
          <Route path="career" element={<Career />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<Legal doc="privacy" />} />
          <Route path="terms-of-use" element={<Legal doc="terms" />} />

          {/* URLs the existing WordPress site uses, kept working. Real 301s
              still belong at the host — see the README. */}
          <Route path="product/:slug" element={<LegacyProduct />} />
          <Route path="about-us" element={<Navigate to="/who-we-are" replace />} />
          <Route path="technologies" element={<Navigate to="/technology" replace />} />
          <Route path="contact-us" element={<Navigate to="/contact" replace />} />
          <Route path="home-new" element={<Navigate to="/" replace />} />
          <Route path="404-2" element={<Navigate to="/not-found" replace />} />

          <Route path="*" element={<LegacyRedirect />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
