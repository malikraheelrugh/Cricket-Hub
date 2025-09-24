import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
// import { upcomingMatches } from '../data/mockData';

const Matches = () => {
  const [activeTab, setActiveTab] = useState('previous');
  const [previousMatches, setPreviousMatches] = useState([])
  const [upcomingMatches, setUpcomingMatches] = useState([])
  const [filterTeam, setFilterTeam] = useState('');
  const [filterTournament, setFilterTournament] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchApi() {
      try {
        const res = await fetch("https://api.cricapi.com/v1/cricScore?apikey=045d7283-757f-45f7-8192-95cc15ca54c6");
        const data = await res.json();
        // now you can hold the data in a variable
        const scores = data.data;

        const filteredPreviousMatches = scores.filter((m) => {
          return m.status !== "Match not started"
        })
        setPreviousMatches(filteredPreviousMatches)
        const filteredUpcomingMatches = scores.filter((m) => {
          return m.status == "Match not started"
        })
        setUpcomingMatches(filteredUpcomingMatches)


      } catch (error) {
        console.error("Error fetching data:", error);
      }

    }
    fetchApi();
  }, [])
  const sortedMatches = upcomingMatches.sort((a, b) => {

    if (a.series === "Asia Cup 2025") return -1;
    if (a.series !== "Asia Cup 2025") return 1;
    return new Date(a.dateTimeGMT) - new Date(b.dateTimeGMT);

  });

  const filteredMatches = (activeTab === 'previous' ? previousMatches : sortedMatches)
  // .filter(match =>
  //   (filterTeam === '' || match.t1.includes(filterTeam) || match.t2.includes(filterTeam)) &&
  //   (filterTournament === '' || match.series.includes(filterTournament))
  // );

  // const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);
  // const paginatedMatches = filteredMatches.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  // console.log(paginatedMatches);

  //  const allTeams = [...new Set([
  //   ...previousMatches.map(m => m.t1 , m.t2),
  //   ...upcomingMatches.map(m => m.t1 , m.t2 )
  // ])].sort();
  const allTeams = ["pakistan", "India", "England", "South Africa", "Austalia", "New Zeland", "Bangladesh", "Sri Lanka", "Namibia", "Oman", "Uae", "Afghanistan"]
  const allTournaments = ["Asia cup 2025", "ipl 2024", "Test Championship", "Big Bash League", "Women's Championship", "Women's T20 League"]
  // const allTournaments = [...new Set([
  //   ...previousMatches.map(m => m.tournament),
  //   ...upcomingMatches.map(m => m.tournament)
  // ])].sort();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Cricket Matches</h1>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => { setActiveTab('previous'); setCurrentPage(1); }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'previous'
            ? 'bg-white text-green-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
            }`}
        >
          Previous Matches
        </button>
        <button
          onClick={() => { setActiveTab('upcoming'); setCurrentPage(1); }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'upcoming'
            ? 'bg-white text-green-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
            }`}
        >
          Upcoming Matches
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filterTeam}
            onChange={(e) => setFilterTeam(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Teams</option>
            {allTeams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
          <select
            value={filterTournament}
            onChange={(e) => setFilterTournament(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Tournaments</option>
            {allTournaments.map(tournament => (
              <option key={tournament} value={tournament}>{tournament}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMatches.map((match) => (

          <div key={match.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{match.series}</h3>
              <span className="text-sm text-gray-500">{match.matchType}</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={match.t1img} alt="" />
                  <span className="font-medium">{match.t1}</span>
                </div>
                {activeTab === 'previous' && (
                  <div className="text-right">
                    <div className="font-bold text-lg">{match.t1s}</div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={match.t2img} alt="" />
                  <span className="font-medium">{match.t2}</span>
                </div>
                {activeTab === 'previous' && (
                  <div className="text-right">
                    <div className="font-bold text-lg">{match.t2s}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                {match.dateTimeGMT}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {match.dateTimeGMT}
              </div>
            </div>

            {activeTab === 'previous' && match.result && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">{match.status}</p>
              </div>
            )}

            {activeTab === 'upcoming' && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">Match starts at {match.dateTimeGMT}</p>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Matches;