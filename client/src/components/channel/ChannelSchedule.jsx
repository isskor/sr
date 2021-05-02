import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {
  getNextPrevSchedule,
  selectChannelSchedule,
} from '../../slices/channels/channelSlice';
import Pagination from '../pagination/Pagination';

const ChannelSchedule = () => {
  const { schedule, pagination } = useSelector(selectChannelSchedule);
  const history = useHistory();

  let page = 1;
  let totalpages = 1;
  if (pagination) {
    page = pagination.page;
    totalpages = pagination.totalpages;
  }

  return (
    <div>
      {schedule?.map((s) => (
        <StyledScheduleCard
          key={s.starttimeutc}
          onClick={() => history.push(`/episode/${s.episodeid}`)}
        >
          <h3>{s.title}</h3>
          <p>{s.starttimeutc}</p>
        </StyledScheduleCard>
      ))}
      <Pagination
        page={page}
        totalpages={totalpages}
        pagination={pagination}
        callback={getNextPrevSchedule}
      />
    </div>
  );
};

export default ChannelSchedule;

const StyledScheduleCard = styled.div`
  border-bottom: 1px solid black;
  padding: 1rem 0;
`;
