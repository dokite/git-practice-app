// components/GitStatus.jsx
import React from 'react';
import { GitBranch, Clock } from 'lucide-react';
import '../styles/GitStatus.css';

const GitStatus = ({ branches, currentBranch, stagingArea, getAllCommits }) => {
  return (
    <div className="card git-status">
      <h2 className="card-title">Git 상태</h2>
      
      <div className="status-sections">
        <div className="status-section branch-section">
          <h3 className="section-title branch-title">
            <GitBranch className="section-icon" />
            현재 브랜치: <span className="branch-name">{currentBranch}</span>
          </h3>
          <div className="branch-list">
            {Object.keys(branches).map(branch => (
              <div
                key={branch}
                className={`branch-item ${branch === currentBranch ? 'active' : ''}`}
              >
                {branch === currentBranch ? '● ' : '○ '}{branch}
              </div>
            ))}
          </div>
        </div>

        <div className="status-section staging-section">
          <h3 className="section-title staging-title">✓ Staging Area</h3>
          {Object.keys(stagingArea).length === 0 ? (
            <p className="empty-message">비어있음</p>
          ) : (
            <div className="staged-files">
              {Object.keys(stagingArea).map(fileName => (
                <div key={fileName} className="staged-file">
                  + {fileName}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="status-section commits-section">
          <h3 className="section-title commits-title">
            <Clock className="section-icon" />
            최근 Commits
          </h3>
          {getAllCommits().length === 0 ? (
            <p className="empty-message">커밋 없음</p>
          ) : (
            <div className="commits-list">
              {getAllCommits().slice(-5).reverse().map(commit => (
                <div key={commit.hash} className="commit-item">
                  <div className="commit-hash">{commit.hash}</div>
                  <div className="commit-message">{commit.message}</div>
                  <div className="commit-timestamp">{commit.timestamp}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitStatus;