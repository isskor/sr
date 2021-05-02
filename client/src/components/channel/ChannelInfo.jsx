import React from 'react';

const ChannelInfo = ({ channel }) => {
  const { tagline, channeltype, siteurl } = channel;
  return (
    <div>
      <p>{channeltype}</p>
      <a href={siteurl}>Hemsida</a>
      <p className='desc'>{tagline}</p>
    </div>
  );
};

export default ChannelInfo;
