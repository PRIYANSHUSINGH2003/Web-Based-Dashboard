import React, { useState } from 'react';

const UploadForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0], // Set the image file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('location', formData.location);
        form.append('image', formData.image);

        try {
            const response = await fetch('http://localhost:5000/api/members/:teamId', {
                method: 'POST',
                body: form,
            });

            if (response.ok) {
                alert('File uploaded successfully!');
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            console.error('Error during file upload:', error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Upload Member Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium">Upload Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        className="mt-1 p-2 border rounded-md w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Upload
                </button>
            </form>
        </div>
    );
};

export default UploadForm;
