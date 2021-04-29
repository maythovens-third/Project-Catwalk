import React, { useState, useEffect} from 'react';
import styled from 'styled-components';

const StylesDiv = styled.div`
  border: 5px solid yellow;
  position: relative;
  height:33%;
  display:flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const CirclesContainer = styled.div`
  position: relative;
  height:50%;
  display:flex;
  flex-wrap: wrap;
  box-sizing: border-box;
`

const Circles = styled.input`
   border-radius: 50%;
   border:1px solid grey;
   height:75%;
   width:15%;
   margin:10px;
   overflow: hidden;
   object-fit: cover;
`

const StyleTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  text-transform: uppercase;
`

const SelectedStyleTitle = styled.span`
  font-size: 18px;
  text-transform: uppercase;
`


function Styles({ styles, id, onStyleChange }) {
  return (
    <StylesDiv>
      <StyleTitle>
        Style >
        <SelectedStyleTitle>
          Selected Style
        </SelectedStyleTitle>
      </StyleTitle>

      <CirclesContainer>
        {
          styles.map((style, index) => {
            return <Circles
                type="image"
                src={style.photos[0].thumbnail_url}
                onClick={() => onStyleChange(style.style_id)}
                key={index}
              />
          })
        }
      </CirclesContainer>
    </StylesDiv>
  );
}

export default Styles;