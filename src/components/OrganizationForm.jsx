import React, { useState } from 'react';

const OrganizationForm = ({ setOrganizations, setShowOrgForm }) => {
    const [orgDetails, setOrgDetails] = useState({
        name: '',
        email: '',
        location: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrgDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/organizations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orgDetails),
        });
    
        if (response.ok) {
            const contentType = response.headers.get('Content-Type');
            let responseData;
    
            // Check if the response is JSON
            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json();
            } else {
                // Handle text response, assuming it's a simple confirmation message
                responseData = await response.text();
                console.log('Server response:', responseData);
            }
    
            // If it's JSON, update organizations state
            if (typeof responseData === 'object') {
                setOrganizations((prev) => [...prev, responseData]);
            }
    
            setShowOrgForm(false); // Close form after submission
        } else {
            console.error('Failed to create organization:', response.status);
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium" htmlFor="name">
                    Organization Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={orgDetails.name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border text-black rounded-md w-full"
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
                    value={orgDetails.email}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border text-black rounded-md w-full"
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
                    value={orgDetails.location}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border text-black rounded-md w-full"
                    required
                />
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                Add Organization
            </button>
        </form>
    );
};

export default OrganizationForm;
