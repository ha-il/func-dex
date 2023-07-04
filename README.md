# 하일의 함수 도감

작업하면서 만났던 함수들을 기록하고, 테스트하기 위해 만든 저장소입니다.

## 폴더 구조 설명

```
└─ src
    ├─ functions # 함수 분류 폴더.
    │   │
    │   └─ ... # 각 하위 폴더마다 개별 테스트 가능.
    │
    └─ playground # functions에 저장된 함수들을 자유롭게 사용하고 테스트하는 폴더.
        │
        ├─ __test__
        │   └─ playground.test.js # 테스트를 작성하는 파일.
        │
        └─ playground.js # 함수를 작성하는 파일.
```

## 이 저장소를 사용하는 방법

**의존성 설치합니다.**

```
yarn install
```

**폴더 이름을 통해 특정 테스트 실행합니다.**

- `/src/functions/operation` 폴더의 함수를 테스트하는 경우.

```
yarn test -- 'operation'
```

- `/src/playground` 폴더의 함수를 테스트하는 경우.

```
yarn test -- 'playground'
```
