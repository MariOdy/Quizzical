import React from "react";
import Question from "../Question";
import { useForm, FormProvider } from "react-hook-form";
import "./quiz.css";

export type IQuestion = {
  category: string;
  correct_answer: string;
  difficulty: "easy" | "medium" | "strong";
  incorrect_answers: string[];
  question: string;
  type: "multiple" | string;
  // Client-side
  id: string;
  answers: string[];
};

const getQuizData = async () => {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
  );
  const data: { response_code: number; results: IQuestion[] } =
    await res.json();

  const results = data?.results?.map((question, i) => ({
    ...question,
    answers: [question.correct_answer, ...question.incorrect_answers].sort(
      () => Math.random() - 0.5
    ),
    id: String(i),
  }));

  return results;
};

const Quiz: React.FC = () => {
  const [quizData, setQuizData] = React.useState<IQuestion[]>();
  const [submitedData, setSubmitedData] =
    React.useState<Record<number, string>>(null);

  const isSubmited = !!submitedData;

  const methods = useForm();

  const onSubmit = (data: Record<number, string>) => {
    setSubmitedData(data);
  };

  const getQuiz = async () => {
    const questions = await getQuizData();
    setQuizData(questions);
  };

  React.useEffect(() => {
    getQuiz();
  }, []);

  const playAgain = () => {
    methods.reset();
    getQuiz();
    setSubmitedData(null);
  };

  let correctAnswers = 0;
  if (submitedData) {
    correctAnswers = Object.entries(submitedData).reduce(
      (acc, [key, value]) => {
        // Если в quizData "correct_answer" вопроса с ключом "key" совпадает с "value"
        const question = quizData.find((q) => q.id === key);
        if (question.correct_answer === value) {
          acc += 1;
        }

        return acc;
      },
      0
    );
  }

  return (
    <div className="quiz-container">
      <FormProvider {...methods}>
        <form
          className="Quiz"
          onSubmit={methods.handleSubmit(onSubmit)}
          data-is-submited={isSubmited}
        >
          <div>
            {quizData?.map?.((question) => (
              <Question question={question} key={question.id} />
            ))}
          </div>

          {submitedData ? (
            <div className="quiz-results">
              <button
                className="check-answers"
                onClick={playAgain}
                type="button"
              >
                <span>Play again</span>
              </button>
              <div className="quiz-result">
                You scored <span>{correctAnswers}/5 </span>correct answers
              </div>
            </div>
          ) : (
            <button className="check-answers" type="submit">
              <span>Check answers</span>
            </button>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default Quiz;
