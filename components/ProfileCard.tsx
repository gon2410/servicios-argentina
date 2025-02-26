'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Textarea } from './ui/textarea'

interface Profile {
  image: string
  name: string
  occupation: string
  location: string
  bio: string
}

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<Profile>({
    image: '/placeholder.svg?height=200&width=200&text=Profile',
    name: 'John Doe',
    occupation: 'Electrician',
    location: 'New York, NY',
    bio: 'Experienced electrician with over 10 years in the field. Specializing in residential and commercial electrical installations and repairs.'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
  }

  const handleDelete = () => {
    setProfile({
      image: '/placeholder.svg?height=200&width=200&text=Profile',
      name: '',
      occupation: '',
      location: '',
      bio: ''
    })
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl mx-auto m-2">
      <div className="p-8">
        <div className="mb-6 flex justify-center">
          <Image
            src={profile.image}
            alt={profile.name}
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <Input
              name="occupation"
              value={profile.occupation}
              onChange={handleInputChange}
              placeholder="Occupation"
            />
            <Input
              name="location"
              value={profile.location}
              onChange={handleInputChange}
              placeholder="Location"
            />
            <Textarea
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              placeholder="Bio"
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <Button type="submit">Save</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-2">{profile.name}</h2>
            <p className="text-gray-600 text-center mb-1">{profile.occupation}</p>
            <p className="text-gray-600 text-center mb-4">{profile.location}</p>
            <p className="text-gray-700 text-center mb-6">{profile.bio}</p>
            <div className="flex justify-center space-x-2">
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
              <Button variant="outline" onClick={handleDelete}>Delete</Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

