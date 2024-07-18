
const Pagination = ({ page, pages, onPageChange }) => {

    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center">
            <ul className="flex border border-slate-300">
                {pageNumbers.map((number) => (
                    <button onClick={() => onPageChange(number)}
                        className={`px-2 py-1 h-full w-full ${parseInt(page) === number ? "bg-gray-200" : ""}`}>{number}
                    </button>
                ))}
            </ul>
        </div>
    );
}

export default Pagination;