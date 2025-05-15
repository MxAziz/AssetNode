// import React, { useState } from "react";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

// const AddEmployee = () => {
//   const navigate = useNavigate();
//   const axiosPublic = useAxiosPublic();

//   const [currentPackage, setCurrentPackage] = useState({
//     employeeCount: 3,
//     packageLimit: 5,
//   });

//   // 🤏 TODO :
//   // Fetch users who are not affiliated with any company
//   const {
//     data: employees = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/users");
//       return res.data;
//     },
//   });


//   //   Mutation to add employee to the team
//   //   const addEmployeeMutation = useMutation(
//   //     (employeeId) =>
//   //       axiosSecure.put(`/add-to-team/${employeeId}`, {
//   //         // Optional data for future use
//   //       }),
//   //     {
//   //       onSuccess: () => {
//   //         toast.success("Employee added to the team!");
//   //         refetch();
//   //         setCurrentPackage((prev) => ({
//   //           ...prev,
//   //           employeeCount: prev.employeeCount + 1,
//   //         }));
//   //       },
//   //       onError: (error) =>
//   //         toast.error(error.response.data.message || error.message),
//   //     }
//   //   );

//   // Redirect to Package Upgrade Page
//   const handleUpgrade = () => navigate("/upgrade-package");

//   if (isLoading)
//     return (
//       <p>
//         <span className="loading loading-bars loading-lg"></span>
//       </p>
//     );

//   return (
//     <div className="dark:bg-gray-800 dark:text-white">
//       <div className="pt-28 pb-10 w-11/12 mx-auto">
//         {/* Package Section */}
//         <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-lg shadow-md mb-8">
//           <h2 className="text-xl font-bold">Current Package</h2>
//           <p>Employee Count: {currentPackage.employeeCount}</p>
//           <p>Package Limit: {currentPackage.packageLimit}</p>
//           {currentPackage.employeeCount >= currentPackage.packageLimit && (
//             <p className="text-red-500">
//               Upgrade your package to add more members.
//             </p>
//           )}
//           <button
//             onClick={handleUpgrade}
//             className="btn btn-primary mt-4"
//             disabled={
//               currentPackage.employeeCount < currentPackage.packageLimit
//             }
//           >
//             Upgrade Package
//           </button>
//         </div>

//         {/* Employee List */}
//         <div className="overflow-x-auto">
//           <h2 className="text-2xl font-bold mb-4">Add Employees to the Team</h2>
//           <table className="table w-full">
//             <thead>
//               <tr>
//                 <th>Select</th>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Array.isArray(employees) ? (
//                 employees.map((employee) => (
//                   <tr key={employee._id}>
//                     <td>
//                       <input
//                         type="checkbox"
//                         className="checkbox dark:bg-gray-600"
//                       />
//                     </td>
//                     <td>
//                       <img
//                         src={employee.photo || "/default-profile.png"}
//                         alt={employee.name}
//                         className="w-12 h-12 rounded-full"
//                       />
//                     </td>
//                     <td>{employee.name}</td>
//                     <td>
//                       <button
//                         onClick={() => addEmployeeMutation.mutate(employee._id)}
//                         className="p-2 rounded-md  bg-[#4d2745]"
//                         disabled={
//                           currentPackage.employeeCount >=
//                           currentPackage.packageLimit
//                         }
//                       >
//                         Add to Team
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <p>Loading...</p>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEmployee;


import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const AddEmployee = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  console.log(user);

  const [currentPackage, setCurrentPackage] = useState({
    employeeCount: 3,
    packageLimit: 5,
  });

  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["unaffiliated-users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users?affiliated=false");
      return res.data;
    },
  });
  console.log(employees);

//   {
//   "name": "John Doe",
//   "email": "john@example.com",
//   "profileImage": "https://example.com/image.jpg",
//   "companyId": null, // যদি affiliated না থাকে, তাহলে null
//   "teamId": "team_abc123", // HR যে টিমে assign করবে
//   "role": "employee"
// }


  // const addEmployeeMutation = useMutation({
  //   mutationFn: (employeeId) =>
  //     axiosPublic.put(`/add-to-team/${employeeId}`),
  //   onSuccess: () => {
  //     toast.success("Employee added to the team!");
  //     refetch();
  //     setCurrentPackage((prev) => ({
  //       ...prev,
  //       employeeCount: prev.employeeCount + 1,
  //     }));
  //   },
  //   onError: (error) => {
  //     toast.error(error.response?.data?.message || error.message);
  //   },
  // });

  const handleAddEmployee = async (employeeId) => {
  if (currentPackage.employeeCount >= currentPackage.packageLimit) {
    toast.warning("Package limit reached. Please upgrade.");
    return;
  }

  try {
    const res = await axiosPublic.put(`/add-to-team/${employeeId}`, {
      teamId: user?.teamId,
      companyId: user?.companyId,
    });

    if (res.data.success) {
      toast.success("Employee added to your team.");
      refetch();
      setCurrentPackage((prev) => ({
        ...prev,
        employeeCount: prev.employeeCount + 1,
      }));
    } else {
      toast.error(res.data.message || "Something went wrong.");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};


  const handleUpgrade = () => navigate("/upgrade-package");

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="">
      <div className="pt-20 pb-10 bg-gradient-to-b from-[#2F4749] to-[#e3b68a] text-white">
        {/* Package Section */}
        <div className="bg-gray-100 w-11/12 mx-auto text-black p-5 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold">Current Package</h2>
          <p>Employee Count: {currentPackage.employeeCount}</p>
          <p>Package Limit: {currentPackage.packageLimit}</p>
          {currentPackage.employeeCount >= currentPackage.packageLimit && (
            <p className="text-red-500">
              Upgrade your package to add more members.
            </p>
          )}
          <button
            onClick={handleUpgrade}
            className="btn btn-primary mt-4"
            disabled={currentPackage.employeeCount < currentPackage.packageLimit}
          >
            Upgrade Package
          </button>
        </div>

        {/* Employee List */}
        <div className="overflow-x-auto w-11/12 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Add Employees to the Team</h2>
          <table className="table w-full">
            <thead className="bg-[#2F4749] text-white">
              <tr>
                <th>Select</th>
                <th>Image</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.length ? (
                employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>
                      <input type="checkbox" className="checkbox border-2 border-black" />
                    </td>
                    <td>
                      <img
                        src={employee.photo || "/default-profile.png"}
                        alt={employee.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </td>
                    <td className=" font-bold text-xl">{employee.name}</td>
                    <td>
                      <button
                        // onClick={() => addEmployeeMutation.mutate(employee._id)}
                        onClick={()=> handleAddEmployee(employee._id)}
                        className="btn btn-sm bg-[#2F4749] text-white hover:bg-[#F7C99B] hover:text-black border-none"
                        disabled={currentPackage.employeeCount >= currentPackage.packageLimit}
                      >
                        Add to Team
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No unaffiliated employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
