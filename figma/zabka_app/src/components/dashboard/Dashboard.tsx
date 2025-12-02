import { Language, Theme } from "../../App";
import { Message } from "../../App";
import {
  MessageSquare,
  FileCheck,
  Clock,
  TrendingUp,
  Mail,
  Globe,
  Presentation,
  Users,
  BarChart3,
} from "lucide-react";
import {
  Card,
  CardHeader,
  StatCard,
  ProgressBar,
  StatusBadge,
} from "../ui";

interface DashboardProps {
  language: Language;
  theme: Theme;
  messages: Message[];
  onNavigate?: (screen: string) => void;
  onStatClick?: (
    filter: "all" | "draft" | "published" | "scheduled",
  ) => void;
  onCreateDocument?: () => void;
}

export function Dashboard({
  language,
  theme,
  messages,
  onNavigate,
  onStatClick,
}: DashboardProps) {
  const translations = {
    pl: {
      title: "Dashboard",
      welcome: "Witaj ponownie",
      overview: "Przegląd",
      totalMessages: "Wszystkie komunikaty",
      published: "Opublikowane",
      drafts: "Szkice",
      scheduled: "Zaplanowane",
      recentActivity: "Ostatnia aktywność",
      channelDistribution: "Dystrybucja kanałów",
      teamActivity: "Aktywność zespołów",
      viewAll: "Zobacz wszystkie",
      newDocument: "Nowy dokument",
      thisWeek: "W tym tygodniu",
      thisMonth: "W tym miesiącu",
      vsLastWeek: "vs poprzedni tydzień",
    },
    en: {
      title: "Dashboard",
      welcome: "Welcome back",
      overview: "Overview",
      totalMessages: "Total messages",
      published: "Published",
      drafts: "Drafts",
      scheduled: "Scheduled",
      recentActivity: "Recent activity",
      channelDistribution: "Channel distribution",
      teamActivity: "Team activity",
      viewAll: "View all",
      newDocument: "New document",
      thisWeek: "This week",
      thisMonth: "This month",
      vsLastWeek: "vs last week",
    },
  };

  const t = translations[language];

  // Calculate dynamic stats from messages
  const totalCount = messages.length;
  const publishedCount = messages.filter(
    (m) => m.status === "published",
  ).length;
  const draftCount = messages.filter(
    (m) => m.status === "draft",
  ).length;
  const scheduledCount = messages.filter(
    (m) => m.status === "scheduled",
  ).length;

  const stats = [
    {
      label: t.totalMessages,
      value: totalCount.toString(),
      change: "+15",
      trend: "up",
      icon: MessageSquare,
      color: "blue",
      filter: "all" as const,
    },
    {
      label: t.published,
      value: publishedCount.toString(),
      change: "+12",
      trend: "up",
      icon: FileCheck,
      color: "green",
      filter: "published" as const,
    },
    {
      label: t.drafts,
      value: draftCount.toString(),
      change: "-5",
      trend: "down",
      icon: Clock,
      color: "yellow",
      filter: "draft" as const,
    },
    {
      label: t.scheduled,
      value: scheduledCount.toString(),
      change: "+2",
      trend: "up",
      icon: TrendingUp,
      color: "purple",
      filter: "scheduled" as const,
    },
  ];

  const recentActivity = [
    {
      id: "1",
      title: "Nowa polityka urlopowa",
      team: "HR",
      channel: "Email, Intranet",
      status: "published",
      time: "2 godz temu",
      user: "Anna Kowalska",
    },
    {
      id: "2",
      title: "Aktualizacja RODO",
      team: "Dział Prawny",
      channel: "Email, Intranet, Release Notes",
      status: "pending-approval",
      time: "5 godz temu",
      user: "Jan Nowak",
    },
    {
      id: "3",
      title: "Nowy system IT",
      team: "IT & Tech",
      channel: "Presentation",
      status: "draft",
      time: "1 dzień temu",
      user: "Piotr Wiśniewski",
    },
    {
      id: "4",
      title: "Kampania Q1 2025",
      team: "Marketing",
      channel: "Social Media",
      status: "ready-to-publish",
      time: "2 dni temu",
      user: "Maria Nowacka",
    },
  ];

  const channelStats = [
    { name: "Email", value: 45, color: "bg-blue-500" },
    { name: "Intranet", value: 32, color: "bg-green-500" },
    {
      name: "Release Notes",
      value: 12,
      color: "bg-purple-500",
    },
    { name: "Presentation", value: 8, color: "bg-orange-500" },
    { name: "Social Media", value: 3, color: "bg-pink-500" },
  ];

  const teamStats = [
    { team: "HR", messages: 42, color: "bg-[#10B981]" },
    { team: "IT & Tech", messages: 28, color: "bg-blue-500" },
    {
      team: "Dział Prawny",
      messages: 24,
      color: "bg-purple-500",
    },
    { team: "Marketing", messages: 18, color: "bg-orange-500" },
    { team: "Ogólny", messages: 12, color: "bg-gray-500" },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {t.overview}
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              color={stat.color as any}
              change={stat.change}
              trend={stat.trend}
              theme={theme}
              changeLabel={t.vsLastWeek}
              onClick={() => onStatClick?.(stat.filter)}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity */}
          <Card
            theme={theme}
            padding="none"
            className="lg:col-span-2 overflow-hidden"
          >
            <CardHeader
              theme={theme}
              action={
                <button
                  onClick={() => onNavigate?.("messages-list")}
                  className={`text-sm transition-all hover:underline ${
                    theme === "dark"
                      ? "text-[#10B981] hover:text-[#059669]"
                      : "text-[#059669] hover:text-[#047857]"
                  }`}
                >
                  {t.viewAll} →
                </button>
              }
            >
              {t.recentActivity}
            </CardHeader>
            <div
              className={
                theme === "dark"
                  ? "divide-y divide-[#374151]"
                  : "divide-y divide-[#F3F4F6]"
              }
            >
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className={`p-6 transition-all cursor-pointer group ${
                    theme === "dark"
                      ? "hover:bg-[#374151]/50"
                      : "hover:bg-[#F9FAFB]"
                  }`}
                  onClick={() => onNavigate?.("full-preview")}
                >
                  <div className="flex items-start justify-between mb-2 gap-4">
                    <h3
                      className={`transition-all ${
                        theme === "dark"
                          ? "text-white group-hover:text-[#00B67A]"
                          : "text-gray-900 group-hover:text-[#059669]"
                      }`}
                    >
                      {activity.title}
                    </h3>
                    <StatusBadge
                      status={activity.status as any}
                      size="sm"
                      theme={theme}
                      language={language}
                    />
                  </div>
                  <div
                    className={`flex items-center gap-4 text-sm ${
                      theme === "dark"
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {activity.team}
                    </span>
                    <span>{activity.channel}</span>
                    <span className="ml-auto">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Team Activity */}
          <Card theme={theme} padding="md">
            <h2
              className={`text-xl mb-6 ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              {t.teamActivity}
            </h2>
            <div className="space-y-4">
              {teamStats.map((team, index) => (
                <ProgressBar
                  key={index}
                  label={team.team}
                  value={team.messages}
                  max={42}
                  valueLabel={team.messages.toString()}
                  color={team.color}
                  theme={theme}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Channel Distribution */}
        <Card theme={theme} padding="md">
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`text-xl flex items-center gap-2 ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              <BarChart3
                className={`w-6 h-6 ${
                  theme === "dark"
                    ? "text-[#10B981]"
                    : "text-[#059669]"
                }`}
              />
              {t.channelDistribution}
            </h2>
            <div
              className={`flex items-center gap-2 text-sm ${
                theme === "dark"
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              <span>{t.thisMonth}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {channelStats.map((channel, index) => {
              const icons = {
                Email: Mail,
                Intranet: Globe,
                "Release Notes": FileCheck,
                Presentation: Presentation,
                "Social Media": MessageSquare,
              };
              const Icon =
                icons[channel.name as keyof typeof icons] ||
                MessageSquare;

              return (
                <div
                  key={index}
                  className={`rounded-xl p-4 border transition-all cursor-pointer group ${
                    theme === "dark"
                      ? "bg-[#374151]/30 border-[#4B5563] hover:border-[#10B981]"
                      : "bg-[#F9FAFB] border-[#E5E7EB] hover:border-[#10B981]"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 ${channel.color}/20 rounded-lg flex items-center justify-center`}
                    >
                      <Icon
                        className={`w-5 h-5 ${channel.color.replace("bg-", "text-")}`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-2xl font-medium ${
                          theme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        {channel.value}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-sm ${
                      theme === "dark"
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    {channel.name}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}