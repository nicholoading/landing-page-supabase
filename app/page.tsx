"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase"; // 🔹 Import Supabase client

const generatePassword = () => Math.random().toString(36).slice(-8); // 🔹 Generate 8-char random password

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    teamName: "",
    representingSchool: "",
    schoolName: "",
    schoolAddress: "",
    postalCode: "",
    educationLevel: "",
    category: "",
    city: "",
    state: "",
    teacherName: "",
    teacherEmail: "",
    teacherIC: "", // 🔹 Now included
    teacherPhone: "",
    teacherSize: "",
    agreeToTerms: false,
    teamMembers: Array(3).fill({
      name: "",
      ic: "",
      gender: "",
      race: "",
      grade: "",
      parentName: "",
      parentPhone: "",
      parentEmail: "", // 🔹 Now included
      size: "",
    }),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamMemberChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedTeamMembers = [...formData.teamMembers];
    updatedTeamMembers[index] = {
      ...updatedTeamMembers[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, teamMembers: updatedTeamMembers }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 🔹 Step 1: Check if team name exists
    const { data: existingTeams, error: fetchError } = await supabase
      .from("teams")
      .select("teamName")
      .eq("teamName", formData.teamName);

    if (fetchError) {
      toast({
        title: "Error",
        description: "Failed to check existing teams.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (existingTeams.length > 0) {
      toast({
        title: "Registration Failed",
        description: "Team name is taken.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // 🔹 Step 2: Check for duplicate ICs
    const icSet = new Set();
    icSet.add(formData.teacherIC);

    for (const member of formData.teamMembers) {
      if (icSet.has(member.ic)) {
        toast({
          title: "Error",
          description: `Duplicate IC: ${member.ic}`,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      icSet.add(member.ic);
    }

    // 🔹 Step 3: Check for duplicate emails
    const emailSet = new Set();
    emailSet.add(formData.teacherPhone);

    for (const member of formData.teamMembers) {
      if (emailSet.has(member.parentEmail)) {
        toast({
          title: "Error",
          description: `Duplicate email: ${member.parentEmail}`,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      emailSet.add(member.parentEmail);
    }

    // 🔹 Step 4: Generate random passwords
    const teacherPassword = generatePassword();
    const teamPasswords = formData.teamMembers.map(() => generatePassword());

    // 🔹 Step 5: Insert into Supabase
    try {
      const { data, error } = await supabase.from("teams").insert([
        {
          teamName: formData.teamName,
          representingSchool: formData.representingSchool,
          schoolName: formData.schoolName,
          schoolAddress: formData.schoolAddress,
          postalCode: formData.postalCode,
          educationLevel: formData.educationLevel,
          category: formData.category,
          city: formData.city,
          state: formData.state,
          teacherName: formData.teacherName,
          teacherEmail: formData.teacherEmail,
          teacherIC: formData.teacherIC, // 🔹 Teacher IC is now stored
          teacherPhone: formData.teacherPhone,
          size: formData.teacherSize,
          teacherPassword: teacherPassword,
          registrationStatus: "Pending",

          // Team Member 1
          teamMember1Name: formData.teamMembers[0]?.name || "",
          teamMember1IC: formData.teamMembers[0]?.ic || "",
          teamMember1Gender: formData.teamMembers[0]?.gender || "",
          teamMember1Race: formData.teamMembers[0]?.race || "",
          teamMember1Grade: formData.teamMembers[0]?.grade || "",
          teamMember1ParentName: formData.teamMembers[0]?.parentName || "",
          teamMember1ParentPhone: formData.teamMembers[0]?.parentPhone || "",
          teamMember1ParentEmail: formData.teamMembers[0]?.parentEmail || "", // 🔹 Now stored
          teamMember1Size: formData.teamMembers[0]?.size || "",
          teamMember1Password: teamPasswords[0] || "",

          // Team Member 2
          teamMember2Name: formData.teamMembers[1]?.name || "",
          teamMember2IC: formData.teamMembers[1]?.ic || "",
          teamMember2Gender: formData.teamMembers[1]?.gender || "",
          teamMember2Race: formData.teamMembers[1]?.race || "",
          teamMember2Grade: formData.teamMembers[1]?.grade || "",
          teamMember2ParentName: formData.teamMembers[1]?.parentName || "",
          teamMember2ParentPhone: formData.teamMembers[1]?.parentPhone || "",
          teamMember2ParentEmail: formData.teamMembers[1]?.parentEmail || "", // 🔹 Now stored
          teamMember2Size: formData.teamMembers[1]?.size || "",
          teamMember2Password: teamPasswords[1] || "",

          // Team Member 3
          teamMember3Name: formData.teamMembers[2]?.name || "",
          teamMember3IC: formData.teamMembers[2]?.ic || "",
          teamMember3Gender: formData.teamMembers[2]?.gender || "",
          teamMember3Race: formData.teamMembers[2]?.race || "",
          teamMember3Grade: formData.teamMembers[2]?.grade || "",
          teamMember3ParentName: formData.teamMembers[2]?.parentName || "",
          teamMember3ParentPhone: formData.teamMembers[2]?.parentPhone || "",
          teamMember3ParentEmail: formData.teamMembers[2]?.parentEmail || "", // 🔹 Now stored
          teamMember3Size: formData.teamMembers[2]?.size || "",
          teamMember3Password: teamPasswords[2] || "",
        },
      ]);

      if (error) throw error;

      toast({ title: "Success", description: "Team registered successfully!" });

      // 🔹 Reset Form
      setFormData({
        teamName: "",
        representingSchool: "",
        schoolName: "",
        schoolAddress: "",
        postalCode: "",
        educationLevel: "",
        category: "",
        city: "",
        state: "",
        teacherName: "",
        teacherIC: "", // 🔹 Ensure reset
        teacherPhone: "",
        teacherEmail:"",
        teacherSize: "",
        agreeToTerms: false,
        teamMembers: Array(3).fill({
          name: "",
          ic: "",
          gender: "",
          race: "",
          grade: "",
          parentName: "",
          parentPhone: "",
          parentEmail: "", // 🔹 Ensure reset
          size: "",
        }),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const states = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Perak",
    "Perlis",
    "Pulau Pinang",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
    "Kuala Lumpur",
    "Labuan",
    "Putrajaya",
  ];

  const races = [
    "Melayu",
    "Cina",
    "India",
    "Iban",
    "Bidayuh",
    "Melanau",
    "Kayan",
    "Kenyah",
    "Kelabit",
    "Lun Bawang",
    "Bisaya",
    "Kajang",
    "Penan",
    "Lain-lain bumiputra",
    "Lain-lain kaum",
  ];

  const grades = [
    "Primary 6 (12 years old)",
    "Primary 5 (11 years old)",
    "Primary 4 (10 years old)",
    "Form 1 (13 years old)",
    "Form 2 (14 years old)",
    "Form 3 (15 years old)",
  ];

  const codingExperiences = [
    "None",
    "Scratch",
    "Mblock",
    "Python",
    "JavaScript",
    "HTML/CSS",
    "Other",
  ];

  const sizes = [
    { label: '3XS - 32"', value: "3xs" },
    { label: '2XS - 34"', value: "2xs" },
    { label: 'XS - 36"', value: "xs" },
    { label: 'S - 38"', value: "s" },
    { label: 'M - 40"', value: "m" },
    { label: 'L - 42"', value: "l" },
    { label: 'XL - 44"', value: "xl" },
    { label: '2XL - 46"', value: "2xl" },
    { label: '3XL - 48"', value: "3xl" },
  ];

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Input
              id="teamName"
              placeholder="Enter team name"
              value={formData.teamName}
              onChange={(e) => handleChange("teamName", e.target.value)}
              required
            />
            <p className="text-sm text-gray-500">You can change it later</p>
          </div>

          <div className="space-y-2">
            <Label>Representing School?</Label>
            <RadioGroup
              value={formData.representingSchool}
              onValueChange={(value) =>
                handleChange("representingSchool", value)
              }
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="school-yes" />
                <Label htmlFor="school-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="school-no" />
                <Label htmlFor="school-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.representingSchool === "yes" && (
            <div className="space-y-2">
              <Label htmlFor="schoolName">School Name</Label>
              <Input
                id="schoolName"
                placeholder="Enter school name"
                value={formData.schoolName}
                onChange={(e) => handleChange("schoolName", e.target.value)}
                required
              />
              <Label htmlFor="schoolAddress">School Address</Label>
              <Input
                id="schoolAddress"
                placeholder="Enter school address"
                value={formData.schoolAddress}
                onChange={(e) => handleChange("schoolAddress", e.target.value)}
                required
              />
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                placeholder="Enter postal code"
                value={formData.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Education Level</Label>
            <RadioGroup
              value={formData.educationLevel}
              onValueChange={(value) => handleChange("educationLevel", value)}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="primary" id="primary" />
                <Label htmlFor="primary">Primary School</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="secondary" id="secondary" />
                <Label htmlFor="secondary">Secondary School</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Which category will the team be participating?</Label>
            <RadioGroup
              value={formData.category}
              onValueChange={(value) => handleChange("category", value)}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="junior-scratch" id="junior-scratch" />
                <Label htmlFor="junior-scratch">
                  Junior Scratch (Primary school)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="senior-scratch" id="senior-scratch" />
                <Label htmlFor="senior-scratch">
                  Senior Scratch (Secondary school)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="senior-html" id="senior-html" />
                <Label htmlFor="senior-html">
                  Senior HTML/CSS (Secondary school)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select
              value={formData.state}
              onValueChange={(value) => handleChange("state", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state.toLowerCase()}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-596L74Ph9LQE089fHV7B4y0JVMuqPf.png"
              alt="T-shirt size chart"
              className="w-full max-w-md mx-auto mb-2"
            />
            <p className="text-sm text-gray-500 text-center">
              T-shirt size chart (for reference)
            </p>
          </div>

          <div className="space-y-4">
            <Label>Team Members</Label>
            {formData.teamMembers.map((member, index) => (
              <div key={index} className="space-y-2 p-4 border rounded">
                <Label>Team Member {index + 1}</Label>
                <Input
                  placeholder="Student Name"
                  value={member.name}
                  onChange={(e) =>
                    handleTeamMemberChange(index, "name", e.target.value)
                  }
                  required
                />
                <Input
                  placeholder="IC Number"
                  value={member.ic}
                  onChange={(e) =>
                    handleTeamMemberChange(index, "ic", e.target.value)
                  }
                  required
                />
                <Select
                  value={member.gender}
                  onValueChange={(value) =>
                    handleTeamMemberChange(index, "gender", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={member.race}
                  onValueChange={(value) =>
                    handleTeamMemberChange(index, "race", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Race" />
                  </SelectTrigger>
                  <SelectContent>
                    {races.map((race) => (
                      <SelectItem key={race} value={race.toLowerCase()}>
                        {race}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={member.grade}
                  onValueChange={(value) =>
                    handleTeamMemberChange(index, "grade", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade.toLowerCase()}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Parent's/Guardian's Name"
                  value={member.parentName}
                  onChange={(e) =>
                    handleTeamMemberChange(index, "parentName", e.target.value)
                  }
                  required
                />
                <Input
                  type="email"
                  placeholder="Parent's/Guardian's Email"
                  value={member.parentEmail}
                  onChange={(e) =>
                    handleTeamMemberChange(index, "parentEmail", e.target.value)
                  }
                  required
                />
                <Input
                  type="tel"
                  placeholder="Parent's/Guardian's Mobile Number"
                  value={member.parentPhone}
                  onChange={(e) =>
                    handleTeamMemberChange(index, "parentPhone", e.target.value)
                  }
                  required
                />
                <Select
                  value={member.codingExperience}
                  onValueChange={(value) =>
                    handleTeamMemberChange(index, "codingExperience", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Coding Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {codingExperiences.map((exp) => (
                      <SelectItem key={exp} value={exp.toLowerCase()}>
                        {exp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={member.size}
                  onValueChange={(value) =>
                    handleTeamMemberChange(index, "size", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select T-shirt size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Teacher/Mentor Information</Label>
            <Input
              placeholder="Teacher Name"
              value={formData.teacherName}
              onChange={(e) => handleChange("teacherName", e.target.value)}
              required
            />
            <Input
              placeholder="Teacher IC"
              value={formData.teacherIC}
              onChange={(e) => handleChange("teacherIC", e.target.value)}
              required
            />
            <Input
              type="tel"
              placeholder="Teacher Phone"
              value={formData.teacherPhone}
              onChange={(e) => handleChange("teacherPhone", e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Teacher Email"
              value={formData.teacherEmail}
              onChange={(e) => handleChange("teacherEmail", e.target.value)}
              required
            />
            <Select
              value={formData.teacherSize}
              onValueChange={(value) => handleChange("teacherSize", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Teacher T-shirt size" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) =>
                handleChange("agreeToTerms", checked)
              }
              required
            />
            <Label htmlFor="terms" className="text-sm">
              I understand and agree that the text, photographs, and/or videos
              containing the words, image and/or voice of all the participants
              above may be used in the production of instructional and/or
              promotional materials produced by or on behalf of Realfun Academy
              Sdn. Bhd. and that such materials may be distributed or broadcast
              to the public and displayed publicly
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              "Register Team"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
