// src/components/Paginacija.js
import React from "react";

const Paginacija = ({ page, totalPages, setPage, perPage, setPerPage }) => {
    const renderPageNumbers = () => {
        const pages = [];
        const visiblePages = 5;
        let startPage = Math.max(1, page - Math.floor(visiblePages / 2));
        let endPage = startPage + visiblePages - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - visiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    className={`btn ${i === page ? "btn-primary" : "btn-outline-primary"} mx-1`}
                    onClick={() => setPage(i)}
                    disabled={i === page}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="row justify-content-center my-4">
            <div className="col-auto">
                <button className="btn btn-outline-primary mx-1" onClick={() => setPage(1)} disabled={page === 1}>
                    &laquo;
                </button>
                <button className="btn btn-outline-primary mx-1" onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
                    &lsaquo;
                </button>
                {renderPageNumbers()}
                <button className="btn btn-outline-primary mx-1" onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                    &rsaquo;
                </button>
                <button className="btn btn-outline-primary mx-1" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
                    &raquo;
                </button>
            </div>
            <div className="col-auto">
                <select
                    className="form-select"
                    value={perPage}
                    onChange={(e) => {
                        setPerPage(parseInt(e.target.value));
                        setPage(1);
                    }}
                >
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                    <option value="16">16</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Paginacija;
