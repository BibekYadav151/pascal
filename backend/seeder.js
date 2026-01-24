const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Class = require('./models/classModel');
const InstituteClass = require('./models/instituteClassModel');
const Program = require('./models/programModel');
const University = require('./models/universityModel');
const User = require('./models/userModel');
const Team = require('./models/teamModel');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const classesData = [
    {
        title: 'IELTS Preparation',
        timeSlots: [
            { time: '10:00 AM', available: true },
            { time: '11:00 AM', available: true },
            { time: '1:00 PM', available: true }
        ],
        duration: '2 Months',
        fee: 'NPR 12,000',
        status: 'Active',
        description: 'Comprehensive IELTS preparation covering Reading, Writing, Listening, and Speaking sections with mock tests.'
    },
    {
        title: 'PTE Academic',
        timeSlots: [
            { time: '12:00 PM', available: true }
        ],
        duration: '1.5 Months',
        fee: 'NPR 10,000',
        status: 'Active',
        description: 'PTE Academic test preparation with practice materials and computer-based testing simulations.'
    },
    {
        title: 'Japanese Language',
        timeSlots: [
            { time: '2:00 PM', available: true }
        ],
        duration: '3 Months',
        fee: 'NPR 15,000',
        status: 'Active',
        description: 'Japanese language training focusing on N5/N4 levels with JLPT-oriented curriculum.'
    },
    {
        title: 'Accounting Package',
        timeSlots: [
            { time: '4:00 PM', available: true }
        ],
        duration: '3 Months',
        fee: 'NPR 8,000',
        status: 'Active',
        description: 'Complete accounting package including Tally, Excel, FACT, and MS Access.'
    },
    {
        title: 'Spoken English',
        timeSlots: [
            { time: '11:00 AM', available: true }
        ],
        duration: '2 Months',
        fee: 'NPR 8,000',
        status: 'Active',
        description: 'Improve your English speaking skills with focus on fluency, pronunciation, and confidence.'
    }
];

const instituteClassesData = [
    {
        title: 'Accounting Package',
        duration: '3 Months',
        fee: 'NPR 8,000',
        description: 'Comprehensive accounting course covering multiple software and tools.',
        bulletPoints: [
            'Tally Prime',
            'Excel Advanced',
            'FACT Accounting',
            'MS Access 2007'
        ],
        status: 'Active'
    },
    {
        title: 'IELTS Preparation',
        duration: '2 Months',
        fee: 'NPR 12,000',
        description: 'Complete IELTS preparation for all four modules.',
        bulletPoints: [
            'Reading strategies',
            'Writing techniques',
            'Listening practice',
            'Speaking mock tests',
            'Experienced instructors'
        ],
        status: 'Active'
    },
    {
        title: 'Japanese Language',
        duration: '3 Months',
        fee: 'NPR 15,000',
        description: 'Japanese language training for visa and job preparation.',
        bulletPoints: [
            'N5 / N4 Level',
            'JLPT-focused',
            'Visa-oriented training',
            'Native-speaking instructors'
        ],
        status: 'Active'
    },
    {
        title: 'Computer Courses',
        duration: '1 Month',
        fee: 'NPR 5,000',
        description: 'Basic to advanced computer training.',
        bulletPoints: [
            'Basic Computer Operations',
            'MS Office Suite',
            'Advanced Excel',
            'Internet & Email'
        ],
        status: 'Active'
    }
];

const programsData = [
    {
        title: 'Bachelor of Psychological Science with Honours',
        university: 'University of Tasmania',
        universityLogo: '',
        country: 'Australia',
        location: 'Launceston',
        duration: '1 Year',
        studyMode: 'Full-time / Part-time',
        ieltsRequired: true,
        ieltsScore: '6.0 (no band less than 5.5)',
        languageTest: 'IELTS',
        studyLevel: 'Bachelor',
        intakeDates: ['February', 'July'],
        tuitionFee: 'AUD 28,500/year',
        requirements: [
            'IELTS 6.0 (no band less than 5.5)',
            'Academic transcripts',
            'High school completion'
        ],
        description: 'This program provides a comprehensive understanding of psychology, preparing students for further studies in psychology or related fields.',
        scholarshipInfo: 'Available for eligible international students',
        careerOpportunities: ['Psychologist', 'Counselor', 'HR Manager', 'Researcher'],
        status: 'Active'
    },
    {
        title: 'Master of Business Administration',
        university: 'University of Wollongong',
        universityLogo: '',
        country: 'Australia',
        location: 'Wollongong',
        duration: '2 Years',
        studyMode: 'Full-time',
        ieltsRequired: true,
        ieltsScore: '6.5 (no band less than 6.0)',
        languageTest: 'IELTS',
        studyLevel: 'Master',
        intakeDates: ['February', 'July', 'November'],
        tuitionFee: 'AUD 35,000/year',
        requirements: [
            'IELTS 6.5 (no band less than 6.0)',
            'Bachelor degree in any field',
            '2 years work experience preferred'
        ],
        description: 'A comprehensive MBA program designed for future business leaders, with specializations available in Marketing, Finance, and HR.',
        scholarshipInfo: 'Dean\'s Scholarship up to 30%',
        careerOpportunities: ['Business Manager', 'Consultant', 'Executive', 'Entrepreneur'],
        status: 'Active'
    },
    {
        title: 'Bachelor of Computer Science',
        university: 'University of Toronto',
        universityLogo: '',
        country: 'Canada',
        location: 'Toronto',
        duration: '4 Years',
        studyMode: 'Full-time',
        ieltsRequired: true,
        ieltsScore: '6.5 (no band less than 6.0)',
        languageTest: 'IELTS',
        studyLevel: 'Bachelor',
        intakeDates: ['September', 'January'],
        tuitionFee: 'CAD 45,000/year',
        requirements: [
            'IELTS 6.5 (no band less than 6.0)',
            'Math 12 (70%+)',
            'English 12 (70%+)'
        ],
        description: 'One of the top computer science programs in the world, offering cutting-edge curriculum and research opportunities.',
        scholarshipInfo: 'Entrance scholarships available',
        careerOpportunities: ['Software Developer', 'Data Scientist', 'AI Engineer', 'System Architect'],
        status: 'Active'
    },
    {
        title: 'MSc Data Science',
        university: 'University of Manchester',
        universityLogo: '',
        country: 'UK',
        location: 'Manchester',
        duration: '1 Year',
        studyMode: 'Full-time',
        ieltsRequired: true,
        ieltsScore: '7.0 (no band less than 6.5)',
        languageTest: 'IELTS',
        studyLevel: 'Master',
        intakeDates: ['September', 'January'],
        tuitionFee: 'GBP 29,000',
        requirements: [
            'IELTS 7.0 (no band less than 6.5)',
            'Bachelor degree in Computer Science, Mathematics, or Statistics',
            'Strong programming skills'
        ],
        description: 'Prepare for a career in data science with this rigorous program covering machine learning, big data, and statistical analysis.',
        scholarshipInfo: 'Commonwealth Scholarships available',
        careerOpportunities: ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst', 'AI Researcher'],
        status: 'Active'
    },
    {
        title: 'Japanese Language Course',
        university: 'Tokyo University of Foreign Studies',
        universityLogo: '',
        country: 'Japan',
        location: 'Tokyo',
        duration: '2 Years',
        studyMode: 'Full-time',
        ieltsRequired: false,
        ieltsScore: null,
        languageTest: 'Japanese (JLPT)',
        studyLevel: 'Bachelor',
        intakeDates: ['April', 'October'],
        tuitionFee: 'JPY 500,000/year',
        requirements: [
            'JLPT N2 level',
            'High school completion',
            'Interview required'
        ],
        description: 'Comprehensive Japanese language study with focus on linguistics and cultural understanding.',
        scholarshipInfo: 'MEXT Scholarship available',
        careerOpportunities: ['Translator', 'Interpreter', 'Teacher', 'Diplomat'],
        status: 'Active'
    },
    {
        title: 'Bachelor of Nursing',
        university: 'University of Auckland',
        universityLogo: '',
        country: 'New Zealand',
        location: 'Auckland',
        duration: '3 Years',
        studyMode: 'Full-time',
        ieltsRequired: true,
        ieltsScore: '7.0 (no band less than 6.5)',
        languageTest: 'IELTS',
        studyLevel: 'Bachelor',
        intakeDates: ['February', 'July'],
        tuitionFee: 'NZD 35,000/year',
        requirements: [
            'IELTS 7.0 (no band less than 6.5)',
            'Science background preferred',
            'Health screening required'
        ],
        description: 'A comprehensive nursing program with extensive clinical placements and high employment outcomes.',
        scholarshipInfo: 'International Student Excellence Scholarship',
        careerOpportunities: ['Registered Nurse', 'Midwife', 'Healthcare Manager', 'Specialist Nurse'],
        status: 'Active'
    }
];

const universitiesData = [
    {
        name: 'University of Tasmania',
        country: 'Australia',
        location: 'Launceston',
        website: 'https://www.utas.edu.au',
        logo: '',
        status: 'Active'
    },
    {
        name: 'University of Wollongong',
        country: 'Australia',
        location: 'Wollongong',
        website: 'https://www.uow.edu.au',
        logo: '',
        status: 'Active'
    },
    {
        name: 'University of Toronto',
        country: 'Canada',
        location: 'Toronto',
        website: 'https://www.utoronto.ca',
        logo: '',
        status: 'Active'
    },
    {
        name: 'University of Manchester',
        country: 'UK',
        location: 'Manchester',
        website: 'https://www.manchester.ac.uk',
        logo: '',
        status: 'Active'
    },
    {
        name: 'Tokyo University of Foreign Studies',
        country: 'Japan',
        location: 'Tokyo',
        website: 'https://www.tufs.ac.jp',
        logo: '',
        status: 'Active'
    },
    {
        name: 'University of Auckland',
        country: 'New Zealand',
        location: 'Auckland',
        website: 'https://www.auckland.ac.nz',
        logo: '',
        status: 'Active'
    }
];

const importData = async () => {
    try {
        await Class.deleteMany();
        await InstituteClass.deleteMany();
        await Program.deleteMany();
        await University.deleteMany();
        await User.deleteMany();
        await Team.deleteMany();

        await Class.insertMany(classesData);
        await InstituteClass.insertMany(instituteClassesData);
        await Program.insertMany(programsData);
        await University.insertMany(universitiesData);

        // Create Default Team
        const adminTeam = await Team.create({
            name: 'Administration',
            description: 'Full access team',
            permissions: ['blogs', 'contacts', 'leads', 'applications', 'gallery', 'offers', 'branches', 'classes', 'programs', 'universities', 'settings']
        });

        // Create Super Admin
        await User.create({
            name: 'Super Admin',
            email: 'admin@pascal.edu.np',
            password: 'admin123',
            role: 'superadmin',
            team: adminTeam._id
        });

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    // destroyData();
} else {
    importData();
}
