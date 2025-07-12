import React, { useState, useEffect } from "react";
import Paginacija from "../Paginacija"; 
import Loading from "../parts/Loading";
import Error from "../parts/Error";
import BlogCard from "../parts/BlogCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Lightbox1 from "../parts/Lightbox1";

const Blog = () => {
        const [data, setData] = useState(null);
        const [error, setError] = useState(null);
        
        const [page, setPage] = useState(1);
        const [perPage, setPerPage] = useState(12);
        const [totalPages, setTotalPages] = useState(0);
        const [posts, setPosts] = useState([]);


        const [authors, setAuthors] = useState([]);
        const [selectedAuthor, setSelectedAuthor] = useState('');

        const [categories, setCategories] = useState([]);
        const [selectedCategory, setSelectedCategory] = useState('');

        useEffect(() => {

            let url = 'https://wp1.edukacija.online/backend/wp-json/wp/v2/posts/?_embed';
            if(selectedAuthor) {
                url += '&author=' + selectedAuthor;
            }

            if(selectedCategory) {
                url += '&categories=' + selectedCategory;
            }

            console.log(url)
            const fetchPage = async () => {
                try {
                    const response = await fetch(url + '&per_page=' + perPage + '&page=' + page);
                    if (!response.ok) {
                        throw new Error(`Došlo je do greške: ${response.status}`);
                    }
                    const total = response.headers.get("X-WP-TotalPages");
                    setTotalPages(parseInt(total));
                    const json = await response.json();
                    setData(json);
                    console.log(json);
                } catch (err) {
                    setError(err.message);
                }

                try {
                    const response = await fetch('https://wp1.edukacija.online/backend/wp-json/wp/v2/posts?per_page=6&_embed');
                    if (!response.ok) {
                    throw new Error(`Došlo je do greške: ${response.status}`);
                    }
                    const json = await response.json();
                    setPosts(json);
                } catch (err) {
                    setError(err.message);
                }
            };
    
            fetchPage();
        }, [page, perPage, selectedAuthor, selectedCategory]);

        useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
         }, [page]);


        

        useEffect(() => {

            fetch('https://wp1.edukacija.online/backend/wp-json/wp/v2/users?per_page=20')
                .then(res => res.json())
                .then(data => {
                    setAuthors(data);
            });

            fetch('https://wp1.edukacija.online/backend/wp-json/wp/v2/categories?per_page=100')
                .then(res => res.json())
                .then(data => {
                    setCategories(data);
            });

        }, []);

    
        if (error) return <Error message={error} />;
        if (!data) return <Loading />;
    
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
            {
                breakpoint: 1024,
                settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                }
            },
            
            ]
        };

    
        return(
            <>
            <div className="py-5 mb-5 text-center">
                <div className="container-fluid blog-banner py-5">
                    <h1>Welcome to blog</h1>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-end">

                        <select className="mb-4 form-select w-auto d-inline-block me-3" value={selectedCategory} onChange={
                            (e) => {
                                setSelectedCategory(e.target.value);
                                setPage(1);
                            }} >
                            <option value="">Sve kategorije</option>
                            {categories.map(category => (
                                <option value={category.id}>{category.name}</option>
                            ))}
                        </select>

                        <select className="mb-4 form-select w-auto d-inline-block me-3" value={selectedAuthor} onChange={
                            (e) => {
                                setSelectedAuthor(e.target.value);
                                setPage(1);
                            }} >
                            <option value="">Svi autori</option>
                            {authors.map(author => (
                                <option value={author.id}>{author.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">

                    {data.map(item => (
                        <BlogCard
                            item={item}
                            key={item.id}
                            column="col-md-3 col-sm-6 col-12 mb-4"
                        />
                    ))}
                </div>

                <div className="">
                    <h3 className="mb-4">Posljednji članci</h3>
                        <div className="">
                

                        <Slider {...settings}>
                            {posts.map(item => (
                                <div className="px-3" key={item.id}>
                                    <BlogCard
                                        item={item}
                                        column=""
                                    />
                                </div>
                            ))}
                        </Slider>
                        <h3>Ovo je Lightbox</h3>
                        <Lightbox1 />
                
                        </div>  
                </div>

                <Paginacija 
                    page={page} 
                    totalPages={totalPages} 
                    setPage={setPage} 
                    perPage={perPage} 
                    setPerPage={setPerPage}
                />

            </div>
            </>
        );
};

export default Blog;