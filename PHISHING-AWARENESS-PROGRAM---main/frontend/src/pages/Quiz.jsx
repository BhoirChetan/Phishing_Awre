import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  ShieldCheck,
  RefreshCw,
  Zap,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { fetchQuizQuestions, submitQuizAnswers } from '../services/api';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // question_id -> selected_index
  const [submittedChoice, setSubmittedChoice] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    fetchQuizQuestions().then(res => {
      if (res.success && res.questions && res.questions.length > 0) {
        setQuestions(res.questions);
      }
    });
  };

  const currentQ = questions[currentIndex] || null;

  const handleSelectOption = (index) => {
    if (showExplanation) return; // locked once answered for current question
    setSubmittedChoice(index);
  };

  const handleConfirmAnswer = () => {
    if (submittedChoice === null) return;
    const updatedAnswers = { ...userAnswers, [currentQ.id]: submittedChoice };
    setUserAnswers(updatedAnswers);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setSubmittedChoice(null);
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Submit complete quiz to backend
      handleQuizSubmission();
    }
  };

  const handleQuizSubmission = async () => {
    setIsSubmitting(true);
    const result = await submitQuizAnswers(userAnswers);
    setIsSubmitting(false);
    if (result && result.success) {
      setQuizResult(result);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setSubmittedChoice(null);
    setShowExplanation(false);
    setQuizResult(null);
  };

  if (questions.length === 0) {
    return (
      <div className="py-20 text-center text-slate-400 space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-400" />
        <p>Loading interactive quiz questions...</p>
      </div>
    );
  }

  /* RESULTS SCREEN */
  if (quizResult) {
    const isPassed = quizResult.percentage >= 70;
    return (
      <div className="max-w-3xl mx-auto py-8 space-y-8 animate-fade-in">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-6 relative overflow-hidden">

          <div className="inline-flex p-4 rounded-full bg-slate-950 border border-slate-800 glow-emerald">
            <Award className={`w-12 h-12 ${isPassed ? 'text-emerald-400' : 'text-amber-400'}`} />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-white">Quiz Completed!</h1>
            <p className="text-slate-400 text-sm">Here is your security awareness performance summary.</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono">
            <div>
              <span className="block text-3xl font-extrabold text-emerald-400">{quizResult.score} / {quizResult.total_questions}</span>
              <span className="text-xs text-slate-400">Score</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-cyan-400">{quizResult.percentage}%</span>
              <span className="text-xs text-slate-400">Accuracy</span>
            </div>
            <div>
              <span className={`block text-xl font-extrabold ${isPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isPassed ? 'DEFENDER' : 'NEEDS PRACTICE'}
              </span>
              <span className="text-xs text-slate-400">Status</span>
            </div>
          </div>

          {/* Improvement Areas */}
          {quizResult.improvement_areas && quizResult.improvement_areas.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-left space-y-2 text-xs">
              <h3 className="font-bold text-amber-400 flex items-center gap-1.5 font-mono uppercase">
                <AlertTriangle className="w-4 h-4" />
                Areas Needing Improvement
              </h3>
              <ul className="list-disc list-inside text-slate-300 space-y-1">
                {quizResult.improvement_areas.map((area, idx) => (
                  <li key={idx}>{area}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={handleRetake}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow glow-emerald flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  /* ACTIVE QUIZ QUESTION SCREEN */
  const progressPct = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">

      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-400 text-xs font-mono">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Interactive Assessment Module</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Phishing Awareness Quiz
        </h1>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>{Math.round(progressPct)}% Complete</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* QUESTION CARD */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">

        <div className="space-y-2">
          <span className="text-xs font-mono text-teal-400 bg-teal-950 px-2.5 py-1 rounded border border-teal-800">
            {currentQ.category}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug pt-2">
            {currentQ.question}
          </h2>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {(currentQ.options || []).map((opt, idx) => {
            const isSelected = submittedChoice === idx;
            const isCorrectIdx = currentQ.correct_index === idx;

            let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

            if (showExplanation) {
              if (isCorrectIdx) {
                optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
              } else if (isSelected) {
                optionStyle = 'bg-red-950/80 border-red-500 text-red-200';
              }
            } else if (isSelected) {
              optionStyle = 'bg-teal-950/80 border-teal-500 text-white font-semibold glow-teal';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={showExplanation}
                className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 ${optionStyle}`}
              >
                <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Box */}
        {showExplanation && (
          <div className={`p-5 rounded-xl border text-xs leading-relaxed space-y-2 animate-fade-in ${submittedChoice === currentQ.correct_index
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
              : 'bg-red-950/60 border-red-500/50 text-red-200'
            }`}>
            <div className="flex items-center gap-2 font-bold text-sm font-mono">
              {submittedChoice === currentQ.correct_index ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Correct Answer!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>Incorrect</span>
                </>
              )}
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-800">
          {!showExplanation ? (
            <button
              onClick={handleConfirmAnswer}
              disabled={submittedChoice === null}
              className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-bold text-sm transition-all shadow"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow flex items-center gap-2"
            >
              <span>{currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
