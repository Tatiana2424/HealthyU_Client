import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BlogComponent.scss';

export interface BlogEntry {
    id: string;
    image: {
        url: string;
    }
    title: string;
    description: string;
    articleText: string;
    userId?: string|null;
}

interface BlogComponentProps {
    entries: BlogEntry[];
    onEntryClick: (id: string) => void; 
}

const BlogComponent: React.FC<BlogComponentProps> = ({ entries, onEntryClick }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    const handleClick = (id: string) => {
        onEntryClick(id);
       // navigate(`/blog/${id}`);
    };

    return (
        <div className="blogComponent">
            <div className="slider">
                <Slider {...settings}>
                    {entries.map((entry, index) => (
                        <div
                            key={index}
                            className="slide"
                            onClick={() => handleClick(entry.id)}
                        >
                            <div className="image-container">
                                <img
                                    className="slide-image"
                                    src={entry.image.url}
                                    alt={entry.title}
                                />
                            </div>
                            <h2 className="slide-title">{entry.title}</h2>
                            <p className="slide-description">
                                {entry.description}
                            </p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default BlogComponent;
