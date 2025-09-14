// Home.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Brain, Play, Settings, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";

// Type definition for quiz topics
interface QuizTopic {
  id: string;
  name: string;
  description: string;
}

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // -------------------------
  // STATE MANAGEMENT
  // -------------------------
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10); // Default number of questions
  const [selectedTopic, setSelectedTopic] = useState<string>(""); // Selected topic
  const [quizTopics, setQuizTopics] = useState<QuizTopic[]>([]); // Topics fetched from backend
  const [loading, setLoading] = useState<boolean>(true); // Loading state for topics

  // -------------------------
  // FETCH TOPICS FROM BACKEND
  // -------------------------
  const fetchTopics = async () => {
    try {
      const res = await fetch("http://localhost:8181/api/topics");
      if (!res.ok) throw new Error("Failed to fetch topics");

      const data: QuizTopic[] = await res.json();
      setQuizTopics(data);
    } catch (error) {
      console.error("Error fetching topics:", error);
      toast({
        title: "Error",
        description: "Unable to load topics. Please try again later.",
        className: "bg-red-500 text-white",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch topics on component mount
  useEffect(() => {
    fetchTopics();
  }, []);

  // -------------------------
  // START QUIZ
  // -------------------------
  const handleStartQuiz = () => {
    const queryParams = new URLSearchParams({
      questions: numberOfQuestions.toString(),
      topic: selectedTopic,
    });
    navigate(`/quiz?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-quiz-primary/5">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* HERO SECTION */}
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

          {/* FEATURE HIGHLIGHTS */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-12 bg-quiz-success/10 rounded-full flex items-center justify-center mb-3">
                <Settings className="w-6 h-6 text-quiz-success" />
              </div>
              <h3 className="font-semibold text-foreground">Customizable</h3>
              <p className="text-sm text-muted-foreground">Choose topics and question count</p>
            </div>

            <div className="flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 bg-quiz-primary/10 rounded-full flex items-center justify-center mb-3">
                <Brain className="w-6 h-6 text-quiz-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Educational</h3>
              <p className="text-sm text-muted-foreground">Learn while you play</p>
            </div>

            <div className="flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="w-12 h-12 bg-quiz-accent/10 rounded-full flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6 text-quiz-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Competitive</h3>
              <p className="text-sm text-muted-foreground">Track your progress and scores</p>
            </div>
          </div>
        </div>

        {/* QUIZ CONFIGURATION CARD */}
        <div className="max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Card className="shadow-quiz border-0 bg-gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                <Settings className="w-6 h-6 text-quiz-primary" />
                Customize Your Quiz
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* NUMBER OF QUESTIONS SLIDER */}
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

              {/* TOPIC SELECTION */}
              <div className="space-y-4">
                <Label htmlFor="topic" className="text-base font-semibold text-foreground">
                  Select a Topic
                </Label>
                {loading ? (
                  <p className="text-muted-foreground">Loading topics...</p>
                ) : (
                  <Select
                    value={selectedTopic}
                    onValueChange={setSelectedTopic}
                  >
                    <SelectTrigger className="w-full h-12 text-base">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
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
                )}
              </div>

              {/* START QUIZ BUTTON */}
              <Button
                onClick={handleStartQuiz}
                className="w-full bg-gradient-primary hover:opacity-90 text-white font-bold py-4 text-lg shadow-quiz hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                size="lg"
                disabled={loading || quizTopics.length === 0 || !selectedTopic} // disabled if no topic selected
              >
                <Play className="w-5 h-5 mr-2" />
                Start Quiz Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-12 text-muted-foreground animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p>Ready to challenge your mind? Let's see what you know! 🧠</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
