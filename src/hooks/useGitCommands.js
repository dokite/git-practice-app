// hooks/useGitCommands.js
import { useState } from 'react';

const useGitCommands = (tutorialMode, tutorialStep, setTutorialStep) => {
  const [files, setFiles] = useState({});
  const [branches, setBranches] = useState({ main: [] });
  const [currentBranch, setCurrentBranch] = useState('main');
  const [stagingArea, setStagingArea] = useState({});
  const [gitInitialized, setGitInitialized] = useState(false);
  const [lastCommittedFiles, setLastCommittedFiles] = useState({});
  
  // 원격 저장소
  const [remoteRepo, setRemoteRepo] = useState({ main: [] });
  const [hasRemote, setHasRemote] = useState(false);
  
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'info', text: '🎓 Git 연습 환경에 오신 것을 환영합니다!' },
    { type: 'info', text: '💡 "help" 명령어로 사용 가능한 명령어를 확인하세요.' }
  ]);

  const addToTerminal = (type, text) => {
    setTerminalHistory(prev => [...prev, { type, text }]);
  };

  const getAllCommits = () => branches[currentBranch] || [];
  const getRemoteCommits = (branchName = 'main') => remoteRepo[branchName] || [];

  const handleGitInit = () => {
    if (gitInitialized) {
      addToTerminal('error', '❌ Git 저장소가 이미 초기화되어 있습니다.');
      return;
    }
    setGitInitialized(true);
    addToTerminal('success', '✅ Initialized empty Git repository');
    if (tutorialMode && tutorialStep === 0) setTutorialStep(1);
  };

  const handleGitStatus = () => {
    if (!gitInitialized) {
      addToTerminal('error', '❌ Git 저장소가 초기화되지 않았습니다.');
      return;
    }

    addToTerminal('info', `📊 On branch ${currentBranch}`);
    
    const commits = getAllCommits();
    const remoteCommits = getRemoteCommits(currentBranch);
    
    if (hasRemote) {
      const ahead = commits.length - remoteCommits.length;
      if (ahead > 0) {
        addToTerminal('info', `Your branch is ahead of 'origin/${currentBranch}' by ${ahead} commit(s).`);
      } else if (ahead < 0) {
        addToTerminal('info', `Your branch is behind 'origin/${currentBranch}' by ${Math.abs(ahead)} commit(s).`);
      } else {
        addToTerminal('success', `Your branch is up to date with 'origin/${currentBranch}'.`);
      }
    }
    
    const stagedFiles = Object.keys(stagingArea);
    const modifiedFiles = Object.keys(files).filter(name => {
      const current = files[name];
      const lastCommitted = lastCommittedFiles[name];
      const staged = stagingArea[name];
      return lastCommitted !== undefined && current !== lastCommitted && 
             (!staged || current !== staged);
    });
    const untrackedFiles = Object.keys(files).filter(name => 
      !lastCommittedFiles[name] && !stagingArea[name]
    );

    if (commits.length === 0) addToTerminal('info', 'No commits yet');

    if (stagedFiles.length === 0 && modifiedFiles.length === 0 && untrackedFiles.length === 0) {
      addToTerminal('success', '✨ nothing to commit, working tree clean');
    } else {
      if (stagedFiles.length > 0) {
        addToTerminal('success', 'Changes to be committed:');
        stagedFiles.forEach(file => addToTerminal('success', `        modified:   ${file}`));
      }
      if (modifiedFiles.length > 0) {
        addToTerminal('warning', 'Changes not staged for commit:');
        modifiedFiles.forEach(file => addToTerminal('warning', `        modified:   ${file}`));
      }
      if (untrackedFiles.length > 0) {
        addToTerminal('error', 'Untracked files:');
        untrackedFiles.forEach(file => addToTerminal('error', `        ${file}`));
      }
    }
  };

  const handleGitAdd = (fileName) => {
    if (!gitInitialized) {
      addToTerminal('error', '❌ Git 저장소가 초기화되지 않았습니다.');
      return;
    }
    if (fileName === '.') {
      setStagingArea({ ...files });
      addToTerminal('success', '✅ 모든 파일이 staging area에 추가되었습니다.');
    } else if (files[fileName]) {
      setStagingArea(prev => ({ ...prev, [fileName]: files[fileName] }));
      addToTerminal('success', `✅ "${fileName}" staged`);
    } else {
      addToTerminal('error', `❌ pathspec '${fileName}' did not match any files`);
    }
  };

  const handleGitCommit = (message) => {
    if (!gitInitialized) {
      addToTerminal('error', '❌ Git 저장소가 초기화되지 않았습니다.');
      return;
    }
    if (Object.keys(stagingArea).length === 0) {
      addToTerminal('error', '❌ nothing to commit');
      return;
    }
    if (!message) {
      addToTerminal('error', '❌ Commit 메시지를 입력해주세요.');
      return;
    }

    const commits = getAllCommits();
    const commitHash = Math.random().toString(36).substr(2, 7);
    const newCommit = {
      hash: commitHash,
      message,
      files: { ...stagingArea },
      timestamp: new Date().toLocaleString(),
      branch: currentBranch,
      parent: commits.length > 0 ? commits[commits.length - 1].hash : null
    };

    setBranches(prev => ({
      ...prev,
      [currentBranch]: [...(prev[currentBranch] || []), newCommit]
    }));
    setLastCommittedFiles({ ...stagingArea });
    setStagingArea({});
    addToTerminal('success', `✅ [${currentBranch} ${commitHash}] ${message}`);
  };

  const handleGitLog = () => {
    if (!gitInitialized) {
      addToTerminal('error', '❌ Git 저장소가 초기화되지 않았습니다.');
      return;
    }
    const commits = getAllCommits();
    if (commits.length === 0) {
      addToTerminal('info', '📝 아직 커밋이 없습니다.');
      return;
    }
    addToTerminal('info', '📜 ═══ Commit History ═══');
    commits.slice().reverse().forEach(commit => {
      addToTerminal('warning', `commit ${commit.hash}`);
      addToTerminal('info', `  ${commit.message}`);
      addToTerminal('info', `  ${commit.timestamp}`);
    });
  };

  const handleGitBranch = (branchName, deleteFlag) => {
    if (!gitInitialized) {
      addToTerminal('error', '❌ Git 저장소가 초기화되지 않았습니다.');
      return;
    }
    if (deleteFlag === '-d' && branchName) {
      if (branchName === currentBranch) {
        addToTerminal('error', `❌ Cannot delete checked out branch '${branchName}'`);
        return;
      }
      if (!branches[branchName]) {
        addToTerminal('error', `❌ branch '${branchName}' not found`);
        return;
      }
      const newBranches = { ...branches };
      delete newBranches[branchName];
      setBranches(newBranches);
      addToTerminal('success', `✅ Deleted branch ${branchName}`);
      return;
    }
    if (!branchName) {
      addToTerminal('info', '🌿 Branches:');
      Object.keys(branches).forEach(branch => {
        addToTerminal(branch === currentBranch ? 'success' : 'info', 
          (branch === currentBranch ? '* ' : '  ') + branch);
      });
      return;
    }
    if (branches[branchName]) {
      addToTerminal('error', `❌ Branch '${branchName}' already exists`);
      return;
    }
    setBranches(prev => ({ ...prev, [branchName]: [...(prev[currentBranch] || [])] }));
    addToTerminal('success', `✅ Created branch '${branchName}'`);
  };

  const handleGitCheckout = (branchName) => {
    if (!gitInitialized) {
      addToTerminal('error', '❌ Git 저장소가 초기화되지 않았습니다.');
      return;
    }
    if (!branches[branchName]) {
      addToTerminal('error', `❌ pathspec '${branchName}' did not match`);
      return;
    }
    setCurrentBranch(branchName);
    const latestCommit = branches[branchName][branches[branchName].length - 1];
    if (latestCommit) {
      setFiles(latestCommit.files);
      setLastCommittedFiles(latestCommit.files);
    }
    setStagingArea({});
    addToTerminal('success', `✅ Switched to branch '${branchName}'`);
  };

  const handleGitMerge = (branchName) => {
    if (!gitInitialized) {
      addToTerminal('error', '❌ Git 저장소가 초기화되지 않았습니다.');
      return;
    }
    if (!branches[branchName]) {
      addToTerminal('error', `❌ Branch '${branchName}' not found`);
      return;
    }
    if (branchName === currentBranch) {
      addToTerminal('error', `❌ Cannot merge a branch with itself`);
      return;
    }
    const sourceBranch = branches[branchName];
    if (sourceBranch.length === 0) {
      addToTerminal('info', `Branch '${branchName}' has no commits`);
      return;
    }
    const latestSourceCommit = sourceBranch[sourceBranch.length - 1];
    const mergedFiles = { ...files, ...latestSourceCommit.files };
    setFiles(mergedFiles);
    setLastCommittedFiles(mergedFiles);
    const targetCommits = getAllCommits();
    const mergeCommit = {
      hash: Math.random().toString(36).substr(2, 7),
      message: `Merge branch '${branchName}' into ${currentBranch}`,
      files: mergedFiles,
      timestamp: new Date().toLocaleString(),
      branch: currentBranch,
      parent: targetCommits.length > 0 ? targetCommits[targetCommits.length - 1].hash : null
    };
    setBranches(prev => ({ ...prev, [currentBranch]: [...(prev[currentBranch] || []), mergeCommit] }));
    addToTerminal('success', `✅ Merged '${branchName}' into '${currentBranch}'`);
  };

  const handleGitRebase = (branchName) => {
    if (!gitInitialized) {
      addToTerminal('error', '❌ Git 저장소가 초기화되지 않았습니다.');
      return;
    }
    if (!branches[branchName]) {
      addToTerminal('error', `❌ Branch '${branchName}' not found`);
      return;
    }
    const targetBranch = branches[branchName];
    const currentCommits = getAllCommits();
    const rebasedCommits = [...targetBranch, ...currentCommits];
    setBranches(prev => ({ ...prev, [currentBranch]: rebasedCommits }));
    addToTerminal('success', `✅ Rebased ${currentBranch} onto ${branchName}`);
    addToTerminal('info', `   ${currentCommits.length} commit(s) applied`);
  };

  const handleGitCherryPick = (commitHash) => {
    if (!gitInitialized) {
      addToTerminal('error', '❌ Git 저장소가 초기화되지 않았습니다.');
      return;
    }
    let foundCommit = null;
    for (const branch of Object.values(branches)) {
      foundCommit = branch.find(c => c.hash === commitHash);
      if (foundCommit) break;
    }
    if (!foundCommit) {
      addToTerminal('error', `❌ Commit '${commitHash}' not found`);
      return;
    }
    const newCommit = {
      ...foundCommit,
      hash: Math.random().toString(36).substr(2, 7),
      timestamp: new Date().toLocaleString(),
      branch: currentBranch,
      parent: getAllCommits()[getAllCommits().length - 1]?.hash || null
    };
    setBranches(prev => ({ ...prev, [currentBranch]: [...(prev[currentBranch] || []), newCommit] }));
    setFiles({ ...files, ...newCommit.files });
    setLastCommittedFiles({ ...newCommit.files });
    addToTerminal('success', `✅ Cherry-picked ${commitHash}`);
  };

  const handleGitRemoteAdd = (remoteName, url) => {
    if (!gitInitialized) {
      addToTerminal('error', '❌ Git 저장소가 초기화되지 않았습니다.');
      return;
    }
    setHasRemote(true);
    addToTerminal('success', `✅ Added remote '${remoteName}' (${url})`);
  };

  const handleGitPush = (remote, branch) => {
    if (!gitInitialized) {
      addToTerminal('error', '❌ Git 저장소가 초기화되지 않았습니다.');
      return;
    }
    if (!hasRemote) {
      addToTerminal('error', '❌ No remote repository configured');
      addToTerminal('info', '   Use: git remote add origin <url>');
      return;
    }
    const branchToPush = branch || currentBranch;
    const localCommits = branches[branchToPush] || [];
    setRemoteRepo(prev => ({ ...prev, [branchToPush]: [...localCommits] }));
    addToTerminal('success', `✅ Pushed to origin/${branchToPush}`);
    addToTerminal('info', `   ${localCommits.length} commit(s) pushed`);
  };

  const handleGitPull = (remote, branch) => {
    if (!gitInitialized) {
      addToTerminal('error', '❌ Git 저장소가 초기화되지 않았습니다.');
      return;
    }
    if (!hasRemote) {
      addToTerminal('error', '❌ No remote repository configured');
      return;
    }
    const branchToPull = branch || currentBranch;
    const remoteCommits = remoteRepo[branchToPull] || [];
    const localCommits = branches[branchToPull] || [];
    if (remoteCommits.length === localCommits.length) {
      addToTerminal('info', 'Already up to date.');
      return;
    }
    setBranches(prev => ({ ...prev, [branchToPull]: [...remoteCommits] }));
    if (remoteCommits.length > 0) {
      const latestCommit = remoteCommits[remoteCommits.length - 1];
      setFiles(latestCommit.files);
      setLastCommittedFiles(latestCommit.files);
    }
    addToTerminal('success', `✅ Pulled from origin/${branchToPull}`);
    addToTerminal('info', `   ${remoteCommits.length - localCommits.length} commit(s) fetched`);
  };

  const handleGitFetch = (remote) => {
    if (!gitInitialized) {
      addToTerminal('error', '❌ Git 저장소가 초기화되지 않았습니다.');
      return;
    }
    if (!hasRemote) {
      addToTerminal('error', '❌ No remote repository configured');
      return;
    }
    addToTerminal('success', `✅ Fetched from ${remote || 'origin'}`);
    addToTerminal('info', '   Remote tracking branches updated');
  };

  const handleGitDiff = (fileName) => {
    if (!gitInitialized) {
      addToTerminal('error', '❌ Git 저장소가 초기화되지 않았습니다.');
      return;
    }
    const commits = getAllCommits();
    if (commits.length === 0) {
      addToTerminal('info', 'No commits to compare');
      return;
    }
    const lastCommit = commits[commits.length - 1];
    if (fileName) {
      const oldContent = lastCommit.files[fileName] || '';
      const newContent = files[fileName] || '';
      if (oldContent === newContent) {
        addToTerminal('info', `No changes in ${fileName}`);
      } else {
        addToTerminal('info', `📝 diff --git a/${fileName} b/${fileName}`);
        addToTerminal('error', `- ${oldContent.substring(0, 50)}${oldContent.length > 50 ? '...' : ''}`);
        addToTerminal('success', `+ ${newContent.substring(0, 50)}${newContent.length > 50 ? '...' : ''}`);
      }
    } else {
      addToTerminal('info', '📝 ═══ Differences ═══');
      Object.keys(files).forEach(name => {
        if ((lastCommit.files[name] || '') !== files[name]) {
          addToTerminal('warning', `Modified: ${name}`);
        }
      });
    }
  };

  return {
    files, setFiles, branches, setBranches, currentBranch, setCurrentBranch,
    stagingArea, setStagingArea, gitInitialized, terminalHistory, setTerminalHistory,
    lastCommittedFiles, setLastCommittedFiles, remoteRepo, hasRemote,
    addToTerminal, handleGitInit, handleGitStatus, handleGitAdd, handleGitCommit,
    handleGitLog, handleGitBranch, handleGitCheckout, handleGitMerge, handleGitRebase,
    handleGitCherryPick, handleGitRemoteAdd, handleGitPush, handleGitPull,
    handleGitFetch, handleGitDiff, getAllCommits, getRemoteCommits
  };
};

export default useGitCommands;