import React, { useState } from 'react';

const MemberForm = ({ teamId, setShowMemberForm }) => {
    const [memberDetails, setMemberDetails] = useState({
        name: '',
        email: '',
        location: '',
        image: null, // To store the selected image file
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMemberDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setMemberDetails((prevState) => ({
            ...prevState,
            image: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData to send image and other data
        const formData = new FormData();
        formData.append('name', memberDetails.name);
        formData.append('email', memberDetails.email);
        formData.append('location', memberDetails.location);
        if (memberDetails.image) {
            formData.append('image', memberDetails.image);
        }

        const response = await fetch(`http://localhost:5000/api/members/${teamId}`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            setShowMemberForm(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium" htmlFor="name">
                    Member Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={memberDetails.name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={memberDetails.email}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium" htmlFor="location">
                    Location
                </label>
                <input
                    type="text"
                    name="location"
                    id="location"
                    value={memberDetails.location}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                />
            </div>

            {/* Image Upload Section */}
            <div>
                <label htmlFor="image" className="block text-sm font-medium">
                    Upload Image
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                />
            </div>

            {/* Dynamic Status Marker */}
            <div className={`mt-2 text-sm font-medium ${memberDetails.image ? 'text-green-600' : 'text-red-600'}`}>
                {memberDetails.image ? 'Image Uploaded' : 'Image Not Uploaded'}
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                Add Member
            </button>
        </form>
    );
};

export default MemberForm;
