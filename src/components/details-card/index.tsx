import { ToneIcon } from './tone-icon';
import { Profile } from '../../interfaces/profile';
import {
  getFediverseDisplayHandle,
  getFediverseProfileUrl,
  skeleton,
} from '../../utils';
import Payto from 'payto-rl';
import { getToneContact, getWebsiteContact, getWhatsappContact } from '../../utils/contact-links';
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
	FaWhatsapp,
  FaStackOverflow,
  FaTelegram,
  FaTiktok,
  FaYoutube,
  FaWallet,
  FaCheckCircle,
} from 'react-icons/fa';
import { FaSquareThreads } from 'react-icons/fa6';
import { PiFediverseLogoFill } from "react-icons/pi";
import { RiMailFill, RiPhoneFill, RiOpenaiFill } from 'react-icons/ri';
import { SiGitlab, SiHuggingface, SiResearchgate, SiUdemy, SiWikipedia, SiX } from 'react-icons/si';
import { flagToCountry } from 'emoji-flags-to-country';
import { findByAlpha2 } from 'iso-3166-1-ts';
import slugify from 'react-slugify';

export const ListItem = ({
  icon,
  title,
  value,
  link,
  skeleton = false
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
  link?: string;
  skeleton?: boolean;
}) => {
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
          <div className="inline-flex flex flex-row gap-2">
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

interface DetailsCardProps {
  profile: Profile | null;
  loading: boolean;
  github: { username: string };
  social: any;
}

const isCompanyMention = (company: string): boolean => {
  return company.startsWith('@') && !company.includes(' ');
};

const isFlagEmoji = (emoji: string): boolean => {
  return /[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]/.test(emoji);
}

const companyLink = (company: string): string => {
  return `https://github.com/${company.substring(1)}`;
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
        } text-sm font-normal text-right mr-2 ml-3 flex flex-row gap-2 ${link ? 'truncate' : ''}`}
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
        } text-sm font-normal text-right mr-2 ml-3 flex flex-row gap-2 ${link ? 'truncate' : ''}`}
        style={{
          wordBreak: 'break-word',
        }}
      >
        {renderValue()}
      </div>
    </div>
  );
};


const DetailsCard = ({ profile, loading, social, github }: DetailsCardProps) => {
	const tone = social?.tone ? getToneContact(social.tone) : null;
  const paytoObj = social?.payto ? new Payto(social?.payto) : null;
  const paytoNetwork = paytoObj?.network;
  const paytoAddress = paytoObj?.address;
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
            <>
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
              {social?.coreid && (
                <ListItem
                  icon={<FaIdBadge />}
                  title="CORE ID"
                  value={
                    <>
                      {profile?.bio?.toLowerCase().includes(`${social.coreid}@coreid`.toLowerCase()) && (
                        <FaCheckCircle className="text-primary inline-block relative -top-[1px] mr-1" size={12} />
                      )}
                      {(social.coreid.substring(0,4)+'…'+social.coreid.slice(-4)).toUpperCase()}
                    </>
                  }
                  link={`https://coreid.link/${social.coreid}`}
                />
              )}
              {social?.payto && (
                <ListItem
                  icon={<FaWallet />}
                  title="PayTo"
                  value={`${paytoNetwork?.toUpperCase()}/${(paytoAddress?.substring(0,4)+'…'+paytoAddress?.slice(-4)).toUpperCase()}`}
                  link={`https://payto.money/${social?.payto?.slice(5)}`}
                />
              )}
							{social?.website && (
								<ListItem icon={<FaGlobe />} title="Website" value={getWebsiteContact(social.website).label} link={getWebsiteContact(social.website).href} />
							)}
							{(social?.email || social?.phone || social?.telegram || tone || social?.whatsapp) && <h3 className="mt-4 mb-2 font-semibold">Contacts</h3>}
							{social?.email && (
								<ListItem
									icon={<RiMailFill />}
									title="Email"
									value={social.email && social.email.includes("?") ? social.email.split("?")[0] : social.email}
									link={`mailto:${social.email}`}
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
              {social?.telegram && (
                <ListItem
                  icon={<FaTelegram />}
                  title="Telegram"
                  value={social.telegram}
                  link={`https://t.me/${social.telegram}`}
                />
              )}
							{social?.tone && tone && (
								<ListItem icon={<ToneIcon />} title="Tone" value={tone.label} link={tone.href} />
							)}
							{social?.whatsapp && (
								<ListItem icon={<FaWhatsapp />} title="WhatsApp" value={getWhatsappContact(social.whatsapp).label} link={getWhatsappContact(social.whatsapp).href} />
							)}
							{(social?.dev || social?.medium || social?.researchGate || social?.udemy) && <h3 className="mt-4 mb-2 font-semibold">Publishing</h3>}
              {social?.dev && (
                <ListItem
                  icon={<FaDev />}
                  title="Dev"
                  value={social.dev}
                  link={`https://dev.to/${social.dev}`}
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
              {social?.researchGate && (
                <ListItem
                  icon={<SiResearchgate />}
                  title="ResearchGate"
                  value={social.researchGate}
                  link={`https://www.researchgate.net/profile/${social.researchGate}`}
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
							{(github.username || [
								'behance', 'chatgpt', 'dribbble', 'facebook', 'fediverse', 'gitlab', 'huggingface', 'instagram',
								'linkedin', 'reddit', 'stackoverflow', 'threads', 'tiktok',
								'wiki', 'twitter', 'youtube',
							].some((key) => social?.[key])) && (
								<h3 className="mt-4 mb-2 font-semibold">Socials</h3>
							)}
              {social?.behance && (
                <ListItem
                  icon={<FaBehanceSquare />}
                  title="Behance"
                  value={social.behance}
                  link={`https://www.behance.net/${social.behance}`}
                />
              )}
							{social?.chatgpt && (
								<ListItem
									icon={<RiOpenaiFill />}
									title="ChatGPT"
									value={social.chatgpt}
									link={`https://chatgpt.com/u/${social.chatgpt}`}
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
              {social?.facebook && (
                <ListItem
                  icon={<FaFacebook />}
                  title="Facebook"
                  value={social.facebook}
                  link={`https://www.facebook.com/${social.facebook}`}
                />
              )}
              {social?.fediverse && (
                <ListItem
                  icon={<PiFediverseLogoFill />}
                  title="Fediverse"
                  value={getFediverseDisplayHandle(social.fediverse)}
                  link={getFediverseProfileUrl(social.fediverse)}
                />
              )}
							{github.username && (
              <ListItem
                icon={<AiFillGithub />}
                title="GitHub"
                value={github.username}
                link={`https://github.com/${github.username}`}
              />
							)}
							{social?.gitlab && (
								<ListItem
									icon={<SiGitlab />}
									title="GitLab"
									value={social.gitlab}
									link={`https://gitlab.com/${social.gitlab}`}
								/>
							)}
							{social?.huggingface && (
								<ListItem
									icon={<SiHuggingface />}
									title="Hugging Face"
									value={social.huggingface}
									link={`https://huggingface.co/${social.huggingface}`}
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
              {social?.linkedin && (
                <ListItem
                  icon={<FaLinkedin />}
                  title="LinkedIn"
                  value={social.linkedin}
                  link={`https://www.linkedin.com/in/${social.linkedin}`}
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
              {social?.stackoverflow && (
                <ListItem
                  icon={<FaStackOverflow />}
                  title="Stack Overflow"
                  value={social.stackoverflow.split('/').slice(-1)}
                  link={`https://stackoverflow.com/users/${social.stackoverflow}`}
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
              {social?.tiktok && (
                <ListItem
                  icon={<FaTiktok />}
                  title="TikTok"
                  value={social.tiktok}
                  link={`https://www.tiktok.com/@${social.tiktok}`}
                />
              )}
              {social?.wiki && (
                <ListItem
                  icon={<SiWikipedia />}
                  title="Wiki"
                  value={decodeURIComponent(social.wiki.split('/').slice(-1)[0]).replace("_", " ")}
                  link={social.wiki}
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
              {social?.youtube && (
                <ListItem
                  icon={<FaYoutube />}
                  title="YouTube"
                  value={`@${social.youtube}`}
                  link={`https://www.youtube.com/@${social.youtube}`}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
