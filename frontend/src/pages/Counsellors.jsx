const UpcomingEvents = () => {
    // Sample upcoming events data with meeting links
    const upcomingEvents = [
      {
        id: 1,
        title: "Guided Meditation Session",
        date: "February 26, 2025",
        time: "7:00 PM - 8:00 PM EST",
        host: "Sarah Johnson",
        participants: 24,
        meetingLink: "https://zoom.us/j/1234567890"
      },
      {
        id: 2,
        title: "Stress Management Workshop",
        date: "February 28, 2025",
        time: "6:30 PM - 8:00 PM EST",
        host: "Dr. Michael Chen",
        participants: 42,
        meetingLink: "https://meet.google.com/abc-defg-hij"
      },
      {
        id: 3,
        title: "Mindful Movement Class",
        date: "March 2, 2025",
        time: "10:00 AM - 11:00 AM EST",
        host: "Emma Rodriguez",
        participants: 18,
        meetingLink: "https://teams.microsoft.com/meeting/123456"
      }
    ];
  
    // Function to handle joining an event
    const handleJoinEvent = (meetingLink) => {
      // Open the meeting link in a new tab
      window.open(meetingLink, '_blank');
    };
  
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-16">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Upcoming Live Events</h3>
          <button className="text-orange-500 font-medium flex items-center">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="space-y-4">
          {upcomingEvents.map(event => (
            <div key={event.id} className="border-l-4 border-orange-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg">{event.title}</h4>
                  <p className="text-gray-600 flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {event.date}
                  </p>
                  <p className="text-gray-600 flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {event.time}
                  </p>
                  <p className="text-gray-600 mt-1">Host: {event.host}</p>
                </div>
                <div className="text-right">
                  <span className="bg-purple-100 text-black text-sm font-medium px-2.5 py-0.5 rounded-full">
                    {event.participants} joined
                  </span>
                  <button 
                    className="block mt-2 bg-orange-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-300 transition text-sm"
                    onClick={() => handleJoinEvent(event.meetingLink)}
                  >
                    Join Event
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  

   {/* Search and Filters */}
   <div className="max-w-6xl mx-auto px-6 mb-8 bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4">
   <div className="relative flex-1">
     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
       <Search className="h-5 w-5 text-gray-400" />
     </div>
     <input type="text" className="block w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-500 focus:ring-1 focus:ring-purple-500" placeholder="Search wellness resources..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
   </div>
   <button onClick={() => setShowFilters(!showFilters)} className="flex items-center px-4 py-2 border rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-purple-500">
     <Filter className="h-5 w-5 mr-2" /> Filters <ChevronDown className="h-4 w-4 ml-2" />
   </button>
 </div>

 {/* Upcoming Events Section */}
 <div className="max-w-6xl mx-auto px-6">
   <UpcomingEvents />
 </div>