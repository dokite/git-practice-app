// components/Tutorial.jsx
import React from 'react';
import { Play } from 'lucide-react';
import '../styles/Tutorial.css';

const tutorials = [
  { 
    step: 0, 
    title: '🚀 Git 저장소 초기화', 
    instruction: '터미널에 "git init"을 입력하여 Git 저장소를 초기화하세요.',
    command: 'git init'
  },
  { 
    step: 1, 
    title: '📄 파일 생성', 
    instruction: '왼쪽 상단의 "파일 생성" 섹션에서 파일을 만들어보세요. (예: README.md)',
    hint: '파일 이름과 내용을 입력한 후 "파일 생성" 버튼을 클릭하세요.'
  },
  { 
    step: 2, 
    title: '📊 상태 확인', 
    instruction: '"git status"로 현재 상태를 확인해보세요.',
    command: 'git status'
  },
  { 
    step: 3, 
    title: '➕ Staging Area에 추가', 
    instruction: '"git add ."로 모든 파일을 staging area에 추가하세요.',
    command: 'git add .'
  },
  { 
    step: 4, 
    title: '💾 첫 커밋', 
    instruction: '"git commit -m "첫 번째 커밋"으로 커밋을 생성하세요.',
    command: 'git commit -m "첫 번째 커밋"'
  },
  { 
    step: 5, 
    title: '🌿 브랜치 생성', 
    instruction: '"git branch feature"로 새 브랜치를 만들어보세요.',
    command: 'git branch feature'
  },
  { 
    step: 6, 
    title: '🔀 브랜치 전환', 
    instruction: '"git checkout feature"로 feature 브랜치로 이동하세요.',
    command: 'git checkout feature'
  },
  { 
    step: 7, 
    title: '🎉 완료!', 
    instruction: '축하합니다! 기본 Git 명령어를 모두 학습했습니다. 이제 자유롭게 연습해보세요!'
  }
];

const Tutorial = ({ tutorialMode, tutorialStep }) => {
  if (!tutorialMode || tutorialStep >= tutorials.length) {
    return null;
  }

  const currentTutorial = tutorials[tutorialStep];

  return (
    <div className="tutorial-banner">
      <div className="tutorial-content">
        <Play className="tutorial-icon" />
        <div className="tutorial-text">
          <h3 className="tutorial-title">
            Step {tutorialStep + 1}/{tutorials.length}: {currentTutorial.title}
          </h3>
          <p className="tutorial-instruction">{currentTutorial.instruction}</p>
          {currentTutorial.command && (
            <code className="tutorial-command">{currentTutorial.command}</code>
          )}
          {currentTutorial.hint && (
            <p className="tutorial-hint">💡 {currentTutorial.hint}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tutorial;