import React, { useState } from 'react';
import { Trophy, Users, Calendar, MapPin, Award } from 'lucide-react';
import { asiaCupStandings, asiaCupFixtures, asiaCupTeams } from '../data/mockData';

const AsiaCup = () => {
  const [activeTab, setActiveTab] = useState('standings');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg">
        <div className="flex items-center space-x-3">
          <Trophy className="h-8 w-8" />
          <div>
            <h1 className="text-3xl font-bold">Asia Cup 2024</h1>
            <p className="text-green-100">The Premier Cricket Tournament of Asia</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('standings')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'standings'
            ? 'bg-white text-green-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
            }`}
        >
          Standings
        </button>
        <button
          onClick={() => setActiveTab('fixtures')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'fixtures'
            ? 'bg-white text-green-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
            }`}
        >
          Fixtures
        </button>
        <button
          onClick={() => setActiveTab('teams')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'teams'
            ? 'bg-white text-green-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
            }`}
        >
          Teams
        </button>
      </div>

      {/* Standings Tab */}
      {activeTab === 'standings' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-gray-50 border-b">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-500" />
              Points Table
            </h2>
          </div>
          <div className="overflow-x-auto vh-80">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Matches</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Won</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Lost</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {asiaCupStandings.map((team, index) => (
                  <tr key={team.team} className={index < 2 ? 'bg-green-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                          index < 4 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                          {team.team.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{team.team}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.matches}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-600 font-medium">{team.won}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-600 font-medium">{team.lost}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-gray-900">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Fixtures Tab */}
      {activeTab === 'fixtures' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            Tournament Schedule
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {asiaCupFixtures.map((fixture) => (
              <div key={fixture.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {fixture.stage}
                  </span>
                  <span className="text-sm text-gray-500">{fixture.date}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {fixture.team1.charAt(0)}
                      </div>
                      <span className="font-medium">{fixture.team1}</span>
                    </div>
                  </div>

                  <div className="text-center text-gray-400 font-medium">VS</div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {fixture.team2.charAt(0)}
                      </div>
                      <span className="font-medium">{fixture.team2}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {fixture.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {fixture.venue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Teams Tab */}
      {activeTab === 'teams' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Users className="h-5 w-5 mr-2 text-green-500" />
            Participating Teams
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {asiaCupTeams.map((team) => (
              <div key={team.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {team.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{team.name}</h3>
                    <p className="text-sm text-gray-500">Captain: {team.captain}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Key Players</h4>
                    <div className="flex flex-wrap gap-2">
                      {team.keyPlayers.map((player) => (
                        <span key={player} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {player}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{team.ranking}</p>
                      <p className="text-xs text-gray-500">ODI Ranking</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">{team.titles}</p>
                      <p className="text-xs text-gray-500">Asia Cup Titles</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AsiaCup;