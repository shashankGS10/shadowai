import React from 'react';
import Image from 'next/image';
import ProfileMenu from '../../../components/ProfileMenu'

const pastInterviews = [
  {
    company: "Frontend Dev",
    type: "Technical",
    date: "Feb 28, 2025",
    score: 12,
    logo: "/covers/hostinger.png", // Suggext me plans to go dynamic as I have supabase set up already
  },
  {
    company: "Behavioral",
    type: "Non-Technical",
    date: "Feb 23, 2025",
    score: 54,
    logo: "/covers/facebook.png",
  },
  {
    company: "Backend Dev",
    type: "Technical",
    date: "Feb 21, 2025",
    score: 94,
    logo: "/covers/adobe.png",
  },
];

const availableInterviews = [
  {
    company: "Full-Stack Dev",
    type: "Technical",
    logo: "/covers/yahoo.png",
  },
  {
    company: "DevOps & Cloud",
    type: "Technical",
    logo: "/covers/reddit.png",
  },
  {
    company: "HR Screening",
    type: "Non-Technical",
    logo: "/covers/telegram.png",
  },
  {
    company: "System Design",
    type: "Technical",
    logo: "/covers/dropbox.png",
  },
  {
    company: "Business Analyst",
    type: "Non-Technical",
    logo: "/covers/spotify.png",
  },
  {
    company: "Mobile App Dev",
    type: "Technical",
    logo: "/covers/quora.png",
  },
  {
    company: "Database & SQL",
    type: "Technical",
    logo: "/covers/pinterest.png",
  },
  {
    company: "Cybersecurity",
    type: "Technical",
    logo: "/covers/skype.png",
  },
  {
    company: "Sales & Marketing",
    type: "Non-Technical",
    logo: "/covers/tiktok.png",
  },
];

const Dashboard = () => {
  return (
      <div className="bg-background min-h-screen text-foreground p-6 transition-colors duration-300">
        <div className="flex justify-end mb-4">
          <ProfileMenu />
        </div>
  
        {/* Hero Section */}
        <div className="bg-card rounded-2xl p-8 flex items-center justify-between mb-10 transition-colors duration-300">
          <div>
            <h1 className="text-3xl font-bold mb-2">Get Interview-Ready with AI-Powered Practice & Feedback</h1>
            <p className="text-muted-foreground mb-4">
              Practice real interview questions & get instant feedback.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary-200 transition">
              Start an Interview
            </button>
          </div>
          <div>
            <Image src="/robot.png" alt="Robot" width={250} height={250} />
          </div>
        </div>
  
        {/* Past Interviews */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">Your Past Interviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {pastInterviews.map((interview, idx) => (
              <div
                key={idx}
                className="card-border card-background rounded-2xl p-6 border border-border shadow-md transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <Image src={interview.logo} alt={`${interview.company} logo`} width={32} height={32} />
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      interview.type === 'Technical' ? 'bg-blue-700' : 'bg-purple-700'
                    }`}
                  >
                    {interview.type}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{interview.company} Interview</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {interview.date} • {interview.score}/100
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  This interview does not reflect serious interest or engagement from the candidate.
                </p>
                <button className="btn-primary w-full text-center">View Interview</button>
              </div>
            ))}
          </div>
        </section>
  
        {/* Available Interviews */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">Pick Your Interview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availableInterviews.map((interview, idx) => (
              <div
                key={idx}
                className="card-border card-background rounded-2xl p-6 border border-border shadow-md transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <Image src={interview.logo} alt={`${interview.company} logo`} width={32} height={32} />
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      interview.type === 'Technical' ? 'bg-blue-700' : 'bg-purple-700'
                    }`}
                  >
                    {interview.type}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{interview.company} Interview</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This interview does not reflect serious interest or engagement from the candidate.
                </p>
                <button className="btn-primary w-full text-center">Take Interview</button>
              </div>
            ))}
          </div>
        </section>
      </div>
  );
};

export default Dashboard;
