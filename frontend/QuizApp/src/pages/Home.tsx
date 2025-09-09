// Home.tsx
// ✅ Home page component - Acts as the landing page of the quiz application
// Contains hero section, feature highlights, quiz configuration options, and start button.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Brain, Play, Settings, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";

// ✅ Type definition for quiz topics
interface QuizTopic {
  id: string;
  name: string;
  description: string;
}

const Home = () => {
  const navigate = useNavigate();
  
  // ---- State Management ----
  // Stores quiz configuration (questions count + selected topic)
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10);
  const [selectedTopic, setSelectedTopic] = useState<string>("general");

  // ---- Quiz Topics (Static / Can be fetched from backend in future) ----
  const quizTopics: QuizTopic[] = [
    { id: "general", name: "General Knowledge", description: "Test your general knowledge" },
    { id: "science", name: "Science", description: "Biology, Chemistry, and Physics" },
    { id: "history", name: "History", description: "Explore historical facts and events" },
    { id: "sports", name: "Sports", description: "From football to cricket, test your sports IQ" },
    { id: "technology", name: "Technology", description: "Modern innovations and computer science" }
  ];

  /**
   * 🚀 Handles quiz start event
   * Converts quiz config → query params → navigates to quiz page
   * Example: /quiz?questions=10&topic=general
   */
  const handleStartQuiz = () => {
    const queryParams = new URLSearchParams({
      questions: numberOfQuestions.toString(),
      topic: selectedTopic
    });
    
    navigate(`/quiz?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-quiz-primary/5">
      {/* Global Navbar (shared across pages) */}
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* =======================
            Hero Section
            - Branding + Intro Text
            - Animations for visual appeal
        ======================= */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center shadow-quiz animate-bounce-in">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-hero bg-clip-text text-transparent leading-tight">
            Test Your Knowledge with QuizGame
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Challenge yourself with our interactive quiz platform. Choose your topic, 
            set the difficulty, and see how much you really know!
          </p>

          {/* Feature Highlights (3 core values) */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            {/* Feature 1: Customizable */}
            <div className="flex flex-col items-center text-center animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="w-12 h-12 bg-quiz-success/10 rounded-full flex items-center justify-center mb-3">
                <Settings className="w-6 h-6 text-quiz-success" />
              </div>
              <h3 className="font-semibold text-foreground">Customizable</h3>
              <p className="text-sm text-muted-foreground">Choose topics and question count</p>
            </div>
            
            {/* Feature 2: Educational */}
            <div className="flex flex-col items-center text-center animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="w-12 h-12 bg-quiz-primary/10 rounded-full flex items-center justify-center mb-3">
                <Brain className="w-6 h-6 text-quiz-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Educational</h3>
              <p className="text-sm text-muted-foreground">Learn while you play</p>
            </div>
            
            {/* Feature 3: Competitive */}
            <div className="flex flex-col items-center text-center animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="w-12 h-12 bg-quiz-accent/10 rounded-full flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6 text-quiz-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Competitive</h3>
              <p className="text-sm text-muted-foreground">Track your progress and scores</p>
            </div>
          </div>
        </div>

        {/* =======================
            Quiz Configuration Card
            - Contains slider for number of questions
            - Topic selector
            - Start button
        ======================= */}
        <div className="max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.4s'}}>
          <Card className="shadow-quiz border-0 bg-gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                <Settings className="w-6 h-6 text-quiz-primary" />
                Customize Your Quiz
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Question Count Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="questions" className="text-base font-semibold text-foreground">
                    Number of Questions
                  </Label>
                  <span className="text-2xl font-bold text-quiz-primary bg-quiz-primary/10 px-3 py-1 rounded-full">
                    {numberOfQuestions}
                  </span>
                </div>
                
                <Slider
                  id="questions"
                  min={5}
                  max={30}
                  step={1}
                  value={[numberOfQuestions]}
                  onValueChange={(value) => setNumberOfQuestions(value[0])}
                  className="w-full"
                />
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>5 questions</span>
                  <span>30 questions</span>
                </div>
              </div>

              {/* Topic Selection Dropdown */}
              <div className="space-y-4">
                <Label htmlFor="topic" className="text-base font-semibold text-foreground">
                  Choose Quiz Topic
                </Label>
                
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Option: All topics combined */}
                    <SelectItem value="all">All Topics (Mixed)</SelectItem>
                    {/* Map quiz topics */}
                    {quizTopics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{topic.name}</span>
                          <span className="text-sm text-muted-foreground">{topic.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Start Quiz Button */}
              <Button
                onClick={handleStartQuiz}
                className="w-full bg-gradient-primary hover:opacity-90 text-white font-bold py-4 text-lg shadow-quiz hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Quiz Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* =======================
            Footer
            - Closing motivational text
        ======================= */}
        <div className="text-center mt-12 text-muted-foreground animate-fade-in" style={{animationDelay: '0.6s'}}>
          <p>Ready to challenge your mind? Let's see what you know! 🧠</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
