import React from "react";
import { FaTrophy, FaUserPlus, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              CODM Tournament Manager
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              The ultimate solution for managing your Call of Duty Mobile
              tournaments. Track player kills, organize lobbies, and manage your
              clan's competitive events.
            </p>
            <div className="space-x-4">
              <Link
                to="/tournament/create"
                className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
              >
                Create Tournament
              </Link>
              <Link
                to="/players/register"
                className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-600 transition duration-300"
              >
                Register Players
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Tournament Management Made Easy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FaTrophy className="h-12 w-12 text-blue-500" />}
                title="Tournament Organization"
                description="Create and manage multi-day tournaments with custom lobbies. Track scores, organize teams, and maintain leaderboards with ease."
              />
              <FeatureCard
                icon={<FaUserPlus className="h-12 w-12 text-blue-500" />}
                title="Player Management"
                description="Register players, track their performance, and monitor their kill counts across different tournaments and lobbies."
              />
              <FeatureCard
                icon={<FaChartLine className="h-12 w-12 text-blue-500" />}
                title="Statistics Tracking"
                description="Real-time kill tracking, performance analytics, and detailed tournament statistics for every player and lobby."
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="shadow-sm drop-shadow-xl rounded-2xl p-8 md:p-12 text-center bg-white transform transition duration-300 hover:scale-105">
              <h2 className="text-3xl font-bold mb-4">
                Ready to organize your next CODM tournament?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Start managing your tournaments professionally. Create lobbies,
                track kills, and keep your competitive scene organized.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  to="/tournament/view"
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  View Tournaments
                </Link>
                <Link
                  to="/players/view"
                  className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition duration-300"
                >
                  View Players
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StatCard
                title="Easy Setup"
                description="Create tournaments in minutes"
              />
              <StatCard
                title="Real-time"
                description="Live kill count updates"
              />
              <StatCard
                title="Organized"
                description="Multiple lobby management"
              />
              <StatCard
                title="Detailed"
                description="Complete player statistics"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; 2024 CODM Tournament Manager. All rights reserved.
            </p>
            <nav className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link
                    to="/tournament"
                    className="hover:text-blue-400 transition duration-300"
                  >
                    Tournaments
                  </Link>
                </li>
                <li>
                  <Link
                    to="/players"
                    className="hover:text-blue-400 transition duration-300"
                  >
                    Players
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-blue-400 transition duration-300"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
      <div className="flex justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

const StatCard = ({ title, description }) => {
  return (
    <div className="text-center p-6 bg-white rounded-lg shadow hover:shadow-md transition duration-300">
      <h4 className="font-bold text-xl mb-2 text-blue-600">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;
