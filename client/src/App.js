import { Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/nav/Nav';
import Player from './components/player/Player';
import ChannelPage from './pages/ChannelPage';
import Channels from './pages/Channels';
import Programs from './pages/Programs';
import ProgramsPage from './pages/ProgramPage';
import Register from './pages/Register';
import Login from './pages/Login';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFavorites, getUser } from './slices/user/userSlice';
import UserRoute from './components/routes/UserRoute';
import EpisodePage from './pages/EpisodePage';
import UserFavorites from './pages/UserFavorites';
import UserSchedule from './pages/UserSchedule';
import Home from './pages/Home';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      dispatch(getUser());

      dispatch(getFavorites());
    }
  });

  return (
    <div className='App'>
      <Nav />
      <Player />
      <Switch>
        <Route exact path='/channels' component={Channels} />
        <Route exact path='/channels/:id' component={ChannelPage} />
        <Route exact path='/programs/:page?' component={Programs} />
        <Route exact path='/program/:id/:page?' component={ProgramsPage} />
        <Route exact path='/episode/:id' component={EpisodePage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <UserRoute exact path='/favorite/:type?' component={UserFavorites} />
        <UserRoute exact path='/userschedule' component={UserSchedule} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
