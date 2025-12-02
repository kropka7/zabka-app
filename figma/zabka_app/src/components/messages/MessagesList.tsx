import { useState, useEffect } from 'react';
import { Language, Message } from '../../App';
import { teamConfig, TeamName } from '../utils/teamIcons';
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  FileCheck,
  Clock,
  Calendar,
  Users,
  Tag,
  Mail,
  Globe,
  Presentation,
  Share2,
  MessageSquare,
  ChevronRight,
  CalendarClock,
  X,
  Send,
  CheckCircle
} from 'lucide-react';
import { Card, Input, Select, Button, EmptyState, StatusBadge, TeamBadge } from '../ui';

interface MessagesListProps {
  language: Language;
  theme?: 'light' | 'dark';
  messages: Message[];
  onViewMessage?: (messageId: string) => void;
  onEditMessage?: (messageId: string) => void;
  onScheduleMessage?: (messageId: string) => void;
  onDeleteMessage?: (messageId: string) => void;
  statusFilter?: 'all' | 'draft' | 'published' | 'scheduled';
  onStatusFilterChange?: (filter: 'all' | 'draft' | 'published' | 'scheduled') => void;
}

export function MessagesList({ 
  language,
  theme = 'dark',
  messages,
  onViewMessage,
  onEditMessage,
  onScheduleMessage,
  onDeleteMessage,
  statusFilter: initialStatusFilter = 'all',
  onStatusFilterChange
}: MessagesListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'scheduled'>(initialStatusFilter);
  const [teamFilter, setTeamFilter] = useState<string>('all');

  // Update local filter when external filter changes
  const handleStatusFilterChange = (filter: 'all' | 'draft' | 'published' | 'scheduled') => {
    setStatusFilter(filter);
    onStatusFilterChange?.(filter);
  };

  // Sync statusFilter with external prop changes
  useEffect(() => {
    setStatusFilter(initialStatusFilter);
  }, [initialStatusFilter]);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    handleStatusFilterChange('all');
    setTeamFilter('all');
  };

  // Check if any filters are active
  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'all' || teamFilter !== 'all';

  const translations = {
    pl: {
      title: 'Lista Komunikacji',
      search: 'Szukaj komunikatów...',
      filter: 'Filtruj',
      allStatuses: 'Wszystkie statusy',
      allTeams: 'Wszystkie zespoły',
      draft: 'Szkic',
      published: 'Opublikowane',
      scheduled: 'Zaplanowane',
      'pending-approval': 'Wysłane do akceptacji',
      'ready-to-publish': 'Gotowe do publikacji',
      title_col: 'Tytuł',
      team: 'Zespół',
      channels: 'Kanały',
      date: 'Data',
      status: 'Status',
      actions: 'Akcje',
      view: 'Podgląd',
      edit: 'Edytuj',
      schedule: 'Zaplanuj',
      delete: 'Usuń',
      noMessages: 'Brak komunikatów',
      noMessagesDesc: 'Nie znaleziono żadnych komunikatów pasujących do filtrów',
      exportAll: 'Eksportuj wszystkie',
      clearFilters: 'Wyczyść filtry'
    },
    en: {
      title: 'Messages List',
      search: 'Search messages...',
      filter: 'Filter',
      allStatuses: 'All statuses',
      allTeams: 'All teams',
      draft: 'Draft',
      published: 'Published',
      scheduled: 'Scheduled',
      'pending-approval': 'Pending Approval',
      'ready-to-publish': 'Ready to Publish',
      title_col: 'Title',
      team: 'Team',
      channels: 'Channels',
      date: 'Date',
      status: 'Status',
      actions: 'Actions',
      view: 'View',
      edit: 'Edit',
      schedule: 'Schedule',
      delete: 'Delete',
      noMessages: 'No messages',
      noMessagesDesc: 'No messages found matching your filters',
      exportAll: 'Export all',
      clearFilters: 'Clear filters'
    }
  };

  const t = translations[language];

  // Filter messages
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesTeam = teamFilter === 'all' || message.teams.includes(teamFilter);
    
    return matchesSearch && matchesStatus && matchesTeam;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-[#00B67A]/20 text-[#00B67A] border-[#00B67A]/30';
      case 'draft':
        return theme === 'dark' 
          ? 'bg-gray-500/20 text-gray-400 border-gray-500/30'
          : 'bg-gray-200 text-gray-600 border-gray-300';
      case 'scheduled':
        return theme === 'dark'
          ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
          : 'bg-purple-100 text-purple-700 border-purple-300';
      case 'pending-approval':
        return theme === 'dark'
          ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
          : 'bg-orange-100 text-orange-700 border-orange-300';
      case 'ready-to-publish':
        return theme === 'dark'
          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
          : 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return theme === 'dark'
          ? 'bg-gray-500/20 text-gray-400'
          : 'bg-gray-200 text-gray-600';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'intranet':
        return <Globe className="w-4 h-4" />;
      case 'release-notes':
        return <FileCheck className="w-4 h-4" />;
      case 'presentation':
        return <Presentation className="w-4 h-4" />;
      case 'teams-sharepoint':
        return <MessageSquare className="w-4 h-4" />;
      case 'social-media':
        return <Share2 className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const teams = ['HR', 'Dział Prawny', 'IT & Tech', 'Marketing', 'Ogólny'];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{t.title}</h1>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{filteredMessages.length} {t.title.toLowerCase()}</p>
          </div>
          {/* Temporarily hidden - Export All button
          <button 
            className="flex items-center justify-center gap-2 bg-[#00B67A]/20 hover:bg-[#00B67A]/30 text-[#00B67A] px-4 py-2.5 rounded-[8px] transition-all border border-[#00B67A]/30 focus:outline-none focus:ring-2 focus:ring-[#00B67A] min-h-[44px]"
            aria-label={t.exportAll}
          >
            <Download className="w-4 h-4" />
            <span className="font-medium">{t.exportAll}</span>
          </button>
          */}
        </div>

        {/* Filters */}
        <Card theme={theme} padding="md" className={`mb-6 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840] border-[#00B67A]/30'
            : 'bg-gradient-to-br from-gray-50 to-white'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Search */}
            <div className="md:col-span-1 relative">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search}
                icon={<Search className="w-5 h-5" />}
                theme={theme}
                fullWidth
                className={theme === 'dark' ? 'bg-[#0F1229] border-[#00B67A]/30' : ''}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-[#00B67A] rounded p-1 ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div>
              <Select
                value={statusFilter}
                onChange={(e) => handleStatusFilterChange(e.target.value as any)}
                theme={theme}
                fullWidth
                className={theme === 'dark' ? 'bg-[#0F1229] border-[#00B67A]/30' : ''}
                options={[
                  { value: 'all', label: t.allStatuses },
                  { value: 'draft', label: t.draft },
                  { value: 'published', label: t.published },
                  { value: 'scheduled', label: t.scheduled }
                ]}
              />
            </div>

            {/* Team Filter */}
            <div>
              <Select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                theme={theme}
                fullWidth
                className={theme === 'dark' ? 'bg-[#0F1229] border-[#00B67A]/30' : ''}
                options={[
                  { value: 'all', label: t.allTeams },
                  ...teams.map(team => ({ value: team, label: team }))
                ]}
              />
            </div>
          </div>

          {/* Clear Filters Button - Only visible when filters are active */}
          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                theme={theme}
                icon={<X className="w-4 h-4" />}
                onClick={clearAllFilters}
              >
                {t.clearFilters}
              </Button>
            </div>
          )}
        </Card>

        {/* Messages Table */}
        {filteredMessages.length === 0 ? (
          <Card theme={theme} padding="lg" className={
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840] border-[#00B67A]/30'
              : 'bg-gradient-to-br from-gray-50 to-gray-100'
          }>
            <EmptyState
              icon={<MessageSquare className="w-12 h-12" />}
              title={t.noMessages}
              description={t.noMessagesDesc}
              theme={theme}
            />
          </Card>
        ) : (
          <>
            {/* Desktop Table View - hidden on mobile */}
            <Card theme={theme} padding="none" className={`hidden lg:block overflow-hidden ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840] border-[#00B67A]/30'
                : 'bg-gradient-to-br from-gray-50 to-white'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#00B67A]/20">
                      <th className={`text-left px-6 py-4 font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{t.title_col}</th>
                      <th className={`text-left px-6 py-4 font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{t.team}</th>
                      <th className={`text-left px-6 py-4 font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{t.channels}</th>
                      <th className={`text-left px-6 py-4 font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{t.date}</th>
                      <th className={`text-left px-6 py-4 font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{t.status}</th>
                      <th className={`text-right px-6 py-4 font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMessages.map((message) => {
                      const teamStyle = teamConfig[message.teams[0] as TeamName] || teamConfig['Ogólny'];
                      const TeamIcon = teamStyle.icon;
                      
                      return (
                        <tr 
                          key={message.id}
                          className="border-b border-[#00B67A]/10 hover:bg-[#00B67A]/5 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00B67A] focus:ring-inset"
                          onClick={() => onViewMessage?.(message.id)}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onViewMessage?.(message.id);
                            }
                          }}
                          role="button"
                          aria-label={`${t.view} ${message.title}`}
                        >
                          {/* Title */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {/* Team icon with color bar */}
                              <div className="relative">
                                <div 
                                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{ 
                                    backgroundColor: `${teamStyle.color}15`,
                                    border: `1.5px solid ${teamStyle.color}40`
                                  }}
                                >
                                  <TeamIcon 
                                    className="w-5 h-5" 
                                    style={{ color: teamStyle.color }}
                                  />
                                </div>
                                <div 
                                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                                  style={{ backgroundColor: teamStyle.color }}
                                />
                              </div>
                              <div>
                                <p className={`font-medium mb-1 text-[14px] ${
                                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>{message.title.replace(/\s*\[.*?\]\s*/g, '').trim()}</p>
                                <p className={`text-sm line-clamp-1 text-[12px] ${
                                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                }`}>{message.content}</p>
                              </div>
                            </div>
                          </td>

                          {/* Team */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              {message.teams.map((team, index) => {
                                const currentTeamStyle = teamConfig[team as TeamName];
                                return (
                                  <span 
                                    key={index}
                                    className="text-xs font-medium px-2 py-0.5 rounded-md whitespace-nowrap"
                                    style={{
                                      backgroundColor: `${currentTeamStyle.color}20`,
                                      color: currentTeamStyle.color,
                                      border: `1px solid ${currentTeamStyle.color}30`
                                    }}
                                  >
                                    {team}
                                  </span>
                                );
                              })}
                            </div>
                          </td>

                          {/* Channels */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              {message.channels.map((channel, idx) => (
                                <div
                                  key={idx}
                                  className="w-6 h-6 bg-[#00B67A]/20 rounded-lg flex items-center justify-center text-[#00B67A] border border-[#00B67A]/30"
                                  title={channel}
                                >
                                  {getChannelIcon(channel)}
                                </div>
                              ))}
                            </div>
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4">
                            <div className={`flex items-center gap-2 ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              <span className="text-[12px]">
                                {message.createdAt.toLocaleDateString(language === 'pl' ? 'pl-PL' : 'en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <StatusBadge 
                              status={message.status as any} 
                              size="sm" 
                              theme={theme}
                              language={language}
                            />
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onViewMessage?.(message.id);
                                }}
                                className={`p-2 hover:bg-[#00B67A]/20 rounded-[8px] transition-all hover:text-[#00B67A] focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                }`}
                                title={t.view}
                                aria-label={`${t.view} ${message.title}`}
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditMessage?.(message.id);
                                }}
                                disabled={message.status === 'published' || message.status === 'ready-to-publish' || message.status === 'pending-approval'}
                                className={`p-2 rounded-[8px] transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                                  message.status === 'published' || message.status === 'ready-to-publish' || message.status === 'pending-approval'
                                    ? `opacity-40 cursor-not-allowed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`
                                    : `hover:bg-[#00B67A]/20 hover:text-[#00B67A] ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`
                                }`}
                                title={
                                  message.status === 'published' || message.status === 'ready-to-publish' || message.status === 'pending-approval'
                                    ? (language === 'pl' ? 'Wymagana prośba o odblokowanie' : 'Request unlock required')
                                    : t.edit
                                }
                                aria-label={`${t.edit} ${message.title}`}
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onScheduleMessage?.(message.id);
                                }}
                                className={`p-2 hover:bg-[#00B67A]/20 rounded-[8px] transition-all hover:text-[#00B67A] focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                }`}
                                title={t.schedule}
                                aria-label={`${t.schedule} ${message.title}`}
                              >
                                <Clock className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteMessage?.(message.id);
                                }}
                                className={`p-2 hover:bg-red-500/20 rounded-[8px] transition-all focus:outline-none focus:ring-2 focus:ring-red-500 ${
                                  theme === 'dark' 
                                    ? 'text-gray-300 hover:text-red-400' 
                                    : 'text-gray-600 hover:text-red-600'
                                }`}
                                title={t.delete}
                                aria-label={`${t.delete} ${message.title}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <ChevronRight className={`w-4 h-4 ml-2 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                              }`} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Mobile Card View - visible on mobile only */}
            <div className="lg:hidden space-y-4">
              {filteredMessages.map((message) => {
                const teamStyle = teamConfig[message.teams[0] as TeamName] || teamConfig['Ogólny'];
                const TeamIcon = teamStyle.icon;
                
                return (
                  <Card
                    key={message.id}
                    theme={theme}
                    padding="md"
                    hover
                    onClick={() => onViewMessage?.(message.id)}
                    className={`cursor-pointer relative overflow-hidden ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-[#1A1D3A] to-[#252840] border-[#00B67A]/30 hover:border-[#00B67A]/50'
                        : 'bg-gradient-to-br from-gray-50 to-white'
                    }`}
                  >
                    {/* Vertical color bar */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1.5"
                      style={{ backgroundColor: teamStyle.color }}
                    />

                    {/* Header with icon and status */}
                    <div className="flex items-start justify-between mb-3 pl-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ 
                            backgroundColor: `${teamStyle.color}15`,
                            border: `2px solid ${teamStyle.color}40`
                          }}
                        >
                          <TeamIcon 
                            className="w-6 h-6" 
                            style={{ color: teamStyle.color }}
                          />
                        </div>
                        <div>
                          <h3 className={`font-medium text-lg mb-1 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{message.title}</h3>
                          <TeamBadge team={message.teams[0] as any} size="sm" theme={theme} />
                        </div>
                      </div>

                      <StatusBadge status={message.status as any} size="sm" theme={theme} language={language} />
                    </div>

                    {/* Content preview */}
                    <p className={`text-sm mb-4 pl-3 line-clamp-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>{message.content}</p>

                    {/* Meta info */}
                    <div className="flex items-center justify-between pl-3">
                      <div className={`flex items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <span>
                          {message.createdAt.toLocaleDateString(language === 'pl' ? 'pl-PL' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Channels */}
                      <div className="flex items-center gap-2">
                        {message.channels.slice(0, 3).map((channel, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 bg-[#00B67A]/20 rounded-lg flex items-center justify-center text-[#00B67A] border border-[#00B67A]/30"
                            title={channel}
                          >
                            {getChannelIcon(channel)}
                          </div>
                        ))}
                        {message.channels.length > 3 && (
                          <span className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>+{message.channels.length - 3}</span>
                        )}
                      </div>
                    </div>

                    {/* Mobile Actions - Touch friendly (min 44x44px) */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#00B67A]/20 pl-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewMessage?.(message.id);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 min-h-[44px] bg-[#00B67A]/20 hover:bg-[#00B67A]/30 rounded-[8px] transition-all text-[#00B67A] focus:outline-none focus:ring-2 focus:ring-[#00B67A]"
                        aria-label={`${t.view} ${message.title}`}
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">{t.view}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditMessage?.(message.id);
                        }}
                        disabled={message.status === 'published' || message.status === 'ready-to-publish' || message.status === 'pending-approval'}
                        className={`min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-[#00B67A]/20 rounded-[8px] transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                          theme === 'dark' ? 'bg-[#0F1229]' : 'bg-white'
                        } ${
                          message.status === 'published' || message.status === 'ready-to-publish' || message.status === 'pending-approval'
                            ? `opacity-40 cursor-not-allowed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`
                            : theme === 'dark'
                              ? 'text-gray-300 hover:text-[#00B67A] border border-[#00B67A]/30'
                              : 'text-gray-600 hover:text-[#00B67A] border border-gray-300'
                        }`}
                        title={
                          message.status === 'published' || message.status === 'ready-to-publish' || message.status === 'pending-approval'
                            ? (language === 'pl' ? 'Wymagana prośba o odblokowanie' : 'Request unlock required')
                            : t.edit
                        }
                        aria-label={`${t.edit} ${message.title}`}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onScheduleMessage?.(message.id);
                        }}
                        className={`min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-[#00B67A]/20 rounded-[8px] transition-all hover:text-[#00B67A] border focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                          theme === 'dark'
                            ? 'bg-[#0F1229] text-gray-300 border-[#00B67A]/30'
                            : 'bg-white text-gray-600 border-gray-300'
                        }`}
                        aria-label={`${t.schedule} ${message.title}`}
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteMessage?.(message.id);
                        }}
                        className={`min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-red-500/20 rounded-[8px] transition-all border hover:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                          theme === 'dark'
                            ? 'bg-[#0F1229] text-gray-300 hover:text-red-400 border-[#00B67A]/30'
                            : 'bg-white text-gray-600 hover:text-red-600 border-gray-300'
                        }`}
                        aria-label={`${t.delete} ${message.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}