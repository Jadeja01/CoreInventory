import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    // MOCK API CALL: Here you would trigger your backend to send an email
    toast.success(`OTP sent to ${email}`);
    setStep(2);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    // MOCK VERIFY: Let's pretend "123456" is the correct OTP
    if (otp === "123456") {
      toast.success("OTP Verified!");
      setStep(3);
    } else {
      toast.error("Invalid OTP. Try 123456 for testing.");
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // MOCK SAVE: Send the new password to your backend
    toast.success("Password reset successfully! Please sign in.");
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Reset Password</h2>
            <p className="text-sm text-center text-gray-600">Enter your email to receive an OTP.</p>
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md">
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Enter OTP</h2>
            <p className="text-sm text-center text-gray-600">We sent a code to {email}</p>
            <div>
              <input
                type="text"
                maxLength={6}
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 text-center tracking-widest border rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md">
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <h2 className="text-2xl font-bold text-center">New Password</h2>
            <div>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md">
              Save Password
            </button>
          </form>
        )}

        {step === 1 && (
          <div className="text-center">
            <Link to="/signin" className="text-sm text-blue-600 hover:underline">Back to Sign In</Link>
          </div>
        )}
      </div>
    </div>
  );
}
