import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const MyAsset = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const {
      data: requestAssets = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["requestAssets"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/products/${user.email}`);
        return res.data;
      },
    });

      if (isLoading) return <p>Loading...</p>;




    console.log(requestAssets);
  return (
    <div className="bg-gradient-to-b from-[#2F4749] to-[#F7C99B] text-white">
      <div className="overflow-x-auto py-14  w-11/12 mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th>Request Date</th>
              <th>Approval Date</th>
              <th>Request Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* dynamic row */}
            {requestAssets.map((asset, index) => (
              <tr key={asset._id}>
                <th>{index + 1}</th>
                <td>{asset.assetName}</td>
                <td>{asset.assetType}</td>
                <td>{new Date(asset.requestDate).toLocaleDateString()}</td>
                <td>Blue</td>
                <td>{asset.requestStatus}</td>
                <td>
                  {asset.requestStatus === "Pending" && (
                    <button
                      className="bg-[#4d2745] text-white px-3 py-2 rounded"
                      onClick={() => handleCancelRequest(asset._id)}
                    >
                      Cancel Request
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAsset;