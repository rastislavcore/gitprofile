import { useEffect, useMemo } from 'react';
import Payto from 'payto-rl';
import { skeleton } from '../../utils';

const misskeyEmbedScriptsLoaded = new Set<string>();

const misskeyIframeColorScheme = (
  mode: 'auto' | 'light' | 'dark',
): React.CSSProperties['colorScheme'] => {
  switch (mode) {
    case 'light':
      return 'only light';
    case 'dark':
      return 'only dark';
    default:
      return 'light dark';
  }
};

const DonateCard = ({
  embed,
  username,
  payto,
  fediverseHost,
  misskeyUserId,
  embedColorScheme,
  loading,
}: {
  embed: 'github' | 'fediverse';
  username: string;
  payto: string | undefined;
  fediverseHost?: string;
  misskeyUserId?: string;
  embedColorScheme: 'auto' | 'light' | 'dark';
  loading: boolean;
}) => {
  const misskeyEmbedId = useMemo(
    () => `v1_${crypto.randomUUID().replace(/-/g, '')}`,
    [],
  );

  useEffect(() => {
    if (embed !== 'fediverse' || !fediverseHost) return;
    const src = `https://${fediverseHost}/embed.js`;
    if (misskeyEmbedScriptsLoaded.has(src)) return;
    misskeyEmbedScriptsLoaded.add(src);
    const script = document.createElement('script');
    script.defer = true;
    script.src = src;
    document.body.appendChild(script);
  }, [embed, fediverseHost]);

  const paytoObj = payto ? new Payto(payto) : null;
  const paytoNetwork = paytoObj?.network;
  const paytoCurrency = paytoObj?.currency?.[0];

  return (
    <div className="card compact bg-base-100 shadow-sm">
      <div className="p-4 bg-base-100 text-base-content">
        {loading ? (
          skeleton({ widthCls: 'w-full', heightCls: 'h-40' })
        ) : (
          <>
            {embed === 'github' && (
              <iframe
                src={`https://github.com/sponsors/${username}/card`}
                title={`Sponsor ${username}`}
                className="w-full md:h-40 lg:h-48 rounded-lg"
                style={{
                  border: 0,
                  backgroundColor: 'inherit',
                  color: 'inherit',
                }}
                // @ts-ignore GitHub Sponsors card embed attribute
                allowtransparency="true"
              />
            )}
            {embed === 'fediverse' &&
              fediverseHost &&
              misskeyUserId && (
                <iframe
                  src={`https://${fediverseHost}/embed/user-timeline/${misskeyUserId}`}
                  data-misskey-embed-id={misskeyEmbedId}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Fediverse timeline"
                  className="rounded-lg mx-auto block"
                  style={{
                    border: 'none',
                    width: '100%',
                    maxWidth: '500px',
                    height: '300px',
                    colorScheme: misskeyIframeColorScheme(embedColorScheme),
                  }}
                />
              )}
            <div className="mt-6 flex items-center gap-4">
              <div>
                {payto && (
                  <a
                    href={`https://payto.money/${payto.slice(5)}`}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center cursor-pointer px-3 py-1.5 bg-[#849dfc20] hover:bg-[#849dfc38] !text-[#849dfc] font-sans leading-5 border border-[#878fc5] rounded-full !no-underline h-fit whitespace-nowrap transition-all duration-150 ease-in-out hover:border-[#b6c2f4] hover:text-[#b6c2f4] font-sans group"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 2h4" />
                      <path d="M12 14v-4" />
                      <path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" />
                      <path d="M9 17H4v5" />
                    </svg>
                    &nbsp;
                    <strong className="italic mr-1">
                      Donate<span className="text-[#5675ff]">To:</span>
                    </strong>{' '}
                    via {paytoNetwork?.toUpperCase()}
                    {paytoCurrency
                      ? ` with ${paytoCurrency.toUpperCase()}`
                      : ''}
                  </a>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Enjoy watching those green circles light up?
                <br />
                Support my work and let’s grow that grid together!
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DonateCard;
