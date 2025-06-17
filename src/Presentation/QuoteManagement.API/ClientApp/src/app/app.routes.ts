{
                        path: 'booklist',
                        loadComponent: () => import('./pages/books/booklist.component').then(m => m.BookList)
                    },
                    {
                        path: 'quotes/add',
                        loadComponent: () => import('./pages/quotes/add-quote.component').then(m => m.AddQuoteComponent)
                    }