import { Language } from '../../App';
import { PendingDocument } from '../../App';
import { 
  CheckCircle, 
  Clock, 
  User, 
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Send,
  FileText,
  XCircle,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { useState } from 'react';
import { TeamBadge } from '../ui';

interface ApprovalFlowProps {
  language: Language;
  theme?: 'light' | 'dark';
  pendingDocuments: PendingDocument[];
  onApprove: (documentId: number) => void;
  onReject: (documentId: number, reason?: string) => void;
}

export function ApprovalFlow({ language, theme = 'dark', pendingDocuments, onApprove, onReject }: ApprovalFlowProps) {
  const [comment, setComment] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);
  const [approvals, setApprovals] = useState([
    { 
      name: 'Anna Kowalska', 
      role: 'HR Manager', 
      status: 'approved', 
      date: '2024-11-28 14:32', 
      comment: 'Dokument wygląda dobrze, wszystkie zmiany są zgodne z nową polityką. Zatwierdzam.' 
    },
    { 
      name: 'Jan Nowak', 
      role: 'Legal Department', 
      status: 'pending', 
      date: null, 
      comment: null, 
      isCurrentUser: true 
    }
  ]);

  const translations = {
    pl: {
      title: 'Akceptacja Dokumentów',
      description: 'Przejrzyj i zaakceptuj dokument',
      pending: 'Oczekuje',
      approved: 'Zaakceptowane',
      rejected: 'Odrzucone',
      comments: 'Komentarze',
      approve: 'Zaakceptuj',
      reject: 'Odrzuć',
      addComment: 'Dodaj komentarz...',
      sendComment: 'Wyślij',
      preview: 'Podgląd dokumentu',
      documentTitle: 'Tytuł dokumentu',
      documentContent: 'Treść',
      team: 'Zespół',
      channels: 'Kanały',
      awaitingApproval: 'Status akceptacji',
      yourAction: 'Twoja akcja',
      approvalTimeline: 'Ścieżka akceptacji',
      togglePreview: 'Pokaż/Ukryj podgląd',
      documentsAwaitingApproval: 'Dokumenty oczekujące na akceptację',
      viewDetails: 'Przejrzyj',
      backToList: 'Powrót do listy',
      submittedBy: 'Wysłane przez',
      submittedDate: 'Data wysłania',
      noDocuments: 'Brak dokumentów oczekujących na akceptację'
    },
    en: {
      title: 'Document Approval',
      description: 'Review and approve document',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      comments: 'Comments',
      approve: 'Approve',
      reject: 'Reject',
      addComment: 'Add comment...',
      sendComment: 'Send',
      preview: 'Document Preview',
      documentTitle: 'Document Title',
      documentContent: 'Content',
      team: 'Team',
      channels: 'Channels',
      awaitingApproval: 'Approval Status',
      yourAction: 'Your Action',
      approvalTimeline: 'Approval Timeline',
      togglePreview: 'Show/Hide Preview',
      documentsAwaitingApproval: 'Documents Awaiting Approval',
      viewDetails: 'Review',
      backToList: 'Back to List',
      submittedBy: 'Submitted by',
      submittedDate: 'Submission date',
      noDocuments: 'No documents awaiting approval'
    }
  };

  const t = translations[language];

  // Get selected document
  const selectedDocument = selectedDocumentId 
    ? pendingDocuments.find(doc => doc.id === selectedDocumentId)
    : null;

  const handleApprove = () => {
    if (!selectedDocumentId) return;
    
    const now = new Date();
    const dateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    setApprovals(prev => prev.map(approval => 
      approval.isCurrentUser 
        ? { 
            ...approval, 
            status: 'approved', 
            date: dateString,
            comment: comment.trim() || 'Zatwierdzam dokument.'
          }
        : approval
    ));
    setComment('');
    
    // Call parent handler to update app state
    onApprove(selectedDocumentId);
    
    // Reset selection to go back to list
    setSelectedDocumentId(null);
  };

  const handleReject = () => {
    if (!selectedDocumentId) return;
    
    if (confirm('Czy na pewno chcesz odrzucić ten dokument?')) {
      const now = new Date();
      const dateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      setApprovals(prev => prev.map(approval => 
        approval.isCurrentUser 
          ? { 
              ...approval, 
              status: 'rejected', 
              date: dateString,
              comment: comment.trim() || 'Dokument odrzucony.'
            }
          : approval
      ));
      
      const rejectionReason = comment.trim() || 'Dokument odrzucony.';
      setComment('');
      
      // Call parent handler to update app state
      onReject(selectedDocumentId, rejectionReason);
      
      // Reset selection to go back to list
      setSelectedDocumentId(null);
    }
  };

  const handleSendComment = () => {
    if (comment.trim()) {
      setApprovals(prev => prev.map(approval => 
        approval.isCurrentUser 
          ? { ...approval, comment: comment.trim() }
          : approval
      ));
      setComment('');
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            {selectedDocumentId && (
              <button
                onClick={() => setSelectedDocumentId(null)}
                className={`flex items-center gap-2 hover:text-[#00B67A] transition-colors ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                {t.backToList}
              </button>
            )}
          </div>
          <h1 className={`text-3xl mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{t.title}</h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{selectedDocumentId ? t.description : t.documentsAwaitingApproval}</p>
        </div>

        {!selectedDocumentId ? (
          // Documents List View
          <div className="space-y-4">
            {pendingDocuments.length === 0 ? (
              <div className={`rounded-2xl border p-12 text-center ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840] border-[#00B67A]/30'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
              }`}>
                <Clock className={`w-16 h-16 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`} />
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{t.noDocuments}</p>
              </div>
            ) : (
              pendingDocuments.map(doc => (
                  <div
                    key={doc.id}
                    className={`rounded-2xl border p-6 hover:border-[#00B67A] transition-all cursor-pointer group ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840] border-[#00B67A]/30'
                        : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
                    }`}
                    onClick={() => setSelectedDocumentId(doc.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <FileText className="w-6 h-6 text-[#00B67A]" />
                          <h3 className={`text-xl ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{doc.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <TeamBadge 
                            team={doc.team as any} 
                            theme={theme}
                            size="sm"
                          />
                          {doc.channels.map(channel => (
                            <span 
                              key={channel}
                              className="px-3 py-1 bg-[#00B67A]/10 text-[#00B67A] rounded-full text-sm"
                            >
                              {channel}
                            </span>
                          ))}
                        </div>
                        <div className={`flex items-center gap-6 text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{t.submittedBy}: {doc.submittedBy}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{doc.submittedDate}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        className="flex items-center gap-2 bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white px-6 py-3 rounded-[8px] transition-all group-hover:scale-105"
                      >
                        {t.viewDetails}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        ) : (
          // Document Detail View
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Document Preview */}
            <div className="lg:col-span-2">
              {/* Document Preview Card */}
              <div className={`rounded-2xl border p-6 mb-6 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840] border-[#00B67A]/30'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#00B67A]" />
                    <h2 className={`text-xl ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{t.preview}</h2>
                  </div>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className={`hover:text-[#00B67A] transition-colors ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>

                {showPreview && (
                  <div className="space-y-4">
                    {/* Document Title */}
                    <div>
                      <h3 className={`text-2xl mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{selectedDocument?.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedDocument && (
                          <TeamBadge 
                            team={selectedDocument.team as any} 
                            theme={theme}
                            size="sm"
                          />
                        )}
                        {selectedDocument?.channels.map(channel => (
                          <span 
                            key={channel}
                            className="px-3 py-1 bg-[#00B67A]/20 text-[#00B67A] rounded-full text-sm"
                          >
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Document Content */}
                    <div className={`rounded-xl p-6 ${
                      theme === 'dark' ? 'bg-[#0F1229]' : 'bg-gray-50'
                    }`}>
                      <p className={`whitespace-pre-line leading-relaxed ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {selectedDocument?.content}
                      </p>
                    </div>

                    {/* Social Platforms if applicable */}
                    {selectedDocument?.channels.includes('Social Media') && selectedDocument?.socialPlatforms.length > 0 && (
                      <div className={`rounded-xl p-4 ${
                        theme === 'dark' ? 'bg-[#0F1229]' : 'bg-gray-50'
                      }`}>
                        <p className={`text-sm mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>Platformy social media:</p>
                        <div className="flex gap-2">
                          {selectedDocument?.socialPlatforms.map(platform => (
                            <span 
                              key={platform}
                              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className={`rounded-2xl border p-6 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840] border-[#00B67A]/30'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
              }`}>
                <h2 className={`text-xl mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{t.yourAction}</h2>
                <div className="flex gap-4">
                  <button
                    onClick={handleApprove}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white px-6 py-3 rounded-[8px] transition-all"
                  >
                    <ThumbsUp className="w-5 h-5" />
                    {t.approve}
                  </button>
                  <button
                    onClick={handleReject}
                    className={`flex-1 flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 px-6 py-3 rounded-[8px] transition-all ${
                      theme === 'dark' 
                        ? 'text-red-400 hover:text-red-300' 
                        : 'text-red-700 hover:text-red-800'
                    }`}
                  >
                    <ThumbsDown className="w-5 h-5" />
                    {t.reject}
                  </button>
                </div>

                {/* Comments Section */}
                <div className={`mt-6 pt-6 border-t ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
                }`}>
                  <h3 className={`mb-3 flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <MessageSquare className="w-5 h-5 text-[#00B67A]" />
                    {t.comments}
                  </h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className={`flex-1 border rounded-[8px] pl-3 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#00B67A] text-[14px] ${
                        theme === 'dark'
                          ? 'bg-[#0F1229] border-[#00B67A]/30 text-white placeholder-gray-500'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder={t.addComment}
                      aria-label={t.addComment}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && comment.trim()) {
                          handleSendComment();
                        }
                      }}
                    />
                    <button
                      onClick={handleSendComment}
                      disabled={!comment.trim()}
                      className="bg-[#00B67A] hover:bg-[#00A066] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-[8px] transition-all flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      {t.sendComment}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Approval Timeline */}
            <div className="lg:col-span-1">
              <div className={`rounded-2xl border p-6 sticky top-8 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840] border-[#00B67A]/30'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
              }`}>
                <h2 className={`text-xl mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{t.approvalTimeline}</h2>
                <div className="space-y-4">
                  {approvals.map((approval, index) => (
                    <div key={index} className="relative">
                      {/* Timeline Line */}
                      {index < approvals.length - 1 && (
                        <div className={`absolute left-6 top-12 bottom-0 w-0.5 ${
                          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                        }`} />
                      )}
                      
                      <div className={`rounded-xl p-4 ${
                        theme === 'dark' ? 'bg-[#0F1229]' : 'bg-gray-50'
                      } ${approval.isCurrentUser ? 'ring-2 ring-[#00B67A]' : ''}`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            approval.status === 'approved' ? 'bg-[#00B67A]/20' :
                            approval.status === 'rejected' ? 'bg-red-500/20' :
                            approval.isCurrentUser ? 'bg-yellow-500/20' :
                            'bg-gray-700'
                          }`}>
                            <User className={`w-6 h-6 ${
                              approval.status === 'approved' ? 'text-[#00B67A]' :
                              approval.status === 'rejected' ? theme === 'dark' ? 'text-red-400' : 'text-red-600' :
                              approval.isCurrentUser ? theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700' :
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className={`font-medium ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>{approval.name}</h3>
                              {approval.status === 'approved' && (
                                <CheckCircle className="w-5 h-5 text-[#00B67A] flex-shrink-0" />
                              )}
                              {approval.status === 'rejected' && (
                                <XCircle className={`w-5 h-5 flex-shrink-0 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                              )}
                              {approval.status === 'pending' && (
                                <Clock className={`w-5 h-5 flex-shrink-0 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`} />
                              )}
                            </div>
                            <p className={`text-sm mb-1 ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>{approval.role}</p>
                            {approval.isCurrentUser && (
                              <span className={`inline-block px-2 py-0.5 bg-yellow-500/20 rounded text-xs mb-2 ${
                                theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'
                              }`}>
                                To Ty
                              </span>
                            )}
                            {approval.date && (
                              <p className={`text-xs mb-2 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                              }`}>{approval.date}</p>
                            )}
                            {approval.comment && (
                              <div className={`rounded-lg p-3 mt-2 ${
                                theme === 'dark' ? 'bg-[#1A1D3A]' : 'bg-gray-100'
                              }`}>
                                <p className={`text-sm ${
                                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                }`}>{approval.comment}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}