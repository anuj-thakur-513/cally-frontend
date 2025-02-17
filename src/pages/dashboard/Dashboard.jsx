import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";
import { ImShare2 } from "react-icons/im";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [selectedView, setSelectedView] = useState("upcoming");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const copySchedulerLink = () => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    const link = `https://cally.anujthakur.dev/schedule/${user.id}`;
    navigator.clipboard.writeText(link);
    toast.success("Link to your scheduler copied to clipboard");
  };

  const getEvents = async (type) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/v1/meeting/${type}`);
      if (res.status === 200) {
        setEvents(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshEvents = () => {
    getEvents(selectedView);
  };

  useEffect(() => {
    getEvents(selectedView);
  }, [selectedView]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              Your Events
              {!isLoading && <span className="text-blue-600 ml-2">({events.length})</span>}
            </h1>

            {/* Toggle Switch */}
            <div className="flex bg-white rounded-lg p-1.5 shadow-sm border border-gray-200">
              <button
                className={`cursor-pointer px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedView === "upcoming"
                    ? "bg-blue-50 text-blue-600 shadow-inner"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedView("upcoming")}
                disabled={isLoading}
              >
                Upcoming
              </button>
              <button
                className={`cursor-pointer px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedView === "past"
                    ? "bg-blue-50 text-blue-600 shadow-inner"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedView("past")}
                disabled={isLoading}
              >
                Past
              </button>
            </div>
            <div
              className="m-1.5 bg-transparent transition duration-200 hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer flex items-center space-x-2"
              onClick={copySchedulerLink}
            >
              <ImShare2 />
              <span>Scheduler Link</span>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : events?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  refreshEvents={refreshEvents}
                  variant={selectedView === "past" ? "past" : "upcoming"}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 rounded-xl bg-white border-2 border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">No {selectedView} events found</p>
              <p className="text-gray-400 text-sm mt-2">Create a new event to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
