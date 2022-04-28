/**
 * 이 파일은 서버사이드에서만 렌더링 되며
 * 프로젝트에 이 파일을 생성하면 오버라이드 됨
 *
 * - 페이지별 커스텀이 필요 없는 공통 사항들을 설정하는 파일이다.
 *      예) 폰트의 경우 공통 사항이기 때문에 여기서 불러옴.
 * - 서버사이드에서 한번만 렌더링 된다.
 * - 서버사이드에서만 렌더링 되기 때문에 비즈니스 로직, JS를 사용한 CSS 처리는 불가
 *
 * _app.tsx 와의 차이점
 * _app.tsx 는 공통사항을 설정할수 있는 것에는 동일하지만 페이지가 바뀔때마다 실행되기 때문에
 * 공통적인 메타태그, 폰트 등등의 설정을 하게 되면 불필요하게 여러번 실행되기 때문에 비효율적
 */

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
