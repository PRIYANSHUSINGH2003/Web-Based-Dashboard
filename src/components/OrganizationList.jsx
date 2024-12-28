import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaUsers, FaRegAddressCard } from 'react-icons/fa';

const OrganizationList = ({ handleShowTeamForm, handleShowMemberForm }) => {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/organizations');
                const data = await response.json();
                setOrganizations(data || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching organizations", error);
                setOrganizations([]);
                setLoading(false);
            }
        };

        fetchOrganizations();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Organizations</h2>
            <div className="grid gap-6">
                {organizations.length > 0 ? (
                    organizations.map((organization) => (
                        <div
                            key={organization.id}
                            className="bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <h3 className="text-lg font-semibold">{organization.name}</h3>
                            <div className="flex justify-between items-center mt-4">
                                <div>
                                    {Array.isArray(organization.teams) && organization.teams.length > 0 ? (
                                        organization.teams.map((team) => (
                                            <div key={team.id} className="mt-2">
                                                <h4 className="text-md font-semibold">{team.name}</h4>
                                                <div className="grid gap-4 mt-2">
                                                    {Array.isArray(team.members) && team.members.length > 0 ? (
                                                        team.members.map((member) => (
                                                            <div
                                                                key={member.id}
                                                                className="bg-gray-700 p-3 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
                                                            >
                                                                <h5 className="text-sm font-semibold">{member.name}</h5>
                                                                <div className="flex items-center mt-2">
                                                                    {member.status === 'Image Uploaded' ? (
                                                                        <FaCheckCircle className="text-green-500 mr-2" />
                                                                    ) : (
                                                                        <FaTimesCircle className="text-red-500 mr-2" />
                                                                    )}
                                                                    <span>{member.status}</span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div>No members available</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div>No teams available</div>
                                    )}
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleShowTeamForm(organization.id)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        <FaUsers className="inline mr-2" /> Add Team
                                    </button>
                                    <button
                                        onClick={() => handleShowMemberForm(organization.id)}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        <FaRegAddressCard className="inline mr-2" /> Add Member
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No organizations available</div>
                )}
            </div>
        </div>
    );
};

export default OrganizationList;
