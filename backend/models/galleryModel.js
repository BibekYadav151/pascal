const BaseModel = require('./baseModel');

const GalleryModel = new BaseModel('gallery');

// Add default sample events if storage is empty
const initializeSampleEvents = async () => {
  const existingEvents = await GalleryModel.findAll();
  if (existingEvents.length === 0) {
    const sampleEvents = [
      {
        title: 'Annual Graduation Ceremony 2024',
        coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
        images: [
          'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'
        ]
      },
      {
        title: 'Student Orientation Day',
        coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        images: [
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
          'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
        ]
      }
    ];

    for (const event of sampleEvents) {
      await GalleryModel.create(event);
    }
  }
};

initializeSampleEvents();

module.exports = GalleryModel;
