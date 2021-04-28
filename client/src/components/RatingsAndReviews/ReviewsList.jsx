import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Reviews from './Reviews.jsx';
import config from '../../../../config';
import AddReview from './AddReview.jsx';
import { Headers2, SectionBG1, Button } from '../../css/sharedcss.jsx';

const HelpfulDiv = styled.div`
float: left;
display: flex;
padding-right: 20%;
`;

const MoreReviewsButton = styled(Button)`
${(props) => {
    if (props.reachedEnd) {
      return `
      visibility: hidden;
    `;
    }
    return `
    visibility: normal;
  `;
  }}
`;

const ReviewsList = ({ productID }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewsShown, setReviewsShown] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentList, setCurrentList] = useState(1);
  const [reviewsPerPress] = useState(2);
  const [reviewsPerPage, setReviewsPerPage] = useState(2);

  useEffect(() => {
    setLoading(true);
    axios('https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews/', {
      headers: config,
      params: { product_id: productID },
    })
      .then((list) => {
        setReviews(list.data.results);
        setReviewsShown(list.data.results.slice(0, reviewsPerPress));
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  // 'Add more' button click handler increments currentList
  const onAddMoreClick = () => {
    setReviewsPerPage(reviewsPerPage + 2);
  };

  // Get current reviews
  const indexOfLastReview = currentList * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <SectionBG1>
      <Reviews reviews={currentReviews} loading={loading} />
      <HelpfulDiv>
        <Button onClick={onAddMoreClick}>More Reviews </Button>
        <AddReview />
      </HelpfulDiv>
    </SectionBG1>
  );
};

export default ReviewsList;
