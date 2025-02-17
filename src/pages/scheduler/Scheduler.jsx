import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Clock, Calendar, Send } from "lucide-react";
import { TIME_OPTIONS } from "../../utils/constants";
import toast from "react-hot-toast";

const Scheduler = () => {
  const [receiver, setReceiver] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { userId } = useParams();

  const getUser = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/v1/user/receiver/${userId}`);
      if (res.status === 200) {
        setReceiver(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
      window.location.href = "/";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scheduleTime = new Date(`${date} ${time}`).toISOString();
    const body = {
      title,
      description,
      time: scheduleTime,
    };

    try {
      const res = await axios.post(`/api/v1/meeting/schedule/${receiver.id}`, body);

      if (res.status === 200) {
        toast.success("Meeting scheduled successfully");
        window.location.href = "/";
      }
    } catch (error) {
      toast.error("Error faced while scheduling meeting");
      console.log(error);
    }
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("userProfile"));
    if (loggedInUser.id == userId) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-lg">
          <div className="h-32 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Card - Full width */}
        <div className="bg-white rounded-lg shadow-sm mb-8 p-6">
          <div className="flex items-center space-x-6">
            <img
              src={receiver?.profilePicture}
              alt={receiver?.name}
              className="w-20 h-20 rounded-full border-2 border-blue-100"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{receiver?.name}</h2>
              <p className="text-gray-500 mt-1">Schedule a meeting</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Meeting Details */}
            <div className="lg:w-2/5 space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium mb-6">Meeting Details</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title*</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter meeting title"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description*
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter meeting description"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                      rows={4}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition duration-200 ${
                  !date || !time || !title || !description
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={!date || !time || !title || !description}
              >
                <Send className="w-5 h-5" />
                <span>Send Meeting Request</span>
              </button>
            </div>

            {/* Right Column - Date and Time Selection */}
            <div className="lg:w-3/5 space-y-8">
              {/* Date Selection */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium flex items-center mb-6">
                  <Calendar className="w-5 h-5 mr-2" />
                  Select Date
                </h3>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                  required
                />
              </div>

              {/* Time Selection */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium flex items-center mb-6">
                  <Clock className="w-5 h-5 mr-2" />
                  Select Time
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                  {TIME_OPTIONS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`py-2 px-3 cursor-pointer rounded-lg text-sm font-medium transition duration-200 ${
                        time === slot
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Scheduler;
