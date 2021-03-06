import React, {createContext, useReducer, ReactNode, useEffect} from 'react';
import IBook from '../types/IBook';
import { bookReducer } from '../reducers/bookReducer';

export interface IBookContext {
    books: IBook[];
    dispatch: React.Dispatch<any>;
}

export const BookContext = createContext<IBookContext>({} as IBookContext);

export interface BookContextProviderProps {
    children: ReactNode
}
 
const BookContextProvider: React.SFC<BookContextProviderProps> = ({
    children
}) => {

    const [books, dispatch] = useReducer(bookReducer, [], () => {
        const localData = localStorage.getItem('books')
        return localData ? JSON.parse(localData) : []
    })

    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books))
    }, [books])

    return (
        <BookContext.Provider value={{books, dispatch}}>
            {children}
        </BookContext.Provider>
    )
}
 
export default BookContextProvider;