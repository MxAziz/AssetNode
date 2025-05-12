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
            const res = await axiosSecure.get("/allRequestAsset");
            return res.data;
        },
    });
    console.log(allRequestAsset);

    if (isLoading) return <p>Loading...</p>;
    return (
        <div >

        </div>
    );
};

export default AllRequest;