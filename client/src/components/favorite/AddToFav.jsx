import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorite,
  getFavorites,
  removeFromFavorite,
  selectUser,
  selectUserFavorites,
} from '../../slices/user/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

const AddToFav = ({ type, typeId }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectUserFavorites);
  const user = useSelector(selectUser);
  const [isLicked, setIsLicked] = useState();
  // check if liked
  let favs;
  const checkIfLiked = () => {
    if (favorites) {
      if (type === 'favoriteChannels') {
        favs = favorites.channels
          ?.map((f) => f.id)
          .includes(parseInt(typeId.channelId));
      }
      if (type === 'favoritePrograms') {
        favs = favorites.programs
          ?.map((f) => f.id)
          .includes(parseInt(typeId.programId));
      }
      if (type === 'favoriteEpisodes') {
        favs = favorites.episodes
          ?.map((f) => f.id)
          .includes(parseInt(typeId.episodeId));
      }
    }
    if (favs) {
      setIsLicked(true);
    }
  };
  useEffect(() => {
    checkIfLiked();
    dispatch(getFavorites());
  }, []);
  // if (favs) setIsLicked(true);
  const handleLike = () => {
    dispatch(addToFavorite({ type, typeId }));
    dispatch(getFavorites());
    setIsLicked(true);
    // checkIfLiked();
  };

  const handleUnlike = () => {
    dispatch(removeFromFavorite({ type, typeId }));
    dispatch(getFavorites());
    setIsLicked(false);
  };

  return (
    <div>
      {user ? (
        <>
          {isLicked ? (
            <>
              {/* <h1 onClick={handleUnlike}>unlike</h1> */}
              <FontAwesomeIcon
                icon={faHeart}
                size='3x'
                color='#86e3f3'
                onClick={handleUnlike}
              />
            </>
          ) : (
            <FontAwesomeIcon
              icon={farHeart}
              size={20}
              size='3x'
              color='#da9efd'
              onClick={handleLike}
            />
            // <h1 onClick={handleLike}>Like</h1>
          )}
        </>
      ) : (
        <StyledBtn>
          {' '}
          <FontAwesomeIcon
            icon={farHeart}
            size={20}
            size='3x'
            color='#da9efd'
          />
        </StyledBtn>
      )}
    </div>
  );
};

export default AddToFav;
const StyledBtn = styled.div``;
