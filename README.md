# AMADDA-server

아마따 애플리케이션 API 서버입니다.

#### 기간

**2019.12 ~ 2020.03**

## 개요

> 아마따(AMADDA)는 인천대학교 학우들을 위한 일정 공유 서비스입니다.

- 교내 시간표를 등록하고 그룹별 공유 기능
- 일정 숨기기
- 여러 그룹에 참여 가능

## 사용 기술

- `JavaScript`, `SQL`
- `Node.js`, `Express`
- `MariaDB`, `Oracle`
- `GCP`, `Windows Server 2012`

## 데이터베이스

> 5개의 테이블이 관계를 가지고 있습니다.

#### User

사용자를 저장한 테이블입니다.

| 순번 |  칼럼  |  칼럼 설명  | Null | 데이터 타입  |  초기값  | 제약조건 |
| :--: | :----: | :---------: | :--: | :----------: | :------: | :------: |
|  1   |   id   |    학번     |  N   | varchar(50)  |   없음   |    PK    |
|  2   |  name  |    이름     |  N   | varchar(50)  |   없음   |          |
|  3   | email  |   이메일    |  N   | varchar(50)  |   없음   |          |
|  4   |  path  | 이미지 경로 |  Y   | varchar(100) |   Null   |          |
|  5   | invite |  초대 유무  |  N   |   tinyint    | 1 (true) |          |

#### ShareGroupUser

공유 그룹에 속한 사용자를 저장하는 테이블입니다.

| 순번 | 칼럼  |  칼럼 설명  | Null | 데이터 타입 | 초기값 | 제약조건 |
| :--: | :---: | :---------: | :--: | :---------: | :----: | :------: |
|  1   | share |   방 열쇠   |  N   |     int     |  없음  |    FK    |
|  2   |  id   | 유저 아이디 |  N   | varchar(50) |  없음  |    FK    |

#### ShareGroup

공유 그룹의 정보를 저장한 테이블입니다.

| 순번 |    칼럼    | 칼럼 설명 | Null | 데이터 타입  |     초기값     | 제약조건 |
| :--: | :--------: | :-------: | :--: | :----------: | :------------: | :------: |
|  1   |   share    |  방 열쇠  |  N   |     int      | auto_increment |    PK    |
|  2   | group_name |  방 이름  |  N   | varchar(100) |      없음      |          |
|  3   |    memo    |   메모    |  Y   | varchar(255) |      Null      |          |

#### ShareGroupInvited

공유 그룹에 초대된 사용자가 저장되는 테이블입니다.

| 순번 | 칼럼  | 칼럼 설명 | Null | 데이터 타입 | 초기값 | 제약조건 |
| :--: | :---: | :-------: | :--: | :---------: | :----: | :------: |
|  1   |  id   |   학번    |  N   | varchar(50) |  없음  |    FK    |
|  2   | share |  방 열쇠  |  N   |     int     |  없음  |    FK    |

#### Schedule

개인 일정을 저장하는 테이블입니다. <br> 시간표는 모바일 저장소에 저장됩니다.

| 순번 |   칼럼   |  칼럼 설명  | Null | 데이터 타입  |     초기값     | 제약조건 |
| :--: | :------: | :---------: | :--: | :----------: | :------------: | :------: |
|  1   |  number  | 기본키 지정 |  N   |     int      | auto_increment |    PK    |
|  2   |    id    |   작성자    |  N   | varchar(50)  |      없음      |    FK    |
|  3   | schedule |    일정     |  N   | varchar(100) |      없음      |          |
|  4   |  start   |  일정 기간  |  N   | varchar(50)  |      없음      |          |
|  5   |   end    |  일정 기간  |  N   |   datetime   |      없음      |          |
|  6   | location |  일정 장소  |  Y   |   datetime   |      Null      |          |
|  7   |  alarm   |    알람     |  Y   |              |      Null      |          |
|  8   |  share   |  공유방 키  |  Y   |     int      |      Null      |    FK    |
|  9   |   memo   |  일정 설명  |  Y   | varchar(255) |      Null      |          |
|  10  |  hidden  | 일정 숨기기 |  N   |   tinyint    |   0 (false)    |          |

## API

- Content-Type : `application/json` or `application/x-www-form-urlencoded`
- 프로필 사진 업로드 : `multipart`
- 응답 JSON
    ```json
    {
        "success": boolean,
        "message": string,
        "data": any
    }
    ```

- 문서 (Postman)

  [API 문서](https://web.postman.co/workspace/My-Workspace~adef4ee6-7076-47c3-8080-a14fd6263266/documentation/10199648-2475efaf-5da9-4b9f-bccf-ffa53a630388)

- 통합 로그인 서버와 통신

## 아쉬운 점

1. 첫 데이터베이스 설계로서 생성, 수정 일자와 컬럼 명을 의미있게 명명하지 않았다.
2. 깃허브 브랜치 전략과 커밋 컨벤션을 정하지 않았다.
3. API 설계가 RESTful 하지 못했다.
4. 문서 정리..

## 기타

- [개발 일지](https://www.notion.so/inucalendar/record-870dddad541f40179f4ea551a4ad44ab)
