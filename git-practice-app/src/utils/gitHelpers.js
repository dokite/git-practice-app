// utils/gitHelpers.js

/**
 * 커밋 해시 생성
 */
export const generateCommitHash = () => {
  return Math.random().toString(36).substr(2, 7);
};

/**
 * 파일 변경사항 확인
 */
export const hasFileChanged = (file1, file2) => {
  return file1 !== file2;
};

/**
 * 브랜치 목록 가져오기
 */
export const getBranchList = (branches) => {
  return Object.keys(branches);
};

/**
 * 특정 브랜치의 최신 커밋 가져오기
 */
export const getLatestCommit = (branch) => {
  if (!branch || branch.length === 0) return null;
  return branch[branch.length - 1];
};

/**
 * 전체 커밋 그래프 생성
 */
export const generateCommitGraph = (branches) => {
  const allCommits = [];
  
  Object.keys(branches).forEach(branchName => {
    branches[branchName].forEach(commit => {
      const existingCommit = allCommits.find(c => c.hash === commit.hash);
      
      if (!existingCommit) {
        allCommits.push({ ...commit, branches: [branchName] });
      } else {
        if (!existingCommit.branches.includes(branchName)) {
          existingCommit.branches.push(branchName);
        }
      }
    });
  });
  
  return allCommits.sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );
};

/**
 * Staging Area에 있는 파일 목록
 */
export const getStagedFiles = (stagingArea) => {
  return Object.keys(stagingArea);
};

/**
 * Unstaged 파일 목록 (수정되었지만 staging되지 않은 파일)
 */
export const getUnstagedFiles = (files, stagingArea) => {
  return Object.keys(files).filter(name => 
    !stagingArea[name] || files[name] !== stagingArea[name]
  );
};

/**
 * 새로 추가된 파일 목록 (Untracked files)
 */
export const getUntrackedFiles = (files, stagingArea) => {
  return Object.keys(files).filter(name => !stagingArea[name]);
};

/**
 * 파일 diff 생성 (간단한 버전)
 */
export const generateDiff = (oldContent, newContent, fileName) => {
  const maxLength = 100;
  
  if (oldContent === newContent) {
    return {
      hasChanges: false,
      message: `No changes in ${fileName}`
    };
  }
  
  return {
    hasChanges: true,
    fileName,
    removed: oldContent.substring(0, maxLength),
    added: newContent.substring(0, maxLength),
    truncated: oldContent.length > maxLength || newContent.length > maxLength
  };
};

/**
 * 타임스탬프 포맷팅
 */
export const formatTimestamp = (date) => {
  return new Date(date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

/**
 * 커밋 메시지 유효성 검사
 */
export const isValidCommitMessage = (message) => {
  return message && message.trim().length > 0;
};

/**
 * 브랜치 이름 유효성 검사
 */
export const isValidBranchName = (name) => {
  // Git 브랜치 이름 규칙: 알파벳, 숫자, -, _ 허용
  const regex = /^[a-zA-Z0-9_-]+$/;
  return name && regex.test(name) && name.length > 0 && name.length < 50;
};

/**
 * 파일 이름 유효성 검사
 */
export const isValidFileName = (name) => {
  // 기본적인 파일명 검증
  const invalidChars = /[<>:"|?*]/;
  return name && !invalidChars.test(name) && name.length > 0 && name.length < 255;
};