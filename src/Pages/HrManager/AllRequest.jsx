import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from './../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const AllRequest = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const {
        data: allRequestAsset = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["allRequestAsset"],
        queryFn: async () => {
            const res = await axiosPublic.get("/allRequestAsset");
            return res.data;
        },
    });
    console.log(allRequestAsset);

    if (isLoading) return <p>Loading...</p>;
    return (
      <div>
        {/* List Section */}
        <div className="overflow-x-auto mt-4">
          <table className="table w-full">
            <thead>
              <tr className=" bg-[#2F4749] text-white ">
                <th>Product Name</th>
                <th>Product Type</th>
                <th> Name</th>
                <th>Email </th>
                <th>Date </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allRequestAsset.map((product) => (
                <tr key={product._id}>
                  <td>{product.assetName}</td>
                  <td>{product.assetType}</td>
                  <td>{product.employeeName}</td>
                  <td>{product.employeeEmail}</td>
                  <td>{new Date(product.requestStatus).toLocaleDateString()}</td>
                  <td>{product.requestStatus}</td>
                  <td className="flex justify-start items-center gap-2">
                    <button
                      className="rounded-md bg-[#2F4749] text-white hover:bg-[#F7C99B] hover:text-black px-4 py-[6px]  mr-2"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Approve
                    </button>
                    <button
                      className="rounded-md px-4 py-[6px] bg-[#F7C99B] text-black"
                      onClick={() => handleDelete(product._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AllRequest;