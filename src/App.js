import React, { useState, useEffect } from 'react';
import { FaPlusCircle, FaUsers, FaRegAddressCard } from 'react-icons/fa'; // Import icons from react-icons
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OrganizationList from './components/OrganizationList';
import OrganizationForm from './components/OrganizationForm';
import TeamForm from './components/TeamForm';
import MemberForm from './components/MemberForm';

function App() {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [showOrgForm, setShowOrgForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const response = await fetch('http://localhost:5000/api/organizations');
      const data = await response.json();
      setOrganizations(data);
    };
    fetchOrganizations();
  }, []);

  const handleShowOrgForm = () => {
    setShowOrgForm(true);
  };

  const handleShowTeamForm = (orgId) => {
    setSelectedOrgId(orgId);
    setShowTeamForm(true);
  };

  const handleShowMemberForm = (teamId) => {
    setSelectedOrgId(teamId);
    setShowMemberForm(true);
  };

  // Function to add a new organization
  const addOrganization = async (organizationData) => {
    const newOrgId = organizations.length + 1; // Auto-incrementing orgId
    const newOrganization = { ...organizationData, id: newOrgId, teams: [] };
    setOrganizations([...organizations, newOrganization]);
  };

  // Function to add a new team under an organization
  const addTeam = (orgId, teamData) => {
    const updatedOrganizations = organizations.map((org) => {
      if (org.id === orgId) {
        const newTeamId = org.teams.length + 1; // Auto-incrementing teamId
        const newTeam = { ...teamData, id: newTeamId, members: [] };
        return { ...org, teams: [...org.teams, newTeam] };
      }
      return org;
    });
    setOrganizations(updatedOrganizations);
  };

  // Function to add a new member under a team
  const addMember = (teamId, memberData) => {
    const updatedOrganizations = organizations.map((org) => {
      const updatedTeams = org.teams.map((team) => {
        if (team.id === teamId) {
          const newMemberId = team.members.length + 1; // Auto-incrementing memberId
          const newMember = { ...memberData, id: newMemberId };
          return { ...team, members: [...team.members, newMember] };
        }
        return team;
      });
      return { ...org, teams: updatedTeams };
    });
    setOrganizations(updatedOrganizations);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 min-h-screen text-white transition-all">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Organizations Management</h2>

            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleShowOrgForm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                <FaPlusCircle className="inline mr-2" /> Add Organization
              </button>
            </div>

            {showOrgForm && (
              <OrganizationForm
                addOrganization={addOrganization}
                setShowOrgForm={setShowOrgForm}
              />
            )}

            <OrganizationList
              organizations={organizations}
              handleShowTeamForm={handleShowTeamForm}
              handleShowMemberForm={handleShowMemberForm}
            />

            {/* Team Form Pop-up */}
            {showTeamForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                  <TeamForm
                    orgId={selectedOrgId}
                    addTeam={addTeam}
                    setShowTeamForm={setShowTeamForm}
                  />
                  <button
                    onClick={() => setShowTeamForm(false)}
                    className="absolute top-2 right-2 text-xl font-bold text-red-600"
                  >
                    X
                  </button>
                </div>
              </div>
            )}

            {/* Member Form Pop-up */}
            {showMemberForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                  <MemberForm
                    teamId={selectedOrgId}
                    addMember={addMember}
                    setShowMemberForm={setShowMemberForm}
                  />
                  <button
                    onClick={() => setShowMemberForm(false)}
                    className="absolute top-2 right-2 text-xl font-bold text-red-600"
                  >
                    X
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
