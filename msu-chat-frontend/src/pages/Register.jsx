import React, { use, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import InputOtp from "./OtpPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  MessageSquare,
  Mail,
  Lock,
  Phone,
  User,
  GraduationCap,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import { toast } from "../hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registrationNo: "",
    password: "",
    phoneNumber: "",
    semester: "",
    department: "",
    gender: "",
    designation: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };
  const handleGenderChange = (value) => {
    // console.log(value);

    setFormData({ ...formData, gender: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { name, email, password, phoneNumber, department, gender } =
        formData;

      // console.log(gender)
      if (
        !name ||
        !email ||
        !password ||
        !phoneNumber ||
        !department ||
        !gender
      ) {
        throw new Error("Please fill in all required fields");
      }

      if (userType === "student" && !formData.semester) {
        throw new Error("Please select your semester");
      }

      if (userType === "staff" && !formData.designation) {
        throw new Error("Please enter your designation");
      }

      const userData = {
        name,
        email,
        password,
        phoneNumber,
        type: userType,
        ...(userType === "student"
          ? {
              semester: formData.semester,
              registrationNo: formData.registrationNo,
            }
          : { designation: formData.designation }),
      };

      await register(userData);
      navigate("/register/otp", { state: userData });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 via-emerald-50 to-green-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-linear-to-br from-teal-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CollegeChat</h1>
          <p className="text-gray-600">Join your campus community</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Register with your college email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={setUserType} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="student"
                  className="flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="staff" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Staff
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <div className="relative ">
                  <RadioGroup
                    defaultValue="others"
                    onValueChange={handleGenderChange}
                  >
                    <div className="flex items-center gap-3 mt-1">
                      <RadioGroupItem id="male" value="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem id="female" value="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem id="others" value="others" />
                      <Label htmlFor="others">Others</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  College Email <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.name@college.edu"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">
                  Phone Number <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+1234567890"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              {userType === "student" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="semester">
                      Semester <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="semester"
                      name="semester"
                      placeholder="e.g., 6th Semester"
                      value={formData.semester}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registrationNo">
                      Registration No <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="registrationNo"
                      name="registrationNo"
                      placeholder="e.g., 230400000000"
                      value={formData.registrationNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="designation">
                    Designation / Role <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="designation"
                    name="designation"
                    placeholder="e.g., Professor - Computer Science"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  placeholder="e.g., BCA, Computer Science"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
            
            

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                to="/login"
                className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
        
          
        <p className="text-center text-xs text-gray-500 mt-6">
          Use your college email (@msu.edu.in) to register
        </p>
      </div>
    </div>
  );
};

export default Register;
