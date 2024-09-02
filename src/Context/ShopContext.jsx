import all_products from "../components/assets/AllProducts";
import React, { createContext } from "react";

export const shopContext= createContext(null);

const ShopContextprovider=(props)=>{
    const contextValue={all_products};
    return(
        <shopContext.Provider value={contextValue}>
            {props.children}
        </shopContext.Provider>

    );

};

export default ShopContextprovider;