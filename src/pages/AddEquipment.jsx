import React, { useContext, useState } from 'react';
import NavBar from '../components/NavBar';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const AddEquipment = () => {
    const { user } = useContext(AuthContext);

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

        const newProduct = { image, itemName, categoryName, description, price, rating, customization, processingTime, stockStatus, userEmail, userName };

        // add to db
        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Product Added Successfully!',
                        text: 'You have successfully added a product. You will be redirected shortly, or click OK to proceed immediately.',
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
            <NavBar />
            <div>
                <form className='grid grid-cols-2 gap-8' onSubmit={handleSubmit}>
                    {/* image  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Image
                        <input type="text" name='image' className="grow" placeholder="Place Image URL" />
                    </label>
                    {/* item name  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Item Name
                        <input type="text" name='itemName' className="grow" placeholder="Item Name" />
                    </label>
                    {/* category name  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Category Name
                        <input type="text" name='categoryName' className="grow" placeholder="Category Name" />
                    </label>
                    {/* description  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Description
                        <input type="text" name='description' className="grow" placeholder="Description" />
                    </label>
                    {/* price  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Price
                        <input type="text" name='price' className="grow" placeholder="Price" />
                    </label>
                    {/* Rating  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Rating
                        <input type="text" name='rating' className="grow" placeholder="Rating" />
                    </label>
                    {/* customization  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Customization
                        <input type="text" name='customization' className="grow" placeholder="Customization" />
                    </label>
                    {/* processing time  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Processing Time
                        <input type="text" name='processingTime' className="grow" placeholder="Processing Time" />
                    </label>
                    {/* stock status  */}
                    <label className="input input-bordered flex items-center gap-2">
                        Stock Status
                        <input type="text" name='stockStatus' className="grow" placeholder="Stock Status" />
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

export default AddEquipment;