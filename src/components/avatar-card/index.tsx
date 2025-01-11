import React from 'react';
import { FALLBACK_IMAGE } from '../../constants';
import { Profile } from '../../interfaces/profile';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';
import { FaCheckCircle } from 'react-icons/fa';

interface AvatarCardProps {
  profile: Profile | null;
  loading: boolean;
  avatarRing: boolean;
  resumeFileUrl?: string;
  publicKey?: string;
}

const formatBio = (bio: string): React.ReactNode => {
  // CoreID regex (now with uppercase conversion)
  const coreIDRegex = /(cb[0-9]{2}[a-f0-9]{40})@coreid/i;
  const match = bio.match(coreIDRegex);

  if (match) {
    const fullCoreID = match[1];
    const formattedCoreID = `${fullCoreID.substring(0,4).toUpperCase()}…${fullCoreID.slice(-4).toUpperCase()}@coreid`;
    const parts = bio.split(match[0]);

    return (
      <>
        {formatBio(parts[0])}
        <a
          href={`https://coreid.link/${fullCoreID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline"
        >
          <FaCheckCircle className="text-primary inline-block relative -top-[1px]" size={12} />
          {formattedCoreID}
        </a>
        {formatBio(parts[1])}
      </>
    );
  }

  // Handle @mentions, $stocks, and #hashtags
  return bio.split(/(\s+)/).map((word, index) => {
    if (word.startsWith('@')) {
      const username = word.slice(1);
      return (
        <a
          key={index}
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {word}
        </a>
      );
    }

    if (word.startsWith('$')) {
      const stock = encodeURIComponent(word);
      return (
        <a
          key={index}
          href={`https://x.com/search?q=${stock}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {word}
        </a>
      );
    }

    if (word.startsWith('#')) {
      const hashtag = encodeURIComponent(word.slice(1));
      return (
        <a
          key={index}
          href={`https://x.com/search?q=${hashtag}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {word}
        </a>
      );
    }

    return word;
  });
};

/**
 * Renders an AvatarCard component.
 * @param profile - The profile object.
 * @param loading - A boolean indicating if the profile is loading.
 * @param avatarRing - A boolean indicating if the avatar should have a ring.
 * @param resumeFileUrl - The URL of the resume file.
 * @param publicKey - The URL of the public key file.
 * @returns JSX element representing the AvatarCard.
 */
const AvatarCard = ({
  profile,
  loading,
  avatarRing,
  resumeFileUrl,
  publicKey,
}: AvatarCardProps) => {
  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="grid place-items-center py-8">
        {loading || !profile ? (
          <div className="avatar opacity-90">
            <div className="mb-8 rounded-full w-32 h-32">
              <>{skeleton({
                widthCls: 'w-full',
                heightCls: 'h-full',
                shape: '',
              })}</>
            </div>
          </div>
        ) : (
          <div className="avatar opacity-90">
            <div
              className={`mb-8 rounded-full w-32 h-32 ${
                avatarRing
                  ? 'ring ring-primary ring-offset-base-100 ring-offset-2'
                  : ''
              }`}
            >
              {
                <LazyImage
                  src={profile.avatar ? profile.avatar : FALLBACK_IMAGE}
                  alt={profile.name}
                  placeholder={<>{skeleton({
                    widthCls: 'w-full',
                    heightCls: 'h-full',
                    shape: '',
                  })}</>}
                />
              }
            </div>
          </div>
        )}
        <div className="text-center mx-auto px-8">
          <h5 className="font-bold text-2xl">
            {loading || !profile ? (
              <>{skeleton({ widthCls: 'w-48', heightCls: 'h-8' })}</>
            ) : (
              <span className="text-base-content opacity-70">
                {profile.name}
              </span>
            )}
          </h5>
          <div className="mt-3 text-base-content text-opacity-60 font-mono whitespace-pre-wrap text-sm">
            {loading || !profile ? (
              <>{skeleton({ widthCls: 'w-48', heightCls: 'h-5' })}</>
            ) : (
              formatBio(profile.bio || '')
            )}
          </div>
        </div>
        <div className="flex flex-row gap-x-1 items-center mt-6">
          {resumeFileUrl &&
            (loading ? (
              <div>
                <>{skeleton({ widthCls: 'w-40', heightCls: 'h-8' })}</>
              </div>
            ) : (
              <a
                href={resumeFileUrl}
                target="_blank"
                className="btn btn-outline btn-sm text-xs opacity-50 rounded-lg"
                download
                rel="noreferrer"
              >
                Download Resume
              </a>
            ))}
          {publicKey &&
            (loading ? (
              <div>
                <>{skeleton({ widthCls: 'w-40', heightCls: 'h-8' })}</>
              </div>
            ) : (
              <a
                href={publicKey}
                target="_blank"
                className="btn btn-outline btn-sm text-xs opacity-50 rounded-lg"
                download
                rel="noreferrer"
              >
                Download Public key
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarCard;
