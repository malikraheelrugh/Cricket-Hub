import React, { useState } from 'react';
import { Search, TrendingUp, Trophy, User } from 'lucide-react';
import { teamRankings, playerRankings } from '../data/mockData';

const PlayersTeams = () => {
  const [activeTab, setActiveTab] = useState('teams');
  const [formatFilter, setFormatFilter] = useState('ODI');
  const [searchTerm, setSearchTerm] = useState('');
  const [playerCategory, setPlayerCategory] = useState('batting');

  const filteredPlayers = playerRankings[playerCategory].filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Players & Teams</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('teams')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'teams'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
            }`}
        >
          Team Rankings
        </button>
        <button
          onClick={() => setActiveTab('players')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'players'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
            }`}
        >
          Player Rankings
        </button>
      </div>

      {/* Team Rankings Tab */}
      {activeTab === 'teams' && (
        <div className="space-y-6">
          <div className="flex space-x-4">
            {['Test', 'ODI', 'T20I'].map(format => (
              <button
                key={format}
                onClick={() => setFormatFilter(format)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${formatFilter === format
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {format}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-gray-50 border-b">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                {formatFilter} Team Rankings
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teamRankings[formatFilter].map((team, index) => (
                    <tr key={team.team} className={index < 3 ? 'bg-yellow-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-800' :
                            index === 1 ? 'bg-gray-100 text-gray-800' :
                              index === 2 ? 'bg-orange-100 text-orange-800' : 'bg-gray-50 text-gray-600'
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
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-gray-900">{team.rating}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.points}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${team.change.startsWith('+') ? 'bg-green-100 text-green-800' :
                            team.change.startsWith('-') ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {team.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Player Rankings Tab */}
      {activeTab === 'players' && (
        <div className="space-y-6">
          <div className="flex space-x-4">
            {[
              { key: 'batting', label: 'Batsmen' },
              { key: 'bowling', label: 'Bowlers' },
              { key: 'allrounder', label: 'All-rounders' }
            ].map(category => (
              <button
                key={category.key}
                onClick={() => setPlayerCategory(category.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${playerCategory === category.key
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlayers.map((player, index) => (
              <div key={player.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{player.name}</h3>
                      <p className="text-sm text-gray-500">{player.country}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' : 'bg-gray-50 text-gray-600'
                    }`}>
                    {player.ranking}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-lg font-bold text-blue-600">{player.rating}</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-lg font-bold text-green-600">{player.points}</p>
                      <p className="text-xs text-gray-500">Points</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Career Best</span>
                      <span className="text-sm font-medium text-gray-800">{player.careerBest}</span>
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

export default PlayersTeams;