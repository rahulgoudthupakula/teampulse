import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar'

export default function Index() {
  return (

    <div className={`min-h-screen`}>
      <Navbar/>

      <main>
        <div className='pt-16'>
        <div className="min-h-screen bg-background">
      {/* Navigation */}
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Unlock Your Career
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore opportunities from across the globe to grow, showcase skills, gain
              CV points & get hired by your dream company.
            </p>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="rounded-full" />
              </div>
              <div>
                <div className="font-medium">Arjun</div>
                <div className="text-sm text-muted-foreground">Just Went Unstop Pro!</div>
              </div>
            </div>
          </div>
          
          {/* Opportunity Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Internships</h3>
              <p className="text-sm mb-4">Gain Practical Experience</p>
              <img src="/placeholder.svg?height=100&width=100" alt="Internships" className="ml-auto" />
            </div>
            <div className="bg-orange-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Mentorships</h3>
              <p className="text-sm mb-4">Guidance From Top Mentors</p>
              <img src="/placeholder.svg?height=100&width=100" alt="Mentorships" className="ml-auto" />
            </div>
            <div className="bg-blue-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Jobs</h3>
              <p className="text-sm mb-4">Explore Diverse Careers</p>
              <img src="/placeholder.svg?height=100&width=100" alt="Jobs" className="ml-auto" />
            </div>
            <div className="bg-purple-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Practice</h3>
              <p className="text-sm mb-4">Refine Skills Daily</p>
              <img src="/placeholder.svg?height=100&width=100" alt="Practice" className="ml-auto" />
            </div>
            <div className="bg-yellow-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Competitions</h3>
              <p className="text-sm mb-4">Battle For Excellence</p>
              <img src="/placeholder.svg?height=100&width=100" alt="Competitions" className="ml-auto" />
            </div>
            <div className="bg-pink-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">More</h3>
              <p className="text-sm mb-4">Discover Opportunities</p>
              <img src="/placeholder.svg?height=100&width=100" alt="More" className="ml-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Who's using section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-8">Who's using Unstop?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Students and Professionals</h3>
            <p className="text-muted-foreground mb-4">Unlock Your Potential: Compete, Build Resume, Grow and get Hired!</p>
            <img src="/placeholder.svg?height=150&width=200" alt="Students" className="w-full rounded-lg" />
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Companies and Recruiters</h3>
            <p className="text-muted-foreground mb-4">Discover Right Talent: Hire, Engage, and Brand Like Never Before!</p>
            <img src="/placeholder.svg?height=150&width=200" alt="Companies" className="w-full rounded-lg" />
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Colleges</h3>
            <p className="text-muted-foreground mb-4">Bridge Academia and Industry: Empower Students with Real-World Opportunities!</p>
            <img src="/placeholder.svg?height=150&width=200" alt="Colleges" className="w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Trust section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Industry veterans</h2>
            <p className="text-muted-foreground">Trust us</p>
          </div>
          <div className="flex gap-2">
            
          </div>
        </div>
        <div className="flex items-center justify-between">
          {['Amazon', 'L\'Oreal', 'Walmart', 'Company 4', 'Company 5'].map((company, index) => (
            <div key={index} className="grayscale hover:grayscale-0 transition-all">
              <img
                src="/placeholder.svg?height=60&width=120"
                alt={company}
                className="h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
        </div>
      </main>

      
    </div>
    
  );
}