import { skeleton } from '../../utils';
import GitHubCalendar from 'react-github-calendar';
import './style.css';

const selectLastHalfYear = (contributions: any[]) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const shownMonths = 6;

  return contributions.filter(activity => {
    const date = new Date(activity.date);
    const monthOfDay = date.getMonth();

    return (
      date.getFullYear() === currentYear &&
      monthOfDay > currentMonth - shownMonths &&
      monthOfDay <= currentMonth
    );
  });
};

const GithubGraphCard = ({
  loading,
  username,
}: {
  loading: boolean;
  username: string;
}) => {
  return (
    <div className="min-w-screen overflow-hidden flex justify-center mt-4">
      {loading ? (
        skeleton({ widthCls: 'w-full', heightCls: 'h-4' })
      ) : (
        <GitHubCalendar
          username={username}
          colorScheme={'light'}
          transformData={selectLastHalfYear}
          hideColorLegend
          weekStart={1}
          showWeekdayLabels={true}
          labels={{
            totalCount: `{{count}} GitHub contributions by @${username} in the last half year.`,
          }}
        />
      )}
    </div>
  );
};

export default GithubGraphCard;
