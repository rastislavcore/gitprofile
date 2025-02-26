import { skeleton } from '../../utils';

const DonateCard = ({
  username,
  payto,
  loading,
}: {
  username: string;
  payto: string | undefined;
  loading: boolean;
}) => {
  return (
    <div className="card compact bg-base-100 shadow-sm">
      <div className="p-4 bg-base-100 text-base-content">
        {loading ? (
          skeleton({ widthCls: 'w-full', heightCls: 'h-40' })
        ) : (
          <>
            <div className="text-sm mb-4">
              Love seeing those green squares 🟩 on the GitHub graph? Help add even more by sponsoring me!
            </div>
            <iframe
              src={`https://github.com/sponsors/${username}/card`}
              title={`Sponsor ${username}`}
              className="w-full md:h-40 lg:h-48 rounded-lg"
              style={{ border: 0, backgroundColor: 'inherit', color: 'inherit' }}
              // @ts-ignore
              allowtransparency="true"
            ></iframe>
            <div className="mt-6 flex items-center gap-2">
              <div>Sponsors:</div>
              <div className="flex items-center gap-4">
                <a href={`https://github.com/sponsors/${username}`} target="_blank" rel="noopener noreferrer"
                   style={{ transform: 'scale(1.2)', transformOrigin: 'left center' }}>
                  <img src={`https://img.shields.io/github/sponsors/${username}?label=GitHub%20Sponsors&logo=githubsponsors&color=EA4AAA`} alt={`Sponsors of ${username}`} />
                </a>
                {payto && (
                  <a href={`${payto}?donation=1`} target="_blank" rel="noopener noreferrer" className="ml-4"
                     style={{ transform: 'scale(1.2)', transformOrigin: 'left center' }}>
                    <img src={`https://img.shields.io/badge/💠%20Sponsor%20via%20PayTo-${payto.split('/').pop()?.slice(0, 4).toUpperCase()}…${payto.split('/').pop()?.slice(-4).toUpperCase()}-EA4AAA`} alt={`Sponsor via PayTo`} />
                  </a>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              <div>
                All Sponsors are eligible for{' '}
                <a
                  href={`https://github.com/sponsors/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-700"
                >
                  GitHub Sponsorship Tiers
                </a>
                .
              </div>
              {payto && (
                <div>
                  Please, paste your CORE ID into your GitHub profile.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DonateCard;
