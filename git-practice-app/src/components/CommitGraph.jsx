// components/CommitGraph.jsx
import React from 'react';
import { GitMerge } from 'lucide-react';
import '../styles/CommitGraph.css';

const CommitGraph = ({ branches }) => {
  const renderCommitGraph = () => {
    const allCommits = [];
    Object.keys(branches).forEach(branchName => {
      branches[branchName].forEach(commit => {
        if (!allCommits.find(c => c.hash === commit.hash)) {
          allCommits.push({ ...commit, branches: [branchName] });
        }
      });
    });
    return allCommits.slice(-10).reverse();
  };

  const commits = renderCommitGraph();

  return (
    <div className="card commit-graph">
      <h2 className="card-title">
        <GitMerge className="title-icon graph-icon" />
        커밋 그래프
      </h2>
      
      <div className="graph-container">
        {commits.length === 0 ? (
          <p className="empty-message">커밋이 없습니다.</p>
        ) : (
          commits.map((commit, idx) => (
            <div key={commit.hash} className="graph-item">
              <div className="graph-line">
                <div className="graph-node"></div>
                {idx < commits.length - 1 && <div className="graph-connector"></div>}
              </div>
              <div className="graph-content">
                <div className="graph-hash">{commit.hash}</div>
                <div className="graph-message">{commit.message}</div>
                <div className="graph-branch">{commit.branch}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommitGraph;