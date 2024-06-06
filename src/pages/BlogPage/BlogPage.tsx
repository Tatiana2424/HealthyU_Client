import React, { useEffect, useRef, useState } from 'react';
import Banner from '../../components/common/Banner/Banner';
import BmiCalculator from '../../components/BMIComponent/BmiCalculator/BmiCalculator';
import DayInTheLife from '../../components/DayInTheLife/DayInTheLife';
import './BlogPage.scss';
import BlogComponent, {
    BlogEntry,
} from '../../components/BlogComponent/BlogComponent';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../../api/apiService';
import HtmlContent from '../../components/HtmlContent/HtmlContent';

const blogEntries = [
    {
        id: '1',
        image: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Online Meals Plan/01.jpg',
        title: 'Blog Title 1',
        description: 'Description 1',
    },
    {
        id: '2',
        image: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Online Meals Plan/01.jpg',
        title: 'Blog Title 2',
        description: 'Description 2',
    },
    {
        id: '3',
        image: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Online Meals Plan/01.jpg',
        title: 'Blog Title 3',
        description:
            'Coconut milk also lends its velvety sweetness to my sheet-pan meal of roasted sweet potatoes and gingery shrimp.\n As the sweet potatoes roast, the coconut milk they’re bathed in caramelizes their edges, while the shrimp are added later so they stay succulent and plump.\n The potatoes need about 45 minutes in the oven, but that’s hands-off time. The dish comes together easily, and it’s an ideal use for that bag of frozen shrimp in the freezer. If you have the energy for one extraordinary dinner this week, it’s well worth investing it in Genevieve Ko’s homemade spinach-filled dumplings with chile crisp. (Consider it practice for the upcoming Lunar New Year.) Dumplings, as Genevieve writes, are as much about texture as taste. Her version, both steamed and fried, is a symphony of crackling, crunchy undersides with chewy-tender tops. A delightful textural contrast is also front and center in Ali Slagle’s spicy sesame noodles. \nSpringy ramen noodles meet nubby ground chicken and crunchy peanuts, which are seasoned with a sesame-orange-soy mixture that’s been sizzled in hot oil. As long as you’re buying ground chicken for Ali’s recipe, you might as well throw in an extra pound for this take on youvarlakia avgolemono, a brothy, lemony, dill-flecked soup thickened with eggs and bobbing with chicken-and-rice meatballs. \n More traditional youvarlakia recipes use ground beef for the meatballs, and I’ve also made this soup with ground turkey. Which is to say, you’ve got options. For something both sweet and light — for either breakfast or dessert — you could make my broiled grapefruit with brown sugar and flaky salt. Grapefruits are in peak season now, and glazing them with sugar is a time-honored technique that I update with a pop of salt sprinkled on just before serving. The salt amplifies their sweetness and checks their bitterness while adding a pleasing crunch. As always, you’ll want to subscribe to read all these smart recipes and so many more (in the tens of thousands range) on New York Times Cooking. If you need any technical help, the brilliant people at cookingcare@nytimes.com are there for you. And I’m at hellomelissa@nytimes.com if you want to say hi. Editors’ Picks Snowy Peaks, Rushing Rivers and Schnapps to Warm Your Soul Photos That Capture the Soul of 1960s Dublin January May Be the Best Month to Get Married.\n Here’s Why. That’s all for now. See you on Wednesday.',
    },
    {
        id: '4',
        image: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Online Meals Plan/01.jpg',
        title: 'Blog Title 4',
        description: 'Description 2',
    },
    {
        id: '5',
        image: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Online Meals Plan/01.jpg',
        title: 'Blog Title 5',
        description: 'Description 2',
    },
    {
        id: '6',
        image: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Online Meals Plan/01.jpg',
        title: 'Blog Title 6',
        description: 'Description 2',
    },
    {
        id: '7',
        image: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Online Meals Plan/01.jpg',
        title: 'Blog Title 7',
        description: 'Description 2',
    },
    {
        id: '8',
        image: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Online Meals Plan/01.jpg',
        title: 'Blog Title 8',
        description: 'Description 2',
    },
    // ... more entries
];

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
