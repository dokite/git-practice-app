// components/Terminal.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import '../styles/Terminal.css';

const Terminal = ({
  terminalHistory,
  gitInitialized,
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
  addToTerminal,
  setTerminalHistory
}) => {
  const [command, setCommand] = useState('');
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleCommandSubmit = () => {
    if (!command.trim()) return;

    addToTerminal('command', `$ ${command}`);
    const parts = command.trim().split(' ');
    const cmd = parts[0];

    if (cmd === 'git') {
      const subCmd = parts[1];
      
      switch(subCmd) {
        case 'init':
          handleGitInit();
          break;
        case 'status':
          handleGitStatus();
          break;
        case 'add':
          handleGitAdd(parts[2] || '.');
          break;
        case 'commit':
          const messageIndex = parts.indexOf('-m');
          if (messageIndex !== -1) {
            const message = parts.slice(messageIndex + 1).join(' ').replace(/['"]/g, '');
            handleGitCommit(message);
          } else {
            addToTerminal('error', '❌ git commit -m "메시지" 형식으로 입력하세요.');
          }
          break;
        case 'log':
          handleGitLog();
          break;
        case 'branch':
          if (parts[2] === '-d') {
            handleGitBranch(parts[3], '-d');
          } else {
            handleGitBranch(parts[2]);
          }
          break;
        case 'checkout':
          handleGitCheckout(parts[2]);
          break;
        case 'merge':
          handleGitMerge(parts[2]);
          break;
        case 'rebase':
          handleGitRebase(parts[2]);
          break;
        case 'cherry-pick':
          handleGitCherryPick(parts[2]);
          break;
        case 'remote':
          if (parts[2] === 'add') {
            handleGitRemoteAdd(parts[3], parts[4] || 'https://github.com/user/repo.git');
          } else {
            addToTerminal('error', '❌ Usage: git remote add <name> <url>');
          }
          break;
        case 'push':
          handleGitPush(parts[2], parts[3]);
          break;
        case 'pull':
          handleGitPull(parts[2], parts[3]);
          break;
        case 'fetch':
          handleGitFetch(parts[2]);
          break;
        case 'diff':
          handleGitDiff(parts[2]);
          break;
        default:
          addToTerminal('error', `❌ git: '${subCmd}' is not a git command`);
      }
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
    } else if (cmd === 'help') {
      showHelp();
    } else {
      addToTerminal('error', `❌ command not found: ${cmd}`);
    }

    setCommand('');
  };

  const showHelp = () => {
    addToTerminal('info', '📖 ═══ Git 명령어 도움말 ═══');
    addToTerminal('info', '');
    addToTerminal('info', '🔰 기본 명령어:');
    addToTerminal('info', '  git init                  - 저장소 초기화');
    addToTerminal('info', '  git status                - 상태 확인');
    addToTerminal('info', '  git add <file|.>          - 파일 추가');
    addToTerminal('info', '  git commit -m "msg"       - 커밋 생성');
    addToTerminal('info', '  git log                   - 커밋 히스토리');
    addToTerminal('info', '  git diff [file]           - 변경사항 비교');
    addToTerminal('info', '');
    addToTerminal('info', '🌿 브랜치 명령어:');
    addToTerminal('info', '  git branch [name]         - 브랜치 목록/생성');
    addToTerminal('info', '  git branch -d <name>      - 브랜치 삭제');
    addToTerminal('info', '  git checkout <branch>     - 브랜치 전환');
    addToTerminal('info', '  git merge <branch>        - 브랜치 병합');
    addToTerminal('info', '  git rebase <branch>       - 리베이스');
    addToTerminal('info', '  git cherry-pick <hash>    - 체리픽');
    addToTerminal('info', '');
    addToTerminal('info', '☁️  원격 저장소:');
    addToTerminal('info', '  git remote add origin <url> - 원격 저장소 추가');
    addToTerminal('info', '  git push [origin] [branch]  - 푸시');
    addToTerminal('info', '  git pull [origin] [branch]  - 풀');
    addToTerminal('info', '  git fetch [origin]          - 페치');
    addToTerminal('info', '');
    addToTerminal('info', '🔧 기타:');
    addToTerminal('info', '  clear                     - 터미널 초기화');
    addToTerminal('info', '  help                      - 도움말 표시');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommandSubmit();
    }
  };

  return (
    <div className="card terminal">
      <h2 className="card-title">
        <TerminalIcon className="title-icon terminal-icon" />
        터미널
      </h2>
      
      <div className="terminal-output" ref={terminalRef}>
        {terminalHistory.map((entry, idx) => (
          <div key={idx} className={`terminal-line ${entry.type}`}>
            {entry.text}
          </div>
        ))}
      </div>

      <div className="terminal-input">
        <span className="terminal-prompt">$</span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="git 명령어를 입력하세요 (help 입력 시 도움말)"
          className="terminal-field"
          autoFocus
        />
      </div>

      <div className="terminal-hint">
        💡 Tip: "help" 입력 시 사용 가능한 모든 명령어를 확인할 수 있습니다.
      </div>
    </div>
  );
};

export default Terminal;