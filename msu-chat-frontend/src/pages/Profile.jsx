import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button'; 
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { ArrowLeft, Camera, Save, User, Mail, Phone, GraduationCap, Briefcase } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    phone: currentUser?.phone || '',
    semester: currentUser?.semester || '',
    designation: currentUser?.designation || ''
  });

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast({
      title: 'Profile updated!',
      description: 'Your profile has been updated successfully'
    });
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser.name,
      bio: currentUser.bio,
      phone: currentUser.phone,
      semester: currentUser.semester || '',
      designation: currentUser.designation || ''
    });
    setIsEditing(false);
  };

  const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-emerald-50 to-green-50">
      {/* Header */}
      <div className="bg-linear-to-r from-teal-500 to-emerald-600 text-white px-4 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/chat")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Chat
          </Button>
          <h1 className="text-2xl font-bold flex-1">My Profile</h1>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-linear-to-r from-teal-500 to-emerald-600 text-white rounded-t-lg">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                  <AvatarFallback className="bg-white text-teal-600 text-4xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </button>
              </div>
              <h2 className="text-2xl font-bold mt-4">{currentUser.name}</h2>
              <p className="text-teal-100">{currentUser.email}</p>
              <div className="mt-2 px-4 py-1 bg-white/20 rounded-full text-sm">
                {currentUser.type === "student" ? "Student" : "Staff Member"}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Bio Section */}
            <div className="space-y-2">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-teal-600" />
                Bio
              </Label>
              {isEditing ? (
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  rows={3}
                />
              ) : (
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {currentUser.bio || "No bio added yet"}
                </p>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-600" />
                  Email
                </Label>
                <Input
                  value={currentUser.email}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-600" />
                  Phone Number
                </Label>
                {isEditing ? (
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1234567890"
                  />
                ) : (
                  <Input
                    value={currentUser.phone}
                    disabled
                    className="bg-gray-50"
                  />
                )}
              </div>
            </div>

            {/* Type-specific Information */}
            {currentUser.type === "student" ? (
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-teal-600" />
                  Semester
                </Label>
                {isEditing ? (
                  <Input
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    placeholder="e.g., 6th Semester"
                  />
                ) : (
                  <Input
                    value={currentUser.semester}
                    disabled
                    className="bg-gray-50"
                  />
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-teal-600" />
                  Designation / Role
                </Label>
                {isEditing ? (
                  <Input
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="e.g., Professor - Computer Science"
                  />
                ) : (
                  <Input
                    value={currentUser.designation}
                    disabled
                    className="bg-gray-50"
                  />
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="mt-6 shadow-lg border-0">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Account Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Account Type:</span>
                <span className="font-medium text-gray-900">
                  {currentUser.type === "student" ? "Student" : "Staff"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email Verified:</span>
                <span className="font-medium text-green-600">
                  Yes (@college.edu)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since:</span>
                <span className="font-medium text-gray-900">July 2025</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;