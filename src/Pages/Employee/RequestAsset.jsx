import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const RequestAsset = () => {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState({
    availability: "",
    type: "",
  });

  const [modalData, setModalData] = useState(null);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: allAssets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/assets");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  // Filter and search logic (Client-side)
const filteredAssets = allAssets.filter((asset) => {
  // Matches search keyword
  const matchesSearch = search
    ? asset?.productName?.toLowerCase().includes(search.toLowerCase())
    : true;
  // Matches availability
  const matchesAvailability =
    !selectedFilter.availability ||
    (selectedFilter.availability === "Available" &&
      asset.productQuantity > 0) ||
    (selectedFilter.availability === "Out of stock" &&
      asset.productQuantity < 1);

  // Matches type
  const matchesType =
    !selectedFilter.type || asset.type === selectedFilter.type;

  // Final condition
  return matchesSearch && matchesAvailability && matchesType;
});


  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;
    const notes = form.notes.value;

    const requestData = {
      assetId: modalData._id,
      assetName: modalData.productName,
      assetType: modalData.type,
      requestDate: new Date(),
      requestStatus: "Pending",
      employeeName: user.displayName,
      employeeEmail: user.email,
      notes,
    };
    console.log("Sending Request Data:", requestData);

    axiosPublic.post("/requestProducts", requestData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Asset request submitted successfully!");
          refetch();
          setModalData(null);
        }
      })
      .catch(() => {
        toast.error("Failed to submit the request. Try again.");
      });
    };

  return (
    <div className="">
      <div className="container pt-[50px] pb-12 mx-auto">
        <div className="flex justify-between items-center w-11/12 mx-auto">
          {/* Search */}
          <div className="mb-4 max-w-xl w-full">
            <input
              type="text"
              placeholder="Search by asset name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full  border "
            />
          </div>

          {/* Filter */}
          <div className="flex gap-4 mb-6">
            <select
              value={selectedFilter.availability}
              onChange={(e) =>
                setSelectedFilter({
                  ...selectedFilter,
                  availability: e.target.value,
                })
              }
              className="select select-bordered "
            >
              <option value="">Filter by Availability</option>
              <option value="Available">Available</option>
              <option value="Out of stock">Out of stock</option>
            </select>
            <select
              value={selectedFilter.type}
              onChange={(e) =>
                setSelectedFilter({ ...selectedFilter, type: e.target.value })
              }
              className="select select-bordered "
            >
              <option value="">Filter by Type</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>
        </div>

        {/* Asset List */}
        <div className="w-11/12 mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAssets.map((asset) => (
            <div
              key={asset._id}
              className="card shadow-lg bg-base-100 "
            >
              <div className="card-body">
                <h2 className="card-title">{asset.productName}</h2>
                <p>Type: {asset.type}</p>
                <p>
                  Availability:{" "}
                  {asset.productQuantity > 0 ? "Available" : "Out of stock"}
                </p>
                <button
                  onClick={() => setModalData(asset)}
                  className="btn border-none bg-[#2F4749] text-white hover:bg-[#F7C99B] hover:text-black mt-4"
                  disabled={asset.productQuantity < 1}
                >
                  Request
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Section */}
        {modalData && (
          <div className="modal modal-open ">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Request Asset</h3>
              <form onSubmit={handleRequest}>
                <div className="form-control mb-4 flex flex-col">
                  <label className="label">
                    <span className="label-text dark:text-white">Additional Notes</span>
                  </label>
                  <textarea
                    name="notes"
                    placeholder="Write additional notes here"
                    className="textarea textarea-bordered w-full "
                  ></textarea>
                </div>
                <div className="modal-action">
                  <button
                    type="submit"
                    className=" px-2 rounded-md bg-[#2F4749] text-white hover:bg-[#F7C99B] hover:text-black py-2"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalData(null)}
                    className="btn bg-[#F7C99B] text-black hover:bg-[#2F4749] hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestAsset;