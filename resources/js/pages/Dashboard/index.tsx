import { DashboardHeader } from './components/dashboard-header';
import { StatsCards } from './components/stats-cards';
import { RecentEvaluations } from './components/recent-evaluations';

export default function DashboardContent() {
    return (
        <div className="flex h-full flex-1 flex-col gap-6 p-6">
            <DashboardHeader />
            <StatsCards />
            <RecentEvaluations />
        </div>
    );
}
