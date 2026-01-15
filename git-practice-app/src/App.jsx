import React, { useState } from 'react';
import { GitBranch, Book } from 'lucide-react';
import FileManager from './components/FileManager';
import GitStatus from './components/GitStatus';
import CommitGraph from './components/CommitGraph';
import RemoteRepo from './components/RemoteRepo';
import Terminal from './components/Terminal';
import Tutorial from './components/Tutorial';
import useGitCommands from './hooks/useGitCommands';
import './App.css';

function App() {
  const [tutorialMode, setTutorialMode] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  const {
    files,
    setFiles,
    branches,
    currentBranch,
    stagingArea,
    setStagingArea,
    gitInitialized,
    lastCommittedFiles,
    setLastCommittedFiles,
    remoteRepo,
    hasRemote,
    terminalHistory,
    setTerminalHistory,
    addToTerminal,
    handleGitInit,
    handleGitStatus,
    handleGitAdd,
    handleGitCommit,
    handleGitLog,
    handleGitBranch,
    handleGitCheckout,
    handleGitMerge,
    handleGitRebase,
    handleGitCherryPick,
    handleGitRemoteAdd,
    handleGitPush,
    handleGitPull,
    handleGitFetch,
    handleGitDiff,
    getAllCommits,
    getRemoteCommits
  } = useGitCommands(tutorialMode, tutorialStep, setTutorialStep);

  const startTutorial = () => {
    setTutorialMode(true);
    setTutorialStep(0);
    setTerminalHistory([
      { type: 'success', text: '🎓 튜토리얼 모드가 시작되었습니다!' },
      { type: 'info', text: '각 단계의 지시사항을 따라 Git을 배워보세요.' }
    ]);
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="app-header">
          <h1 className="app-title">
            <GitBranch className="title-icon" />
            Git 연습
          </h1>
          <button onClick={startTutorial} className="tutorial-button">
            <Book className="button-icon" />
            튜토리얼 시작
          </button>
        </div>

        <Tutorial
          tutorialMode={tutorialMode}
          tutorialStep={tutorialStep}
        />

        <div className="main-grid">
          <FileManager
            files={files}
            setFiles={setFiles}
            stagingArea={stagingArea}
            lastCommittedFiles={lastCommittedFiles}
            addToTerminal={addToTerminal}
            tutorialMode={tutorialMode}
            tutorialStep={tutorialStep}
            setTutorialStep={setTutorialStep}
          />

          <GitStatus
            branches={branches}
            currentBranch={currentBranch}
            stagingArea={stagingArea}
            getAllCommits={getAllCommits}
          />

          <CommitGraph
            branches={branches}
          />

          <RemoteRepo
            hasRemote={hasRemote}
            remoteRepo={remoteRepo}
            currentBranch={currentBranch}
            getRemoteCommits={getRemoteCommits}
          />
        </div>

        <Terminal
          terminalHistory={terminalHistory}
          gitInitialized={gitInitialized}
          handleGitInit={handleGitInit}
          handleGitStatus={handleGitStatus}
          handleGitAdd={handleGitAdd}
          handleGitCommit={handleGitCommit}
          handleGitLog={handleGitLog}
          handleGitBranch={handleGitBranch}
          handleGitCheckout={handleGitCheckout}
          handleGitMerge={handleGitMerge}
          handleGitRebase={handleGitRebase}
          handleGitCherryPick={handleGitCherryPick}
          handleGitRemoteAdd={handleGitRemoteAdd}
          handleGitPush={handleGitPush}
          handleGitPull={handleGitPull}
          handleGitFetch={handleGitFetch}
          handleGitDiff={handleGitDiff}
          addToTerminal={addToTerminal}
          setTerminalHistory={setTerminalHistory}
        />
      </div>
    </div>
  );
}

export default App;