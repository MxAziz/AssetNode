import { useState } from "react";

const plans = [
  {
    name: "Starter",
    monthly: 5,
    yearly: 50,
    description: "Best option for personal use & for small company.",
    teamSize: "5 employees",
    support: "6 months",
    updates: "6 months",
  },
  {
    name: "Standard",
    monthly: 8,
    yearly: 80,
    description: "Best option for personal use & for medium company.",
    teamSize: "10 employees",
    support: "6 months",
    updates: "6 months",
    highlighted: true,
  },
  {
    name: "Premium",
    monthly: 15,
    yearly: 150,
    description: "Best option for personal use & for big company.",
    teamSize: "20 employees",
    support: "6 months",
    updates: "6 months",
  },
];

const CheckIcon = () => (
  <svg
    className="flex-shrink-0 w-5 h-5 text-green-500"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const PlanCard = ({
  name,
  price,
  description,
  teamSize,
  support,
  updates,
  highlighted,
  billingCycle,
}) => (
  <div
    className={`transform transition duration-300 hover:scale-105 flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border shadow-xl xl:p-8 ${
      highlighted
        ? "border-[#F7C99B] shadow-[#F7C99B] scale-105"
        : "border-[#2F4749]"
    }`}
  >
    <h3 className="mb-4 text-2xl font-semibold">{name}</h3>
    <p className="font-light text-gray-700 sm:text-lg">{description}</p>
    <div className="flex justify-center items-baseline my-8">
      <span className="mr-2 text-5xl font-extrabold">${price}</span>
      <span className="text-gray-500">/{billingCycle}</span>
    </div>
    <ul role="list" className="mb-8 space-y-4 text-left">
      <li className="flex items-center space-x-3">
        <CheckIcon />
        <span>No setup, or hidden fees</span>
      </li>
      <li className="flex items-center space-x-3">
        <CheckIcon />
        <span>
          Team size: <span className="font-semibold">{teamSize}</span>
        </span>
      </li>
      <li className="flex items-center space-x-3">
        <CheckIcon />
        <span>
          Premium support: <span className="font-semibold">{support}</span>
        </span>
      </li>
      <li className="flex items-center space-x-3">
        <CheckIcon />
        <span>
          Free updates: <span className="font-semibold">{updates}</span>
        </span>
      </li>
    </ul>
  </div>
);

const Packages = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const toggleBilling = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6">
        <div className="mx-auto text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            Choose the Right Plan for Your Team
          </h2>
          <p className="max-w-2xl mx-auto mb-5 font-light text-gray-500 sm:text-xl">
            Flexible pricing tailored to teams of all sizes. Start with what
            suits you best.
          </p>

          <button
            onClick={toggleBilling}
            className="mb-6 px-5 py-2 text-sm font-medium text-[#4d767a] border border-[#32929a] rounded-full hover:bg-[#2F4749] hover:text-white transition"
          >
            Toggle to {isMonthly ? "Yearly" : "Monthly"} Billing
          </button>
        </div>

        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {plans.map((plan) => (
            <PlanCard
              key={plan.name}
              name={plan.name}
              price={isMonthly ? plan.monthly : plan.yearly}
              billingCycle={isMonthly ? "Monthly" : "Yearly"}
              description={plan.description}
              teamSize={plan.teamSize}
              support={plan.support}
              updates={plan.updates}
              highlighted={plan.highlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
