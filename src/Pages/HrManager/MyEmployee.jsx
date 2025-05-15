import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const MyEmployee = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: members = [], isLoading, refetch } = useQuery({
    queryKey: ["team-members", user?.teamId],
    enabled: !!user?.teamId,
    queryFn: async () => {
      const res = await axiosPublic.get(`/team-members/${user?.teamId}`);
      return res.data.members;
    },
  });

  console.log(members);

  const handleRemove = async (memberId) => {
    try {
      const res = await axiosPublic.put(`/remove-from-team/${memberId}`, {
        teamId: user.teamId,
      });

      if (res.data.success) {
        toast.success("Removed from team");
        refetch();
      } else {
        toast.error("Failed to remove");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">My Team Members</h2>
      {members.length === 0 ? (
        <p>No team members found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((member) => (
            <div key={member._id} className="border rounded-lg p-4 flex items-center gap-4 shadow-md bg-white">
              <img
                src={member.photo || "/default-profile.png"}
                alt={member.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-grow">
                <p className="text-xl font-bold">{member.name}</p>
                <div className="flex items-center gap-2 text-gray-600">
                  {member.role === "admin" ? <FaUserShield /> : <FaUser />}
                  <span className="capitalize">{member.role}</span>
                </div>
              </div>
              <button
                className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                onClick={() => handleRemove(member._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEmployee;
