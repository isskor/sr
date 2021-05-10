import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledContainer } from '../styles/container';
import logo from '../assets/images/Untitled-6.png';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { getRecent, selectMostRecent } from '../slices/programs/programsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const recent = useSelector(selectMostRecent);
  const history = useHistory();
  const [shows, setShow] = useState(recent);
  useEffect(() => {
    dispatch(getRecent());
  }, []);

  useEffect(() => {
    setShow(recent);
  }, [recent]);

  //   setShow(recent);
  return (
    <StyledContainer>
      <StyledHomeWrapper>
        <div className='info'>
          <div className='a'>
            <h1>Immersive Radio</h1>
            <h2>Listen to your favorite Channels or Programs</h2>
            <div className='btn_container'>
              <Link to='/register'>Register</Link>
              <Link to='/channels'>Browse And Listen</Link>
            </div>
          </div>
        </div>
        <div className='recent_list'>
          <h3>Most Recent Shows</h3>
          {recent.length > 0 &&
            recent.map((r) => (
              <StyledRecentCard
                key={r.id}
                onClick={() => history.push(`/program/${r.program.id}`)}
              >
                <img src={r.imageurl} alt='' />
                <div className=''>
                  <p>{r.title}</p>
                  <h5>{r.program.name}</h5>
                </div>
              </StyledRecentCard>
            ))}
        </div>
      </StyledHomeWrapper>
    </StyledContainer>
  );
};

export default Home;
const StyledHomeWrapper = styled.div`
  h1 {
    padding: 5rem 0;
    text-align: center;
  }
  h2 {
    text-align: center;
    padding: 0 2rem;
  }
  .btn_container {
    padding: 2rem 2rem;
    display: flex;
    justify-content: space-around;
    a {
      display: block;
      padding: 1em;
      text-decoration: none;
      color: white;
      background: #da9efd;
      border-radius: 3rem;
    }
    & > :first-child {
      background: #86e3f3;
    }
    @media (min-width: 576px) {
      justify-content: center;
      gap: 2rem;
    }
  }
  .recent_list {
    h3 {
      text-align: center;
    }
    margin-top: 6rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  @media (min-width: 992px) {
    /* padding: 5rem; */
    display: flex;
    justify-content: space-around;
    .info {
      margin: 0 auto;
      margin-top: 10%;
      flex: 60%;

      .a {
        position: fixed;
      }
    }
    .recent_list {
      flex: 50%;
    }
  }
`;

const StyledRecentCard = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  img {
    width: 50px;
    object-fit: cover;
    height: 60px;
  }
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 14px 14px 50px #e6e6e6, -14px -14px 50px #ffffff;
`;
