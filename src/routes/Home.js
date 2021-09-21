import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react/hooks";
import styled from "styled-components";
import Movie from "../components/Movie";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const Subtitle = styled.h3`
  font-size: 35px;
`;
const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;
const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`;

const GET_MOVIES = gql`
  {
    movies {
      medium_cover_image
      id
      isLiked @client
    }
  }
`; // graphql에 불러올 데이터들을 설정한다, isLiked는 백엔드에 등록이 안되어있어 teleGraphql을 이용하여 isLiked가 apollo.js의 client에 있다고 알린다
function Home() {
  const { loading, data } = useQuery(GET_MOVIES); // 설정한 데이터들을 호출
  return (
    <Container>
      <Header>
        <Title>Apollo</Title>
        <Subtitle>I love GraphQL</Subtitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      <Movies>
        {data?.movies?.map((m) => (
          <Movie
            key={m.id}
            id={m.id}
            isLiked={m.isLiked}
            bg={m.medium_cover_image}
          />
        ))}
      </Movies>
    </Container>
  );
}
export default Home;