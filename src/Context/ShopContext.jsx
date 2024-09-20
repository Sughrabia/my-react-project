import { createContext, useState } from "react";

export const shopContext = createContext();

const ShopProvider = ({ children }) => {
  const [all_products, setProducts] = useState([]);

  return (
    <shopContext.Provider value={{ all_products, setProducts }}>
      {children}
    </shopContext.Provider>
  );
};

export default ShopProvider;