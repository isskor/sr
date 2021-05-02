import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import EpisodeCard from '../components/cards/EpisodeCard';
import {
  getProgram,
  getProgramEpisodes,
  selectProgram,
  selectProgramEpisodes,
  getNextPrevEpisodes,
} from '../slices/programs/programsSlice';
import { StyledContainer } from '../styles/container';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AddToFav from '../components/favorite/AddToFav';
import {
  SSSInfo,
  SSSTabContent,
  SSSBtnCtn,
  SSSWrapper,
} from '../styles/content';
import Pagination from '../components/pagination/Pagination';

const ProgramPage = ({ match }) => {
  const program = useSelector(selectProgram);
  const { episodes, pagination } = useSelector(selectProgramEpisodes);
  const dispatch = useDispatch();

  let page = 1;
  let totalpages = 1;
  if (pagination) {
    page = pagination.page;
    totalpages = pagination.totalpages;
  }
  const d = new Date();
  const [endDate, setEndDate] = useState(d.setDate(d.getDate() - 1));
  const [startDate, setStartDate] = useState(d.setDate(d.getDate() - 1));

  const { id } = match.params;

  useEffect(() => {
    dispatch(getProgram(id));
    dispatch(
      getProgramEpisodes({
        id,
        end: endDate,
        start: startDate,
      })
    );
  }, [dispatch, endDate, startDate, id]);

  if (!program)
    return (
      <StyledContainer>
        <h1>Loading</h1>
      </StyledContainer>
    );

  const {
    programimage,
    name,
    description,
    channel,
    broadcastinfo,
    programurl,
  } = program;

  return (
    <StyledContainer>
      <StyledProgramWrapper>
        <div className='info'>
          <SSSInfo>
            <div className='right'>
              <img src={programimage} alt='' />
              <SSSBtnCtn>
                <AddToFav
                  typeId={{ programId: id }}
                  type={'favoritePrograms'}
                />
              </SSSBtnCtn>
            </div>
            <div className='left'>
              <h1>{name}</h1>
              <h2>Channel : {channel.name}</h2>
              <h4>{broadcastinfo || 'n/a'}</h4>
              <a href={programurl}>More info</a>
              <p className='desc'>{description}</p>
            </div>
          </SSSInfo>
        </div>
        <div className='content'>
          <SSSTabContent>
            <div className='dates'>
              <h3>Episodes</h3>
              <div className='date'>
                <h4>From Date</h4>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <div className='date'>
                <h4>To Date</h4>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </div>
            </div>
            {episodes?.map((e) => (
              <EpisodeCard key={e.id} episode={e} />
            ))}
            <Pagination
              page={page}
              totalpages={totalpages}
              pagination={pagination}
              callback={getNextPrevEpisodes}
            />
          </SSSTabContent>
        </div>
      </StyledProgramWrapper>
    </StyledContainer>
  );
};

export default ProgramPage;

const StyledProgramWrapper = styled(SSSWrapper)`
  padding: 5rem;

  .dates {
    text-align: center;
    h3 {
      padding: 1rem 0 2rem;
      border-bottom: 1px solid black;
    }
    h4 {
      padding: 1rem;
    }
    input {
      font-size: 1rem;
      padding: 1rem;
      text-align: center;
      max-width: 200px;
    }
    @media (min-width: 576px) {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
      h3 {
        flex: 100%;
      }
    }
  }
`;
