import './App.css';
import {Routes, Route} from "react-router-dom"
import Home from './container/Home';
import TournamentContent from './container/TournamentContent';
import DayContent from './components/DayContent';
import LobbyContent from './components/LobbyContent';
import ViewTournaments from './container/ViewTournaments';
import CreateTournament from './container/CreateTournament';
import TournamentLayout from './components/TournamentLayout';
import ViewPlayers from './container/ViewPlayers';
import RegisterPlayer from './components/RegisterPlayer';
import Layout from './components/Layout';
import PlayerContent from './components/PlayerContent';
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
      <Route path='' element={<Home />} />
          
        
          <Route path='/tournament' element={<TournamentLayout />}>
              <Route index element={<ViewTournaments />} />
              <Route path='view' element={<ViewTournaments />} />
              <Route path='create' element={<CreateTournament />} />
          </Route>
          <Route path='tournament/:id' element={<TournamentContent />} />
          <Route path='tournament/:id/day/:day_number' element={<DayContent />} />
          <Route path='tournament/:id/day/:day_number/:lobby_id' element={<LobbyContent />}/>
          <Route path='/players'>
            <Route index element={<ViewPlayers />} />
            <Route path='view' element={<ViewPlayers />}></Route>
            <Route path='register' element={<RegisterPlayer />} />
            <Route path=':player_id' element={<PlayerContent />} />  
          </Route>
      </Route>      
    </Routes>
  );
}

export default App;
