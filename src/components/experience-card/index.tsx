import React from 'react';
import { SanitizedExperience } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

interface ListItemProps {
  timeFrom: React.ReactNode;
  timeTo: React.ReactNode;
  position?: React.ReactNode;
  company?: React.ReactNode;
  companyLink?: string;
}

const ListItem = ({
  timeFrom,
  timeTo,
  position,
  company,
  companyLink,
}: ListItemProps) => (
  <li className="mb-5 ml-4">
    <div
      className="absolute w-2 h-2 bg-base-300 rounded-full border border-base-300 mt-1.5"
      style={{ left: '-4.5px' }}
    ></div>
    {timeFrom && timeTo ? (
      <div className="my-0.5 text-xs">{timeFrom} — {timeTo}</div>
    ) : timeFrom ? (
      <div className="my-0.5 text-xs">{timeFrom}</div>
    ) : null}
    <h3 className="font-semibold">{position}</h3>
    <div className="mb-4 font-normal">
      <a href={companyLink} target="_blank" rel="noreferrer">
        {company}
      </a>
    </div>
  </li>
);

const ExperienceCard = ({
  experiences,
  loading,
}: {
  experiences: SanitizedExperience[];
  loading: boolean;
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 2; index++) {
      array.push(
        <ListItem
          key={index}
          timeFrom={<>{skeleton({
            widthCls: 'w-5/12',
            heightCls: 'h-4',
          })}</>}
          timeTo={<>{skeleton({
            widthCls: 'w-5/12',
            heightCls: 'h-4',
          })}</>}
          position={<>{skeleton({
            widthCls: 'w-6/12',
            heightCls: 'h-4',
            className: 'my-1.5',
          })}</>}
          company={<>{skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}</>}
        />,
      );
    }

    return array;
  };
  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body">
        <div className="mx-3">
          <h5 className="card-title">
            {loading ? (
              <>{skeleton({ widthCls: 'w-32', heightCls: 'h-8' })}</>
            ) : (
              <span className="text-base-content opacity-70">Career</span>
            )}
          </h5>
        </div>
        <div className="text-base-content text-opacity-60">
          <ol className="relative border-l border-base-300 border-opacity-30 my-2 mx-4">
            {loading ? (
              renderSkeleton()
            ) : (
              <>
                {experiences.map((experience, index) => (
                  <ListItem
                    key={index}
                    timeFrom={experience.from}
                    timeTo={experience.to}
                    position={experience.position}
                    company={experience.company}
                    companyLink={
                      experience.companyLink
                        ? experience.companyLink
                        : undefined
                    }
                  />
                ))}
              </>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
