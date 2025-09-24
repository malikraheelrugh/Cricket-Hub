import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock, Play } from 'lucide-react';
import { liveMatches } from '../data/mockData';

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);


  useEffect(() => {
    async function fetchApi() {
      try {
        const res = await fetch("https://api.cricapi.com/v1/cricScore?apikey=045d7283-757f-45f7-8192-95cc15ca54c6");
        const data = await res.json();
        // now you can hold the data in a variable
        const scores = data.data;
        const filteredMatches = scores.filter((m) => {
          return m.status !== "Match not started"
        })
        setMatches(filteredMatches)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchApi();
  }, [])

  const refreshScores = () => {
    setIsRefreshing(true);
    // Simulate score updates
    setTimeout(() => {

      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(refreshScores, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'text-red-600 bg-red-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'upcoming': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Live Cricket Scores</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <button
            onClick={refreshScores}
            disabled={isRefreshing}
            className={`flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${isRefreshing ? 'opacity-50' : ''}`}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {matches && matches.map((match) => (
          <div key={match.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{match.series}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                {match.status === 'live' && <Play className="inline h-3 w-3 mr-1" />}
                {match.status === 'upcoming' && <Clock className="inline h-3 w-3 mr-1" />}
                {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={match.t1img} alt="" />

                  <span className="font-medium">{match.t1}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{match.t1s}</div>
                  {match.status === 'live' && (
                    <div className="text-sm text-gray-500">({match.t1s} overs)</div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={match.t2img} alt="" />
                  <span className="font-medium">{match.t2}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{match.t2s}</div>
                  {match.status === 'live' && match.t2s !== 'Yet to bat' && (
                    <div className="text-sm text-gray-500">({match.t2s} overs)</div>
                  )}
                </div>
              </div>
            </div>

            {/* {match.status === 'live' && match.currentSituation && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">{match.currentSituation}</p>
              </div>
            )} */}

            {/* {match.status === 'completed' && match.result && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">{match.result}</p>
              </div>
            )} */}

            {/* {match.status === 'upcoming' && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Starts at {match.startTime} | {match.venue}
                </p>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;