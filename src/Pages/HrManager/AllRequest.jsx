import { toast } from 'react-toastify';
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

    const handleStatusUpdate = async (id, status) => {
    try {
        const res = await axiosPublic.patch(`/updateRequestStatus/${id}`, {
        status,
        });
        if (res.data.message === "Status updated successfully") {
            toast.success("Status updated successfully");
        refetch(); // data reload
        }
    } catch (error) {
        console.error("Failed to update status", error);
    }
    };

    return (
      <div>
        {/* List Section */}
        <div className="overflow-x-auto bg-gray-100 py-14">
          <table className="table w-11/12 mx-auto">
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
                  <td>{new Date(product.requestDate).toLocaleDateString()}</td>
                  <td>{product.requestStatus}</td>
                  <td className="flex justify-start items-center gap-2">
                    <button
                      className="rounded-md bg-[#2F4749] text-white hover:bg-[#F7C99B] hover:text-black px-4 py-[6px]  mr-2"
                       onClick={() => handleStatusUpdate(product._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="rounded-md px-4 py-[6px] bg-[#F7C99B] text-black"
                    onClick={() => handleStatusUpdate(product._id, "Rejected")}
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