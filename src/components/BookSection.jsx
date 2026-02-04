import { getAmazonProductUrl } from '../utils/amazon';

function BookSection({ books }) {
    if (!books || books.length === 0) return null;

    return (
        <div className="book-section">
            <div className="book-grid">
                {books.map((book, index) => (
                    <div key={index} className="book-card">
                        <div className="book-info">
                            <h3 className="book-title">{book.title}</h3>
                            <a
                                href={getAmazonProductUrl(book.asin)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="amazon-btn"
                            >
                                Amazonで見る
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookSection;
