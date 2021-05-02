import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ChannelInfo from '../components/channel/ChannelInfo';
import ChannelNav from '../components/channel/ChannelNav';
import ChannelPrograms from '../components/channel/ChannelPrograms';
import ChannelSchedule from '../components/channel/ChannelSchedule';
import {
  getChannel,
  selectChannel,
  getChannelSchedule,
  getChannelPrograms,
} from '../slices/channels/channelSlice';
import { setSource } from '../slices/player/playerSlice';
import { StyledContainer } from '../styles/container';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AddToFav from '../components/favorite/AddToFav';
import {
  SSSBtnCtn,
  SSSInfo,
  SSSTabContent,
  SSSWrapper,
} from '../styles/content';
const ChannelPage = ({ match }) => {
  const dispatch = useDispatch();
  const c = useSelector(selectChannel);
  const [tabs, setTabs] = useState('info');
  const [date, setDate] = useState(new Date());
  const { id } = match.params;

  useEffect(() => {
    dispatch(getChannel(id));
    dispatch(getChannelSchedule({ id, date }));
    dispatch(getChannelPrograms(id));
  }, [dispatch, date, id]);

  const handlePlay = () => {
    dispatch(setSource(c.channel));
  };

  if (!c)
    return (
      <StyledContainer>
        <h1>Loading</h1>
      </StyledContainer>
    );

  if (c) {
    const { channel, rightNow } = c;
    const {
      title,
      subtitle,
      endtimeutc,
      starttimeutc,
    } = rightNow.currentscheduledepisode;
    const next = rightNow.nextscheduledepisode;
    const { image, name, color, tagline } = channel;

    console.log(channel.id);

    const handleTabs = (e) => {
      setTabs(e.target.name);
    };

    return (
      <StyledContainer>
        <SSSWrapper color={color}>
          <div className='info'>
            <SSSInfo>
              <div className='right'>
                <img src={image} alt={name} />
                <SSSBtnCtn color={color}>
                  <AddToFav
                    typeId={{ channelId: id }}
                    type={'favoriteChannels'}
                  />
                  <button onClick={handlePlay}>Play</button>
                </SSSBtnCtn>
              </div>
              <div className='left'>
                <h2>{name}</h2>
                <p className='desc'>{tagline}</p>
                <div className='right_now'>
                  <h4>Playing Right Now</h4>
                  <p>
                    {title} <span>{subtitle}</span>
                  </p>
                  <div className='time'>
                    <span>Start: {starttimeutc.split(',')[1]}</span>
                    <span>End: {endtimeutc.split(',')[1]}</span>
                  </div>
                  <h4>Up Next</h4>
                  <p>
                    {next.title} <span>{next.subtitle}</span>
                  </p>
                </div>
              </div>
            </SSSInfo>
          </div>
          <div className='content'>
            <ChannelNav tabs={tabs} handleTabs={handleTabs} color={color} />
            <SSSTabContent>
              {tabs === 'info' && <ChannelInfo channel={channel} />}
              {tabs === 'schedule' && (
                <>
                  <div className='date'>
                    <p>From Date</p>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                    />
                  </div>
                  <ChannelSchedule />
                </>
              )}
              {tabs === 'programs' && <ChannelPrograms channel={channel} />}
            </SSSTabContent>
          </div>
        </SSSWrapper>
      </StyledContainer>
    );
  }
};
export default ChannelPage;
