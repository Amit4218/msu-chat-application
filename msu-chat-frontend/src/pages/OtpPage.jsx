import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "../hooks/use-toast";

function InputOtp() {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;

  const verifyOtp = async (e) => {
    e.preventDefault(); // ✅ prevents page reload
    try {
      const demoOtp = "123456";
      if (otp !== demoOtp) {
        alert("Invalid OTP. Please try again.");
        return;
      }

      setLoading(true);
      console.log("OTP entered:", otp);
      console.log("User data received:", userData);

      toast({
        title: "Account Verified",
        description: "Your account has been verified successfully.",
      });

      navigate("/chat");
    } catch (error) {
      console.error(error);
      alert("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-emerald-50 to-green-50">
      <div className="bg-white shadow-2xl p-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg flex flex-col items-center justify-center gap-5">
        <div className="border-b-2 mb-2 text-xl font-medium">
          Enter OTP sent to your email
        </div>

        
        <form onSubmit={verifyOtp} className="flex flex-col items-center gap-5">
          <InputOTP maxLength={6} onChange={(value) => setOtp(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button
            type="submit" 
            className="w-full bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
            disabled={loading}
          >
            {loading ? "Verifying account..." : "Verify Account"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default InputOtp;
