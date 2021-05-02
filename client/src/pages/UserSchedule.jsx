import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import {
  getFavorites,
  getUserSchedule,
  selectUserFavorites,
  selectUserSchedule,
} from '../slices/user/userSlice';
import { StyledContainer } from '../styles/container';

const UserSchedule = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const schedule = useSelector(selectUserSchedule);
  const favs = useSelector(selectUserFavorites);
  useEffect(() => {
    dispatch(getUserSchedule());
    dispatch(getFavorites());
  }, []);
  let s = [];
  if (schedule && favs) {
    s = schedule.map((s) => {
      let channel = favs.channels.find((f) => f.id === s.channelId);
      return { ...s, channel };
    });
  }
  return (
    <StyledContainer>
      <h1>Schedule</h1>
      <StyledScheduleList>
        {s.length > 0 &&
          s?.map((s) => (
            <div className='list' key={s.id}>
              <div className='list-header'>
                <img src={s.channel?.image} alt={s.channel?.name} />
                <h2>{s.channel?.name}</h2>
              </div>
              <div className='schedule_cards'>
                {s.schedule?.map((sc) => (
                  <div
                    className='card'
                    key={sc.episodeid + sc.starttimeutc}
                    onClick={() => history.push(`/episode/${sc.episodeid}`)}
                  >
                    <h3>{sc.title}</h3>
                    <div className='card_info'>
                      <img src={sc.imageurl} alt='' />
                      <p>{sc.starttimeutc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </StyledScheduleList>
    </StyledContainer>
  );
};

export default UserSchedule;

const StyledScheduleList = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr auto);
  grid-template-rows: 1fr;
  overflow: scroll;
  gap: 1rem;

  .list {
    grid-row: 1/1;
    width: 100vw;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.65);
    box-shadow: 0 0 20px rgba(78, 78, 78, 0.3);

    .list-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 0 2rem;
      border-bottom: 1px solid gray;
      > img {
        width: 120px;
        flex: 0.4;
      }
      h2 {
        flex: 0.4;
        text-align: center;
      }
    }

    @media (min-width: 768px) {
      width: 400px;
    }
  }

  .schedule_cards {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .card {
      border-bottom: 1px solid gray;
      img {
        height: 80px;
        width: 80px;
      }
      .card_info {
        padding: 1rem 0;
        display: flex;
        justify-content: space-between;
        p {
          align-self: flex-end;
        }
      }
    }
  }
  @media (min-width: 768px) {
    padding: 5rem;
    height: calc(100vh - 132px);
    overflow: auto;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: rgba(156, 226, 243, 0.5);
    }
  }
`;
