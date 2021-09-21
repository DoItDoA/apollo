import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      isLiked: () => false, // 디폴트로 false값, 리턴이 되어야하기 때문에 함수방식으로 작성
    },
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        // 입력인자 입력방식은 graphql과 같다, 첫번째 인자는 루트
        // console.log(cache); 해보기
        cache.modify({
          id: `Movie:${id}`,
          fields: {
            isLiked: () => !isLiked,
          },
        }); // cache를 이용하여 수정하기. id: type:typeID 쓰고 fields에 수정할 내용을 작성, 리턴이 되어야하기 때문에 함수방식으로 작성
      },
    },
  },
}); // uri: graphql 서버를 가리키는 기본 페이지 (여기서는 movieql을 사용),cache: 캐시정보를 저장하기위한 인스턴스 생성
//graphql의 type(Movie)을 이용하여 isLiked를 추가(graphql에 직접적으로 추가되는것이 아니다 즉, 이 데이터는 프론트에서 프론트로 불러진다)
export default client;
