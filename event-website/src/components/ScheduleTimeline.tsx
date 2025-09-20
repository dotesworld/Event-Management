'use client';

import { motion } from 'framer-motion';

interface Session {
  id: string;
  time: string;
  title: string;
  speaker: string;
  duration: string;
  description: string;
  type: 'keynote' | 'workshop' | 'panel' | 'networking';
}

const sessions: Session[] = [
  {
    id: '1',
    time: '9:00 AM',
    title: 'Opening Keynote: The Future of Technology',
    speaker: 'Dr. Sarah Johnson',
    duration: '45 min',
    description: 'Explore the latest trends and innovations shaping the future of technology and their impact on society.',
    type: 'keynote'
  },
  {
    id: '2',
    time: '10:00 AM',
    title: 'AI & Machine Learning Workshop',
    speaker: 'Prof. Michael Chen',
    duration: '90 min',
    description: 'Hands-on session on implementing AI solutions in real-world applications.',
    type: 'workshop'
  },
  {
    id: '3',
    time: '11:45 AM',
    title: 'Startup Pitch Competition',
    speaker: 'Various Entrepreneurs',
    duration: '60 min',
    description: 'Watch innovative startups pitch their ideas to a panel of investors.',
    type: 'panel'
  },
  {
    id: '4',
    time: '1:00 PM',
    title: 'Networking Lunch',
    speaker: 'All Attendees',
    duration: '90 min',
    description: 'Connect with fellow attendees, speakers, and industry professionals.',
    type: 'networking'
  },
  {
    id: '5',
    time: '2:30 PM',
    title: 'Blockchain Technology Deep Dive',
    speaker: 'Alex Rodriguez',
    duration: '45 min',
    description: 'Understanding blockchain beyond cryptocurrency and its enterprise applications.',
    type: 'workshop'
  },
  {
    id: '6',
    time: '3:30 PM',
    title: 'Panel: Women in Tech',
    speaker: 'Jane Smith, Lisa Wang, Maria Garcia',
    duration: '60 min',
    description: 'Discussion on diversity, challenges, and opportunities for women in technology.',
    type: 'panel'
  },
  {
    id: '7',
    time: '4:45 PM',
    title: 'Coffee & Networking Break',
    speaker: 'All Attendees',
    duration: '30 min',
    description: 'Refreshments and networking opportunities.',
    type: 'networking'
  },
  {
    id: '8',
    time: '5:15 PM',
    title: 'Closing Ceremony & Awards',
    speaker: 'Event Organizers',
    duration: '45 min',
    description: 'Recognition of outstanding contributions and closing remarks.',
    type: 'keynote'
  }
];

const getSessionTypeColor = (type: Session['type']) => {
  switch (type) {
    case 'keynote':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'workshop':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'panel':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'networking':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getSessionTypeIcon = (type: Session['type']) => {
  switch (type) {
    case 'keynote':
      return '🎤';
    case 'workshop':
      return '🔧';
    case 'panel':
      return '👥';
    case 'networking':
      return '🤝';
    default:
      return '📅';
  }
};

export default function ScheduleTimeline() {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 to-blue-200"></div>

      <div className="space-y-8">
        {sessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex items-start space-x-6"
          >
            {/* Timeline Dot */}
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-purple-200">
                <span className="text-2xl">{getSessionTypeIcon(session.type)}</span>
              </div>
            </div>

            {/* Session Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex-1 bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="flex items-center space-x-3 mb-2 md:mb-0">
                  <span className="text-lg font-bold text-purple-600">{session.time}</span>
                  <span className="text-sm text-gray-500">({session.duration})</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSessionTypeColor(session.type)}`}>
                  {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{session.title}</h3>
              <p className="text-purple-600 font-semibold mb-3">{session.speaker}</p>
              <p className="text-gray-600 leading-relaxed">{session.description}</p>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium">
                  Add to Calendar
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                  Set Reminder
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}