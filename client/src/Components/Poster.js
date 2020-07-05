import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import Axios from "axios";
const Container = styled.div`
  font-size: 12px;
`;
const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});

  width: 200px;

  height: 300px;

  margin-right: 20px;

  background-size: cover;

  border-radius: 4px;

  transition: all 0.1s linear 0s;
`;
const Rating = styled.span`
  bottom: 5px;

  right: 5px;

  position: absolute;

  opacity: 0;

  transition: opacity 0.1s linear;
`;
const ImageContainer = styled.div`
  margin-bottom: 5px;

  position: relative;

  &:hover {
    ${Image} {
      opacity: 0.3;
    }

    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled.span`
  display: block;

  margin-bottom: 3px;
`;
const Year = styled.span`
  font-size: 10px;

  color: rgba(255, 255, 255, 0.5);
`;

const LikeButton = styled.button`
  display: inline-block;
  height: 30px;
  padding: 0px 0px 2px 2px;
  color: white;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  line-height: 5px;
  letter-spacing: 0.1rem;
  white-space: nowrap;
  background-color: transparent;
  border-radius:5px;
  border: 1px solid #bbb;
  box-sizing: border-box;
`;



const Poster = (props) => {
  const { id, imageUrl, title, rating, year, isMovie = false } = props;
  const dispatch = useDispatch();
  
  const onClickHandler = ()=>{
    
    dispatch(auth())
    .then( response => {
      if(!response.payload.isAuth){
        alert('로그인이 필요합니다')
        props.history.push('/sign-in');
      } else {

        let body = {
          imageUrl,
          email:response.payload.email,
        }
        console.log(body)
        console.log(typeof body.imageUrl)
        Axios.post('/api/users/likes', body)
        .then(response => response.data)

        console.log(response)
      }
    }
    ) 
  }
  return (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image bgUrl={`https://image.tmdb.org/t/p/w300${imageUrl}`} />
        <Rating>
          <span role="img" aria-label="rating">
            ⭐️
          </span>{" "}
          {rating}/10
        </Rating>
        <LikeButton onClick={onClickHandler}>+</LikeButton>
      </ImageContainer>
      <Title>
        {title.length > 18 ? `${title.substring(0, 18)}...` : title}
      </Title>
      <Year>{year}</Year>
    </Container>
  </Link>
)};
Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
};
export default withRouter(Poster);
