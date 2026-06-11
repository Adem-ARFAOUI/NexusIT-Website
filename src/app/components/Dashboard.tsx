import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, Calendar, Trophy, TrendingUp, CheckCircle, Clock, XCircle, Award } from "lucide-react";
import { mockEvents, mockChallenges, mockHistory } from "../data/mockData";
import { useLanguage } from "../i18n/LanguageContext";
import { format } from "date-fns";
import { fr, enUS, arSA } from "date-fns/locale";

export function Dashboard() {
  const { t, language } = useLanguage();

  // Calculate statistics
  const totalEvents = mockEvents.length;
  const upcomingEvents = mockEvents.filter(e => e.status === 'upcoming').length;
  const pastEvents = mockEvents.filter(e => e.status === 'past').length;

  const totalChallenges = mockChallenges.length;
  const activeChallenges = mockChallenges.filter(c => c.status === 'active').length;
  const finishedChallenges = mockChallenges.filter(c => c.status === 'finished').length;

  const allSubmissions = mockChallenges.flatMap(c => c.submissions);
  const pendingSubmissions = allSubmissions.filter(s => s.status === 'pending').length;
  const validatedSubmissions = allSubmissions.filter(s => s.status === 'validated').length;
  const rejectedSubmissions = allSubmissions.filter(s => s.status === 'rejected').length;

  const totalPointsAwarded = allSubmissions.reduce((sum, s) => sum + s.pointsAwarded, 0);

  const uniqueMembers = new Set(mockEvents.flatMap(e => e.members.map(m => m.id)));
  const totalMembers = uniqueMembers.size;

  const totalEventParticipants = mockEvents.reduce((sum, e) => sum + e.members.length, 0);
  const avgParticipation = totalEvents > 0 ? Math.round(totalEventParticipants / totalEvents) : 0;

  // Recent activity (last 5)
  const recentActivity = [...mockHistory]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const getLocale = () => {
    switch (language) {
      case 'fr': return fr;
      case 'ar': return arSA;
      default: return enUS;
    }
  };

  const stats = [
    { title: t('total_events'), value: totalEvents, icon: Calendar, color: '#7c3aed', detail: `${upcomingEvents} ${t('upcoming_events').toLowerCase()}` },
    { title: t('total_challenges'), value: totalChallenges, icon: Trophy, color: '#a855f7', detail: `${activeChallenges} ${t('active_challenges').toLowerCase()}` },
    { title: t('total_members'), value: totalMembers, icon: Users, color: '#c084fc', detail: `${avgParticipation} ${t('members_per_event')}` },
    { title: t('points_awarded'), value: totalPointsAwarded, icon: Award, color: '#e879f9', detail: `${validatedSubmissions} ${t('validated_submissions').toLowerCase()}` },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          {t('dashboard_title')}
        </h1>
        <p style={{ color: 'var(--muted-foreground)' }}>
          {t('dashboard_overview')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden" style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                {stat.title}
              </CardTitle>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${stat.color}20` }}
              >
                <stat.icon size={16} style={{ color: stat.color }} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                {stat.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Stats */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* Events Breakdown */}
        <Card style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <CardHeader>
            <CardTitle style={{ color: 'var(--foreground)' }}>
              <Calendar className="inline-block mr-2" size={20} />
              {t('total_events')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} style={{ color: '#22c55e' }} />
                <span style={{ color: 'var(--foreground)' }}>{t('upcoming_events')}</span>
              </div>
              <span className="font-bold text-lg" style={{ color: '#22c55e' }}>
                {upcomingEvents}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} style={{ color: '#6b7280' }} />
                <span style={{ color: 'var(--foreground)' }}>{t('past_events')}</span>
              </div>
              <span className="font-bold text-lg" style={{ color: '#6b7280' }}>
                {pastEvents}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Challenges Breakdown */}
        <Card style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <CardHeader>
            <CardTitle style={{ color: 'var(--foreground)' }}>
              <Trophy className="inline-block mr-2" size={20} />
              {t('total_challenges')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} style={{ color: '#3b82f6' }} />
                <span style={{ color: 'var(--foreground)' }}>{t('active_challenges')}</span>
              </div>
              <span className="font-bold text-lg" style={{ color: '#3b82f6' }}>
                {activeChallenges}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} style={{ color: '#6b7280' }} />
                <span style={{ color: 'var(--foreground)' }}>{t('finished_challenges')}</span>
              </div>
              <span className="font-bold text-lg" style={{ color: '#6b7280' }}>
                {finishedChallenges}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions Stats */}
      <Card className="mb-8" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <CardHeader>
          <CardTitle style={{ color: 'var(--foreground)' }}>
            {t('total_submissions')} ({allSubmissions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <Clock size={24} style={{ color: '#f59e0b' }} />
              <div>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  {t('pending_submissions')}
                </p>
                <p className="text-2xl font-bold" style={{ color: '#f59e0b' }}>
                  {pendingSubmissions}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle size={24} style={{ color: '#22c55e' }} />
              <div>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  {t('validated_submissions')}
                </p>
                <p className="text-2xl font-bold" style={{ color: '#22c55e' }}>
                  {validatedSubmissions}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <XCircle size={24} style={{ color: '#ef4444' }} />
              <div>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  {t('rejected_submissions')}
                </p>
                <p className="text-2xl font-bold" style={{ color: '#ef4444' }}>
                  {rejectedSubmissions}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <CardHeader>
          <CardTitle style={{ color: 'var(--foreground)' }}>
            {t('recent_activity')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-3 pb-4 border-b last:border-b-0"
                style={{ borderColor: 'var(--border)' }}
              >
                <div
                  className="w-2 h-2 rounded-full mt-2"
                  style={{
                    background: entry.authorRole === 'admin' ? '#7c3aed' : '#6b7280'
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                    {entry.entityName}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    {entry.details}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                    {format(new Date(entry.date), 'PPp', { locale: getLocale() })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
