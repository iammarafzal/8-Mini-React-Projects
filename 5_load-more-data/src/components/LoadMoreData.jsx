import { useEffect, useState } from 'react'
import '../components/style.css'

function LoadMoreData({ limit = 20 }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [disabled, setDisabled] = useState(false);

    async function fetchProducts() {
        try {
            setLoading(true);
            const skip = limit * count;
            const response = await fetch(
                `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
            );
            const data = await response.json();

            if (data && data.products.length > 0) {
                setProducts((prevProducts) => [...prevProducts, ...data.products]);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        } 
    }

    useEffect(() => {
        fetchProducts();
    }, [count]);

    useEffect(() => {
        if (products.length >= 100) {
            setDisabled(true);
        }
    }, [products.length]);

    return (
        <div className="container">
            {products && products.length > 0 ? (
                <div className="products-grid-container">
                    <div className="products-count">Total Products: <strong>{products.length}</strong></div>
                    <div className="products-grid">
                        {products.map((productItem) => (
                            <div className="product" key={productItem.id}>
                                <img
                                    src={productItem.thumbnail}
                                    alt={productItem.title}
                                />
                                <h3 className='title'>{productItem.title}</h3>
                                <p className="product-id">ID: {productItem.id}</p>
                            </div>
                        ))}
                    </div>
                    
                    {/* Inline status indicator or load more button */}
                    <div className="actions">
                        {loading ? (
                            <div className="loading-text">⏳ Loading more products...</div>
                        ) : (
                            <button 
                                onClick={() => setCount(count + 1)} 
                                disabled={disabled}
                                className={disabled ? 'btn-disabled' : 'btn-active'}
                            >
                                {disabled ? "✓ All Products Loaded (50)" : "Load More Products"}
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                // Show initial loader only if we have no products yet
                <div>{loading ? "Loading initial products..." : "No products found"}</div>
            )}
        </div>
    )
}

export default LoadMoreData
