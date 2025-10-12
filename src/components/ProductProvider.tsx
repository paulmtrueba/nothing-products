import React, { useContext } from "react";
import { useMailgun } from "../hooks";
import { UseProductType } from "types";

const ProductContext = React.createContext({} as any);

export interface ProductContextProviderProps {
    children: React.ReactNode | React.ReactNode[];
}

const ProductContextProvider = (
    props: ProductContextProviderProps
): JSX.Element => {
    const { children } = props;
    const {
        mailSending,
        status,
        fetchMailgun,
    } = useMailgun();

    return (
        <ProductContext.Provider
            value={{
                mailSending,
                status,
                fetchMailgun,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export function useProductContext(): UseProductType {
    return useContext(ProductContext);
}

export default ProductContext;

export { ProductContextProvider };