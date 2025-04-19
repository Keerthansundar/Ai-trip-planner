import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  selectBudgetOptions,
  SelectTravelersList,
} from "@/constants/options";
import { chatSessions } from "@/service/AIModal";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useOlaAutocomplete } from "@/lib/ola-api";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "@/service/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const {
    query,
    setQuery,
    suggestions,
    fetchSuggestions,
    handleSelectPlace,
  } = useOlaAutocomplete(handleInputChange);

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      getUserProfile(tokenResponse);
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDailog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("⚠️ Please fill all details");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    try {
      const result = await chatSessions.sendMessage(FINAL_PROMPT);
      const responseText = result?.response?.text();
      console.log("Fetched AI data");
      saveAiTrip(responseText);
    } catch (error) {
      toast.error("AI failed to generate trip. Try again.");
      setLoading(false);
    }
  };

  const saveAiTrip = async (TripData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();
      const parsedData = JSON.parse(TripData);

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedData,
        userEmail: user?.email,
        id: docId,
        createdAt: serverTimestamp(),
      });

      navigate("/view-trip/" + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save your trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getUserProfile = async (tokenInfo) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      setOpenDailog(false);
      onGenerateTrip(); // ✅ resume trip generation after login
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences ⛺🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        {/* Location Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <Input
            placeholder="Enter a destination..."
            value={query}
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
              fetchSuggestions(val);
            }}
          />
          {suggestions.length > 0 && (
            <div className="border mt-2 rounded-md shadow-sm max-h-48 overflow-auto bg-white z-50">
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectPlace(item)}
                >
                  {item.description || item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Days Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            name="noOfDays"
            value={formData.noOfDays || ""}
            onChange={(e) =>
              handleInputChange("noOfDays", Number(e.target.value))
            }
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">What's your travel budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {selectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                  formData?.budget === item.title
                    ? "shadow-lg border-black"
                    : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 cursor-pointer">
            {SelectTravelersList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg ${
                  formData?.traveler === item.people
                    ? "shadow-lg border-black"
                    : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "✨ Generate Trip "
          )}
        </Button>
      </div>

      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign in to the app with Google authentication securely</p>
              <Button
                disabled={loading}
                className="w-full mt-5 flex gap-4 items-center"
                onClick={login}
              >
                <FcGoogle className="h-7 w-7" /> Sign In
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
