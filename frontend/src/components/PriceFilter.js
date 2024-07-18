
const PriceFilter = ({selectedPrice, onChange})=>{

    return(
        <div>
            <h4 className="text-md font-semibold mb-2">Max price</h4>
            <select className="p-2 border rounded-md w-full"
                value={selectedPrice}
                onChange={(event)=> onChange( event.target.value? parseInt(event.target.value) : undefined )}
            >
                <option value={""}>Select Max Price</option>
                {[500, 1000, 2500, 5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000].map((price)=>(
                    <option value={price}>
                        {price}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default PriceFilter;