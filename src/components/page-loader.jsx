import { FaSpinner } from "react-icons/fa";

export const PageLoader = () => (
  <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-50 overflow-y-hidden">
    <div className="bg-white p-8 rounded-lg shadow-xl text-center">
      <FaSpinner className="animate-spin text-blue-600 text-4xl mx-auto mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Authenticating
      </h2>
      <p className="text-gray-600">
        Please wait while we verify your credentials...
      </p>
    </div>
  </div>
);
