
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
// import Home from './pages/Home';
// import Matches from './pages/Matches';
// import AsiaCup from './pages/AsiaCup';
// import PlayersTeams from './pages/PlayersTeams';
// import News from './pages/News';
import Home from './pages/Home.jsx';
import Matches from './pages/Matches.jsx';
import AsiaCup from './pages/AsiaCup.jsx';
import PlayersTeams from './pages/PlayersTeams.jsx';
import News from './pages/News.jsx';

function App() {
    return <Router>
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="container mx-auto px-4 py-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/matches" element={<Matches />} />
                    <Route path="/asia-cup" element={<AsiaCup />} />
                    <Route path="/players-teams" element={<PlayersTeams />} />
                    <Route path="/news" element={<News />} />
                </Routes>
            </main>
        </div>
    </Router>
}
export default App;