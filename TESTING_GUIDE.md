# Testing Guide: University Logo Upload Feature

## Prerequisites
- Frontend running on http://localhost:3002
- Backend running on http://localhost:5000
- Admin credentials: admin@pascal.edu.np / admin123

## Test Steps

### 1. Login to Admin Panel
1. Navigate to http://localhost:3002/admin
2. Login with admin credentials
3. You should be redirected to the admin dashboard

### 2. Access University Management
1. From the admin sidebar, click on "University Management" or navigate to `/admin/universities`
2. You should see the University Management page with any existing universities

### 3. Add a New University with Logo

#### Step 3.1: Open Add University Modal
1. Click the "➕ Add University" button in the top right
2. A modal should appear with the form

#### Step 3.2: Fill University Details
1. **University Name**: Enter "University of Toronto"
2. **Country**: Enter "Canada"
3. **Location**: Enter "Toronto, Ontario"
4. **Website**: Enter "https://www.utoronto.ca"
5. **Status**: Select "Active"
6. **Add to Partner Universities**: Check this checkbox ✓

#### Step 3.3: Upload Logo
1. Click the "Choose File" button under "University Logo"
2. Select an image file (JPG, PNG, GIF, etc.)
   - File must be under 5MB
   - Must be an image type
3. Wait for upload to complete
4. You should see:
   - A preview of the logo appear
   - A "Remove Logo" button below the preview

#### Step 3.4: Save University
1. Click "Add University" button at the bottom
2. The modal should close
3. The new university should appear in the grid with its logo

### 4. Verify Logo Display in Admin Panel
1. In the university grid, you should see:
   - The uploaded logo in place of the default 🎓 icon
   - University name, country, location
   - Status badge (Active)
   - Edit and Delete buttons

### 5. Edit University and Change Logo

#### Step 5.1: Open Edit Modal
1. Click "Edit" on the university you just added
2. The modal should open with pre-filled data
3. The current logo should be displayed in preview

#### Step 5.2: Change Logo (Optional)
1. Click "Remove Logo" to remove current logo
2. Upload a different logo using the file input
3. Wait for new upload to complete
4. Click "Update University"

### 6. Verify on Home Page

#### Step 6.1: Navigate to Home Page
1. Go to http://localhost:3002 (home page)
2. Scroll down to "Partner Universities" section

#### Step 6.2: Check Logo Display
1. You should see the university you added
2. The actual logo image should be displayed (not the emoji)
3. Logo should be:
   - Properly sized (20x20 container)
   - Centered in its container
   - Showing with white background and border
4. University name and country should be displayed below the logo
5. Clicking the name (if website URL provided) should open the university website in a new tab

### 7. Test Filtering Logic

#### Test 7.1: University with Logo
- **Conditions**: isPartner=true, status=Active, logo=uploaded
- **Expected**: Shows on home page ✓

#### Test 7.2: University without Logo
1. Go back to admin panel
2. Add another university but DON'T upload a logo
3. Check "Add to Partner Universities"
4. Set status to "Active"
5. Save the university
6. Go to home page
7. **Expected**: This university should NOT appear in Partner Universities section

#### Test 7.3: Inactive University
1. Edit a university with a logo
2. Change status to "Inactive"
3. Save
4. Go to home page
5. **Expected**: This university should NOT appear

#### Test 7.4: Non-Partner University
1. Edit a university with a logo
2. Uncheck "Add to Partner Universities"
3. Set status back to "Active"
4. Save
5. Go to home page
6. **Expected**: This university should NOT appear

### 8. Test Error Handling

#### Test 8.1: Invalid File Type
1. Try to upload a PDF or text file
2. **Expected**: Error message "Please select an image file"

#### Test 8.2: Large File
1. Try to upload an image larger than 5MB
2. **Expected**: Error message "File size should not exceed 5MB"

#### Test 8.3: Broken Image URL
1. Add a university with a logo
2. Manually edit localStorage to corrupt the logo URL
3. Go to home page
4. **Expected**: Fallback to graduation cap emoji (🎓)

### 9. Test Auto-Carousel (if 7+ universities)
1. Add 7 or more universities with logos
2. All should have isPartner=true and status=Active
3. Go to home page
4. **Expected**: Universities carousel auto-scrolls every 3 seconds

## Expected Results Summary

✅ Logo uploads successfully from admin panel  
✅ Logo preview shows immediately after upload  
✅ Logo can be removed and re-uploaded  
✅ Logo displays in admin university grid  
✅ Logo displays on home page Partner Universities section  
✅ Only universities with logos, isPartner=true, and status=Active appear on home page  
✅ File type and size validations work  
✅ Upload progress indicator shows during upload  
✅ Logos are properly contained and scaled  
✅ Fallback emoji shows if image fails to load  

## Troubleshooting

### Backend Not Running
```bash
cd backend && node server.js
```

### Frontend Not Running
```bash
cd frontend && npm start
```

### Uploads Not Working
- Check if `/backend/uploads/` directory exists
- Check backend logs for errors
- Verify CORS is properly configured
- Check Network tab in browser DevTools

### Logo Not Showing on Home Page
- Verify university has logo URL in localStorage
- Check "Add to Partner Universities" is checked
- Verify status is "Active"
- Open browser console for errors
- Check that backend is serving files from /uploads

### Clear Data and Start Fresh
```javascript
// In browser console
localStorage.clear();
location.reload();
```

## API Endpoints Used

- **POST** `/api/upload/university-logo` - Upload logo
- **GET** `/uploads/{filename}` - Serve uploaded files
- **DELETE** `/api/upload/file/{filename}` - Delete uploaded file (if implemented)

## Data Structure

University object in localStorage:
```json
{
  "id": 1234567890,
  "name": "University of Toronto",
  "country": "Canada",
  "location": "Toronto, Ontario",
  "website": "https://www.utoronto.ca",
  "logo": "http://localhost:5000/uploads/university-logo-1234567890-123456789.png",
  "status": "Active",
  "isPartner": true
}
```
