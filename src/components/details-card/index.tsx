import { Fragment } from 'react';
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillMediumSquare,
} from 'react-icons/ai';
import { CgDribbble } from 'react-icons/cg';
import {
  FaBehanceSquare,
  FaBuilding,
  FaDev,
  FaFacebook,
  FaGlobe,
  FaIdBadge,
  FaKey,
  FaMapMarkerAlt,
  FaLinkedin,
  FaReddit,
  FaSkype,
  FaStackOverflow,
  FaTelegram,
  FaTiktok,
  FaYoutube,
  FaWallet,
} from 'react-icons/fa';
import { FaSquareThreads } from 'react-icons/fa6';
import { PiFediverseLogoFill } from "react-icons/pi";
import { RiMailFill, RiPhoneFill } from 'react-icons/ri';
import { SiResearchgate, SiUdemy, SiWikipedia, SiX } from 'react-icons/si';
import { Profile } from '../../interfaces/profile';
import {
  SanitizedGithub,
  SanitizedSocial,
} from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import { flagToCountry } from 'emoji-flags-to-country';
import { findByAlpha2 } from 'iso-3166-1-ts';
import slugify from 'react-slugify';

type Props = {
  profile: Profile | null;
  loading: boolean;
  social: SanitizedSocial;
  github: SanitizedGithub;
};

const isCompanyMention = (company: string): boolean => {
  return company.startsWith('@') && !company.includes(' ');
};

const isFlagEmoji = (emoji: string): boolean => {
  return /[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]/.test(emoji);
}

const companyLink = (company: string): string => {
  return `https://github.com/${company.substring(1)}`;
};

const getFormattedFediverseValue = (
  fediverseValue: string,
  isLink: boolean,
): string => {
  const indexOfAt = fediverseValue.lastIndexOf('@');
  const username = fediverseValue.substring(1, indexOfAt);
  const server = fediverseValue.substring(indexOfAt + 1);

  if (isLink) {
    return `https://${server}/@${username}`;
  } else {
    return `@${username}@${server}`;
  }
};

const ListItem: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
  link?: string;
  skeleton?: boolean;
}> = ({ icon, title, value, link, skeleton = false }) => {
  const mailtoRegex = /^mailto:([^?]+)\?(?:[^=]+=.*?&)*key=([^&]+)/;
  const isMailto = link && link.startsWith("mailto:");
  const mailtoMatches = isMailto ? link.match(mailtoRegex) : [];
  const keyLink = mailtoMatches ? decodeURIComponent(mailtoMatches[2]) : undefined;
  return (
    <div className="flex justify-start py-2 px-1 items-center">
      <div className="flex-grow font-medium gap-2 flex items-center my-1 opacity-60">
        {icon} {title}
      </div>
      <div
        className={`${
          skeleton ? 'flex-grow' : ''
        } text-sm font-normal text-right mr-2 ml-3 ${link ? 'truncate' : ''}`}
        style={{
          wordBreak: 'break-word',
        }}
      >
        {isMailto ? (
          <div className="inline-flex space-x-2">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              {value}
            </a>
            {keyLink &&
              <a href={keyLink} target="_blank" rel="noreferrer" download>
                <FaKey />
              </a>
            }
          </div>
        ) : (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="flex justify-start py-2 px-1 items-center"
        >
          {value}
        </a>
        )}
      </div>
    </div>
  );
};

const OrganizationItem: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode | string;
  link?: string;
  skeleton?: boolean;
}> = ({ icon, title, value, link, skeleton = false }) => {
  const renderValue = () => {
    if (typeof value === 'string') {
      return value.split(' ').map((company) => {
        company = company.trim();
        if (!company) return null;

        if (isCompanyMention(company)) {
          return (
            <a
              href={companyLink(company)}
              target="_blank"
              rel="noreferrer"
              key={company}
            >
              {company}
            </a>
          );
        } else {
          return <span key={company}>{company}</span>;
        }
      });
    }
    return value;
  };
  return (
    <div className="flex justify-start py-2 px-1 items-center">
      <div className="flex-grow font-medium gap-2 flex items-center my-1 opacity-60">
        {icon} {title}
      </div>
      <div
        className={`${
          skeleton ? 'flex-grow' : ''
        } text-sm font-normal text-right mr-2 ml-3 space-x-2 ${link ? 'truncate' : ''}`}
        style={{
          wordBreak: 'break-word',
        }}
      >
        {renderValue()}
      </div>
    </div>
  );
};

const LocationItem: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode | string;
  link?: string;
  skeleton?: boolean;
}> = ({ icon, title, value, link, skeleton = false }) => {
  const renderValue = () => {
    if (typeof value === 'string') {
      return value.split(' ').map((items) => {
        let item = items.trim();
        if (!item) return null;

        if (isFlagEmoji(item)) {
          const iso2 = flagToCountry(item);
          const country = findByAlpha2(iso2)?.name;
          const loc = iso2 ? (country ? country : iso2) : item;
          return (
            <a
              href={`https://www.google.com/maps/place/${slugify(loc)}`}
              target="_blank"
              rel="noreferrer"
              key={iso2}
              title={iso2}
            >
              {item}
            </a>
          );
        } else {
          return (
            <a
              href={`https://www.google.com/maps/place/${slugify(item)}`}
              target="_blank"
              rel="noreferrer"
              key={item}
            >
              {item}
            </a>
          );
        }
      });
    }
    return value;
  };
  return (
    <div className="flex justify-start py-2 px-1 items-center">
      <div className="flex-grow font-medium gap-2 flex items-center my-1 opacity-60">
        {icon} {title}
      </div>
      <div
        className={`${
          skeleton ? 'flex-grow' : ''
        } text-sm font-normal text-right mr-2 ml-3 space-x-2 ${link ? 'truncate' : ''}`}
        style={{
          wordBreak: 'break-word',
        }}
      >
        {renderValue()}
      </div>
    </div>
  );
};

/**
 * Renders the details card component.
 *
 * @param {Object} profile - The profile object.
 * @param {boolean} loading - Indicates whether the data is loading.
 * @param {Object} social - The social object.
 * @param {Object} github - The GitHub object.
 * @return {JSX.Element} The details card component.
 */
const DetailsCard = ({ profile, loading, social, github }: Props) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 4; index++) {
      array.push(
        <ListItem
          key={index}
          skeleton={true}
          icon={<>{skeleton({ widthCls: 'w-4', heightCls: 'h-4' })}</>}
          title={<>{skeleton({ widthCls: 'w-24', heightCls: 'h-4' })}</>}
          value={<>{skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}</>}
        />,
      );
    }

    return array;
  };

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body">
        <div className="text-base-content">
          {loading || !profile ? (
            renderSkeleton()
          ) : (
            <Fragment>
              {profile.location && (
                <LocationItem
                  icon={<FaMapMarkerAlt />}
                  title="Location"
                  value={profile.location}
                />
              )}
              {profile.company && (
                <OrganizationItem
                  icon={<FaBuilding />}
                  title="Organization"
                  value={profile.company}
                  link={
                    isCompanyMention(profile.company.trim())
                      ? companyLink(profile.company.trim())
                      : undefined
                  }
                />
              )}
              <ListItem
                icon={<AiFillGithub />}
                title="GitHub"
                value={github.username}
                link={`https://github.com/${github.username}`}
              />
              {social?.researchGate && (
                <ListItem
                  icon={<SiResearchgate />}
                  title="ResearchGate"
                  value={social.researchGate}
                  link={`https://www.researchgate.net/profile/${social.researchGate}`}
                />
              )}
              {social?.coreid && (
                <ListItem
                  icon={<FaIdBadge />}
                  title="Core ID"
                  value={(social.coreid.substring(0,4)+'…'+social.coreid.substring(-4, 4)).toUpperCase()}
                  link={`https://coreid.link/${social.coreid}`}
                />
              )}
              {social?.twitter && (
                <ListItem
                  icon={<SiX />}
                  title="X"
                  value={`@${social.twitter}`}
                  link={`https://x.com/${social.twitter}`}
                />
              )}
              {social?.fediverse && (
                <ListItem
                  icon={<PiFediverseLogoFill />}
                  title="Fediverse"
                  value={getFormattedFediverseValue(social.fediverse, false)}
                  link={getFormattedFediverseValue(social.fediverse, true)}
                />
              )}
              {social?.linkedin && (
                <ListItem
                  icon={<FaLinkedin />}
                  title="LinkedIn"
                  value={social.linkedin}
                  link={`https://www.linkedin.com/in/${social.linkedin}`}
                />
              )}
              {social?.dribbble && (
                <ListItem
                  icon={<CgDribbble />}
                  title="Dribbble"
                  value={social.dribbble}
                  link={`https://dribbble.com/${social.dribbble}`}
                />
              )}
              {social?.behance && (
                <ListItem
                  icon={<FaBehanceSquare />}
                  title="Behance"
                  value={social.behance}
                  link={`https://www.behance.net/${social.behance}`}
                />
              )}
              {social?.facebook && (
                <ListItem
                  icon={<FaFacebook />}
                  title="Facebook"
                  value={social.facebook}
                  link={`https://www.facebook.com/${social.facebook}`}
                />
              )}
              {social?.tiktok && (
                <ListItem
                  icon={<FaTiktok />}
                  title="TikTok"
                  value={social.facebook}
                  link={`https://www.tiktok.com/@${social.tiktok}`}
                />
              )}
              {social?.instagram && (
                <ListItem
                  icon={<AiFillInstagram />}
                  title="Instagram"
                  value={social.instagram}
                  link={`https://www.instagram.com/${social.instagram}`}
                />
              )}
              {social?.reddit && (
                <ListItem
                  icon={<FaReddit />}
                  title="Reddit"
                  value={social.reddit}
                  link={`https://www.reddit.com/user/${social.reddit}`}
                />
              )}
              {social?.threads && (
                <ListItem
                  icon={<FaSquareThreads />}
                  title="Threads"
                  value={social.threads}
                  link={`https://www.threads.net/@${social.threads.replace('@', '')}`}
                />
              )}
              {social?.youtube && (
                <ListItem
                  icon={<FaYoutube />}
                  title="YouTube"
                  value={`@${social.youtube}`}
                  link={`https://www.youtube.com/@${social.youtube}`}
                />
              )}
              {social?.udemy && (
                <ListItem
                  icon={<SiUdemy />}
                  title="Udemy"
                  value={social.udemy}
                  link={`https://www.udemy.com/user/${social.udemy}`}
                />
              )}
              {social?.medium && (
                <ListItem
                  icon={<AiFillMediumSquare />}
                  title="Medium"
                  value={social.medium}
                  link={`https://medium.com/@${social.medium}`}
                />
              )}
              {social?.dev && (
                <ListItem
                  icon={<FaDev />}
                  title="Dev"
                  value={social.dev}
                  link={`https://dev.to/${social.dev}`}
                />
              )}
              {social?.stackoverflow && (
                <ListItem
                  icon={<FaStackOverflow />}
                  title="Stack Overflow"
                  value={social.stackoverflow.split('/').slice(-1)}
                  link={`https://stackoverflow.com/users/${social.stackoverflow}`}
                />
              )}
              {social?.wiki && (
                <ListItem
                  icon={<SiWikipedia />}
                  title="Wiki"
                  value={decodeURIComponent(social.wiki.split('/').slice(-1)[0]).replace("_", " ")}
                  link={social.wiki}
                />
              )}
              {social?.website && (
                <ListItem
                  icon={<FaGlobe />}
                  title="Website"
                  value={social.website
                    .replace('https://', '')
                    .replace('http://', '')}
                  link={
                    !social.website.startsWith('http')
                      ? `http://${social.website}`
                      : social.website
                  }
                />
              )}
              {social?.skype && (
                <ListItem
                  icon={<FaSkype />}
                  title="Skype"
                  value={social.skype}
                  link={`skype:${social.skype}?chat`}
                />
              )}
              {social?.telegram && (
                <ListItem
                  icon={<FaTelegram />}
                  title="Telegram"
                  value={social.telegram}
                  link={`https://t.me/${social.telegram}`}
                />
              )}
              {social?.phone && (
                <ListItem
                  icon={<RiPhoneFill />}
                  title="Phone"
                  value={social.phone}
                  link={`tel:${social.phone}`}
                />
              )}
              {social?.email && (
                <ListItem
                  icon={<RiMailFill />}
                  title="Email"
                  value={social.email && social.email.includes("?") ? social.email.split("?")[0] : social.email}
                  link={`mailto:${social.email}`}
                />
              )}
              {social?.payto && (
                <ListItem
                  icon={<FaWallet />}
                  title="PayTo"
                  value={social.payto.substring(social.payto.indexOf('payto://') + 8, social.payto.indexOf('payto://') + 16).toUpperCase() + '…' + social.payto.substring((social.payto.indexOf('?') > -1 ? social.payto.indexOf('?') : social.payto.length) - 4).toUpperCase()}
                  link={`${social.payto}`}
                />
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
