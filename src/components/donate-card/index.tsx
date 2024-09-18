import { skeleton } from '../../utils';
import DonateButton from '../donate-button';

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
    <div className="card compact bg-base-100 shadow">
      <div className="p-4 bg-base-100 text-base-content">
        {loading ? (
          skeleton({ widthCls: 'w-full', heightCls: 'h-40' })
        ) : (
          <>
            <div className="text-sm mb-4">Enjoy those green squares 🟩 on the GitHub graph? Help me fill in more by sponsorship.</div>
            <iframe
              src={`https://github.com/sponsors/${username}/card`}
              title={`Sponsor ${username}`}
              className="w-full md:h-40 lg:h-48 rounded-lg"
              style={{ border: 0, backgroundColor: 'inherit', color: 'inherit' }}
              allowTransparency={true}
            ></iframe>
            {payto && (
              <div className="text-sm mt-6">
                <span>
                  <DonateButton address={payto} />
                </span>
                <span className="ml-2">Sponsor monthly using PayTo and cancel anytime.</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DonateCard;
