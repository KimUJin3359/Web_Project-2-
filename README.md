# Web_Project(2)

#### ec2에 npm 설치하기
```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install nodejs
```

#### nodemodules
- 해당 폴더로 들어가서 npm i 명령어 입력시 자동으로 다운받아짐
#### .env
- naver API의 key 관련 파일로 사용하기위해서는 직접 naver api에서 발급신청


### BACKEND
#### 사용
- axios
- cors
- dotenv
- express
- nodemon

#### [backend/index.js](https://github.com/KimUJin3359/Web_Project-2-/blob/master/backend/index.js)
- **GET**
  - chart.json을 읽어와 반환
```
app.get("/api/data", async (req, res) => {
    try {
        res.set('Content-Type', 'application/json; charset=utf8');
        const tempFile = fs.createReadStream('uploads/chart.json');
        return tempFile.pipe(res);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
});
```

- **POST**
  - body에 첨부된 데이터들을 naver API에 넘김
  - 생성된 chart 파일을 uploads 파일에 업로드
```
app.post("/api/data", async (req, res) => {
    try {
        const url = 'https://openapi.naver.com/v1/datalab/search';
        const {startDate, endDate, timeUnit, device, gender, ages, keywordGroups } = req.body;
        const request_body = {
            startDate: startDate,
            endDate: endDate,
            timeUnit: timeUnit,
            device: device === "all" ? "" : device,
            gender: gender === "all" ? "" : gender,
            ages: ages,
            keywordGroups: keywordGroups
        }
        const headers = {
            'X-Naver-Client-Id': process.env.CLIENT_ID,
            'X-Naver-Client-Secret': process.env.CLIENT_SECRET,
            'Content-Type': 'application/json'
        }
        const result = await axios.post(url, request_body, {
            headers
        });
        console.log(result.data);
        fs.writeFile('./uploads/chart.json', JSON.stringify(result.data['results']), function(error) {
            console.log(error);
            if (error) throw error;
        });
        return res.json({status: "OK"});
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
});
```


- **DELETE**
  - chart.json 삭제(unlink)

### FRONTEND
#### 사용
- axios
- chart.js
- core-js
- element-ui
- moment
- vue
- vue-chartjs
- vue-router
- vuex

#### [views/Main.vue](https://github.com/KimUJin3359/Web_Project-2-/blob/master/frontend/src/views/Main.vue)
- Graph, Form을 띄워주는 페이지
#### [utils/axios.js](https://github.com/KimUJin3359/Web_Project-2-/blob/master/frontend/src/utils/axios.js)
- Backend와 연동 기능
#### [store/index.js](https://github.com/KimUJin3359/Web_Project-2-/blob/master/frontend/src/store/index.js)
- 차트의 데이터 속성을 관리
- axios의 get을 호출하여 charData를 받아옴
#### [components/Form.vue](https://github.com/KimUJin3359/Web_Project-2-/blob/master/frontend/src/components/Form.vue)
- naver api 데이터렙에 요청할 parameter를 입력 받음
#### [components/ReactiveBarChart.js](https://github.com/KimUJin3359/Web_Project-2-/blob/master/frontend/src/components/ReactiveBarChart.js)
- chart를 그림

![캡처](https://user-images.githubusercontent.com/50474972/111036137-0b3a5b00-8461-11eb-882c-3a00f58f4789.JPG)
