import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const UpdateProduct = () => {
    const product = useLoaderData() || [];
    const { user } = useContext(AuthContext);
    console.log(product)

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const image = form.get('image');
        const itemName = form.get('itemName');
        const categoryName = form.get('categoryName');
        const description = form.get('description');
        const price = form.get('price');
        const rating = form.get('rating');
        const customization = form.get('customization');
        const processingTime = form.get('processingTime');
        const stockStatus = form.get('stockStatus');
        const userEmail = user?.email;
        const userName = user?.displayName;

        const updatedProduct = { image, itemName, categoryName, description, price, rating, customization, processingTime, stockStatus, userEmail, userName };

        // add to db
        fetch(`http://localhost:5000/products/${product._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Product Updated Successfully!',
                        text: 'You have successfully updated this product. You will be redirected shortly, or click OK to proceed immediately.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 3000,
                        timerProgressBar: true,
                    })
                }
            })
    };
    return (
        <div>
            <NavBar/>
            <div>
                <form className='grid grid-cols-2 gap-8' onSubmit={handleSubmit}>
                    {/* image  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Image
                        <input type="text" name='image' className="grow" defaultValue={product.image} />
                    </label>
                    {/* item name  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Item Name
                        <input type="text" name='itemName' className="grow" defaultValue={product.itemName} />
                    </label>
                    {/* category name  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Category Name
                        <input type="text" name='categoryName' className="grow" defaultValue={product.categoryName} />
                    </label>
                    {/* description  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Description
                        <input type="text" name='description' className="grow" defaultValue={product.description} />
                    </label>
                    {/* price  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Price
                        <input type="text" name='price' className="grow" defaultValue={product.price} />
                    </label>
                    {/* Rating  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Rating
                        <input type="text" name='rating' className="grow" defaultValue={product.rating} />
                    </label>
                    {/* customization  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Customization
                        <input type="text" name='customization' className="grow" defaultValue={product.customization} />
                    </label>
                    {/* processing time  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Processing Time
                        <input type="text" name='processingTime' className="grow" defaultValue={product.processingTime} />
                    </label>
                    {/* stock status  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Stock Status
                        <input type="text" name='stockStatus' className="grow" defaultValue={product.stockStatus} />
                    </label>
                    {/* user email  */}
                    <label className="input input-bordered flex items-center gap-2">
                        User Email
                        <input type="text" name='userEmail' className="grow" value={user?.email} readOnly />
                    </label>
                    {/* user name readonly  */}
                    <label className="input input-bordered flex items-center gap-2">
                        User Name
                        <input type="text" value={user?.displayName} readOnly name='userName' className="grow" />
                    </label>
                    {/* submit button  */}
                    <button type="submit" value="Submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            
        </div>
    );
};

export default UpdateProduct;