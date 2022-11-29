MVC 패턴을 사용하려고 노력했습니다.

# API 사용법 (Localhost 기준)

## ERD

![스크린샷 2022-11-29 오후 10 11 09](https://user-images.githubusercontent.com/77596160/204538128-89f76921-2e58-4db8-865f-3214bd6100ea.png)

## Student

### Create

URL : POST http://localhost:3000/student/create
<br>
Body : {
"email":"원하는 이메일",
"nickname":"원하는 닉네임"
}

### READ (Find One)

URL : GET http://localhost:3000/student?id={검색하고싶은 학생 ID}
<br>
Query Params 사용.

### DELETE

URL : DELETE http://localhost:3000/student
<br>
Body : {
"id":"삭제하고싶은 학생 ID",
}

### CREATE(ENROLMENT 강의 등록)

URL : POST http://localhost:3000/student/enrolment
<br>
Body : {
"data":[  
{. 
"course_id" : "강의 ID",
"student_id" : "학생 ID".
},  
{  
"course_id" : "강의 ID",  
"student_id" : "학생 ID". 
}. 
]. 
}. 
<br>
등록할 강의를 배열로 입력받아 작동. 

## Student

### CREATE

URL : POST http://localhost:3000/course/create
<br>
Body : {
"name":"강의 이름",
"description":"강의 설명",
"price":"강의료",
"category":"강의 카테고리",
"teacher":"강사의 ID"
}

### UPDATE (강의 공개 상태 관리)

URL : POST http://localhost:3000/course/create
<br>
Body : {
"id":"공개하고 싶은 강의 ID",
}

### UPDATE

URL : POST http://localhost:3000/course/create
<br>
Body : {
"id":"업데이트 하고 싶은 강의 ID",
"name":"변경 할 강의 이름",
"description":"변경할 강의 설명",
"price":"변경 할 강의료"
}

name, desc, price 각각 원하는 부분만 수정 가능.

### DELETE

URL : POST http://localhost:3000/course/create
<br>
Body : {
"id":"삭제하고싶은 강의 ID",
}

강의를 수강중인 학생이 있다면 삭제되지 않음.

### READ (FindOne)

URL : GET http://localhost:3000/course?id={검색하고 싶은 강의 ID}
<br>
Query Params 사용.

### READ (Find)

URL : http://localhost:3000/course/list?{정해진 query params}
<br>
Query Params 사용.
<br>

- 조건 : Query Params중 teacher, course, student_id 는 셋중 하나만 입력해야 합니다. (중복 입력시 에러 메세지 출력)

<br>
teacher : 강사명으로 검색
<br>
course : 강의명으로 검색
<br>
student_id : 학생 ID로 검색
<br>
page_count : 페이지에 최대 item 갯수 default=5
<br>
category : 카테고리 필터링 (웹/앱/게임/알고리즘/인프라/데이터베이스) // validation 처리를 마무리 하지 못했습니다.
<br>
page_number : 보고자 하는 page 번호 (입력하지 않을 시 첫번째 페이지 노출)
<br>
<br>

초기 테이블 생성시 3명의 강사가 생성되도록 했습니다. (1,2,3)
