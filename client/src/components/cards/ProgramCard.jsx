import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { StyledCard } from '../../styles/cards';
const ProgramCard = ({ program }) => {
  const { programimage, name } = program;

  const history = useHistory();
  const { pathname } = history.location;

  const goToProgram = () => {
    history.push('/program/' + program.id);
  };

  return (
    <StyledCard onClick={goToProgram}>
      <div className='img'>
        {programimage ? <img src={programimage} alt={name} /> : <h3>{name}</h3>}
      </div>
      <p>{name}</p>
    </StyledCard>
  );
};

export default ProgramCard;
