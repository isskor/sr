import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  getNextPrevPrograms,
  selectChannelPrograms,
} from '../../slices/channels/channelSlice';
import { useHistory } from 'react-router-dom';
import Pagination from '../pagination/Pagination';

const ChannelPrograms = ({ setDates }) => {
  const { programs, pagination } = useSelector(selectChannelPrograms);
  const history = useHistory();

  let page = 1;
  let totalpages = 1;
  if (pagination) {
    page = pagination.page;
    totalpages = pagination.totalpages;
  }

  const goToProgram = (id) => {
    history.push('/program/' + id);
  };

  return (
    <div>
      {programs?.map((p) => (
        <StyledProgramsCard key={p.id} onClick={() => goToProgram(p.id)}>
          <img src={p.programimage} alt={p.name} />
          <div className='card-info'>
            <h4>{p.name}</h4>
            <p>{p.broadcastinfo}</p>
            <p>{p.programcategory?.name}</p>
          </div>
        </StyledProgramsCard>
      ))}
      <Pagination
        page={page}
        totalpages={totalpages}
        pagination={pagination}
        callback={getNextPrevPrograms}
      />
    </div>
  );
};

export default ChannelPrograms;

const StyledProgramsCard = styled.div`
  border-bottom: 1px solid black;
  padding: 1rem 0;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  img {
    width: 120px;
    object-fit: cover;
  }
  .card-info {
    flex: 50%;
  }
`;
