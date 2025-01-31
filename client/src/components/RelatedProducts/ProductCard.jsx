import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import StarRating from '../RatingsAndReviews/StarRating.jsx';
import config from '../../../../config';
import axios from 'axios';

const ProductCardDiv = styled.div`
  border: 3px solid grey;
  border-radius: 10px;
  width: 210px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: normal;
  align-items: center;
  margin:10px;
  box-shadow: 2px 10px 12px rgba(0,0,0,0.5);
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.5s;
`;

const ProductCategoryDiv = styled.div`
  //border: 3px solid blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3px;
`;

const ThumbnailDiv = styled.div`
  //border: 3px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const Details_Div = styled.div`
  //border: 3px solid teal;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  align-self: stretch;
  padding-left: 3px;
`;

const ProductName_Div = styled.div`
  //border: 3px solid purple;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
`;

const ProductPrice_Div = styled.div`
  //border: 3px solid yellow;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const Category = styled.span`
  font-size: 16px;
`;

const Price = styled.span`
  font-size: 14px;
`;

const ProductThumbnail = styled.img`
  display: flex;
  flex-direction: column;
  align-items: center;
  object-fit: cover;
  width: 200px;
  height: 200px;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

const StarButton = styled.button`
  display: flex;
  position:absolute;
  background:transparent;
  padding-left:150px;
  font-size:25px;
  font-weight:bold;
  cursor: pointer;
  overflow: hidden;
  color: #ffbc0b;
`;

const Rating_Div = styled.div`
  padding-top: 3px;
`;


const ProductCard = ({ id, category, name, price, style = {}, clickHandler, average, addStar, styleData}) => {

  const [starRating, setstarRating] = useState(0);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews/',
      headers: config,
      params: { product_id: id },
    })
      .then((resp) => {
        const { count } = resp.data;
        let tempRating = 0;
        resp.data.results.map((review) => {
          tempRating += (review.rating);
        });
        tempRating /= count;
        setstarRating(tempRating);
      })
    }
  )

  const getPicture = (results = []) => {
    for (var result of results ) {
      if (result.['default?'] === true) {
        return get(result, 'photos[0].thumbnail_url');
      }
    }

    return get(results, '[0].photos[0].thumbnail_url');
  };

  return(
    <ProductCardDiv >
      <ThumbnailDiv>
        <ProductThumbnail src={getPicture(style.results)} onClick={() => {
          clickHandler(id);
         }}/>
        <StarButton onClick={()=>{addStar([style.results[0]]);}}>☆</StarButton>
      </ThumbnailDiv>
      <Details_Div>
        <ProductCategoryDiv>
          <Category>{category}</Category>
        </ProductCategoryDiv>
        <ProductName_Div>
          <Name>{name}</Name>
        </ProductName_Div>
        <ProductPrice_Div>
          <Price>{price}</Price>
        </ProductPrice_Div>
        <StarRating stars={starRating} />
      </Details_Div>
    </ProductCardDiv>
  )
}

export default ProductCard;