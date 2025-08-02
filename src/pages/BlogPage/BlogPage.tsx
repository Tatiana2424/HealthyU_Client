import React, { useEffect, useRef, useState } from 'react';
import Banner from '../../components/common/Banner/Banner';
import './BlogPage.scss';
import BlogComponent, {
    BlogEntry,
} from '../../components/BlogComponent/BlogComponent';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../../api/apiService';
import HtmlContent from '../../components/HtmlContent/HtmlContent';

const BlogPage: React.FC = () => {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    console.log('id', id);
    const [blogEntries, setBlogEntries] = useState<BlogEntry[]>([]);
    const [selectedEntry, setSelectedEntry] = useState<BlogEntry | null>(null);
    //const selectedEntry = blogEntries.find((entry) => entry.id === id);

    useEffect(() => {
        const fetchBlogEntries = async () => {
            try {
                // Use the get method from your apiService to fetch blog entries
                const entries = await apiService.get<BlogEntry[]>(
                    'https://localhost:7271/api/Article/GetAll'
                );
                console.log(entries);
                setBlogEntries(entries);
            } catch (error) {
                console.error('Failed to fetch blog entries:', error);
            }
        };

        fetchBlogEntries();
    }, []);

    useEffect(() => {
        const entry =
            blogEntries.find((entry) => entry.id.toString() === id) ?? null;

        console.log(blogEntries.find((entry) => entry.id === id));
        setSelectedEntry(entry);
    }, [id, blogEntries]);

    const handleEntryClick = (id: string) => {
        navigate(`/blog/${id}`);
    };

    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (selectedEntry && titleRef.current) {
            titleRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [selectedEntry]);

    return (
        <div>
            <Banner
                title="HealthyU Blogs"
                bannerImageUrl="https://us.123rf.com/450wm/asyanurullina/asyanurullina2004/asyanurullina200400519/145676583-creative-flat-lay-with-healthy-vegetarian-meal-ingredients-raw-food-concept-a-variety-of-organic.jpg?ver=6"
                alignment="center"
                isDarken={true}
                bannerMarginTop={100}
                bannerHeight={350}
            />

            {selectedEntry && (
                <div className="blog-componemt">
                    <div className="blog-content">
                        <div className="title-container">
                            <h1 className="blog-title" ref={titleRef}>
                                {selectedEntry.title}
                            </h1>
                            <p className="blog-description">
                                <i>{selectedEntry.description}</i>
                            </p>
                        </div>
                        <div className="image-container">
                            <img
                                className="slide-image"
                                src={selectedEntry.image.url}
                                alt={selectedEntry.title}
                            />
                        </div>
                        <div className="blog-text">
                            <HtmlContent
                                htmlString={selectedEntry.articleText}
                            />
                            {/* {selectedEntry.description
                                .split('\n')
                                .map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))} */}
                        </div>
                    </div>
                </div>
            )}

            <br />
            <BlogComponent
                entries={blogEntries.filter((entry) => entry.id !== id)}
                onEntryClick={handleEntryClick}
            />
        </div>
    );
};

export default BlogPage;
