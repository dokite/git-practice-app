// components/FileManager.jsx
import React, { useState } from 'react';
import { FileText, Edit2, Trash2, Save, X } from 'lucide-react';
import '../styles/FileManager.css';

const FileManager = ({ 
  files, 
  setFiles, 
  stagingArea,
  lastCommittedFiles,
  addToTerminal,
  tutorialMode,
  tutorialStep,
  setTutorialStep
}) => {
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [editingFile, setEditingFile] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleCreateFile = () => {
    if (!newFileName.trim()) {
      addToTerminal('error', '❌ 파일 이름을 입력하세요.');
      return;
    }
    if (files[newFileName]) {
      addToTerminal('error', `❌ 파일 "${newFileName}"이(가) 이미 존재합니다.`);
      return;
    }
    setFiles(prev => ({ ...prev, [newFileName]: newFileContent }));
    addToTerminal('info', `✅ 파일 "${newFileName}"이(가) 생성되었습니다.`);
    setNewFileName('');
    setNewFileContent('');
    if (tutorialMode && tutorialStep === 1) setTutorialStep(2);
  };

  const startEdit = (fileName) => {
    setEditingFile(fileName);
    setEditContent(files[fileName]);
  };

  const cancelEdit = () => {
    setEditingFile(null);
    setEditContent('');
  };

  const saveEdit = () => {
    if (editingFile) {
      setFiles(prev => ({ ...prev, [editingFile]: editContent }));
      addToTerminal('info', `✏️  파일 "${editingFile}"이(가) 수정되었습니다.`);
      setEditingFile(null);
      setEditContent('');
    }
  };

  const handleDeleteFile = (fileName) => {
    const newFiles = { ...files };
    delete newFiles[fileName];
    setFiles(newFiles);
    addToTerminal('warning', `🗑️  파일 "${fileName}"이(가) 삭제되었습니다.`);
  };

  const getFileStatus = (fileName) => {
    const current = files[fileName];
    const staged = stagingArea[fileName];
    const committed = lastCommittedFiles[fileName];

    if (committed === undefined) {
      return { status: 'untracked', label: '?', color: 'red' };
    }
    if (staged && staged === current) {
      return { status: 'staged', label: '✓', color: 'green' };
    }
    if (current !== committed) {
      return { status: 'modified', label: 'M', color: 'yellow' };
    }
    return { status: 'committed', label: '✓', color: 'green' };
  };

  return (
    <div className="card file-manager">
      <h2 className="card-title">
        <FileText className="title-icon" />
        파일 관리
      </h2>

      <div className="file-form">
        <input
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          placeholder="파일 이름 (예: README.md)"
          className="input-field"
        />
        <textarea
          value={newFileContent}
          onChange={(e) => setNewFileContent(e.target.value)}
          placeholder="파일 내용"
          rows="4"
          className="input-field textarea-field"
        />
        <button onClick={handleCreateFile} className="btn-primary">
          파일 생성
        </button>
      </div>

      <div className="file-list-container">
        <h3 className="file-list-title">📁 작업 디렉토리:</h3>
        <div className="file-list">
          {Object.keys(files).length === 0 ? (
            <p className="empty-message">파일이 없습니다.</p>
          ) : (
            Object.keys(files).map(fileName => {
              const fileStatus = getFileStatus(fileName);
              return (
                <div key={fileName} className="file-item">
                  {editingFile === fileName ? (
                    <div className="file-edit-container">
                      <div className="file-edit-header">
                        <span className="file-name">📄 {fileName}</span>
                        <div className="edit-actions">
                          <button onClick={saveEdit} className="edit-btn save-btn" title="저장">
                            <Save className="action-icon" />
                          </button>
                          <button onClick={cancelEdit} className="edit-btn cancel-btn" title="취소">
                            <X className="action-icon" />
                          </button>
                        </div>
                      </div>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="file-edit-textarea"
                        rows="5"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <>
                      <div className="file-info">
                        <span className="file-name">
                          📄 {fileName}
                        </span>
                        <span className={`file-status-badge ${fileStatus.status}`}>
                          {fileStatus.label}
                        </span>
                      </div>
                      <div className="file-actions">
                        <button
                          onClick={() => startEdit(fileName)}
                          className="action-button"
                          title="편집"
                        >
                          <Edit2 className="action-icon edit" />
                        </button>
                        <button
                          onClick={() => handleDeleteFile(fileName)}
                          className="action-button"
                          title="삭제"
                        >
                          <Trash2 className="action-icon delete" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="file-status-legend">
        <h4 className="legend-title">파일 상태:</h4>
        <div className="legend-items">
          <span className="legend-item">
            <span className="legend-badge untracked">?</span> Untracked (새 파일)
          </span>
          <span className="legend-item">
            <span className="legend-badge modified">M</span> Modified (수정됨)
          </span>
          <span className="legend-item">
            <span className="legend-badge staged">✓</span> Staged/Committed
          </span>
        </div>
      </div>
    </div>
  );
};

export default FileManager;