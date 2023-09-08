import React, {createContext, useContext, useEffect, useState} from 'react';
import {JournalContext} from "./JournalContext.jsx";

export const BudgetContext = createContext();

export const BudgetProvider = ({children}) => {
    const {journals} = useContext(JournalContext);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        document.title = journals[0].name + 1
    }, [])

    const value = {isVisible, setIsVisible};
    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    )
}