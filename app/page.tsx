"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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
    teamMembers: [
      {
        name: "",
        ic: "",
        gender: "",
        race: "",
        grade: "",
        schoolName: "",
        parentName: "",
        parentPhone: "",
        codingExperience: "",
        size: "",
      },
      {
        name: "",
        ic: "",
        gender: "",
        race: "",
        grade: "",
        schoolName: "",
        parentName: "",
        parentPhone: "",
        codingExperience: "",
        size: "",
      },
      {
        name: "",
        ic: "",
        gender: "",
        race: "",
        grade: "",
        schoolName: "",
        parentName: "",
        parentPhone: "",
        codingExperience: "",
        size: "",
      },
    ],
    teacherName: "",
    teacherIC: "",
    teacherPhone: "",
    teacherSize: "",
    agreeToTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTeamMemberChange = (index: number, field: string, value: string | string[]) => {
    const updatedTeamMembers = [...formData.teamMembers]
    updatedTeamMembers[index] = { ...updatedTeamMembers[index], [field]: value }
    setFormData((prev) => ({ ...prev, teamMembers: updatedTeamMembers }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Registration Successful",
          description: "Your team has been registered successfully!",
          duration: 5000,
        })
        // Reset form or redirect to a success page
      } else {
        throw new Error(data.message || "Registration failed")
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

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
  ]

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
  ]

  const grades = [
    "Primary 6 (12 years old)",
    "Primary 5 (11 years old)",
    "Primary 4 (10 years old)",
    "Form 1 (13 years old)",
    "Form 2 (14 years old)",
    "Form 3 (15 years old)",
  ]

  const codingExperiences = ["None", "Scratch", "Mblock", "Python", "JavaScript", "HTML/CSS", "Other"]

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
  ]

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
              onValueChange={(value) => handleChange("representingSchool", value)}
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
            <RadioGroup value={formData.category} onValueChange={(value) => handleChange("category", value)} required>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="junior-scratch" id="junior-scratch" />
                <Label htmlFor="junior-scratch">Junior Scratch (Primary school)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="senior-scratch" id="senior-scratch" />
                <Label htmlFor="senior-scratch">Senior Scratch (Secondary school)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="senior-html" id="senior-html" />
                <Label htmlFor="senior-html">Senior HTML/CSS (Secondary school)</Label>
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
            <Select value={formData.state} onValueChange={(value) => handleChange("state", value)} required>
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
            <p className="text-sm text-gray-500 text-center">T-shirt size chart (for reference)</p>
          </div>

          <div className="space-y-4">
            <Label>Team Members</Label>
            {formData.teamMembers.map((member, index) => (
              <div key={index} className="space-y-2 p-4 border rounded">
                <Label>Team Member {index + 1}</Label>
                <Input
                  placeholder="Student Name"
                  value={member.name}
                  onChange={(e) => handleTeamMemberChange(index, "name", e.target.value)}
                  required
                />
                <Input
                  placeholder="IC Number"
                  value={member.ic}
                  onChange={(e) => handleTeamMemberChange(index, "ic", e.target.value)}
                  required
                />
                <Select
                  value={member.gender}
                  onValueChange={(value) => handleTeamMemberChange(index, "gender", value)}
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
                  onValueChange={(value) => handleTeamMemberChange(index, "race", value)}
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
                  onValueChange={(value) => handleTeamMemberChange(index, "grade", value)}
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
                  placeholder="School's Name"
                  value={member.schoolName}
                  onChange={(e) => handleTeamMemberChange(index, "schoolName", e.target.value)}
                  required
                />
                <Input
                  placeholder="Parent's/Guardian's Name"
                  value={member.parentName}
                  onChange={(e) => handleTeamMemberChange(index, "parentName", e.target.value)}
                  required
                />
                <Input
                  type="tel"
                  placeholder="Parent's/Guardian's Mobile Number"
                  value={member.parentPhone}
                  onChange={(e) => handleTeamMemberChange(index, "parentPhone", e.target.value)}
                  required
                />
                <Select
                  value={member.codingExperience}
                  onValueChange={(value) => handleTeamMemberChange(index, "codingExperience", value)}
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
                  onValueChange={(value) => handleTeamMemberChange(index, "size", value)}
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
            <Select value={formData.teacherSize} onValueChange={(value) => handleChange("teacherSize", value)} required>
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
              onCheckedChange={(checked) => handleChange("agreeToTerms", checked)}
              required
            />
            <Label htmlFor="terms" className="text-sm">
              I understand and agree that the text, photographs, and/or videos containing the words, image and/or voice
              of all the participants above may be used in the production of instructional and/or promotional materials
              produced by or on behalf of Realfun Academy Sdn. Bhd. and that such materials may be distributed or
              broadcast to the public and displayed publicly
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
  )
}

