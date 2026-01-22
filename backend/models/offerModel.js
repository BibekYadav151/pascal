const BaseModel = require('./baseModel');

const OfferModel = new BaseModel('offers');

// Add default sample offers if storage is empty
const initializeSampleOffers = async () => {
    const existingOffers = await OfferModel.findAll();
    if (existingOffers.length === 0) {
        const sampleOffers = [
            {
                title: 'Early Bird Registration',
                description: 'Get 20% off on IELTS/PTE preparation classes when you register 30 days before the course starts.',
                discount: '20%',
                startDate: new Date().toISOString().split('T')[0], // Today
                validUntil: 'December 31, 2025',
                category: 'Test Prep',
                status: 'current',
                bgColor: 'bg-orange-500',
                terms: ['Valid for new registrations only', 'Cannot be combined with other offers', 'Minimum course duration: 4 weeks']
            },
            {
                title: 'Student Bundle Package',
                description: 'Complete study abroad package including visa counseling, test prep, and university application assistance.',
                discount: '₹15,000',
                startDate: new Date().toISOString().split('T')[0], // Today
                validUntil: 'Ongoing',
                category: 'Package',
                status: 'current',
                bgColor: 'bg-blue-500',
                terms: ['Includes IELTS preparation', 'Visa consultation included', 'University shortlisting assistance']
            },
            {
                title: 'Group Discount',
                description: 'Bring 3 or more friends and get 15% off for each member of the group.',
                discount: '15%',
                startDate: new Date().toISOString().split('T')[0], // Today
                validUntil: 'January 15, 2026',
                category: 'Group',
                status: 'current',
                bgColor: 'bg-green-500',
                terms: ['Minimum 3 participants', 'Same course enrollment required', 'Valid for all courses']
            },
            {
                title: 'Referral Program',
                description: 'Refer a friend who enrolls in any course and both get ₹5,000 off.',
                discount: '₹5,000',
                startDate: new Date().toISOString().split('T')[0], // Today
                validUntil: 'Ongoing',
                category: 'Referral',
                status: 'current',
                bgColor: 'bg-yellow-500',
                terms: ['Valid for first-time students only', 'Friend must complete enrollment', 'Maximum 3 referrals per student']
            },
            {
                title: 'Summer Special',
                description: 'Special summer rates for all language courses and visa services.',
                discount: 'Up to 25%',
                startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
                validUntil: 'March 15, 2026',
                category: 'Seasonal',
                status: 'upcoming',
                bgColor: 'bg-cyan-500',
                terms: ['Valid during summer months', 'Limited time offer', 'Selected courses only']
            },
            {
                title: 'University Partnership Deal',
                description: 'Exclusive discounts for students applying to our partner universities.',
                discount: '₹10,000',
                startDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 60 days from now
                validUntil: 'April 30, 2026',
                category: 'Partnership',
                status: 'upcoming',
                bgColor: 'bg-purple-500',
                terms: ['Valid for partner universities only', 'Additional application fee waiver', 'Conditional offer']
            }
        ];

        for (const offer of sampleOffers) {
            await OfferModel.create(offer);
        }
    }
};

initializeSampleOffers();

module.exports = OfferModel;
