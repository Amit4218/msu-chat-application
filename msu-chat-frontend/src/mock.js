// Mock data for the college chat application

export const mockUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@college.edu',
    phone: '+1234567890',
    type: 'student',
    semester: '6th Semester',
    bio: 'Computer Science major, love coding!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@college.edu',
    phone: '+1234567891',
    type: 'staff',
    designation: 'Professor - Computer Science',
    bio: 'Teaching AI and Machine Learning',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma.davis@college.edu',
    phone: '+1234567892',
    type: 'student',
    semester: '4th Semester',
    bio: 'Mathematics enthusiast',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
  },
  {
    id: '4',
    name: 'Prof. James Wilson',
    email: 'james.wilson@college.edu',
    phone: '+1234567893',
    type: 'staff',
    designation: 'Head of Department - Physics',
    bio: 'Research in Quantum Mechanics',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
  },
  {
    id: '5',
    name: 'Alex Martinez',
    email: 'alex.martinez@college.edu',
    phone: '+1234567894',
    type: 'student',
    semester: '5th Semester',
    bio: 'Robotics club president',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
  }
];

export const mockConversations = [
  {
    id: 'conv1',
    type: 'individual',
    participant: mockUsers[1],
    lastMessage: 'See you in class tomorrow!',
    timestamp: '2025-07-15T10:30:00',
    unread: 2
  },
  {
    id: 'conv2',
    type: 'individual',
    participant: mockUsers[2],
    lastMessage: 'Did you finish the assignment?',
    timestamp: '2025-07-15T09:15:00',
    unread: 0
  },
  {
    id: 'conv3',
    type: 'group',
    name: 'CS Department Study Group',
    participants: [mockUsers[0], mockUsers[2], mockUsers[4]],
    lastMessage: 'Meeting at 3 PM in library',
    timestamp: '2025-07-15T08:45:00',
    unread: 5,
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CS'
  },
  {
    id: 'conv4',
    type: 'individual',
    participant: mockUsers[3],
    lastMessage: 'Project deadline extended!',
    timestamp: '2025-07-14T16:20:00',
    unread: 0
  },
  {
    id: 'conv5',
    type: 'group',
    name: 'Robotics Club',
    participants: [mockUsers[0], mockUsers[2], mockUsers[4]],
    lastMessage: 'Competition registration open',
    timestamp: '2025-07-14T14:10:00',
    unread: 1,
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=RC'
  }
];

export const mockMessages = {
  conv1: [
    {
      id: 'msg1',
      senderId: '2',
      text: 'Hi Sarah, how are you doing with the AI assignment?',
      timestamp: '2025-07-15T10:00:00',
      sender: mockUsers[1]
    },
    {
      id: 'msg2',
      senderId: '1',
      text: 'Hello Dr. Chen! I\'m making good progress. Just working on the neural network implementation.',
      timestamp: '2025-07-15T10:05:00',
      sender: mockUsers[0]
    },
    {
      id: 'msg3',
      senderId: '2',
      text: 'That\'s great! If you need any help with the training algorithms, let me know.',
      timestamp: '2025-07-15T10:10:00',
      sender: mockUsers[1]
    },
    {
      id: 'msg4',
      senderId: '1',
      text: 'Will do, thank you! 😊',
      timestamp: '2025-07-15T10:15:00',
      sender: mockUsers[0]
    },
    {
      id: 'msg5',
      senderId: '2',
      text: 'See you in class tomorrow!',
      timestamp: '2025-07-15T10:30:00',
      sender: mockUsers[1]
    }
  ],
  conv2: [
    {
      id: 'msg6',
      senderId: '3',
      text: 'Hey Sarah! Did you finish the assignment?',
      timestamp: '2025-07-15T09:00:00',
      sender: mockUsers[2]
    },
    {
      id: 'msg7',
      senderId: '1',
      text: 'Almost done! Just reviewing the last section.',
      timestamp: '2025-07-15T09:10:00',
      sender: mockUsers[0]
    },
    {
      id: 'msg8',
      senderId: '3',
      text: 'Did you finish the assignment?',
      timestamp: '2025-07-15T09:15:00',
      sender: mockUsers[2]
    }
  ],
  conv3: [
    {
      id: 'msg9',
      senderId: '5',
      text: 'Hey everyone! Should we meet to discuss the project?',
      timestamp: '2025-07-15T08:00:00',
      sender: mockUsers[4]
    },
    {
      id: 'msg10',
      senderId: '1',
      text: 'Yes! I\'m free this afternoon.',
      timestamp: '2025-07-15T08:15:00',
      sender: mockUsers[0]
    },
    {
      id: 'msg11',
      senderId: '3',
      text: 'Me too! What time works for everyone?',
      timestamp: '2025-07-15T08:30:00',
      sender: mockUsers[2]
    },
    {
      id: 'msg12',
      senderId: '5',
      text: 'Meeting at 3 PM in library',
      timestamp: '2025-07-15T08:45:00',
      sender: mockUsers[4]
    }
  ]
};

export const getCurrentUser = () => {
  const stored = localStorage.getItem('currentUser');
  if (stored) {
    return JSON.parse(stored);
  }
  return mockUsers[0]; // Default to Sarah
};

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};