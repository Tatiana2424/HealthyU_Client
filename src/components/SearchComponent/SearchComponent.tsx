// SearchComponent.tsx
import React, { useEffect, useRef, useState } from 'react';
import './SearchComponent.scss';
import apiService from '../../api/apiService';
import { useLocation, useNavigate } from 'react-router-dom';

interface SearchComponentProps {
    title?: string;
    searchTerm?: string;
    onSearchTermChange?: (searchTerm: string) => void;
}
interface SearchKeywords {
    id: number;
    keyword: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
    title,
    searchTerm = '',
    onSearchTermChange,
}) => {
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const [searchKeywords, setSearchKeywords] = useState<SearchKeywords[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const searchContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLocalSearchTerm(searchTerm);
    }, [searchTerm]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        setLocalSearchTerm(newSearchTerm);
        if (onSearchTermChange) {
            onSearchTermChange(newSearchTerm);
        }
    };

    const handleSearchSubmit = () => {
        if (localSearchTerm.trim()) {
            navigate(`/search?term=${encodeURIComponent(localSearchTerm)}`);
            if (onSearchTermChange) {
                onSearchTermChange(localSearchTerm);
            }
        }
    };

    const handleKeywordClick = (keyword: string) => {
        navigate(`/search?term=${encodeURIComponent(keyword)}`);
        if (onSearchTermChange) {
            onSearchTermChange(keyword);
        }
    };

    const performSearch = (term: string) => {
        if (term.trim() === '') return;
        const searchPath = `/search?term=${encodeURIComponent(term)}`;
        if (location.pathname !== '/search') {
            navigate(searchPath);
        } else {
            navigate(searchPath);
        }
    };

    useEffect(() => {
        const fetchedSearchKeywords = async () => {
            try {
                const fetchedSearchKeywords = await apiService.get<
                    SearchKeywords[]
                >('https://localhost:7271/api/SearchKeyword/GetAll');
                console.log('fetchedSearchKeywords', fetchedSearchKeywords);
                setSearchKeywords(fetchedSearchKeywords);
            } catch (error) {
                console.error('Failed to fetch articles', error);
            }
        };

        fetchedSearchKeywords();
    }, []);

    return (
        <div className="search-container no-print">
            {title && <h2 className="search-title">{title}</h2>}
            <div className="search-box">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Find a recipe"
                    value={localSearchTerm} // Ensure this uses localSearchTerm
                    onChange={handleSearchChange}
                />
                <button
                    type="submit"
                    className="search-button"
                    onClick={handleSearchSubmit}
                >
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            width="24"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="#ffffff"
                                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                            />
                        </svg>
                    </span>
                </button>
            </div>
            <div className="popular-searches">
                <span className="popular-title">Popular Searches</span>
                <div className="tags">
                    {searchKeywords.map((tag) => (
                        <button
                            key={tag.id}
                            className="search-tag"
                            onClick={() => handleKeywordClick(tag.keyword)}
                        >
                            {tag.keyword}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;
