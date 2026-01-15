# 🎓 Git 연습 웹 Pro

웹 브라우저에서 Git 명령어를 연습할 수 있는 **완전한** 인터랙티브 학습 플랫폼입니다.

## ✨ 주요 기능

### 📁 파일 관리
- ✅ 파일 생성, **수정**, 삭제
- ✅ 실시간 파일 상태 표시 (Untracked/Modified/Staged)
- ✅ Staging Area 시각화
- ✅ 인라인 파일 편집기

### 🎯 Git 명령어 지원

#### 기본 명령어
- `git init` - 저장소 초기화
- `git status` - 상태 확인 (modified/staged/untracked 구분)
- `git add` - Staging Area에 추가
- `git commit` - 커밋 생성
- `git log` - 커밋 히스토리 확인
- `git diff` - 변경사항 비교

#### 브랜치 명령어
- `git branch` - 브랜치 생성 및 목록
- `git branch -d <name>` - 브랜치 삭제
- `git checkout` - 브랜치 전환
- `git merge` - 브랜치 병합
- `git rebase` - 리베이스
- `git cherry-pick` - 체리픽

#### ☁️ 원격 저장소 명령어 (NEW!)
- `git remote add origin <url>` - 원격 저장소 추가
- `git push` - 로컬 커밋을 원격에 푸시
- `git pull` - 원격 커밋을 로컬로 풀
- `git fetch` - 원격 변경사항만 가져오기

### 🎓 학습 기능
- 단계별 튜토리얼 모드
- 실시간 피드백
- 원격 저장소 시각화
- 초보자 친화적인 설명

### 📊 시각화
- 브랜치 상태 표시
- 커밋 그래프
- **원격 저장소 상태** (NEW!)
- Staging Area 표시
- 파일 상태 색상 구분
- 실시간 터미널 출력

## 🚀 설치 및 실행

### 필요한 Node Modules

```bash
npm install react react-dom lucide-react
npm install -D vite @vitejs/plugin-react
```

### 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속

### 프로덕션 빌드

```bash
npm run build
```

## 📂 프로젝트 구조

```
git-practice-web/
├── src/
│   ├── App.jsx                 # 메인 컴포넌트
│   ├── App.css                 # 메인 스타일
│   ├── components/
│   │   ├── FileManager.jsx     # 파일 관리 (수정 기능 포함)
│   │   ├── GitStatus.jsx       # Git 상태 표시
│   │   ├── CommitGraph.jsx     # 커밋 그래프
│   │   ├── RemoteRepo.jsx      # 원격 저장소 (NEW!)
│   │   ├── Terminal.jsx        # 터미널
│   │   └── Tutorial.jsx        # 튜토리얼
│   ├── hooks/
│   │   └── useGitCommands.js   # Git 명령어 로직 (확장됨)
│   └── styles/
│       ├── FileManager.css
│       ├── GitStatus.css
│       ├── CommitGraph.css
│       ├── RemoteRepo.css      # (NEW!)
│       ├── Terminal.css
│       └── Tutorial.css
├── package.json
└── README.md
```

## 🎮 사용 방법

### 1. 기본 워크플로우

```bash
# 1. 저장소 초기화
git init

# 2. 파일 생성 (UI에서)
# 파일 이름과 내용 입력 후 "파일 생성" 클릭

# 3. 상태 확인
git status

# 4. Staging Area에 추가
git add .

# 5. 커밋
git commit -m "첫 커밋"

# 6. 로그 확인
git log
```

### 2. 파일 수정 워크플로우

```bash
# 1. 파일 수정 (UI에서 편집 버튼 클릭)
# 2. 수정 후 저장

# 3. 상태 확인 - "Changes not staged" 표시됨
git status

# 4. 다시 staging
git add 파일명

# 5. 커밋
git commit -m "파일 수정"
```

### 3. 브랜치 워크플로우

```bash
# 브랜치 생성
git branch feature

# 브랜치 전환
git checkout feature

# 작업 후 커밋
git add .
git commit -m "새 기능 추가"

# main으로 돌아가기
git checkout main

# 병합
git merge feature

# 또는 리베이스
git rebase feature
```

### 4. 원격 저장소 워크플로우

```bash
# 원격 저장소 추가
git remote add origin https://github.com/user/repo.git

# 푸시
git push origin main

# 풀
git pull origin main

# 페치만
git fetch origin
```

### 5. 고급 명령어

```bash
# 특정 커밋만 가져오기
git cherry-pick abc1234

# 브랜치 삭제
git branch -d feature

# 변경사항 비교
git diff
git diff 파일명
```

## 🛠️ 기술 스택

- **React 18** - UI 라이브러리
- **Lucide React** - 아이콘
- **Vite** - 빌드 도구
- **CSS3** - 스타일링

## 🆕 Version 2.0 업데이트 내용

### 파일 관리
- ✅ 파일 수정 기능 추가 (인라인 편집기)
- ✅ 파일 상태 시각화 개선 (Untracked/Modified/Staged)
- ✅ 파일 상태 범례 추가

### Git 명령어
- ✅ `git rebase` - 리베이스 기능
- ✅ `git cherry-pick` - 체리픽 기능
- ✅ `git branch -d` - 브랜치 삭제
- ✅ `git remote add` - 원격 저장소 추가
- ✅ `git push` - 푸시 기능
- ✅ `git pull` - 풀 기능
- ✅ `git fetch` - 페치 기능

### UI/UX
- ✅ 원격 저장소 컴포넌트 추가
- ✅ 파일 편집 UI 개선
- ✅ 파일 상태 뱃지 개선
- ✅ 터미널 help 명령어 확장

### 로직
- ✅ `lastCommittedFiles` 추적으로 파일 변경 감지
- ✅ 원격/로컬 커밋 비교
- ✅ Ahead/Behind 상태 표시

## 📝 예제 시나리오

### 시나리오 1: 기본 Git 워크플로우
```bash
git init
# UI에서 README.md 생성
git add .
git commit -m "Initial commit"
# UI에서 README.md 수정
git status  # Modified 확인
git add README.md
git commit -m "Update README"
```

### 시나리오 2: 브랜치와 병합
```bash
git branch feature
git checkout feature
# 작업...
git commit -m "Add feature"
git checkout main
git merge feature
```

### 시나리오 3: 원격 저장소 동기화
```bash
git remote add origin https://github.com/user/repo
git push origin main
# 다른 곳에서 작업 후...
git pull origin main
```

## 🎯 학습 목표

이 프로젝트를 통해 다음을 학습할 수 있습니다:

- Git의 핵심 개념 (Working Directory, Staging Area, Repository)
- 로컬 저장소와 원격 저장소의 차이
- 브랜치와 병합의 개념
- Rebase vs Merge의 차이
- Cherry-pick의 활용
- 파일 상태 추적 (Untracked/Modified/Staged)
- 버전 관리의 실전 워크플로우

## 🤝 기여

이슈와 풀 리퀘스트는 언제든 환영합니다!

## 📄 라이선스

MIT License

---

**Happy Learning! 🎉**