"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import {
  Mail,
  User,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function UserProfile() {
  const { user } = useAuth0();
  const [showMore, setShowMore] = useState(false);

  if (!user) {
    return null;
  }

  const isEmailVerified = user.email_verified;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Profile Page
        </h1>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <img
                src={user.picture}
                alt={user.name}
                className="w-24 h-24 rounded-full"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h2>
                <p className="text-lg text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <User className="text-gray-500" />
                <span className="text-gray-900">{user.nickname || "N/A"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="text-gray-500" />
                <span className="text-gray-900">{user.email}</span>
              </div>
              {user.updated_at && (
                <div className="flex items-center space-x-2">
                  <Calendar className="text-gray-500" />
                  <span className="text-gray-900">
                    Last updated:{" "}
                    {new Date(user.updated_at).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Shield className="text-gray-500" />
                <span className="text-gray-900">
                  Account type:{" "}
                  {user.sub.startsWith("auth0") ? "Database" : "Social"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Account Status
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="flex items-center space-x-2">
              {isEmailVerified ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <XCircle className="text-red-500" />
              )}
              <span className="text-gray-900">
                {isEmailVerified ? "Email verified" : "Email not verified"}
              </span>
            </div>
            {!isEmailVerified && (
              <p className="mt-2 text-sm text-gray-500">
                Please check your email and follow the verification link to
                verify your account.
              </p>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Additional Information
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <button
              onClick={() => setShowMore(!showMore)}
              className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {showMore ? "Hide" : "Show"} More Information
            </button>
            {showMore && (
              <div className="mt-4 space-y-4">
                {user.given_name && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-500">
                      Given Name:
                    </span>
                    <span className="text-gray-900">{user.given_name}</span>
                  </div>
                )}
                {user.family_name && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-500">
                      Family Name:
                    </span>
                    <span className="text-gray-900">{user.family_name}</span>
                  </div>
                )}
                {user.locale && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-500">Locale:</span>
                    <span className="text-gray-900">{user.locale}</span>
                  </div>
                )}
                {user.created_at && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-500">
                      Account Created:
                    </span>
                    <span className="text-gray-900">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
