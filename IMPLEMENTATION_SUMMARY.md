# University Logo Display Feature Implementation

## Overview
Added functionality to allow admins to upload university logos and display them in the Partner Universities section on the home page.

## Changes Made

### Backend Changes

#### 1. `/backend/controllers/uploadController.js`
- Added `logoStorage` configuration for university logo uploads
- Created `logoUpload` multer instance with 5MB file size limit and image file filter
- Implemented `uploadUniversityLogo` handler function that:
  - Accepts logo uploads via POST request
  - Validates file type and size
  - Generates unique filenames with prefix `university-logo-`
  - Returns the uploaded file URL

#### 2. `/backend/routes/upload.js`
- Added new route: `POST /api/upload/university-logo`
- Routes to `uploadController.uploadUniversityLogo` handler

### Frontend Changes

#### 3. `/frontend/src/admin/AdminUniversities.jsx`
- Added state variables:
  - `uploadingLogo`: Tracks upload progress
  - `logoPreview`: Stores logo preview URL
- Implemented `handleLogoUpload` function:
  - Validates file type (must be image)
  - Validates file size (max 5MB)
  - Uploads to backend endpoint `/api/upload/university-logo`
  - Updates form data with returned logo URL
- Implemented `handleRemoveLogo` function to clear logo
- Updated modal form to include:
  - Logo upload input field with file selector
  - Logo preview with remove button
  - Upload progress indicator
  - Helper text explaining logo requirements
- Updated university cards in admin view to display logos when available
- Updated modal handlers to properly manage logo preview state

#### 4. `/frontend/src/pages/Home.jsx`
- Modified `partnerUniversities` filter to only include universities that:
  - Have `isPartner` set to `true`
  - Have `status` set to `"Active"`
  - **Have a logo uploaded** (`uni.logo` is truthy)
- Updated partner university cards to display:
  - Actual logo images instead of emoji icon
  - Larger logo container (20x20 instead of 12x12)
  - White background with border for better logo visibility
  - Fallback to graduation cap emoji if image fails to load

## Features

### Admin Side
1. **Upload Logo**: Admin can upload university logos (JPG, PNG, GIF, etc.)
2. **Preview Logo**: Uploaded logo is displayed immediately in preview
3. **Remove Logo**: Option to remove uploaded logo before saving
4. **Visual Feedback**: Shows "Uploading..." message during upload
5. **Validation**: Prevents non-image files and files larger than 5MB
6. **Display in List**: Logos are shown in the university grid in admin panel

### Public Home Page
1. **Logo Display**: Partner universities with logos are displayed with their actual logo images
2. **Conditional Display**: Only universities with logos are shown in the partner section
3. **Professional Appearance**: Logos are contained properly with padding and borders
4. **Fallback Handling**: If logo fails to load, shows graduation cap emoji

## Usage Instructions

### For Admins
1. Navigate to Admin Panel → University Management
2. Click "Add University" or edit an existing university
3. Fill in university details
4. Click "Choose File" under "University Logo" section
5. Select an image file (max 5MB)
6. Wait for upload to complete (preview will appear)
7. Check "Add to Partner Universities" if you want it displayed on home page
8. Click "Add University" or "Update University" to save

### Display Logic
- Universities appear on home page Partner Universities section ONLY if:
  - Status is "Active"
  - "Add to Partner Universities" checkbox is checked
  - A logo has been uploaded

## Technical Details

### File Upload Configuration
- **Upload Directory**: `/backend/uploads/`
- **File Size Limit**: 5MB
- **Accepted File Types**: All image types (image/*)
- **Filename Format**: `university-logo-{timestamp}-{random}.{ext}`
- **URL Format**: `http://localhost:5000/uploads/{filename}`

### Data Structure
Universities now include:
```javascript
{
  id: number,
  name: string,
  country: string,
  location: string,
  website: string,
  logo: string,        // URL to uploaded logo
  status: 'Active' | 'Inactive',
  isPartner: boolean   // Must be true to display on home page
}
```

## Benefits
1. **Professional Appearance**: Real university logos instead of generic icons
2. **Quality Control**: Only shows universities with proper branding
3. **Easy Management**: Simple upload interface for admins
4. **Flexible Display**: Admins control which universities appear on home page
5. **Error Handling**: Graceful fallback if logo fails to load
