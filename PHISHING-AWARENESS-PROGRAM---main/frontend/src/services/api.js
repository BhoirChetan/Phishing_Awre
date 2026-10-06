const API_BASE = '/api';

export async function fetchModules() {
  try {
    const res = await fetch(`${API_BASE}/modules`);
    if (!res.ok) throw new Error('Failed to fetch modules');
    return await res.json();
  } catch (err) {
    console.warn('API fetch failed, returning fallback modules', err);
    return {
      success: true,
      modules: [
        { id: "mod-1", title: "Phishing Fundamentals", category: "Basics", description: "Learn what phishing is, how attacks are executed, common vectors, and why cybercriminals target individuals.", icon: "ShieldAlert", duration: "10 mins", lessons_count: 5, level: "Beginner" },
        { id: "mod-2", title: "Email Inspection & Red Flags", category: "Analysis", description: "Master the art of identifying deceptive headers, spoofed domains, malicious attachments, and psychological triggers.", icon: "Mail", duration: "15 mins", lessons_count: 6, level: "Intermediate" },
        { id: "mod-3", title: "Fake Login & Credential Harvesting", category: "Simulation", description: "Examine how attackers replicate legitimate login portals, detect domain anomalies, and fake password reset forms.", icon: "KeyRound", duration: "12 mins", lessons_count: 4, level: "Intermediate" },
        { id: "mod-4", title: "Fraudulent Websites & Typosquatting", category: "Web Security", description: "Detect lookalike domains, fake SSL badges, suspicious redirects, and malicious download prompts.", icon: "Globe", duration: "12 mins", lessons_count: 5, level: "Intermediate" },
        { id: "mod-5", title: "Social Engineering Tactics", category: "Psychology", description: "Understand psychological manipulation techniques including urgency, fear, authority impersonation, and trust exploitation.", icon: "UserCheck", duration: "15 mins", lessons_count: 8, level: "Advanced" },
        { id: "mod-6", title: "Real-Life Cyber Case Studies", category: "Real-World", description: "Analyze multi-million dollar real-world phishing breaches, corporate impact, victim mistakes, and key defensive lessons.", icon: "FileText", duration: "20 mins", lessons_count: 5, level: "Advanced" }
      ]
    };
  }
}

export async function fetchPhishingExamples(type) {
  try {
    const url = type ? `${API_BASE}/phishing-examples?type=${type}` : `${API_BASE}/phishing-examples`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch phishing examples');
    return await res.json();
  } catch (err) {
    console.warn('API fetch failed for phishing examples', err);
    return { success: true, examples: [] };
  }
}

export async function fetchCaseStudies() {
  try {
    const res = await fetch(`${API_BASE}/case-studies`);
    if (!res.ok) throw new Error('Failed to fetch case studies');
    return await res.json();
  } catch (err) {
    console.warn('API fetch failed for case studies', err);
    return { success: true, case_studies: [] };
  }
}

export async function fetchSocialEngineering() {
  try {
    const res = await fetch(`${API_BASE}/social-engineering`);
    if (!res.ok) throw new Error('Failed to fetch social engineering');
    return await res.json();
  } catch (err) {
    console.warn('API fetch failed for social engineering', err);
    return { success: true, social_engineering: [] };
  }
}

export async function fetchSecurityTips() {
  try {
    const res = await fetch(`${API_BASE}/security-tips`);
    if (!res.ok) throw new Error('Failed to fetch security tips');
    return await res.json();
  } catch (err) {
    console.warn('API fetch failed for security tips', err);
    return { success: true, tips: [] };
  }
}

export async function fetchQuizQuestions() {
  try {
    const res = await fetch(`${API_BASE}/quiz/questions`);
    if (!res.ok) throw new Error('Failed to fetch quiz questions');
    return await res.json();
  } catch (err) {
    console.warn('API fetch failed for quiz questions', err);
    return { success: true, questions: [] };
  }
}

export async function submitQuizAnswers(answers) {
  try {
    const res = await fetch(`${API_BASE}/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers, user_id: 'default_user' })
    });
    if (!res.ok) throw new Error('Failed to submit quiz');
    return await res.json();
  } catch (err) {
    console.warn('API submit failed for quiz', err);
    return { success: false, error: err.message };
  }
}

export async function fetchUserProgress() {
  try {
    const res = await fetch(`${API_BASE}/progress?user_id=default_user`);
    if (!res.ok) throw new Error('Failed to fetch progress');
    return await res.json();
  } catch (err) {
    console.warn('API fetch failed for progress', err);
    return {
      success: true,
      progress: {
        completed_modules: ["mod-1"],
        completed_lessons: ["mod-1-l1"],
        checked_tips: ["verify_sender", "enable_mfa"],
        quiz_score: 80,
        learning_level: "Phishing Defender"
      }
    };
  }
}

export async function updateUserProgress(progressData) {
  try {
    const res = await fetch(`${API_BASE}/progress/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...progressData, user_id: 'default_user' })
    });
    if (!res.ok) throw new Error('Failed to update progress');
    return await res.json();
  } catch (err) {
    console.warn('API update failed for progress', err);
    return { success: false };
  }
}

export async function fetchDashboardStats() {
  try {
    const res = await fetch(`${API_BASE}/dashboard/stats?user_id=default_user`);
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    return await res.json();
  } catch (err) {
    console.warn('API fetch failed for dashboard stats', err);
    return {
      success: true,
      stats: {
        overall_progress_percentage: 65,
        total_modules: 6,
        completed_modules_count: 2,
        completed_lessons_count: 8,
        total_tips: 9,
        checked_tips_count: 5,
        quiz_score: 80,
        quiz_attempts: 1,
        learning_level: "Phishing Defender",
        total_case_studies: 4,
        recommended_next_module: "Email Inspection & Red Flags"
      }
    };
  }
}
