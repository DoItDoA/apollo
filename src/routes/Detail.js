import React from "react";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      medium_cover_image
    }
  }
`; // 입력인자가 있을 경우에는 query 쿼리명(입력변수:타입!)를 작성(이 부분은 Apollo를 위한 것)하고 안에 graphQL쿼리문 쓴다
// movie에 id데이터를 불러오는 이유는 home의 id데이터들과 연동하기 위해서이다. 즉 home에서 좋아요를 누르면 detail의 id가 연결되어있어 좋아요 정보를 그대로 이어 받는다
const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Suggestion = styled.div`
  width: 25%;
  height: 25%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;
function Detail() {
  const { id } = useParams(); // App.js의 Route ':id'값을 가져온다
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  }); // 입력변수에 값 넣기

  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? "Loading..."
            : `${data.movie.title} ${data.movie.isLiked ? "💖" : "😞"}`}
        </Title>
        <Subtitle>
          {data?.movie?.language} · {data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image} />
    </Container>
  );
}
export default Detail;
// suggestion 이용하여 작성해보기
