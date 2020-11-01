🔥

Server
======

개발 일지
---------

[📝 record (서버 개발 일지)](https://www.notion.so/record-870dddad541f40179f4ea551a4ad44ab)

function
========

* * * * *

#### User

|기능|명세|todo|비고|
|:---|:---|:---|:---|
|[회원가입](https://www.notion.so/42e6af2198c54a4fae0321a31161ff77)|앱센터 통합 웹에서 회원가입|||
|[회원탈퇴](https://www.notion.so/14b16a390b8c4441be79678606dba692)|아마따 탈퇴(관련된 모든 일정 삭제)||임시로 토큰만 받아서 탈퇴시킴(비밀번호 입력이 좋을 것 같음)|
|[로그인](https://www.notion.so/843fabea93064f1dac24d54e82d7c9f7)|자체 서버에서 앱에서 받아온 정보로 앱센터 서버로 로그인 후 토큰 반환||첫 로그인 시 아마따 가입과 학교 이메일 DB에 저장, 초대 허용으로|
|[프로필 보기](https://www.notion.so/1d2b17e1dfc045f78033947063cabef8)|개인정보 불러오기||토큰을 해독해서 인증 받음|
|[프로필 수정](https://www.notion.so/80b0747c56ef4b91a98d8fc937908fe6)|개인정보 수정하기||앱센 통합에서 프로필 수정과 일치 시켜야 할 듯|
|[비밀번호 변경](https://www.notion.so/72a33d88425f462bbd64e0caa743813f)|기존 비밀번호와 새로운 비밀번호를 요청 받아 수정||통합에 없어서 프로필 수정에 비밀번호만 변경해 요청할 예정|
|[프로필 사진 업로드](https://www.notion.so/f032eb91047145d2a9c40016fbbcac27)|프로필 사진 한 장만 업로드|||
|[프로필 사진 삭제](https://www.notion.so/89965e34d1b6419fa1ab62055deba0b5)|프로필 사진 삭제|||
|[프로필 사진 변경](https://www.notion.so/2a8bc96578ac41bc9dd1f86bec59939c)|기존 사진을 지우고 재 업로드|||
|[임시 비밀번호 발급](https://www.notion.so/64e1c533fc75483e8c2d4c341d779ca2)|비밀번호를 잊어버렸을 때 학교 포털 이메일로 임시 비밀번호를 발급|||

#### 인천대 전산원

|기능|명세|todo|비고|
|:---|:---|:---|:---|
|[학사 일정](https://www.notion.so/29536fb7323a413e9845c4e361e3abd6)|인천대 전산원을 통해 학사 일정을 가져옴|||
|[교내 전화번호](https://www.notion.so/16488f35f8ac48f8ad3d3db659ecee1b)||||
|[강의 검색](https://www.notion.so/f83403f72ca044dd81ac02da78494c58)|강의명 검색|||

#### Schedule

|기능|명세|todo|비고|
|:---|:---|:---|:---|
|[일정 추가](https://www.notion.so/8d0589fdb9264d21ba395b7ba57773e7)|개인 일정 또는 공유 일정 추가||start end 비교 완료 (중복 처리 빼겠음)|
|[일정 삭제](https://www.notion.so/646ba66938d446d68d971f4eddea0761)|개인 일정 또는 공유 일정 삭제|||
|[일정 세부사항](https://www.notion.so/a8ab4e7f90124f1aa8386fcea0ac0a7a)|일정을 상세하게 보기|||
|[일정 수정](https://www.notion.so/2062d2d847664a659e05c64eb99d68e2)|작성한 일정 수정||시간 관련 데이터는 수정 불가|
|[오늘 일정(내가 쓴 일정)](https://www.notion.so/26a3cce1ef394d63a4ea7e9403d73b58)|오늘 내가 작성한 일정 보기||보류|
|[오늘 일정(공유가 포함된 일정)](https://www.notion.so/1065f839219f40cca09f12de06cda834)|오늘 일정 모두 보기||보류|
|[이번 주 일정(내가 쓴 일정)](https://www.notion.so/801cbbb0f04a4e0abc7085fc2870ffdb)|이번 주 내가 작성한 일정만 보기||보류|
|[이번 주 일정(공유가 포함된 일정)](https://www.notion.so/f4723920e77440b2b63000ec0f47dcc0)|이번 주 일정 모두 보기||보류|
|[이번 달 일정(내가 쓴 일정)](https://www.notion.so/f75cf1e40ae74f03949c14c642cb3475)|이번 달 내가 작성한 일정만 보기||보류|
|[이번 달 일정(공유가 포함된 일정)](https://www.notion.so/2c50371010104e27974bfa60c79a7b3e)|이번 달 일정 모두 보기||보류|
|[모든 일정(내가 쓴 일정)](https://www.notion.so/0ea07eeb6f0541b0b9a73613f6a4cc7c)|내가 작성한 일정들만 보기||보류|
|[모든 일정(공유가 포함된 일정)](https://www.notion.so/2c6f31428cfa4ac386d0131d69a962cb)|내가 작성한 일정과 내가 속해있는 모든 그룹의 일정들 보기|||
|[하루 일정 보기](https://www.notion.so/5788555bac39424d925951f46adff46d)|원하는 날짜의 일정 보기|||
|[주간 일정 보기](https://www.notion.so/2860ace68a43489598d0a5171666418e)|원하는 주간의 일정 보기|||
|[월간 일정 보기](https://www.notion.so/3d5b1c23874f4539badb1fa5a184faf6)|원하는 달의 일정 보기|||
|[그룹 일정 보기](https://www.notion.so/75d8d0d5592647cabad172c46fefe35a)|원하는 그룹의 일정 보기|||
|[모든 일정 보기](https://www.notion.so/f5a7cc2a349047c28d896d914037e65f)|내가 작성한 일정, 내가 속해있는 그룹의 일정을 날짜 순으로 보기|||

#### Share

|기능|명세|todo|비고|
|:---|:---|:---|:---|
|[그룹 생성](https://www.notion.so/91706c9e07494a3c9eeffa5f3166c856)|생성자가 그룹의 메모와 초대를 가능하게 하고 학번으로 초대하며 아마따에 가입 안된 학번은 초대 불가||리스트 받아서 초대 보내기, 푸시알림, 중복 초대 막기|
|[그룹 나가기](https://www.notion.so/3d7798552bf64f9b8d91cad26b4649a6)|사용자가 속해있는 그룹에서 나가고, 그룹에 남은 인원이 없다면 그룹 삭제|||
|[초대 허용 또는 거절](https://www.notion.so/53b59e449c584a378097cb2ca455f185)|초대 허용 또는 거절||푸시알림을 거절하는건지 초대를 거절하는건지?|
|[나의 그룹 보기](https://www.notion.so/aef856302c9445a4a096208a11cfc39b)|사용자가 속해있는 그룹들 가져오기|||
|[초대할 유저 검색](https://www.notion.so/6052bf02ee014b9b8e4c8f98cd093fcd)|학번을 통해 아마따 회원 테이블에서 검색|||
|[그룹 초대](https://www.notion.so/ca0e00ebf48d450ab63ee96f0b351726)|~~이미 만들어진 그룹에 초대하기~~||~~중복 초대 막기~~|
|[그룹 인원 보기](https://www.notion.so/840959b17a7e439a9188612ed4e8bb36)|같은 그룹의 인원 보기|||
|[초대 확인하기](https://www.notion.so/7c3715f9ed3a4f88afa17dc178ea5489)|나에게 초대온 그룹과 초대자 확인하기||소켓 통신? http? 일단 http 통신으로 했음. 새로고침 버튼이 필요할 것 같음|
|[초대 거절](https://www.notion.so/23a4dcaa111f447ebafa8d72adddda90)|초대 DB 삭제||없는 초대장을 거절했을 때 성공하는 이슈|
|[초대 수락](https://www.notion.so/e5d8f00883ef4870b68cfa05634250f5)|그룹유저 테이블에 초대 받은 유저 추가|||

#### AppConfig

|기능|명세|todo|비고|
|:---|:---|:---|:---|
|[사이드 메뉴? 앱 구성?](https://www.notion.so/fa1e20854be241e7b117eed7316d8011)|로그인 후 사이드 메뉴 구성 정보(내 정보)|||

Database
========

* * * * *

-   MariaDB 사용 (google cloud server)

-   OracleDB 사용 (인천대 전산원 server) → 교내 강의 정보 테이블 이용

#### User

|순번|칼럼 명|칼럼 설명|Null 가능|데이터 타입(크기)|초기값|제약조건|
|:---|:------|:--------|:--------|:----------------|:-----|:-------|
|[1](https://www.notion.so/1-66b60f5ecdd2407691ebb57b7ab6340b)|id|학번|N|varchar(50)|없음|PK|
|[2](https://www.notion.so/2-1e85307994d44bf1b28e9c6a98182e25)|name|이름|N|varchar(50)|없음||
|[3](https://www.notion.so/3-fe5e4ec096894140ae5bc3497ec0ca22)|email|이메일|N|varchar(50)|없음||
|[4](https://www.notion.so/4-edd3d6d8546d451ab808536e3c7e903d)|path|이미지 경로|Y|varchar(100)|Null||
|[5](https://www.notion.so/5-8ff84962c6b74878a14bcbe4ed62bee2)|invite|초대 유무|N|tinyint|1 (true)||

#### Schedule

|순번|칼럼 명|칼럼 설명|Null 가능|데이터 타입(크기)|초기값|제약조건|
|:---|:------|:--------|:--------|:----------------|:-----|:-------|
|[1](https://www.notion.so/1-9638c0f8ef9b400386ccc6c922a49226)|number|기본키 지정|N|int|auto\_increment|PK|
|[2](https://www.notion.so/2-0f104c8ff3f9417492efdce91a6cb908)|id|작성자|N|varchar(50)|없음|FK\_calendar\_user|
|[3](https://www.notion.so/3-0c0e282ba6474a4a9b157d69db55f14f)|schedule|일정|N|varchar(100)|없음||
|[4](https://www.notion.so/4-25876f0421c74d83a5326773e977796a)|start|일정 기간|N|varchar(50)|없음||
|[5](https://www.notion.so/5-cbcf3fb776d54defadf3748c8c33fba4)|end|일정 기간|N|datetime|없음||
|[6](https://www.notion.so/6-1c8264e81cd745a5a96355fd9cce9441)|location|일정 장소|Y|datetime|Null||
|[7](https://www.notion.so/7-9e541a7ecc184b8eb62013b2c69dcd15)|alarm|알람|Y||Null||
|[8](https://www.notion.so/8-9af68330807745998567bd351c483f47)|share|공유방 키|Y|int|Null|FK\_calendar\_share\_room|
|[9](https://www.notion.so/9-c98a8e4837a041489cf285d29fcf650d)|memo|일정 설명|Y|varchar(255)|Null||
|[10](https://www.notion.so/10-8892a8aab9344f21a42e2b6453e4c0aa)|hidden|일정 숨기기|N|tinyint|0 (false)||

#### ShareGroup

|순번|칼럼 명|칼럼 설명|Null 가능|데이터 타입(크기)|초기값|제약조건|
|:---|:------|:--------|:--------|:----------------|:-----|:-------|
|[1](https://www.notion.so/1-790c564d7a764b67b93eb1e5b7c6b262)|share|방 열쇠|N|int|auto\_increment|PK|
|[2](https://www.notion.so/2-fea75a26779444c58a3eec556eabd940)|group\_name|방 이름|N|varchar(100)|없음||
|[3](https://www.notion.so/3-105479e16281424b9b3df54a13beca37)|memo|메모|Y|varchar(255)|Null||

#### ShareGroupInvited

|순번|칼럼 명|칼럼 설명|Null 가능|데이터 타입(크기)|초기값|제약조건|
|:---|:------|:--------|:--------|:----------------|:-----|:-------|
|[1](https://www.notion.so/1-1c37d89560fa46d39d3cd2f05ea150f2)|id|학번|N|varchar(50)|없음|FK|
|[2](https://www.notion.so/2-df8047df350345d09d121b41021cea67)|share|방 열쇠|N|int|없음|FK|

#### ShareGroupUser

|순번|칼럼 명|칼럼 설명|Null 가능|데이터 타입(크기)|초기값|제약조건|
|:---|:------|:--------|:--------|:----------------|:-----|:-------|
|[1](https://www.notion.so/1-66700475f884496fa5fd9cf5d2c1ccdd)|share|방 열쇠|N|int|없음|FK\_share\_group\_user\_share\_group\_share|
|[2](https://www.notion.so/2-01ddd0524761413782224d0bb83abde2)|id|유저 아이디|N|varchar(50)|없음|FK\_share\_room\_user\_user|

API
===

* * * * *

-   HOST\_DOMAIN : [http://117.16.191.242:7005](http://117.16.191.242:7005/)

-   Content-Type : "application/json" or "application/x-www-form-urlencoded"

-   프로필 사진 업로드 : multipart

``` {#7aba0bec-f738-4dc4-862e-db3fbc45943b .code}
{
    "success": boolean // true 면 정상 반환, false 면 비정상 반환
    "message" : string // false 라면 메세지 확인 후 말씀 부탁.
    <data> : any // default -> data:null
}
```

#### USER URI

|기능|메서드|URI|request.headers|request.params|request.body|response.headers|response.body|비고|
|:---|:-----|:--|:--------------|:-------------|:-----------|:---------------|:------------|:---|
|[로그인](https://www.notion.so/55a8196e9f034036920300d248f4b3c1)|POST|/user/login|||id\<str\>passwd\<str\>|token\<str\>|message\<str\>success\<bool\>||
|[프로필 정보 보기](https://www.notion.so/94c9f8454a5e4430ac9929c778cb1449)|POST|/user/account|token\<str\>||||message\<str\>success\<bool\>user\<obj\>|user = {id,tel,major,name, ...}|
|[프로필 수정(잠시 보류)](https://www.notion.so/c710382e60fb481e843df0a4ec1d2cef)|PUT||||id\<str\>major\<str\>name\<str\>tell\<str\>||message\<str\>success\<bool\>||
|[임시 비밀번호 발급](https://www.notion.so/7816c025a04a4a0a98ead87a3feb130b)|POST|/user/tmpPasswd|||id\<str\>name\<str\>||message\<str\>success\<bool\>||
|[비밀번호 수정](https://www.notion.so/84127ad778844726a69438de684cda03)|PUT|/user/passwd|token\<str\>||newPasswd\<str\>passwd\<str\>||message\<str\>success\<bool\>||
|[프로필 이미지 업로드와 수정](https://www.notion.so/30aa490b283c4422abb036f925f549d7)|POST|/image|token\<str\>||user\_image\<file\>||message\<str\>success\<bool\>|프로필 사진 업로드(png, jpg, jpeg, bmp)|
|[프로필 이미지 삭제](https://www.notion.so/740f30238b9d41a18b9a761e83d7286f)|DELETE|/image|token\<str\>||||message\<str\>success\<bool\>||
|[회원 탈퇴](https://www.notion.so/3a0a50b2695541d2bcdfeec06b7de614)|DELETE|/user/secession|token\<str\>||||message\<str\>success\<bool\>||
|[프로필 사진 보기](https://www.notion.so/3cf77e6b1d1b45dd883002a450c81c9f)|GET|/user/image|token\<str\>||||message\<str\>path\<str\>success\<bool\>|이미지가 없다면 path는 null|

#### SCHEDULE URI

|기능|메서드|URI|request.headers|request.params|request.body|response.headers|response.body|비고|
|:---|:-----|:--|:--------------|:-------------|:-----------|:---------------|:------------|:---|
|[일정 추가(개인, 공유)](https://www.notion.so/1f567493af9b4ea3a57826b592f1cd09)|POST|/schedule/add|token\<str\>||alarm\<str\>end\<str\>hidden\<tinyint\>location\<str\>memo\<str\>schedule\_name\<str\>share\<int\>start\<str\>||message\<str\>success\<bool\>|tinyint → 0 또는 1|
|[일정 보기(세부 사항)](https://www.notion.so/ee6436c688054d74903cbb7c0a039e45)|GET|/schedule/detail|token\<str\>|num\<int\>|||message\<str\>schedule\<obj\>success\<bool\>|schedule={number,id,schedule\_name,start,end,location,alarm,key,memo}|
|[일정 수정](https://www.notion.so/9e3ef76338a041189b3203288f78223a)|PUT|schedule/modify|token\<str\>||alarm\<str\>end\<str\>hidden\<tinyint\>location\<str\>memo\<str\>number\<int\>schedule\_name\<str\>share\<int\>start\<str\>||message\<str\>success\<bool\>||
|[일정 삭제](https://www.notion.so/05dd9d94e13c431b9149d4a8b726281f)|DELETE|/schedule/delete|token\<str\>||number\<int\>||message\<str\>success\<bool\>||
|[하루 일정 보기](https://www.notion.so/e092742d21f04ebfac9aa9a3aebdf026)|GET|/schedule/show/day|token\<str\>|date\<date\>||||date → ex) 2020-03-20|
|[주간 일정 보기](https://www.notion.so/4d8b6cd7d8c4428b9a84a5f7ef34c2c9)|GET|/schedule/show/week|token\<str\>|date\<date\>||||date → ex) 2020-03-20 (날짜가 포함된 주간 일정 조회) 디자인에 주간 조회는 당일 포함 이번 주 밖에 없으므로 보류.|
|[월간 일정 보기](https://www.notion.so/b38956d3a84145a48784956cea9cf607)|GET|/schedule/show/month|token\<str\>|date\<date\>||||date → ex) 2020-04 (YYYY-MM format)|
|[전체 일정 보기](https://www.notion.so/75028be4519a4acc82d3dd2c99f73b78)|GET|/schedule/show/all|token\<str\>||||message\<str\>schedules\<arr\>success\<bool\>||
|[그룹 일정 보기](https://www.notion.so/79c6d0eda2a14e48acf391674efdb1b0)|GET|/schedule/show/group|token\<str\>|share\<int\>|||message\<str\>schedules\<arr\>success\<bool\>||
|[개인 일정 보기](https://www.notion.so/3d1adaf7cf0642bb98405fcf5c358ee3)|GET|/schedule/show/me|token\<str\>||||message\<str\>schedules\<arr\>success\<bool\>||

#### SHARE

|기능|메서드|URI|request.headers|request.params|request.body|response.headers|response.body|비고|
|:---|:-----|:--|:--------------|:-------------|:-----------|:---------------|:------------|:---|
|[그룹 생성](https://www.notion.so/976d9428608349198f0b0a2453ef3213)|POST|/share/group/create|token\<str\>||group\_name\<str\>list\<arr\>memo\<str\>||message\<str\>share\<int\>success\<bool\>|list = ['201401535", "201601594", ...], 없다면 빈 배열이라도 보내줘야됨|
|[초대 허용 또는 거부](https://www.notion.so/36ad884ac29c4180a22017cceebd549e)|POST|/share/invite/user/flag|token\<str\>||flag\<int\>||message\<str\>success\<bool\>||
|[초대할 유저 검색](https://www.notion.so/0b048d7647f54ba9a5fec644ab0ebc92)|GET|/share/invite/users/search|token\<str\>|user\<str\>|||message\<str\>success\<bool\>users\<obj\>|users=[{id,name,path}, ...]|
|[내가 속해있는 그룹 가져오기](https://www.notion.so/0a741c321098405dbb189680088ed462)|GET|/share/groups/show|token\<str\>||||groups\<arr\>message\<str\>success\<bool\>|groups=[group, group, ...] group={share, group\_name, memo}|
|[그룹 나가기](https://www.notion.so/769951f103fa483292f220a4566454f4)|DELETE|/share/group/escape|token\<str\>||share\<int\>||message\<str\>success\<bool\>||
|[그룹 구성원 보기](https://www.notion.so/7601edfc9b1d4c28a18bca87a0c997c7)|GET|/share/group/member|token\<str\>|share\<int\>|||members\<arr\>message\<str\>success\<bool\>|members=[member, member, ...] memver={id, name, path}|
|[초대 확인하기](https://www.notion.so/23eab10359d845fc8f3c8b67b0c8b92e)|GET|/share/invitations/show|token\<str\>||||invitations\<arr\>message\<str\>success\<bool\>|invitations=[{}]|
|[초대 거절](https://www.notion.so/538677b21afa4e3ebc95caac0b3d31ca)|DELETE|/share/invitations/group|token\<str\>||share\<int\>||message\<str\>success\<bool\>||
|[초대 수락](https://www.notion.so/997680bd9d98410ab14957238ae21501)|POST|/share/invitations/group|token\<str\>||share\<int\>||message\<str\>success\<bool\>||

#### 기타 등등

|기능|메서드|URI|request.headers|쿼리스트링|request.body|response.headers|response.body|비고|
|:---|:-----|:--|:--------------|:---------|:-----------|:---------------|:------------|:---|
|[사이드바 구성](https://www.notion.so/7afb791a742f4c50bb64c3259d3f89fb)|GET|/appconfig/sidebar|token\<str\>||||message\<str\>sidebar\<obj\>success\<bool\>|sidebar={name,major,path} 공유 그룹은 따로|
|[강의 검색](https://www.notion.so/3ae6cdab849b45a3ac84c2e4921832c4)|GET|/time/table/search|token\<str\>|name\<str\>|||message\<str\>subjects\<arr\>success\<bool\>|subjects = [ subject\<obj\>, ... ] subject={lecture, professor, day, start, end, room}|
|[통합 로그인 서버 회원가입 뷰](https://www.notion.so/9a09e14e8cd94da2984aef564ecbae6f)|GET|http://117.16.191.242:7003/signup||||||다른 프로젝트에서 이미 이전 api 로 구현해둬서 따로 라우팅해서 구현해야 될 것 같습니다.. 기다려주세요|

etc
===

* * * * *

-   앱센터 통합 서버 api

[](https://documenter.getpostman.com/view/70398/S1M3uQSL?version=latest)

INU AppCenter Account Server

inu appcenter에서 관리하는 학생정보 관리 프로그램입니다.

![](https://documenter.getpostman.com/favicon.ico)https://documenter.getpostman.com/view/70398/S1M3uQSL?version=latest

![](https://res.cloudinary.com/postman/image/upload/w_152,h_56,c_fit,f_auto,t_team_logo/v1/team/768118b36f06c94b0306958b980558e6915839447e859fe16906e29d683976f0)


