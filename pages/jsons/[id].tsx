import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import styles from "./test.module.css";

interface JsonProps {
  id: number;
  title: string;
  body: string;
  userId: number;
  rand: number;
}

const Json: NextPage<JsonProps> = ({ id, title, body, userId, rand }) => {
  const router = useRouter();

  const { isFallback } = router;
  // getStaticPaths의 fallback옵션이 true일 경우 사용 가능.
  // 해당 페이지가 생성(로딩)중일 경우 true, 아닐 경우 false

  return (
    <>
      <div className={styles.jsons}>title: {!isFallback ? title : "....."}</div>
      <div className={styles.jsons}>body: {!isFallback ? body : "....."}</div>
      <div className={styles.jsons}>rand:{!isFallback ? rand : "....."}</div>
    </>
  );
};

export default Json;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${params?.id}`
  );
  return {
    props: {
      ...data,
      rand: Math.random(),
    },
    // revalidate: 3, // 마지막 요청 이후 3초가 지나고 요청이 들어와야 다시 페이지 생성
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = ["1", "2", "3"];
  return {
    paths: ids.map((id) => {
      return {
        params: {
          id,
        },
      };
    }),
    fallback: true,
    /**
     * fallback
     *
     * true: 요청이 들어온 path가 생성되지 않았을 경우 빈 껍데기 페이지를 미리 보여주고
     *       해당 param으로 getStaticProps를 실행하여 정적 페이지 생성 후 client에 JSON을 전송함
     *       Shimmer, Skeleton 등등 로딩에 관한 ui를 표시할 수 있다.
     *       검색엔진에서는 blocking과 같이 동작한다.
     *       (그 후 의 동일한 요청은 생성된 html을 전송)
     *
     * blocking: 요청이 들어온 path가 생성되지 않았을 경우 빈 껍데기 페이지를 미리 보여주지 않고
     *        해당 param으로 getStaticProps를 실행하여 정적 페이지 생성 후 client에 HTML을 전송함
     *        (그 후 의 동일한 요청은 생성된 html을 전송)
     *
     * false: 요청이 들어온 path가 생성되지 않았을 경우 404 반환
     */
  };
};
