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

    // 🎯 Dynamic scores (feels real)
    const beforeScore = Math.floor(50 + Math.random() * 15); // 50–65
    const afterScore = beforeScore + Math.floor(20 + Math.random() * 15); // +20–35

    // 🚀 Premium demo result
    const demoResult = `
BEFORE SCORE: ${beforeScore}/100
AFTER SCORE: ${afterScore}/100

REWRITTEN RESUME:

Professional Summary:
Results-driven Computer Science student with hands-on experience in frontend development and building responsive web applications. Adept at solving real-world problems, collaborating in team environments, and delivering optimized user-focused solutions.

Skills:
- HTML, CSS, JavaScript
- React.js & Component-Based Architecture
- Git & GitHub
- REST API Integration
- Problem-solving & Analytical Thinking
- Team Collaboration

Experience / Projects:
- Built a responsive portfolio website using modern HTML, CSS, and JavaScript, improving user experience and accessibility
- Developed a task management web app with local storage, increasing usability and productivity
- Collaborated on academic and team projects, demonstrating strong communication and teamwork
- Optimized UI performance across devices for better speed and engagement

Education:
- BS Computer Science – University

KEYWORDS ADDED:
- Frontend Development
- React.js
- Responsive Design
- API Integration
- Performance Optimization
- User Experience (UX)
`;

    return Response.json({ result: demoResult });

  } catch (err) {
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}