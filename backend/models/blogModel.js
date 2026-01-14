const BaseModel = require('./baseModel');

const BlogModel = new BaseModel('blogs');

// Add default sample blogs if storage is empty
const initializeSampleBlogs = async () => {
  const existingBlogs = await BlogModel.findAll();
  if (existingBlogs.length === 0) {
    const sampleBlogs = [
      {
        title: 'Top 10 Universities for Computer Science in 2025',
        slug: 'top-10-universities-computer-science-2025',
        excerpt: 'Discover the best universities worldwide for pursuing a degree in Computer Science, including admission requirements and scholarship opportunities.',
        content: `Are you passionate about technology and considering a degree in Computer Science? Choosing the right university is crucial for your future career.

In this comprehensive guide, we'll explore the top 10 universities for Computer Science in 2025, their unique offerings, and what makes them stand out.

## 1. Massachusetts Institute of Technology (MIT)

MIT consistently ranks as the world's leading university for Computer Science. Their program emphasizes innovation and practical application.

**Key Highlights:**
- World-renowned faculty
- State-of-the-art research facilities
- Strong industry connections

**Admission Requirements:**
- SAT/ACT scores
- Strong GPA (3.8+)
- Programming experience preferred

## 2. Stanford University

Stanford's Computer Science program is known for its entrepreneurial spirit and proximity to Silicon Valley.

**Key Highlights:**
- Startup ecosystem
- Interdisciplinary approach
- Focus on AI and Machine Learning

## 3. Carnegie Mellon University

CMU offers one of the most comprehensive Computer Science programs with various specializations.

**Key Highlights:**
- Specialized tracks (AI, Robotics, Security)
- Research opportunities
- Strong alumni network

And seven more top universities...`,
        author: 'Dr. Sarah Mitchell',
        category: 'Education',
        tags: ['Universities', 'Computer Science', 'Admissions'],
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
        readTime: '8 min',
        featured: true,
        status: 'Published'
      },
      {
        title: 'Complete Guide to IELTS Preparation for Student Visa',
        slug: 'complete-guide-ielts-preparation-student-visa',
        excerpt: 'Everything you need to know about IELTS preparation, from test format to effective study strategies and scoring tips.',
        content: `IELTS (International English Language Testing System) is one of the most important requirements for studying abroad.

## Understanding IELTS Format

IELTS tests your English proficiency across four key areas:

### 1. Listening Section
- 30 minutes
- 4 sections
- 40 questions
- No extra time to transfer answers

### 2. Reading Section
- 60 minutes
- 3 passages
- 40 questions
- Academic vs General Training

### 3. Writing Section
- 60 minutes
- Task 1 (150 words)
- Task 2 (250 words)

### 4. Speaking Section
- 11-14 minutes
- Face-to-face interview
- 3 parts

## Effective Preparation Strategies

**1. Start Early**
- Begin preparation 3-6 months before your test
- Create a study schedule

**2. Practice Regularly**
- Take practice tests weekly
- Focus on weak areas

**3. Build Vocabulary**
- Learn academic vocabulary
- Read English publications

## Scoring Requirements

Different countries and universities have different IELTS requirements:

- USA: 6.5 - 7.5
- UK: 6.0 - 7.0
- Australia: 6.0 - 7.0
- Canada: 6.0 - 7.0`,
        author: 'James Thompson',
        category: 'Test Preparation',
        tags: ['IELTS', 'English Language', 'Student Visa'],
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
        readTime: '10 min',
        featured: true,
        status: 'Published'
      },
      {
        title: 'Scholarship Opportunities for Nepali Students in 2025',
        slug: 'scholarship-opportunities-nepali-students-2025',
        excerpt: 'Explore various scholarship programs available for Nepali students planning to study abroad, including full and partial funding options.',
        content: `Finding financial support for your international education can make a huge difference in your study abroad journey.

## Types of Scholarships

### Merit-Based Scholarships
Awarded based on academic excellence, leadership, and extracurricular achievements.

### Need-Based Scholarships
Designed for students who demonstrate financial need.

### Country-Specific Scholarships

**Australia Awards Scholarships**
- Full tuition coverage
- Living stipend
- Travel expenses

**Chevening Scholarships (UK)**
- Full funding
- For master's degree
- Leadership development

**Fulbright Program (USA)**
- Graduate study funding
- Cultural exchange program

## Application Tips

1. **Start Early**
   - Research scholarships 12-18 months in advance
   - Note application deadlines

2. **Strong Personal Statement**
   - Clearly articulate your goals
   - Highlight achievements
   - Show financial need if applicable

3. **Strong Recommendations**
   - Choose recommenders who know you well
   - Provide them with context

4. **Maintain Good Grades**
   - Most scholarships require a minimum GPA
   - Academic performance matters

## Documents Required

- Academic transcripts
- Letters of recommendation
- Personal statement/essay
- Proof of English proficiency
- Financial statements

Deadlines are crucial - submit your applications well before the due dates!`,
        author: 'Priya Sharma',
        category: 'Scholarships',
        tags: ['Scholarships', 'Financial Aid', 'Nepal'],
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
        readTime: '7 min',
        featured: false,
        status: 'Published'
      },
      {
        title: 'Student Visa Process for Australia: Step-by-Step Guide',
        slug: 'student-visa-process-australia-step-by-step',
        excerpt: 'A comprehensive breakdown of the Australian student visa application process, from choosing a course to getting your visa granted.',
        content: `Australia is one of the most popular destinations for international students. Here's your complete guide to securing an Australian student visa.

## Step 1: Choose Your Course and Institution

Research universities and courses that align with your career goals. Consider:
- Course curriculum
- University rankings
- Location
- Tuition fees
- Campus facilities

## Step 2: Apply for Admission

1. **Prepare Documents:**
   - Academic transcripts
   - English proficiency test (IELTS/PTE)
   - Statement of Purpose
   - Letters of recommendation

2. **Submit Application:**
   - Apply directly to universities
   - Or through education agents

3. **Receive Offer Letter:**
   - Conditional offer (if requirements pending)
   - Unconditional offer (full acceptance)

## Step 3: Accept Offer and Pay Tuition

- Accept your offer letter
- Pay first semester tuition
- Receive CoE (Confirmation of Enrolment)

## Step 4: Prepare Visa Application

**Required Documents:**
- Valid passport
- CoE from institution
- GTE statement (Genuine Temporary Entrant)
- Financial documents
- Health insurance (OSHC)
- English test results
- Character documents (police clearance)

## Step 5: Apply for Student Visa (Subclass 500)

1. Create ImmiAccount
2. Fill out application form
3. Upload documents
4. Pay visa fee (~AUD 620)
5. Undergo health examination

## Step 6: Attend Interview (if required)

Some applicants may be called for an interview to verify their intentions.

## Visa Processing Time

- 75% of applications: 4-16 weeks
- 90% of applications: 4-19 weeks

Tips:
- Apply early to avoid delays
- Ensure all documents are accurate
- Be honest in your application

## Work Rights on Student Visa

- Work up to 48 hours per fortnight during semester
- Unlimited hours during breaks
- Work after graduation with temporary graduate visa

Good luck with your application!`,
        author: 'Michael Chen',
        category: 'Visa Process',
        tags: ['Australia', 'Student Visa', 'Process Guide'],
        imageUrl: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800',
        readTime: '12 min',
        featured: false,
        status: 'Published'
      },
      {
        title: '5 Common Mistakes to Avoid When Applying to US Universities',
        slug: 'common-mistakes-avoid-applying-us-universities',
        excerpt: 'Learn about the most common application errors students make and how to avoid them to increase your chances of admission.',
        content: `Applying to US universities can be competitive and complex. Avoid these common mistakes to improve your chances.

## 1. Starting Too Late

**Mistake:** Beginning your application just weeks before the deadline.

**Solution:**
- Start researching 12-18 months in advance
- Understand application timelines
- Create a detailed timeline

## 2. Weak Personal Statement

**Mistake:** Writing a generic essay that doesn't showcase your unique story.

**Solution:**
- Tell a specific, compelling story
- Show, don't just tell
- Be authentic and specific
- Connect to your future goals

## 3. Ignoring Fit

**Mistake:** Applying only to universities based on rankings.

**Solution:**
- Research academic programs
- Consider campus culture
- Look at location and size
- Check for research opportunities

## 4. Incomplete Applications

**Mistake:** Submitting applications with missing components.

**Solution:**
- Create a checklist of requirements
- Submit well before deadlines
- Follow up on all components
- Verify receipt of all materials

## 5. Poor Letter of Recommendation Choices

**Mistake:** Asking recommenders who don't know you well.

**Solution:**
- Choose teachers who know your abilities
- Provide context and materials to recommenders
- Give them plenty of advance notice
- Waive your right to view recommendations

## Bonus Tips

- **Don't underestimate test preparation**
  - SAT/ACT matter
  - English proficiency is crucial
  - Start early and practice regularly

- **Be realistic about your list**
  - Include safety, target, and reach schools
  - Research acceptance rates
  - Match your academic profile

- **Demonstrate interest**
  - Attend virtual events
  - Contact admissions officers
  - Visit campus if possible

## Application Deadlines

- Early Decision: November 1-15
- Early Action: November 1-15
- Regular Decision: January 1-15

Remember: A well-prepared application stands out regardless of when you submit!`,
        author: 'Emily Rodriguez',
        category: 'Admissions',
        tags: ['USA', 'Applications', 'Common Mistakes'],
        imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
        readTime: '6 min',
        featured: true,
        status: 'Published'
      },
      {
        title: 'Part-Time Work Opportunities for International Students in Canada',
        slug: 'part-time-work-opportunities-international-students-canada',
        excerpt: 'Discover the various part-time job options available to international students in Canada and how to balance work with studies.',
        content: `Working while studying in Canada can help you gain experience, earn money, and build your network.

## Work Rights Overview

As an international student with a valid study permit, you can:
- Work up to 20 hours per week during academic sessions
- Work full-time during scheduled breaks
- Work on-campus or off-campus

## On-Campus Jobs

**Benefits:**
- Convenient location
- Flexible hours
- No additional permit needed
- University community connection

**Common Positions:**
- Library assistant
- Research assistant
- Teaching assistant
- Campus tour guide
- Administrative support
- IT help desk

**Finding On-Campus Jobs:**
- Check university career portal
- Contact department offices directly
- Network with professors
- Attend job fairs on campus

## Off-Campus Jobs

**Popular Industries:**

1. **Retail and Hospitality**
   - Sales associate
   - Waitstaff/bartender
   - Customer service
   - Front desk

2. **Food Service**
   - Restaurant staff
   - Barista
   - Delivery driver

3. **Administrative**
   - Office assistant
   - Data entry
   - Receptionist

4. **Tutoring**
   - Academic tutoring
   - Language tutoring
   - Music lessons

## Finding Opportunities

**Job Search Platforms:**
- Indeed Canada
- Job Bank (Government of Canada)
- LinkedIn Jobs
- Glassdoor
- University job boards

**Networking:**
- Connect with classmates
- Join professional associations
- Attend career events
- Build LinkedIn profile

## Legal Requirements

1. **Social Insurance Number (SIN)**
   - Required to work in Canada
   - Apply at Service Canada
   - Free of charge

2. **Study Permit Conditions**
   - Must be enrolled full-time
   - Academic program must be at least 6 months
   - Maintain good academic standing

## Tips for Success

**1. Prioritize Studies**
- Work shouldn't affect your grades
- Choose jobs with flexible hours
- Communicate with employers about exam periods

**2. Build Resume**
- Include relevant work experience
- Highlight skills gained
- Connect work to career goals

**3. Manage Time Effectively**
- Create a schedule
- Use time management tools
- Take breaks when needed

## Post-Graduation Work Opportunities

After completing your program, you may be eligible for:
- Post-Graduation Work Permit (PGWP)
- Work for up to 3 years
- Gain Canadian work experience
- Pathway to permanent residence

Remember to always verify your work permit conditions and maintain good academic standing!`,
        author: 'David Wilson',
        category: 'Career',
        tags: ['Canada', 'Part-time Work', 'Career'],
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
        readTime: '9 min',
        featured: false,
        status: 'Published'
      }
    ];

    for (const blog of sampleBlogs) {
      await BlogModel.create(blog);
    }
  }
};

initializeSampleBlogs();

module.exports = BlogModel;
