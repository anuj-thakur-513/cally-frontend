/* eslint-disable react/prop-types */
import axios from "axios";
import { format } from "date-fns";
import { ImCross } from "react-icons/im";
import { SiGooglemeet } from "react-icons/si";
import { TiTick } from "react-icons/ti";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const EventCard = ({ event, refreshEvents, variant = "upcoming" }) => {
  const [isSender, setIsSender] = useState(false);

  const isUpcoming = variant === "upcoming";
  const dateTime = format(new Date(event.time), "EEEE, MMM d, yyyy h:mm a");
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    past: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("userProfile"));
    if (user) {
      setIsSender(event.senderId == user.id);
    }
  }, []);

  const acceptMeeting = async (meetingId) => {
    try {
      const res = await axios.post(`/api/v1/meeting/accept/${meetingId}`);
      if (res.status === 200) {
        toast.success("Meeting accepted successfully");
        const res = await axios.get(`/api/v1/meeting/${variant}`);
        if (res.status === 200) {
          refreshEvents();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error accepting meeting");
    }
  };

  const rejectMeeting = async (meetingId) => {
    try {
      const res = await axios.post(`/api/v1/meeting/reject/${meetingId}`);
      if (res.status === 200) {
        toast.success("Meeting rejected successfully");
        const res = await axios.get(`/api/v1/meeting/${variant}`);
        if (res.status === 200) {
          refreshEvents();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error rejecting meeting");
    }
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <img
              src={!isSender ? event?.sender?.profilePicture : event?.receiver?.profilePicture}
              alt={`${!isSender ? event.sender.name : event.receiver.name}'s profile`}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{event.title}</h2>
              <p className="text-sm text-gray-500">
                {!isSender ? event.sender.name : event.receiver.name}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[variant]}`}>
            {variant}
          </span>
        </div>

        {/* Body Content */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">{dateTime}</p>
          <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
        </div>

        {/* Action Buttons */}
        {isUpcoming && !isSender ? (
          <div className="border-t border-gray-100 pt-4">
            {event.accepted ? (
              <button
                className="cursor-pointer w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                onClick={() => window.open(event.meetLink, "_blank")}
              >
                <SiGooglemeet className="w-5 h-5" />
                <span>Join Meeting</span>
              </button>
            ) : !event.accepted && event.responded ? (
              <p className="text-center text-lg text-red-500">
                <span>Meeting Rejected</span>
              </p>
            ) : (
              <div className="flex gap-3">
                <button
                  className="cursor-pointer flex-1 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => rejectMeeting(event.id)}
                >
                  <ImCross className="w-4 h-4" />
                  <span>Reject</span>
                </button>
                <button
                  className="cursor-pointer flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => acceptMeeting(event.id)}
                >
                  <TiTick className="w-5 h-5" />
                  <span>Accept</span>
                </button>
              </div>
            )}
          </div>
        ) : isUpcoming && isSender ? (
          <div className="border-t border-gray-100 pt-4">
            <p
              className={`text-center text-lg ${
                event.accepted
                  ? "text-green-500"
                  : !event.accepted && event.responded
                  ? "text-red-500"
                  : "text-blue-500"
              }`}
            >
              {event.accepted
                ? "Request Accepted"
                : !event.accepted && event.responded
                ? "Request Rejected"
                : "Request Sent Successfully"}
            </p>
          </div>
        ) : (
          <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-md text-gray-500">
              <span>
                Meeting{" "}
                {event.accepted
                  ? "Accepted"
                  : !event.accepted && event.responded
                  ? "Rejected"
                  : "Not Responded"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Hover effect layer */}
      <div
        className={`absolute inset-0 border-2 border-transparent ${
          variant === "upcoming" ? "group-hover:border-blue-200" : "group-hover:border-red-200"
        } rounded-xl pointer-events-none transition-all duration-200`}
      />
    </div>
  );
};

export default EventCard;
