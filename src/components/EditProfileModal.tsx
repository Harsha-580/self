import React, { useState } from 'react';
import { StudentProfile } from '../types/student';
import { X, Save, User, Phone, MapPin, AlertCircle, Camera } from 'lucide-react';
import { sound } from '../services/audio';

interface EditProfileModalProps {
  student: StudentProfile;
  onClose: () => void;
  onSave: (updated: Partial<StudentProfile>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  student,
  onClose,
  onSave,
}) => {
  const [phone, setPhone] = useState(student.phone);
  const [altPhone, setAltPhone] = useState(student.altPhone || '');
  const [bloodGroup, setBloodGroup] = useState(student.bloodGroup);
  const [profilePhoto, setProfilePhoto] = useState(student.profilePhoto);

  // Address
  const [currentLine1, setCurrentLine1] = useState(student.currentAddress.line1);
  const [currentCity, setCurrentCity] = useState(student.currentAddress.city);
  const [currentState, setCurrentState] = useState(student.currentAddress.state);
  const [currentPostal, setCurrentPostal] = useState(student.currentAddress.postalCode);

  // Emergency contact
  const [emergName, setEmergName] = useState(student.emergencyContact.name);
  const [emergRel, setEmergRel] = useState(student.emergencyContact.relationship);
  const [emergPhone, setEmergPhone] = useState(student.emergencyContact.phone);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError('Mobile number is required.');
      return;
    }

    setIsSubmitting(true);
    sound.playClick();

    const updates: Partial<StudentProfile> = {
      phone: phone.trim(),
      altPhone: altPhone.trim() || undefined,
      bloodGroup: bloodGroup.trim(),
      profilePhoto: profilePhoto,
      currentAddress: {
        ...student.currentAddress,
        line1: currentLine1.trim(),
        city: currentCity.trim(),
        state: currentState.trim(),
        postalCode: currentPostal.trim(),
      },
      emergencyContact: {
        ...student.emergencyContact,
        name: emergName.trim(),
        relationship: emergRel.trim(),
        phone: emergPhone.trim(),
      },
    };

    setTimeout(() => {
      onSave(updates);
      setIsSubmitting(false);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Edit Contact & Residence Details
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Update authorized student contact records and residence information
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="flex items-center gap-2 p-3 text-xs bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Profile Photo Preview & Change */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 shrink-0">
              <img
                src={profilePhoto}
                alt={student.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Student Profile Photograph
              </p>
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors">
                <Camera className="w-3.5 h-3.5" />
                <span>Upload New Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] text-slate-400 mt-1">
                Accepted: JPG, PNG up to 2MB. Square crop recommended.
              </p>
            </div>
          </div>

          {/* Contact Numbers */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-500" />
              <span>Telecommunication Contact</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Mobile Number *
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Alternate Mobile Number
                </label>
                <input
                  type="text"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Blood Group
            </label>
            <input
              type="text"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              placeholder="e.g. O+ Positive"
              className="w-full md:w-1/2 px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
            />
          </div>

          {/* Current Address */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              <span>Current Residence / Hostel Address</span>
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Street / Hostel / Room Details
                </label>
                <input
                  type="text"
                  value={currentLine1}
                  onChange={(e) => setCurrentLine1(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={currentCity}
                    onChange={(e) => setCurrentCity(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={currentState}
                    onChange={(e) => setCurrentState(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={currentPostal}
                    onChange={(e) => setCurrentPostal(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              Emergency Contact Designated Person
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={emergName}
                  onChange={(e) => setEmergName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  value={emergRel}
                  onChange={(e) => setEmergRel(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Emergency Phone
                </label>
                <input
                  type="text"
                  value={emergPhone}
                  onChange={(e) => setEmergPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Note on Locked Fields */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-xs text-amber-800 dark:text-amber-300">
            <strong>Note on Official Records:</strong> Core identity fields (Full Legal Name, Student ID, Date of Birth, and Permanent State Address) are governed by the Registrar's Office and require formal identity verification for modifications.
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl transition-colors shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Saving Records...' : 'Save & Update'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
