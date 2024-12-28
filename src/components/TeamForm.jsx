import React, { useState } from 'react';

const TeamForm = ({ orgId , setShowTeamForm }) => {
    const [teamName, setTeamName] = useState('');

    const handleChange = (e) => {
        setTeamName(e.target.value); // Update the team name as user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const teamData = { name: teamName };
    
        try {
            // Replace ':orgId' with the actual 'orgId' value
            const response = await fetch(`http://localhost:5000/api/teams/${orgId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teamData),
            });            
    
            if (response.ok) {
                alert('Team added successfully!');
            } else {
                alert('Failed to add team');
            }
        } catch (error) {
            console.error('Error adding team:', error);
        }
    };    

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Team</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Team Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={teamName}
                        onChange={handleChange}
                        className="mt-1 p-2 border text-black rounded-md w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default TeamForm;

