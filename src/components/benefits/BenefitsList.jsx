import { useEffect, useState } from "react";
import BenefitCard from "./BenefitCard";

export default function BenefitsList() {
    
    const [benefits, setBenefits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBenefits();
        setLoading(false);
    }, []);

    const fetchBenefits = async () => {
        const response = await fetch('/benefits_list.json');
        const data = await response.json();
        setBenefits(data);
    }
    
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading && <p>Loading...</p>}
            {
                benefits.map(benefit => (
                    <BenefitCard key={benefit.id} benefit={benefit} />
                ))
            }
        </div>
    )
}