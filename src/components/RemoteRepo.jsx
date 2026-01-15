// components/RemoteRepo.jsx
import React from 'react';
import { Cloud, CloudOff } from 'lucide-react';
import '../styles/RemoteRepo.css';

const RemoteRepo = ({ hasRemote, remoteRepo, currentBranch, getRemoteCommits }) => {
  const remoteCommits = getRemoteCommits(currentBranch);

  return (
    <div className="card remote-repo">
      <h2 className="card-title">
        {hasRemote ? <Cloud className="title-icon remote-icon" /> : <CloudOff className="title-icon offline-icon" />}
        원격 저장소 (Origin)
      </h2>
      
      {!hasRemote ? (
        <div className="no-remote">
          <p className="empty-message">원격 저장소가 설정되지 않았습니다.</p>
          <p className="hint-text">
            터미널에서 <code>git remote add origin &lt;url&gt;</code> 명령어를 사용하세요.
          </p>
        </div>
      ) : (
        <div className="remote-content">
          <div className="remote-status">
            <span className="status-badge">
              ✓ Connected to origin
            </span>
          </div>

          <div className="remote-branches">
            <h3 className="section-title">원격 브랜치</h3>
            <div className="branch-list">
              {Object.keys(remoteRepo).map(branch => (
                <div key={branch} className="remote-branch-item">
                  <span className="branch-icon">🌐</span>
                  <span className="branch-name">origin/{branch}</span>
                  <span className="commit-count">{remoteRepo[branch].length} commits</span>
                </div>
              ))}
            </div>
          </div>

          <div className="remote-commits">
            <h3 className="section-title">
              origin/{currentBranch} 커밋
            </h3>
            {remoteCommits.length === 0 ? (
              <p className="empty-message">원격 브랜치에 커밋이 없습니다.</p>
            ) : (
              <div className="commits-list">
                {remoteCommits.slice(-5).reverse().map(commit => (
                  <div key={commit.hash} className="commit-item">
                    <div className="commit-hash">{commit.hash}</div>
                    <div className="commit-message">{commit.message}</div>
                    <div className="commit-timestamp">{commit.timestamp}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="sync-info">
            <h3 className="section-title">동기화 명령어</h3>
            <div className="command-hints">
              <div className="hint-item">
                <code>git push</code>
                <span>로컬 커밋을 원격에 업로드</span>
              </div>
              <div className="hint-item">
                <code>git pull</code>
                <span>원격 커밋을 로컬로 다운로드</span>
              </div>
              <div className="hint-item">
                <code>git fetch</code>
                <span>원격 변경사항만 확인</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoteRepo;