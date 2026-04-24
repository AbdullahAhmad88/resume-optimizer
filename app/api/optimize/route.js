export async function POST(req) {
  try {
    const body = await req.json();

    const resume = body?.resume?.trim();
    const jobDescription = body?.jobDescription?.trim();

    if (!resume || !jobDescription) {
      return Response.json(
        { error: "Please provide both resume and job description" },
        { status: 400 }
      );
    }

    // 🚀 DEMO AI OUTPUT (always strong)
    const demoResult = `
BEFORE SCORE: 58/100
AFTER SCORE: 89/100

REWRITTEN RESUME:

Professional Summary:
Motivated Computer Science student with hands-on experience in frontend development and a strong foundation in problem-solving. Skilled in building responsive web applications and collaborating in team environments to deliver high-quality solutions.

Skills:
- HTML, CSS, JavaScript
- React.js
- Git & GitHub
- API Integration
- Problem-solving & Teamwork

Experience / Projects:
- Developed a responsive portfolio website using HTML, CSS, and JavaScript, improving user engagement and accessibility
- Built a task management application with local storage, enhancing productivity and usability
- Collaborated on academic projects, demonstrating strong teamwork and communication skills
- Optimized UI performance and responsiveness for better user experience

Education:
- BS Computer Science – University

KEYWORDS ADDED:
- Frontend Development
- React.js
- Responsive Design
- API Integration
- Performance Optimization
`;

    return Response.json({ result: demoResult });

  } catch (err) {
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}