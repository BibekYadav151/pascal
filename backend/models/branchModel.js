const BaseModel = require('./baseModel');

const BranchModel = new BaseModel('branches');

// Add default sample branches if storage is empty
const initializeSampleBranches = async () => {
  const existingBranches = await BranchModel.findAll();
  if (existingBranches.length === 0) {
    const sampleBranches = [
      {
        name: 'Main Branch - Kathmandu',
        location: 'Kathmandu, Nepal',
        address: 'Putalisadak, Kathmandu 44600',
        phone: '+977-1-44XXXXXX',
        email: 'info@pascalinstitute.edu.np',
        hours: 'Sun-Fri: 9:00 AM - 6:00 PM',
        mapUrl: '#',
        isMain: true
      },
      {
        name: 'Branch Office - Pokhara',
        location: 'Pokhara, Nepal',
        address: 'Lakeside Road, Pokhara 33700',
        phone: '+977-61-XXXXXX',
        email: 'pokhara@pascalinstitute.edu.np',
        hours: 'Sun-Fri: 9:00 AM - 5:00 PM',
        mapUrl: '#',
        isMain: false
      },
      {
        name: 'Branch Office - Chitwan',
        location: 'Chitwan, Nepal',
        address: 'Bharatpur, Chitwan 44200',
        phone: '+977-56-XXXXXX',
        email: 'chitwan@pascalinstitute.edu.np',
        hours: 'Sun-Fri: 9:00 AM - 5:00 PM',
        mapUrl: '#',
        isMain: false
      }
    ];

    for (const branch of sampleBranches) {
      await BranchModel.create(branch);
    }
  }
};

initializeSampleBranches();

module.exports = BranchModel;
