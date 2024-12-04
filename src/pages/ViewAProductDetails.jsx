import NavBar from '../components/NavBar';
import { useLoaderData } from 'react-router-dom';

const ViewAProductDetails = () => {
    const product = useLoaderData() || [];
    return (
        <div>
            <NavBar/>
            <div>
                {product.itemName}
            </div>
        </div>
    );
};

export default ViewAProductDetails;