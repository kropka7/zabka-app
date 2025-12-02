import { Language } from '../../App';
import { X } from 'lucide-react';
import { teamConfig, TeamName } from '../utils/teamIcons';
import svgPaths from "../../imports/svg-uq84dhecq6";
import { Button } from '../ui';

interface FullDocumentPreviewProps {
  language: Language;
  theme?: 'light' | 'dark';
  onEdit?: () => void;
  onClose?: () => void;
  onPublish?: (messageId: string) => void;
  onRequestEdit?: (messageId: string) => void;
  team?: string;
  title?: string;
  date?: string;
  content?: string;
  messageId?: string;
  status?: 'draft' | 'published' | 'scheduled' | 'pending-approval' | 'ready-to-publish';
}

export function FullDocumentPreview({ 
  language,
  theme = 'dark',
  onEdit, 
  onClose,
  onPublish,
  onRequestEdit,
  team = 'HR',
  title = 'Nowa polityka urlopowa',
  date = '28 listopada 2024',
  content,
  messageId,
  status = 'published'
}: FullDocumentPreviewProps) {
  const translations = {
    pl: {
      title: 'Podgląd Dokumentu',
      edit: 'Edytuj',
      download: 'Pobierz',
      share: 'Udostępnij',
      print: 'Drukuj',
      close: 'Zamknij',
      publish: 'Opublikuj teraz',
      requestEdit: 'Prośba o edycję'
    },
    en: {
      title: 'Document Preview',
      edit: 'Edit',
      download: 'Download',
      share: 'Share',
      print: 'Print',
      close: 'Close',
      publish: 'Publish now',
      requestEdit: 'Request Edit'
    }
  };

  const t = translations[language];

  // Get team styling
  const teamStyle = teamConfig[team as TeamName] || teamConfig['Ogólny'];
  const TeamIcon = teamStyle.icon;

  // Handle click outside modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-8"
      onClick={handleBackdropClick}
    >
      <div className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl ${
        theme === 'dark' ? 'bg-[#0f1229]' : 'bg-white'
      }`}>
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start overflow-clip pb-0 pt-[24px] px-[24px] relative size-full">
          {/* Header with title and buttons */}
          <div className="content-stretch flex flex-col gap-[16px] items-end justify-end relative shrink-0 w-full">
            {/* Title and close button */}
            <div className="relative shrink-0 w-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-start justify-between relative w-full">
                <div className="content-stretch flex h-[36px] items-start relative shrink-0">
                  <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[30px] text-nowrap tracking-[0.3955px] whitespace-pre ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{t.title}</p>
                </div>
                {onClose && (
                  <button
                    onClick={onClose}
                    className={`box-border content-stretch flex items-center justify-center p-px relative rounded-[10px] shrink-0 size-[40px] transition-all group ${
                      theme === 'dark'
                        ? 'bg-[#1a1d3a] hover:bg-[#2a2d4a] active:bg-white'
                        : 'bg-gray-100 hover:bg-gray-200 active:bg-[#00B67A]'
                    }`}
                  >
                    <div aria-hidden="true" className="absolute border border-[rgba(0,182,122,0.3)] group-hover:border-[rgba(0,182,122,0.5)] group-active:border-[#00B67A] border-solid inset-0 pointer-events-none rounded-[10px] transition-all" />
                    <X className={`w-5 h-5 transition-colors ${
                      theme === 'dark'
                        ? 'text-[#99A1AF] group-hover:text-white group-active:text-[#0f1229]'
                        : 'text-gray-500 group-hover:text-gray-900 group-active:text-white'
                    }`} />
                  </button>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="h-[58px] relative shrink-0 w-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[58px] items-start relative">
                <div className="relative shrink-0 w-full">
                  <div className="size-full">
                    <div className="box-border content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
                      <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 w-full">
                        <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 flex-wrap">
                          {/* Print button */}
                          <button className={`h-[42px] relative rounded-[10px] shrink-0 transition-all group ${
                            theme === 'dark'
                              ? 'bg-[#1a1d3a] hover:bg-[#252840]'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`} style={{ width: 'auto', minWidth: '97px' }}>
                            <div aria-hidden="true" className="absolute border border-[rgba(0,182,122,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
                            <div className="flex items-center gap-2 px-3 h-full">
                              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                <g clipPath="url(#clip0_21_87)">
                                  <path d={svgPaths.p3397ec80} stroke={theme === 'dark' ? 'white' : '#1f2937'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                  <path d={svgPaths.p4adfe2c} stroke={theme === 'dark' ? 'white' : '#1f2937'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                  <path d={svgPaths.p27a74a00} stroke={theme === 'dark' ? 'white' : '#1f2937'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_21_87">
                                    <rect fill="white" height="16" width="16" />
                                  </clipPath>
                                </defs>
                              </svg>
                              <span className={`font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>{t.print}</span>
                            </div>
                          </button>

                          {/* Share button */}
                          <button className={`h-[42px] relative rounded-[10px] shrink-0 transition-all group ${
                            theme === 'dark'
                              ? 'bg-[#1a1d3a] hover:bg-[#252840]'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`} style={{ width: 'auto', minWidth: '128px' }}>
                            <div aria-hidden="true" className="absolute border border-[rgba(0,182,122,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
                            <div className="flex items-center gap-2 px-3 h-full">
                              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                <g>
                                  <path d={svgPaths.p185fb780} stroke={theme === 'dark' ? 'white' : '#1f2937'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                  <path d={svgPaths.p30ca5e80} stroke={theme === 'dark' ? 'white' : '#1f2937'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                  <path d={svgPaths.pac25b80} stroke={theme === 'dark' ? 'white' : '#1f2937'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                  <path d="M5.72668 9.00667L10.28 11.66" stroke={theme === 'dark' ? 'white' : '#1f2937'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                  <path d={svgPaths.p33364c70} stroke={theme === 'dark' ? 'white' : '#1f2937'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                </g>
                              </svg>
                              <span className={`font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>{t.share}</span>
                            </div>
                          </button>

                          {/* Download button */}
                          <button className={`h-[42px] relative rounded-[10px] shrink-0 transition-all group ${
                            theme === 'dark'
                              ? 'bg-[#1a1d3a] hover:bg-[#252840]'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`} style={{ width: 'auto', minWidth: '105px' }}>
                            <div aria-hidden="true" className="absolute border border-[rgba(0,182,122,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
                            <div className="flex items-center gap-2 px-3 h-full">
                              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                <g>
                                  <path d="M8 10V2" stroke={theme === 'dark' ? 'white' : '#1f2937'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                  <path d={svgPaths.p23ad1400} stroke={theme === 'dark' ? 'white' : '#1f2937'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                  <path d={svgPaths.p19411800} stroke={theme === 'dark' ? 'white' : '#1f2937'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                </g>
                              </svg>
                              <span className={`font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>{t.download}</span>
                            </div>
                          </button>

                          {/* Request Edit button - show for ready-to-publish and published */}
                          {(status === 'ready-to-publish' || status === 'published') && onRequestEdit && messageId && (
                            <button 
                              onClick={() => onRequestEdit(messageId)}
                              className="bg-[rgba(255,105,0,0.2)] h-[42px] relative rounded-[10px] shrink-0 hover:bg-orange-500/30 transition-all group"
                              style={{ width: 'auto', minWidth: '165px' }}
                            >
                              <div aria-hidden="true" className="absolute border border-[rgba(255,105,0,0.5)] border-solid inset-0 pointer-events-none rounded-[10px]" />
                              <div className="flex items-center gap-2 px-3 h-full">
                                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                  <g clipPath="url(#clip0_21_78)">
                                    <path d={svgPaths.pb7a5200} stroke="#FF8904" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                    <path d="M14.5693 1.43134L7.276 8.724" stroke="#FF8904" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_21_78">
                                      <rect fill="white" height="16" width="16" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#ff8904] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">{t.requestEdit}</span>
                              </div>
                            </button>
                          )}

                          {/* Publish button - show only for ready-to-publish */}
                          {status === 'ready-to-publish' && onPublish && messageId && (
                            <button
                              onClick={() => onPublish(messageId)}
                              className="bg-gradient-to-b from-[#00b67a] h-[40px] relative rounded-[10px] shrink-0 to-[#00a066] hover:from-[#00a066] hover:to-[#008f5a] transition-all"
                              style={{ width: 'auto', minWidth: '157px' }}
                            >
                              <div className="flex items-center gap-2 px-3 h-full">
                                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                  <g clipPath="url(#clip0_21_74)">
                                    <path d={svgPaths.p15b9e680} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                    <path d={svgPaths.p1f2c5400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_21_74">
                                      <rect fill="white" height="16" width="16" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span className={`font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre ${
                                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>{t.publish}</span>
                              </div>
                            </button>
                          )}

                          {/* Edit button - always visible but disabled for ready-to-publish and published */}
                          <button
                            onClick={onEdit}
                            disabled={status === 'ready-to-publish' || status === 'published' || status === 'pending-approval'}
                            className={`h-[40px] relative rounded-[10px] shrink-0 transition-all ${
                              status === 'ready-to-publish' || status === 'published' || status === 'pending-approval'
                                ? 'bg-[#1a1d3a] opacity-40 cursor-not-allowed'
                                : 'bg-gradient-to-b from-[#00b67a] to-[#00a066] hover:from-[#00a066] hover:to-[#008f5a] cursor-pointer'
                            }`}
                            style={{ width: 'auto', minWidth: '90px' }}
                          >
                            {(status === 'ready-to-publish' || status === 'published' || status === 'pending-approval') && (
                              <div aria-hidden="true" className="absolute border border-[rgba(0,182,122,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
                            )}
                            <div className="flex items-center gap-2 px-3 h-full">
                              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                <g clipPath="url(#clip0_edit)">
                                  <path d="M7.33333 2.66667H2.66667C2.31304 2.66667 1.97391 2.80714 1.72386 3.05719C1.47381 3.30724 1.33333 3.64638 1.33333 4V13.3333C1.33333 13.687 1.47381 14.0261 1.72386 14.2761C1.97391 14.5262 2.31304 14.6667 2.66667 14.6667H12C12.3536 14.6667 12.6928 14.5262 12.9428 14.2761C13.1929 14.0261 13.3333 13.687 13.3333 13.3333V8.66667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                  <path d="M12.3333 1.66667C12.5985 1.40145 12.9582 1.25244 13.3333 1.25244C13.7085 1.25244 14.0681 1.40145 14.3333 1.66667C14.5985 1.93188 14.7476 2.29158 14.7476 2.66667C14.7476 3.04176 14.5985 3.40145 14.3333 3.66667L8 10L5.33333 10.6667L6 8L12.3333 1.66667Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_edit">
                                    <rect fill="white" height="16" width="16" />
                                  </clipPath>
                                </defs>
                              </svg>
                              <span className={`font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>{t.edit}</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Document container */}
          <div className={`relative rounded-[16px] shrink-0 w-full mb-6 ${
            theme === 'dark'
              ? 'bg-gradient-to-b from-[#1a1d3a] to-[#252840]'
              : 'bg-gradient-to-b from-gray-100 to-gray-200'
          }`}>
            <div aria-hidden="true" className="absolute border border-[rgba(0,182,122,0.3)] border-solid inset-0 pointer-events-none rounded-[16px]" />
            <div className="size-full">
              <div className="box-border content-stretch flex flex-col items-start pb-px pt-[49px] px-[49px] relative w-full">
                {/* White document */}
                <div className="bg-white min-h-[600px] overflow-clip relative rounded-[14px] shrink-0 w-full">
                  {/* Vertical color accent bar */}
                  <div 
                    className="absolute h-full left-0 top-0 w-[6px]"
                    style={{ backgroundColor: teamStyle.color }}
                  />

                  {/* Header with team icon and title */}
                  <div className="absolute box-border content-stretch flex gap-[16px] items-start left-[48px] pl-[16px] pr-0 py-0 top-[48px] w-[calc(100%-96px)]">
                    {/* Team Icon Circle */}
                    <div 
                      className="relative rounded-[16px] shrink-0 size-[64px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                      style={{ 
                        backgroundColor: `${teamStyle.color}15`,
                      }}
                    >
                      <div aria-hidden="true" className="absolute border-2 border-solid inset-0 pointer-events-none rounded-[16px]" style={{ borderColor: `${teamStyle.color}40` }} />
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[2px] relative size-[64px]">
                        <TeamIcon 
                          className="w-8 h-8" 
                          style={{ color: teamStyle.color }}
                        />
                      </div>
                    </div>

                    {/* Title and metadata */}
                    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] items-start relative w-full">
                        <div className="relative shrink-0 w-full">
                          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic text-[30px] text-black tracking-[0.3955px]">{title}</p>
                        </div>
                        <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
                          <div 
                            className="h-[30px] relative rounded-[1.67772e+07px] shrink-0"
                            style={{ 
                              backgroundColor: `${teamStyle.color}20`,
                              minWidth: 'fit-content'
                            }}
                          >
                            <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[1.67772e+07px]" style={{ borderColor: `${teamStyle.color}30` }} />
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[30px] px-[13px] flex items-center">
                              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre" style={{ color: teamStyle.color }}>{team}</p>
                            </div>
                          </div>
                          <div className="h-[24px] relative shrink-0">
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#4a5565] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">•</p>
                          </div>
                          <div className="h-[24px] relative shrink-0">
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#4a5565] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">{date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute left-[48px] top-[190px] w-[calc(100%-96px)] pb-12">
                    <div className="pl-[16px]">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[16px] text-black tracking-[-0.3125px]">
                        {content || 'Zgodnie z najnowszymi wytycznymi RODO wprowadzamy zmiany w procedurach bezpieczeństwa danych osobowych. Dokument został zatwierdzony przez kierownictwo.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}