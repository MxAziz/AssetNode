import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AddAsset = () => {
    const [selectedValue, setSelectedValue] = useState();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      productName: form.name.value,
      type: form.type.value,
      productQuantity: form.quantity.value,
      date: Date.now(),
    };

    axiosPublic
      .post("/products", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success("Product Added to the Database!");
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="pt-20 lg:pt-[80px] pb-12  bg-gradient-to-t from-[#f7c99bb1] to-[#2F4749]">
      <Helmet>
        <title>AddAsset - AssetNode</title>
      </Helmet>
      <div className="card bg-base-100  mx-auto w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text dark:text-white">Product Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="input input-bordered w-full focus:outline-none"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text ">Product Type </span>
            </label>
            <select
              id="products"
              name="type"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="select select-bordered w-full max-w-sm focus:outline-none"
            >
              <option disabled value="">
                Select a Product type?
              </option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text dark:text-white">
                Product Quantity
              </span>
            </label>
            <input
              type="number"
              name="quantity"
              placeholder="Product Quantity"
              className="input input-bordered w-full focus:outline-none"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className=" py-3 rounded-md w-full text-white bg-[#2F4749] hover:bg-[#F7C99B] hover:text-black">
              Add an Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;