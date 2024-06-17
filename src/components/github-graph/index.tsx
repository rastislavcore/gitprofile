import { skeleton } from '../../utils';
import { useEffect } from 'react';
// @ts-ignore // No types available
import GitHubCalendar from 'github-calendar';
import 'github-calendar/dist/github-calendar-responsive.css';
import './style.css';

const GithubGraphCard = ({
  loading,
  username,
}: {
  loading: boolean;
  username: string;
}) => {
  useEffect(() => {
    const calendarContainer = document.getElementById('github-calendar');
    GitHubCalendar(calendarContainer, username, {
      responsive: true,
      tooltips: false,
      global_stats: false,
      summary_text: 'Summary of GitHub activity made by <username>'
    });
  }, []);

  return (
    <div className="min-w-screen overflow-hidden">
      {loading ? (
        skeleton({ widthCls: 'w-full', heightCls: 'h-4' })
      ) : (
        <div id="github-calendar"></div>
      )}
    </div>
  );
};

export default GithubGraphCard;
